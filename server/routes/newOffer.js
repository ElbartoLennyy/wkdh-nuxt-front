const express = require('express')
const router = express.Router()
const fbData = require('../lib/firebase')

router.post('/getData', function(req, res, next) {
  fbData.getNewOffer(req.body.uID, (obj) => {
    res.send({ Obj: obj })
  })
})

router.post('/accept', function(req, res, next) {
  fbData.setCheckDone(req.body.uID, () => {
    res.send({ Obj: 'done' })
  })
})

router.post('/return', function(req, res, next) {
  fbData.setReturn(req.body.uID, () => {
    res.send({ Obj: 'done' })
  })
})

module.exports = router
