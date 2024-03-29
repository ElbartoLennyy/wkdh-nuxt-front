const express = require('express')
const firebase = require('../lib/firebase')
const geocoder = require('../lib/geocoder')
const phonesData = require('../lib/data/mobileparts')
const repairPrice = require('../lib/repairPrice')
const recaptchaVerification = require('../lib/recaptchaVerfication')
const router = express.Router()

function asyncHelper(fn) {
  return function(req, res, next) {
    fn(req, res, next).catch(next)
  }
}

router.post('/getData', function(req, res) {
  const dataArray = []
  if (req.body.stage === 0) {
    for (const brand in phonesData.parts) {
      dataArray.push(brand)
    }
  } else if (req.body.stage === 1) {
    for (const phone in phonesData.parts[req.body.brand]) {
      dataArray.push(phone)
    }
  } else if (req.body.stage === 2) {
    for (const color of phonesData.parts[req.body.brand][req.body.phone].color) {
      dataArray.push(color)
    }
  } else if (req.body.stage === 3) {
    for (const defects in phonesData.parts[req.body.brand][req.body.phone].defects) {
      dataArray.push(defects)
    }
  }
  return res.send(dataArray)
})

router.post('/getPrice', recaptchaVerification, function(req, res, next) {
  let endPrice = 0
  for (const defect of req.body.defects) {
    endPrice += repairPrice.getRepairPrice({
      brand: req.body.brand,
      phone: req.body.phone,
      defect,
    })
  }
  endPrice = (Math.ceil(endPrice / 5) * 5) - 0.05

  res.send({ price: endPrice })
})

router.post('/accept', recaptchaVerification, asyncHelper(async(req, res) => {
  let price = 0
  for (const defect of req.body.defects) {
    price += repairPrice.getRepairPrice({
      brand: req.body.brand,
      phone: req.body.phone,
      defect,
    })
  }
  price = (Math.ceil(price / 5) * 5) - 0.05

  const uId = await firebase.createRepairOffer({
    brand: req.body.brand,
    phone: req.body.phone,
    defects: req.body.defects,
    color: req.body.color,
    price,
  })
  res.send({ uId })
}))

router.post('/getRepair', asyncHelper(async function(req, res) {
  const offer = await firebase.getUser(req.body.uId, true)
  res.send(offer)
}))

router.post('/updatePersonalData', asyncHelper(async(req, res) => {
  await firebase.setPersonalData(req.body.data, req.body.uID, true)
  res.send()
}))

router.post('/validateAdress', asyncHelper(async function(req, res, next) {
  const uID = req.body.uID

  const location = await geocoder.validateAddress(req.body.Adress)

  if (location === undefined || location === false) {
    throw new Error('location undefined')
  } else {
    await firebase.setUserLocation(uID, location, true)
    res.send({
      location,
    })
  }
}))
module.exports = router
