const { Router } = require('express')
const firebase = require('../lib/firebase')
const stripe = require('../lib/stripePayment')
const paypal = require('../lib/payPalPayment')
const dhl = require('../lib/dhlShipping')

const router = Router()

function asyncHelper(fn) {
  return function(req, res, next) {
    fn(req, res, next).catch(next)
  }
}

router.post('/createCheckoutSession', asyncHelper(async(req, res) => {
  const userData = await firebase.getUser(req.body.uId, true)
  if (userData.State === 'offer') {
    const sessionID = await stripe.createCheckoutSession(userData.repairData, userData.ID)
    const payPalSession = await paypal.createCheckoutSession(userData.repairData, userData.ID)
    res.send({ session_id: sessionID, payPalSession })
  } else {
    throw new Error('User in wrong state')
  }
}))

router.post('/checkSuccess', asyncHelper(async(req, res) => {
  const user = await firebase.getUser(req.body.uId, true)

  if (user.State === 'shipping') {
    return res.send()
  }
  if (user.sessionCode === req.body.sessionCode) {
    const parcel = await dhl.createReturnParcel(req.body.uId, user.data, user.Location)
    await firebase.setPaymentSucessful(req.body.uId, parcel)
    res.send()
  } else {
    throw new Error('sessionCodes are not the same')
  }
}))

router.post('/checkPayPalTransaction', asyncHelper(async(req, res) => {
  const orderID = req.body.orderID
  const repair = await firebase.getShippmentData(req.body.uId, true)
  const success = await paypal.capturePayPalTransaction(orderID, repair)
  if (success) {
    const parcel = await dhl.createReturnParcel(req.body.uId, repair, repair.Location)
    await firebase.setPaymentSucessful(req.body.uId, parcel)
    res.send()
  }
}))

module.exports = router
