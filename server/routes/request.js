const express = require('express')
const request = require('request')
const fbData = require('../lib/firebase')
const phonesData = require('../lib/phones')
const priceCalc = require('../lib/calcUserOffer')
const router = express.Router()

router.post('/getData', function(req, res, next) {
  const dataArray = []
  if (req.body.Stage === 0) {
    for (const brand in phonesData.phones) {
      console.log(brand)
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
  console.log(dataArray)
  return res.send(dataArray)
})

router.post('/getPrice', function(req, res, next) {
  const token = req.body.Token

  if (token === undefined || req.body['g-recaptcha-response'] === '' || token === null) {
    return res.status(500).send({ responseError: 'Please select captcha first' })
  }

  const verificationURL = 'https://www.google.com/recaptcha/api/siteverify?secret=' + process.env.RECAPTCHA_SECRET_KEY + '&response=' + token + '&remoteip=' + req.connection.remoteAddress

  request(verificationURL, async(err, response, body) => {
    if (err) {
      console.log(err)
      return res.status(500).send({ responseError: err })
    }

    body = JSON.parse(body)

    if (body.success !== undefined && !body.success) {
      console.log('Failed captcha verification error:' + JSON.stringify(body))
      return res.status(500).send({ responseError: 'Failed captcha verification' })
    }

    // const currentPhone = (helper.convertToJsonPhone(req.body)) Schauenn ob Alle in enum definiert sind

    const currentPhone = req.body
    delete currentPhone.Token

    const price = await priceCalc.getPrice(currentPhone)

    if (price === undefined || price === false) {
      res.send({
        Price: false,
      })
    } else {
      const requestID = await fbData.uploadPriceRequest(price, currentPhone)
      res.send({
        Price: price,
        RequestID: requestID,
      })
    }
  })
})

router.post('/accept', async function(req, res, next) {
  try {
    const result = await fbData.creatNewUser(req.body.ReqID)
    if (result === false) {
      res.status(500).end()
    } else if (result) {
      res.send()
    }
  } catch (error) {
    res.status(500).end()
  }
})

router.post('/reject', async function(req, res, next) {
  await fbData.deletePriceRequest(req.body.ReqID)
  res.send({
    Status: 'done',
  })
})

module.exports = router
