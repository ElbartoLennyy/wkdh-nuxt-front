const xlsx = require('xlsx')
const phones = require('../data/priceListPhones')

function getPrice(userPhone) {
  return 200

  let price

  for (const phone of phones) {
    if (phone.Phone === userPhone.Phone && phone.Storage === userPhone.Storage) {
      price = phone.Price
      break
    }
  }
  return calcPrice(userPhone, price)
}

function calcPrice(userPhone, price) {
  price = price * calcCondition(price, userPhone)
  price = price - calcAccessorys(price, userPhone)
  if (userPhone.Defects) {
    const defectPrice = calcDefects(userPhone)
    if (defectPrice) { price = price - defectPrice } else {
      return false
    }
  }

  price -= 5.45
  if (price < 100) {
    price = price * 0.62
  } else if (price < 150) {
    price = price * 0.68
  } else if (price < 200) {
    price = price * 0.74
  } else if (price < 300) {
    price = price * 0.78
  } else if (price < 400) {
    price = price * 0.82
  } else if (price >= 400) {
    price = price * 0.84
  }
  price -= 10

  if (price <= 40) {
    return false
  } else {
    //TODO round to better number
    return Math.floor(price)
  }
}

function calcDefects(userPhone) {
  let defectPrice = 0
  const phoneDefectsPrice = []

  const defects = JSON.stringify(userPhone.Defects)

  const brand = userPhone.Brand.toLowerCase()

  const workbook = xlsx.readFile(`./priceParts/${brand}.xlsx`)
  const sheetNameList = workbook.SheetNames
  const priceList = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]])

  if (userPhone.Brand === 'Samsung') {
    const samsungName = xlsx.readFile('./priceParts/samsung_name.xlsx')
    const samsungNamesList = samsungName.SheetNames
    const samsungNames = xlsx.utils.sheet_to_json(samsungName.Sheets[samsungNamesList[0]])

    for (const phoneCode in samsungNames) {
      if (phoneCode['Modell Bezeichnung'].trim() === ((userPhone.Brand).trim() + ' ' + (userPhone.Phone).trim())) {
        userPhone.Phone = phoneCode['Modell Nummer']
      }
    }
  }

  const strs = ['plus', 'plus', 'max', 'X', 'Xs']

  if (userPhone.Brand === 'Apple') {
    for (const element in priceList) {
      if (element['Model code'].includes(userPhone.Phone)) {
        for (const str in strs) {
          if (userPhone.Phone.includes(str)) {
            if (!element['Model code'].includes(str)) {
              break
            }
          }

          if (!userPhone.Phone.includes(str)) {
            if (element['Model code'].includes(str)) {
              break
            }
          }

          phoneDefectsPrice.push(element)
        }
      }
    }
  } else {
    for (const element in priceList) {
      console.log(element)
      if (element[1].trim() === (userPhone.Phone).trim()) {
        phoneDefectsPrice.push(element)
      }
    }
  }

  if (defects.includes('BATTERY')) {
    const prices = []
    for (const element in phoneDefectsPrice) {
      if (element['Part category'].includes('Battery')) {
        prices.push(element['Price ex tax'])
      }
    }

    if (prices.length === 0) { return false }

    // eslint-disable-next-line no-return-assign
    const sum = prices.reduce((previous, current) => current += previous)
    defectPrice += (sum / prices.length * 1.1 + 16) * 1.45
  }
  if (defects.includes('PORT')) {
    const prices = []
    for (const element in phoneDefectsPrice) {
      if (element['Part category'].includes('Connector')) {
        prices.push(element['Price ex tax'])
      }
    }

    if (prices.length === 0) { return false }

    // eslint-disable-next-line no-return-assign
    const sum = prices.reduce((previous, current) => current += previous)
    defectPrice += (sum / prices.length * 1.1 + 16) * 1.45
  }
  if (defects.includes('SCREEN')) {
    const prices = []
    for (const element in phoneDefectsPrice) {
      if (element['Part category'].includes('LCD')) {
        prices.push(element['Price ex tax'])
      }
    }

    if (prices.length === 0) { return false }

    // eslint-disable-next-line no-return-assign
    const sum = prices.reduce((previous, current) => current += previous)
    defectPrice += (sum / prices.length * 1.1 + 16) * 1.45
  }
  if (defects.includes('BACK')) {
    const prices = []
    for (const element in phoneDefectsPrice) {
      if (element['Part category'].includes('Housing') || element['Part category'].includes('Cover')) {
        prices.push(element['Price ex tax'])
      }
    }

    if (prices.length === 0) { return false }

    // eslint-disable-next-line no-return-assign
    const sum = prices.reduce((previous, current) => current += previous)
    defectPrice += (sum / prices.length * 1.1 + 16) * 1.45
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
