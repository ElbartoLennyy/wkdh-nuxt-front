const { Router } = require('express')
const firebase = require('../lib/firebase')
const stripe = require('../lib/stripePayment')
const paypal = require('../lib/payPalPayment')
const dhl = require('../lib/dhlShipping')

const router = Router()

router.post('/createCheckoutSession', async(req, res) => {
  try {
    const userData = await firebase.getRepairOffer(req.body.uId)
    if (userData !== false) {
      const sessionID = await stripe.createCheckoutSession(userData.repairData, userData.ID)
      const payPalSession = await paypal.createCheckoutSession(userData.repairData, userData.ID)
      res.send({ session_id: sessionID, payPalSession })
    } else {
      res.status(500).send({ error: true, errorMsg: 'Can´t get userdata' })
    }
  } catch (error) {
    res.status(500).send({ error: true, errorMsg: error })
  }
})

router.post('/checkSuccess', async(req, res) => {
  try {
    const sessionCode = await firebase.getSessionCode(req.body.uId)

    if (sessionCode !== false) {
      if (sessionCode === req.body.sessionCode) {
        const data = await firebase.getRepairOffer(req.body.uId)
        const parcel = await dhl.createReturnParcel(req.body.uId, data, data.Location)
        if (!parcel) { return res.status(500).send({ responseError: 'error while creating parcel' }) }

        await firebase.setPaymentSucessful(req.body.uId, parcel)
        res.status(200).end()
      }
    } else {
      res.status(500).send({ error: true, errorMsg: 'Can´t get sessionCode for user' })
    }
  } catch (error) {
    res.status(500).send({ error: true, errorMsg: error })
  }
})

router.post('/checkPayPalTransaction', async(req, res) => {
  const orderID = req.body.orderID
  try {
    const repair = await firebase.getRepairOffer(req.body.uId)
    const success = await paypal.capturePayPalTransaction(orderID, repair)
    if (success) {
      const parcel = await dhl.createReturnParcel(req.body.uId, repair, repair.Location)
      if (!parcel) { return res.status(500).send({ responseError: 'error while creating parcel' }) }

      await firebase.setPaymentSucessful(req.body.uId, parcel)
    }
    res.send(success)
  } catch (error) {
    res.status(500).send({ error: true, errorMsg: error })
  }
})

module.exports = router
