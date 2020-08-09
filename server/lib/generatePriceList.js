require('dotenv')
const util = require('util')
const fs = require('fs')
const Ebay = require('ebay-node-api')
// const phones = require('../data/priceListPhones')
const phonesData = require('./data/phones')

// const storages = [8, 16, 32, 64, 128, 256, 512]

const ebay = new Ebay({
  clientID: 'Wirkaufe-Wirkaufe-PRD-9caa423c9-9449eac1',
  clientSecret: 'PRD-aec7700b6da9-d300-4bbe-9137-2fc6',
  headers: { // optional
    'X-EBAY-C-MARKETPLACE-ID': 'EBAY_DE',
  },
  body: {
    grant_type: 'client_credentials',
    scope: 'https://api.ebay.com/oauth/api_scope',
  },
})

generatePriceList()

async function generatePriceList() {
  const phonesJson = phonesData.phones
  /*
  for (const brand of phonesData.brands) {
    phonesJson[brand] = {}
    for (const phone of phonesData.phones[brand].phones) {
      phonesJson[brand][phone] = {}
      for (const storage of storages) {
        phonesJson[brand][phone][storage] = { price: 0 }
      }
    }
  }
  console.log(phonesJson)
*/
  const newPhonePriceList = await processArray(phonesJson)
  console.log(newPhonePriceList)

  fs.writeFile('AAAAA.json', JSON.stringify(newPhonePriceList), function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log('File written!')
    }
  })
}

async function processArray(phoneList) {
  for (const brand in phoneList) {
    for (const phone in phoneList[brand]) {
      for (const storage in phoneList[brand][phone]) {
        const currentPhone = {
          Brand: brand,
          Phone: phone,
          Storage: storage,
        }
        console.log(`Processing ${currentPhone.Brand} ${currentPhone.Phone}:`)
        try {
          currentPhone.Price = await generatePrice(currentPhone)
          console.log(currentPhone.Price)
          if (currentPhone.Price >= 50) {
            phoneList[brand][phone][storage] = { price: currentPhone.Price }
          } else {
            delete phoneList[brand][phone][storage]
          }
          console.log(util.inspect(phoneList[brand][phone][storage], false, null, true /* enable colors */))
        } catch (error) {
          delete phoneList[brand][phone][storage]
          console.log(error)
          console.log('FAILED!')
        }
      }
      console.log(util.inspect(phoneList[brand][phone], false, null, true /* enable colors */))
    }
    console.log(util.inspect(phoneList[brand], false, null, true /* enable colors */))
    fs.writeFile('AAAAA.json', JSON.stringify(phoneList), function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log('File written!')
      }
    })
  }

  return phoneList
}

async function generatePrice(phone) {
  const priceArray = []

  const ebayData = await getEbayData(phone)
  for (const item of ebayData.itemSummaries) {
    if (checkTitle(item.title, phone)) {
      console.log(item.title)

      const price = parseInt(item.price.value)

      if (!(Number.isNaN(price)) && price !== undefined && price != null) {
        priceArray.push(Math.round(price))
      }
    }
  }

  return optimisePriceArray(priceArray)
}

async function getEbayData(phone) {
  // await ebay.getAccessToken()
  try {
    await ebay.getAccessToken()
    const ebayResponse = await ebay.searchItems({
      keyword: `${phone.Brand} ${phone.Phone} ${phone.Storage}Gb`,
      categoryId: 9355,
      limit: '50',
      filter: {
        itemLocationCountry: 'DE',
        price: '[50..800]',
        priceCurrency: 'EUR',
        conditionIds: '{5000|3000|4000}',
        buyingOptions: '{FIXED_PRICE}',
      },
      aspect_filter: {
        categoryId: 9355,
        Brand: '{' + phone.Brand + '}',
        Storage: '{' + phone.Storage + '}',
      },
    })

    return JSON.parse(ebayResponse)
  } catch (error) {
    try {
      await ebay.getAccessToken()
      const ebayResponse = await ebay.searchItems({
        keyword: `${phone.Brand} ${phone.Phone} ${phone.Storage}Gb`,
        categoryId: 9355,
        limit: '50',
        filter: {
          itemLocationCountry: 'DE',
          price: '[50..800]',
          priceCurrency: 'EUR',
          conditionIds: '{5000|3000|4000}',
          buyingOptions: '{FIXED_PRICE}',
        },
        aspect_filter: {
          categoryId: 9355,
          Brand: '{' + phone.Brand + '}',
          Storage: '{' + phone.Storage + '}',
        },
      })

      return JSON.parse(ebayResponse)
    } catch (error) {

    }
  }
}

function checkTitle(title, phoneData) {
  const phoneTitle = (phoneData.Brand + ' ' + phoneData.Phone + ' ' + phoneData.Storage).toLowerCase()
  title = title.toLowerCase()

  const str = ['plus', '+', '16', '32', '64', '128', '256', '512', 'neu', 'pro', 'max', 'glasbruch', 'displayschaden', 'defekt', 'sprung', 'bruch', 'riss', 'starke kratzer', 'tiefe kratzer', 'edge', 'beschädigt']

  for (let i = 0; i < str.length; i++) {
    if (phoneTitle.includes(str[i])) {
      if (!title.includes(str[i])) {
        return false
      }
    }

    if (!phoneTitle.includes(str[i])) {
      if (title.includes(str[i])) {
        return false
      }
    }
  }
  return true
}

function optimisePriceArray(priceArray) {
  if (priceArray.length <= 5) { return false }

  // eslint-disable-next-line no-return-assign
  let sum = priceArray.reduce((previous, current) => current += previous)
  const avg = sum / priceArray.length

  const lowEnd = avg - avg * 0.3
  const highEnd = avg + avg * 0.3
  const finalPriceArray = []

  priceArray.forEach((element) => {
    if (lowEnd < element && highEnd > element) {
      finalPriceArray.push(element)
    }
  })
  console.log(finalPriceArray)

  // eslint-disable-next-line no-return-assign
  sum = finalPriceArray.reduce((previous, current) => current += previous)
  return sum / finalPriceArray.length
}

module.exports = { generatePriceList }
