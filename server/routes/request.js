const express = require('express')
const request = require('request')
const fbData = require('../lib/firebase')
const phonesData = require('../lib/phones')
const priceCalc = require('../lib/calcUserOffer')
const router = express.Router()

router.post('/getData', function(req, res, next) {
  if (req.body.Stage === 0) {
    return res.send(phonesData.brands)
  } else if (req.body.Stage === 1) {
    const brand = req.body.Brand
    return res.send(phonesData.phones[brand])
  }

  return res.sendStatus(400)
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
      fbData.uploadPriceRequest(price, currentPhone, (requestID) => {
        res.send({
          Price: price,
          RequestID: requestID,
        })
      })
    }
  })
})

router.post('/accept', function(req, res, next) {
  fbData.creatNewUser(req.body.ReqID, () => {
    res.send({
      Status: 'done',
    })
  })
})

router.post('/reject', function(req, res, next) {
  fbData.deletePriceRequest(req.body.ReqID, () => {
    res.send({
      Status: 'done',
    })
  })
})

module.exports = router
