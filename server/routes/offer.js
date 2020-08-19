const express = require('express')
const router = express.Router()
const request = require('request')
const fbData = require('../lib/firebase')
const pickUp = require('../lib/pickUp')
const validator = require('../lib/validation')
const dhl = require('../lib/dhlShipping')
const sendMail = require('../lib/sendMail')
const firebase = require('../lib/firebase')

router.post('/getData', async function(req, res, next) {
  const userData = await fbData.getUser(req.body.uID)
  res.send({ Obj: userData })
})

router.post('/checkPickUp', function(req, res, next) {
  const uID = req.body.uID
  const token = req.body.Token

  if (token === undefined || req.body['g-recaptcha-response'] === '' || token === null) {
    return res.status(500).send({ responseError: 'Please select captcha first' })
  }

  const verificationURL = 'https://www.google.com/recaptcha/api/siteverify?secret=' + process.env.RECAPTCHA_SECRET_KEY + '&response=' + token + '&remoteip=' + req.connection.remoteAddress

  request(verificationURL, async(err, response, body) => {
    if (err) {
      console.log(err)
      return res.send({ responseError: err })
    }

    body = JSON.parse(body)

    if (body.success !== undefined && !body.success) {
      console.log('Failed captcha verification error:' + body)
      return res.status(500).send({ responseError: 'Failed captcha verification' })
    }

    const location = await pickUp.checkPickUp(req.body.Adress)

    if (location === undefined || location === false) {
      console.log('location undefined')
      res.status(500).end()
    } else {
      fbData.setUserLocation(uID, location)
      res.send({
        location,
      })
    }
  })
})

router.post('/validatePaymentData', (req, res) => {
  let result

  if (req.body.PaymentMethod === 'PayPal') {
    result = validator.validateEmail(req.body.PaymentData)
  } else if (req.body.PaymentMethod === 'Überweisung') {
    result = validator.validateIBAN(req.body.PaymentData)
  }

  res.send({
    Result: result,
  })
})

router.post('/checkPersonalDataIsAvaible', async(req, res) => {
  try {
    const formData = await firebase.getPersonalDataForForm(req.body.uID)
    res.send({ formData })
  } catch (error) {
    res.status(500).end(error)
  }
})

router.post('/updatePersonalData', async(req, res) => {
  try {
    await firebase.setPersonalData(req.body.data, req.body.location, req.body.uID)
    res.send()
  } catch (error) {
    res.status(500).end(error)
  }
})

router.post('/accept', (req, res) => {
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
      console.log('Failed captcha verification error:' + body)
      return res.status(500).send({ responseError: 'Failed captcha verification' })
    }

    const userLocation = await fbData.getUser(req.body.uID)
    if (userLocation === false) { return res.status(500).send({ responseError: 'Failed to get User data' }) }
    try {
      const parcel = await dhl.createReturnParcel(req.body.uID, req.body.data, userLocation.Location)
      if (!parcel) { return res.status(500).send({ responseError: 'error while creating parcel' }) }
      req.body.data.TransportData = parcel
    } catch (error) {
      return res.status(500).send({ responseError: error, message: 'Failed creating parcel label' })
    }

    await fbData.setOfferAccept(req.body.uID, req.body.data)
    sendMail.sendOfferAcceptMail(req.body.uID, req.body.data)
    res.send({ Obj: 'done' })
  })
})

module.exports = router
