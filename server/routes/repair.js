const express = require('express')
const request = require('request')
const firebase = require('../lib/firebase')
const pickUp = require('../lib/pickUp')
const phonesData = require('../lib/data/mobileparts')
const router = express.Router()

router.post('/getData', function(req, res) {
  try {
    const dataArray = []
    if (req.body.Stage === 0) {
      for (const brand in phonesData.parts) {
        dataArray.push(brand)
      }
    } else if (req.body.Stage === 1) {
      for (const phone in phonesData.parts[req.body.Brand]) {
        dataArray.push(phone)
      }
    } else if (req.body.Stage === 2) {
      for (const defects in phonesData.parts[req.body.Brand][req.body.Phone]) {
        dataArray.push(defects)
      }
    }
    return res.send(dataArray)
  } catch (error) {
    console.log(error)
    res.status(500).error(error)
  }
})

router.post('/getPrice', function(req, res, next) {
  try {
    const token = req.body.token

    if (token === undefined || req.body['g-recaptcha-response'] === '' || token === null) {
      return res.status(500).send({ responseError: 'Please select captcha first' })
    }

    const verificationURL = 'https://www.google.com/recaptcha/api/siteverify?secret=' + process.env.RECAPTCHA_SECRET_KEY + '&response=' + token + '&remoteip=' + req.connection.remoteAddress

    request(verificationURL, (err, response, body) => {
      if (err) {
        console.log(err)
        return res.status(500).send({ responseError: err })
      }

      body = JSON.parse(body)

      if (body.success !== undefined && !body.success) {
        console.log('Failed captcha verification error:' + JSON.stringify(body))
        return res.status(500).send({ responseError: 'Failed captcha verification' })
      }

      res.send({ price: 200 })
    })
  } catch (error) {
    res.status(500).end(error)
  }
})

router.post('/accept', function(req, res) {
  try {
    const token = req.body.token

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

      // TODO get Price
      const price = 200

      const result = await firebase.createRepairOffer({
        brand: req.body.brand,
        phone: req.body.phone,
        defects: req.body.defects,
        price,
      })
      if (result === false) {
        res.status(500).send({ responseError: 'database upload failed' })
      } else if (result) {
        res.send({ uId: result })
      }
    })
  } catch (error) {
    res.status(500).send({ responseError: 'Failed' })
  }
})

router.post('/getRepair', async function(req, res) {
  try {
    const offer = await firebase.getRepairOffer(req.body.uId)
    if (offer !== false) {
      res.send(offer)
    }
  } catch (error) {
    console.log(error)
    res.status(500).error(error)
  }
})

router.post('/checkPersonalDataIsAvaible', async(req, res) => {
  try {
    const formData = await firebase.getPersonalDataForFormRepair(req.body.uID)
    res.send({ formData })
  } catch (error) {
    res.status(500).end(error)
  }
})

router.post('/updatePersonalData', async(req, res) => {
  try {
    const fbRes = await firebase.setPersonalDataRepair(req.body.data, req.body.uID)
    if (fbRes) {
      res.send()
    } else {
      res.status(500).end()
    }
  } catch (error) {
    res.status(500).end(error)
  }
})

router.post('/validateAdress', function(req, res, next) {
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
      firebase.setUserLocationRepair(uID, location)
      res.send({
        location,
      })
    }
  })
})

module.exports = router
