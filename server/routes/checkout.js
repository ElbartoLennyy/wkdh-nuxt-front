const { Router } = require('express')
const firebase = require('../lib/firebase')
const stripe = require('../lib/stripePayment')

const router = Router()

router.post('/createCheckoutSession', async(req, res) => {
  try {
    const userData = await firebase.getRepairOffer(req.body.uId)
    if (userData !== false) {
      const sessionID = await stripe.createCheckoutSession(userData.repairData, userData.ID)
      res.send({ session_id: sessionID })
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
        await firebase.setPaymentSucessful(req.body.uId)
        res.status(200).end()
      }
    } else {
      res.status(500).send({ error: true, errorMsg: 'Can´t get sessionCode for user' })
    }
  } catch (error) {
    res.status(500).send({ error: true, errorMsg: error })
  }
})

module.exports = router
