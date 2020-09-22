const express = require('express')
const router = express.Router()
const fbData = require('../lib/firebase')
const validator = require('../lib/validation')
const dhl = require('../lib/dhlShipping')
const sendMail = require('../lib/sendMail')
const firebase = require('../lib/firebase')
const geocoder = require('../lib/geocoder')
const recaptchaVerification = require('../lib/recaptchaVerfication')

function asyncHelper(fn) {
  return function(req, res, next) {
    fn(req, res, next).catch(next)
  }
}

router.post('/getData', asyncHelper(async function(req, res, next) {
  const userData = await fbData.getUser(req.body.uID)
  res.send({ userData })
}))

router.post('/validateAdress', asyncHelper(async function(req, res, next) {
  const uID = req.body.uID

  const location = await geocoder.validateAddress(req.body.Adress)

  if (location === undefined || location === false) {
    throw new Error('location undefined')
  } else {
    await fbData.setUserLocation(uID, location)
    res.send({
      location,
    })
  }
}))

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

router.post('/accept', recaptchaVerification, asyncHelper(async(req, res) => {
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

module.exports = router
