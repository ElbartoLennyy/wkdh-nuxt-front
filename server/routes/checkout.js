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

module.exports = router
