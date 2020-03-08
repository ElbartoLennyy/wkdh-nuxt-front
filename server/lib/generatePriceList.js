const fs = require('fs')
const Ebay = require('ebay-node-api')
const phones = require('../data/priceListPhones')
//const phonesData = require('./phones')

//const storages = [8, 16, 32, 64, 128, 256, 512]

const ebay = new Ebay({
  clientID: process.env.EBAY_CLIENT_ID,
  clientSecret: process.env.EBAY_CLIENT_SECRET,
  headers: { // optional
    'X-EBAY-C-MARKETPLACE-ID': 'EBAY_DE',
  },
  body: {
    grant_type: 'client_credentials',
    scope: 'https://api.ebay.com/oauth/api_scope',
  },
})

async function generatePriceList() {
  const phoneList = []
  let priceList = []

  for (const phone of phones) {
    const currentPhone = {
      Brand: phone.Brand,
      Phone: phone.Phone,
      Storage: phone.Storage,
    }

    phoneList.push(currentPhone)
  }
  /*
  phonesData.brands.forEach((brand) => {
    phonesData.phones[brand].phones.forEach((phone) => {
      storages.forEach((storage) => {
        const currentPhone = {
          Brand: brand,
          Phone: phone,
          Storage: storage,
        }

        phoneList.push(currentPhone)
      })
    })
  })
*/
  priceList = await processArray(phoneList)

  fs.writeFile('AAAAA.json', JSON.stringify(priceList, null, '  '), function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log('File written!')
    }
  })
}

async function processArray(phoneList) {
  const priceList = []

  for (const phone of phoneList) {
    console.log(`Processing ${phone.Brand} ${phone.Phone}:`)
    try {
      phone.Price = await generatePrice(phone)
      if (phone.Price >= 50) { priceList.push(phone) }
    } catch {
      console.log('FAILED!')
    }
  }

  return priceList
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
  await ebay.getAccessToken()

  return JSON.parse(await ebay.searchItems({
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
  }))
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
