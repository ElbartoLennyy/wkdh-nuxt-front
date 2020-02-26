const express = require('express')
const router = express.Router()
const request = require('request')
const fbData = require('../server/fb')
const geocoder = require('../server/geocoder')
const validator = require('../server/validation')
const sendcloud = require('../server/sendcloud')

router.post('/getData', function(req, res, next) {
  res.contentType('json')

  fbData.getOffer(JSON.stringify(req.body.uID), (obj) => {
    res.status(200).send(JSON.stringify({ Obj: obj }))
  })
})

router.post('/validateAddress', function(req, res, next) {
  res.contentType('json')

  geocoder.validateAddress(req.body, (data, pickUp) => {
    if (data === 'placeError') {
      // error
    } else {
      console.log(data, 'abholung: ' + pickUp)
    }

    res.status(200).send(JSON.stringify({
      Location: data,
      PickUp: pickUp,
    }))
  })
})

router.post('/validatePaymentData', (req, res) => {
  res.contentType('json')

  let result

  if (req.body.PaymentMethod === 'PayPal') {
    result = validator.validateEmail(req.body.PaymentData)
  } else if (req.body.PaymentMethod === 'Überweisung') {
    result = validator.validateIBAN(req.body.PaymentData)
  }

  res.status(200).send(JSON.stringify({
    Result: result,
  }))
})

/*
router.post("/deleteUser", (req, res) => {
    res.contentType("json");

    fbData.deleteUser(JSON.stringify(req.body.uID), obj => {

        res.status(200).send(JSON.stringify({ Obj: obj }));
    });

})
*/

router.post('/accept', function(req, res, next) {
  res.contentType('json')

  const token = req.body.Token

  if (token === undefined || req.body['g-recaptcha-response'] === '' || token === null) {
    return res.status(500).send(JSON.stringify({ responseError: 'Please select captcha first' }))
  }

  const verificationURL = 'https://www.google.com/recaptcha/api/siteverify?secret=' + process.env.RECAPTCHA_SECRET_KEY + '&response=' + token + '&remoteip=' + req.connection.remoteAddress

  request(verificationURL, (err, response, body) => {
    if (err) {
      console.log(err)
      return res.status(500).send(JSON.stringify({ responseError: JSON.stringify(err) }))
    }

    body = JSON.parse(body)

    if (body.success !== undefined && !body.success) {
      console.log('Failed captcha verification error:' + JSON.stringify(body))
      return res.status(500).sendJSON.stringify(({ responseError: 'Failed captcha verification' }))
    }

    if (req.body.data.TransportType === 'shipping') {
      sendcloud.creatParcel(req.body.uID, req.body.data, (data) => {
        req.body.data.TransportData = data

        fbData.setOfferAccept(req.body.uID, req.body.data, () => {
          res.status(200).send(JSON.stringify({ Obj: 'done' }))
        })
      })
    } else if (req.body.data.TransportType === 'pickUp') {
      fbData.setOfferAccept(req.body.uID, req.body.data, () => {
        res.status(200).send(JSON.stringify({ Obj: 'done' }))
      })
    }
  })
})

module.exports = router
