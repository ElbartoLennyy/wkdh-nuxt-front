const express = require('express')
const router = express.Router()
const request = require('request')
const fbData = require('../lib/firebase')
const validator = require('../lib/validation')
const dhl = require('../lib/dhlShipping')
const sendMail = require('../lib/sendMail')
const firebase = require('../lib/firebase')
const geocoder = require('../lib/geocoder')
function asyncHelper(fn) {
  return function(req, res, next) {
    fn(req, res, next).catch(next)
  }
}

router.post('/getData', asyncHelper(async function(req, res, next) {
  const userData = await fbData.getUser(req.body.uID)
  res.send({ userData })
}))

router.post('/validateAdress', function(req, res, next) {
  const uID = req.body.uID
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

      const location = await geocoder.validateAddress(req.body.Adress)

      if (location === undefined || location === false) {
        throw new Error('location undefined')
      } else {
        await fbData.setUserLocation(uID, location)
        res.send({
          location,
        })
      }
    }
  }))
})

router.post('/validatePaymentData', (req, res) => {
  let result

  if (req.body.PaymentMethod === 'PayPal') {
    result = validator.validateEmail(req.body.PaymentData)
  } else if (req.body.PaymentMethod === 'Überweisung') {
    result = validator.validateIBAN(req.body.PaymentData)
  }

  res.send({
    result,
  })
})

router.post('/updatePersonalData', asyncHelper(async(req, res) => {
  await firebase.setPersonalData(req.body.data, req.body.uID)
  res.send()
}))

router.post('/accept', (req, res) => {
  const token = req.body.Token

  if (token === undefined || req.body['g-recaptcha-response'] === '' || token === null) {
    throw new Error('Please select captcha first')
  }

  const verificationURL = 'https://www.google.com/recaptcha/api/siteverify?secret=' + process.env.RECAPTCHA_SECRET_KEY + '&response=' + token + '&remoteip=' + req.connection.remoteAddress

  request(verificationURL, asyncHelper(async(err, response, body) => {
    if (err) {
      throw new Error(err)
    }

    body = JSON.parse(body)

    if (body.success !== undefined && !body.success) {
      throw new Error('Failed captcha verification')
    }

    const userLocation = await fbData.getUser(req.body.uID)
    if (userLocation === false) {
      throw new Error('Failed to get User data')
    }
    const parcel = await dhl.createReturnParcel(req.body.uID, req.body.data, userLocation.Location)
    req.body.data.TransportData = parcel

    await fbData.setOfferAccept(req.body.uID, req.body.data)
    sendMail.sendOfferAcceptMail(req.body.uID, req.body.data)
    res.send()
  }))
})

module.exports = router
