const fs = require('fs')
const Ebay = require('ebay-node-api')
const phonesData = require('./phones')

const storages = [8, 16, 32, 64, 128, 256, 512]

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

  phonesData.brands.brands.forEach((brand) => {
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

  priceList = await processArray(phoneList)

  const file = fs.createWriteStream('array.txt')
  priceList.forEach(function(v) { file.write(v) })
  file.end()
}

async function processArray(phoneList) {
  const priceList = []

  phoneList.forEach(async(currentPhone) => {
    currentPhone.Price = await generatePrice(currentPhone)
    priceList.push(currentPhone)
  })

  return priceList
}

async function generatePrice(phone) {
  return 200
}

module.exports = { generatePriceList }

