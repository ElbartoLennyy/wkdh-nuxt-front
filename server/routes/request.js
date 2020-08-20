const express = require('express')
const request = require('request')
const fbData = require('../lib/firebase')
const phonesData = require('../lib/data/phones')
const priceCalc = require('../lib/calcUserOffer')
const router = express.Router()

function asyncHelper(fn) {
  return function(req, res, next) {
    fn(req, res, next).catch(next)
  }
}

router.post('/getData', function(req, res, next) {
  const dataArray = []
  if (req.body.Stage === 0) {
    for (const brand in phonesData.phones) {
      dataArray.push(brand)
    }
  } else if (req.body.Stage === 1) {
    for (const phone in phonesData.phones[req.body.Brand]) {
      dataArray.push(phone)
    }
  } else if (req.body.Stage === 2) {
    for (const storage in phonesData.phones[req.body.Brand][req.body.Phone]) {
      dataArray.push(storage)
    }
  }
  return res.send(dataArray)
})

router.post('/getPrice', function(req, res, next) {
  const token = req.body.Token

  if (token === undefined || req.body['g-recaptcha-response'] === '' || token === null) {
    throw new Error('Please select captcha first')
  }

  const verificationURL = 'https://www.google.com/recaptcha/api/siteverify?secret=' + process.env.RECAPTCHA_SECRET_KEY + '&response=' + token + '&remoteip=' + req.connection.remoteAddress

  request(verificationURL, asyncHelper(async(err, response, body) => {
    if (err) {
      throw new Error(err)
    } else {
      body = JSON.parse(body)

      if (body.success !== undefined && !body.success) {
        throw new Error('Failed captcha verification')
      }

      const currentPhone = req.body
      delete currentPhone.Token

      const price = await priceCalc.getPrice(currentPhone)

      if (price === undefined || price === false) {
        throw new Error('no price avaible')
      } else {
        const requestID = await fbData.uploadPriceRequest(price, currentPhone)
        res.send({
          Price: price,
          RequestID: requestID,
        })
      }
    }
  }))
})

router.post('/accept', asyncHelper(async function(req, res, next) {
  await fbData.creatNewUser(req.body.reqID)
  res.send()
}))

router.post('/reject', asyncHelper(async function(req, res, next) {
  await fbData.deletePriceRequest(req.body.reqID)
  res.send()
}))
module.exports = router
