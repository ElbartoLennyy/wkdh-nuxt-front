const xlsx = require('xlsx')
const phones = require('./phones')

function getPrice(userPhone) {
  try {
    const price = phones.phones[userPhone.Brand][userPhone.Phone][userPhone.Storage].price
    const prices = calcPrice(userPhone, price)

    return prices
  } catch (error) {
    return false
  }
}

function calcPrice(userPhone, price) {
  price = price * calcCondition(price, userPhone)
  price = price - calcAccessorys(price, userPhone)
  let sellingPrice = price
  if (userPhone.Defects.length >= 1) {
    const defectPrice = calcDefects(userPhone)
    if (defectPrice) { price = price - defectPrice } else {
      console.log('because of defect')
      return false
    }
  }

  price -= 5.45
  if (price < 100) {
    price = price * 0.66
  } else if (price < 150) {
    price = price * 0.72
  } else if (price < 200) {
    price = price * 0.77
  } else if (price < 300) {
    price = price * 0.81
  } else if (price < 400) {
    price = price * 0.84
  } else if (price >= 400) {
    price = price * 0.86
  }
  price -= 10

  if (price <= 30) {
    console.log('price to low')

    return false
  } else {
    // TODO round to better number
    price = Math.floor(price)
    price = Math.ceil(price / 5) * 5

    sellingPrice = Math.floor(sellingPrice)
    sellingPrice = Math.ceil(sellingPrice / 5) * 5
    return { sellingPrice, price }
  }
}

function calcDefects(userPhone) {
  let defectPrice = 0
  const phoneDefectsPrice = []

  const defects = JSON.stringify(userPhone.Defects)

  const brand = userPhone.Brand.toLowerCase()
  let priceList

  try {
    const workbook = xlsx.readFile(`./priceParts/${brand}.xlsx`)
    const sheetNameList = workbook.SheetNames
    priceList = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]])
  } catch (error) {
    return false
  }

  if (userPhone.Brand === 'Samsung') {
    const samsungName = xlsx.readFile('./priceParts/samsung_name.xlsx')
    const samsungNamesList = samsungName.SheetNames
    const samsungNames = xlsx.utils.sheet_to_json(samsungName.Sheets[samsungNamesList[0]])

    for (const phoneCode of samsungNames) {
      if (phoneCode['Modell Bezeichnung'].trim() === ((userPhone.Brand).trim() + ' ' + (userPhone.Phone).trim())) {
        userPhone.Phone = phoneCode['Modell Nummer']
      }
    }
  }

  const strs = ['plus', 'plus', 'max', 'X', 'Xs', '+']

  if (brand === 'apple') {
    for (const element of priceList) {
      if (element['Model code'].includes(userPhone.Phone)) {
        for (const str of strs) {
          if (userPhone.Phone.toLowerCase().includes(str)) {
            if (!element['Model code'].toLowerCase().includes(str)) {
              break
            }
          }

          if (!userPhone.Phone.toLowerCase().includes(str)) {
            if (element['Model code'].toLowerCase().includes(str)) {
              break
            }
          }

          phoneDefectsPrice.push(element)
        }
      }
    }
  } else {
    for (const element of priceList) {
      if (element['Model code'].includes(userPhone.Phone)) {
        phoneDefectsPrice.push(element)
      }
    }
  }

  if (phoneDefectsPrice.length === 0) { return false }

  if (defects.includes('BATTERY')) {
    const prices = []
    for (const element of phoneDefectsPrice) {
      if (element['Part category'].includes('Battery')) {
        prices.push(element['Price ex tax'])
      }
    }

    if (prices.length === 0) { return false }

    // eslint-disable-next-line no-return-assign
    const sum = prices.reduce((previous, current) => current += previous)
    defectPrice += (sum / prices.length * 1.1 + 21) * 1.45
  }
  if (defects.includes('PORT')) {
    const prices = []
    for (const element of phoneDefectsPrice) {
      if (element['Part category'].includes('Connector')) {
        prices.push(element['Price ex tax'])
      }
    }

    if (prices.length === 0) { return false }

    // eslint-disable-next-line no-return-assign
    const sum = prices.reduce((previous, current) => current += previous)
    defectPrice += (sum / prices.length * 1.1 + 21) * 1.45
  }
  if (defects.includes('SCREEN')) {
    const prices = []
    if (userPhone.Brand === 'Apple') {
      for (const element of phoneDefectsPrice) {
        if (element['Part category'].includes('LCD') && element.Quality.includes('In-Cell')) {
          prices.push(element['Price ex tax'])
        }
      }
      if (prices.length === 0) {
        for (const element of phoneDefectsPrice) {
          if (element['Part category'].includes('LCD') && element.Quality.includes('OEM refurb')) {
            prices.push(element['Price ex tax'])
          }
        }
      }
      if (prices.length === 0) {
        for (const element of phoneDefectsPrice) {
          if (element['Part category'].includes('LCD') && element.Quality.includes('Compatible')) {
            prices.push(element['Price ex tax'])
          }
        }
      }
    } else {
      for (const element of phoneDefectsPrice) {
        if (element['Part category'].includes('LCD')) {
          prices.push(element['Price ex tax'])
        }
      }
    }

    if (prices.length === 0) { return false }

    // eslint-disable-next-line no-return-assign
    const sum = prices.reduce((previous, current) => current += previous)
    defectPrice += (sum / prices.length * 1.1 + 21) * 1.45
  }
  if (defects.includes('BACK')) {
    const prices = []
    for (const element of phoneDefectsPrice) {
      if (element['Part category'].includes('Housing') || element['Part category'].includes('Cover')) {
        prices.push(element['Price ex tax'])
      }
    }

    if (prices.length === 0) { return false }

    // eslint-disable-next-line no-return-assign
    const sum = prices.reduce((previous, current) => current += previous)
    defectPrice += (sum / prices.length * 1.1 + 21) * 1.45
  }

  return defectPrice
}

function calcCondition(price, phoneData) {
  let discount = 0

  if (price > 300) {
    discount = (price - 300) / 200 * 0.1
    if (discount > 0.1) {
      discount = 0.1
    }
  }

  if (phoneData.Condition === 'LIKE_NEW') {
    return 1.15 - discount
  } else if (phoneData.Condition === 'REALLY_GOOD') {
    return 1.03 - discount
  } else if (phoneData.Condition === 'GOOD') {
    return 0.95 - discount
  } else if (phoneData.Condition === 'ACCEPTABLE') {
    return 0.8 - discount
  }
}

function calcAccessorys(price, phone) {
  const accessorys = JSON.stringify(phone.Accessorys)
  let minus = 0

  if (!accessorys.includes('PACKAGING')) {
    if (price < 300) {
      minus += 5
    } else {
      minus += 10
    }
  }
  if (!accessorys.includes('CABLE')) {
    minus += 3
  }
  if (!accessorys.includes('CHARGER')) {
    minus += 3
  }
  if (!accessorys.includes('HEADPHONES')) {
    if (price < 300) {
      minus += 3
    } else {
      minus += 8
    }
  }
  return minus
}

module.exports = { getPrice }
