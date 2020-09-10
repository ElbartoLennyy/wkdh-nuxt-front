require('dotenv')
const util = require('util')
const fs = require('fs')
const Ebay = require('ebay-node-api')
const convert = require('xml-js')
const axios = require('axios')
const phonesData = require('./data/phones')

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

  const newPhonePriceList = await processArray(phonesJson)
  console.log(newPhonePriceList)

  fs.writeFile('data/phones.json', JSON.stringify(newPhonePriceList), function(err) {
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
          currentPhone.price = await generatePricePhonAvaible(currentPhone)
          console.log(currentPhone.price)
          if (currentPhone.price >= 160) {
            phoneList[brand][phone][storage] = { price: currentPhone.price }
          } else if (currentPhone.price < 160 && currentPhone.price >= 50) {
            currentPhone.price = await generatePricePhoneSold(currentPhone)
            if (currentPhone.price < 30) {
              delete phoneList[brand][phone][storage]
            } else {
              phoneList[brand][phone][storage] = { price: currentPhone.price }
            }
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
    fs.writeFile('old.json', JSON.stringify(phoneList), function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log('File written!')
      }
    })
  }

  return phoneList
}

async function generatePricePhonAvaible(phone) {
  const priceArray = []

  const ebayRes = await getResPhoneAvaible(phone)

  for (const item of ebayRes.itemSummaries) {
    if (checkTitle(item.title, phone)) {
      let price = null
      if (item.price.value !== undefined && item.shippingOptions !== undefined) {
        price = parseInt(item.price.value) + parseInt(item.shippingOptions[0].shippingCost.value)
      }

      if (!(Number.isNaN(price)) && price !== undefined && price != null) {
        priceArray.push(Math.round(price))
      }
    }
  }
  console.log(optimisePriceArray(priceArray))
  return optimisePriceArray(priceArray)
}

async function getResPhoneAvaible(phone) {
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
        SoldItemsOnly: true,
        limit: '200',
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

async function generatePricePhoneSold(phone) {
  const priceArray = []

  const ebayRes = await getResPhonesSold(phone)

  for (const item of ebayRes.findCompletedItemsResponse.searchResult.item) {
    try {
      const endTimeAgo = (new Date()) - new Date(item.listingInfo.endTime._text)
      if (checkTitle(item.title._text, phone) && item.sellingStatus.currentPrice._attributes.currencyId === 'EUR' && endTimeAgo < 1209600000 && item.globalId._text === 'EBAY-DE') {
        console.log(item.title._text)

        const price = parseInt(item.sellingStatus.currentPrice._text) + parseInt(item.shippingInfo.shippingServiceCost._text)

        if (!(Number.isNaN(price)) && price !== undefined && price != null) {
          priceArray.push(Math.round(price))
        }
      }
    } catch (error) {
      console.error(error)
      console.log(util.inspect(item, false, null, true /* enable colors */))
    }
  }

  console.log(optimisePriceArray(priceArray))
  return optimisePriceArray(priceArray)
}

async function getResPhonesSold(phone) {
  const axiosConfig = {
    headers: {
      'Content-Type': 'text/xml',
      'X-EBAY-SOA-SECURITY-APPNAME': 'Wirkaufe-Wirkaufe-PRD-9caa423c9-9449eac1',
      'X-EBAY-SOA-OPERATION-NAME': 'findCompletedItems',
      'X-EBAY-SOA-GLOBAL-ID': 'EBAY-DE',
    },
  }

  const request = {
    _declaration: {
      _attributes: {
        version: '1.0',
        encoding: 'UTF-8',
      },
    },
    findCompletedItemsRequest: {
      _attributes: {
        xmlns: 'http://www.ebay.com/marketplace/search/v1/services',
      },
      keywords: {
        _text: `${phone.Brand} ${phone.Phone} ${phone.Storage}GB`,
      },
      categoryId: {
        _text: '9355',
      },
      buyingOptions: {
        _text: 'FIXED_PRICE',
      },
      itemLocationCountry: {
        _text: 'DE',
      },
      itemFilter: [
        {
          name: {
            _text: 'Condition',
          },
          value: {
            _text: '5000|3000|4000',
          },
        },
        {
          name: {
            _text: 'SoldItemsOnly',
          },
          value: {
            _text: 'true',
          },
        },
      ],
      paginationInput: {
        entriesPerPage: {
          _text: '200',
        },
      },
    },
  }

  const requestXml = convert.json2xml(request, { compact: true, spaces: 4 })

  try {
    const res = await axios.post('https://svcs.ebay.com/services/search/FindingService/v1', requestXml, axiosConfig)
    const resJson = convert.xml2json(res.data, { compact: true, spaces: 0 })

    return JSON.parse(resJson)
  } catch (error) {
    console.error(error)
  }
}

function checkTitle(title, phoneData) {
  const phoneTitle = (phoneData.Brand + ' ' + phoneData.Phone + ' ' + phoneData.Storage).toLowerCase()
  title = title.toLowerCase()

  const str = ['plus', '6s', '+', '16', '32', '64', '128', '256', '512', 'neu', 'pro', 'max', 'glasbruch', 'displayschaden', 'defekt', 'sprung', 'bruch', 'riss', 'starke kratzer', 'tiefe kratzer', 'edge',
    'beschädigt', '2016', '2017', '2018', '2019', ' 8 ', ' 6 ', ' S10e ', ' S10 ', ' mini ']

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
  if (priceArray.length <= 4) { return false }

  // eslint-disable-next-line no-return-assign
  let sum = priceArray.reduce((previous, current) => current += previous)
  const avg = sum / priceArray.length

  const lowEnd = avg - avg * 0.5
  const highEnd = avg + avg * 0.5
  const finalPriceArray = []

  priceArray.forEach((element) => {
    if (lowEnd < element && highEnd > element) {
      finalPriceArray.push(element)
    }
  })

  // eslint-disable-next-line no-return-assign
  sum = finalPriceArray.reduce((previous, current) => current += previous)
  return sum / finalPriceArray.length
}
module.exports = { generatePriceList }
