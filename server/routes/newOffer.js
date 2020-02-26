const express = require('express')
const router = express.Router()
const fbData = require('../server/fb')

router.post('/getData', function (req, res, next) {
  res.contentType('json')

  fbData.getNewOffer(JSON.stringify(req.body.uID), (obj) => {
    res.status(200).send(JSON.stringify({ Obj: obj }))
  })
})

router.post('/accept', function (req, res, next) {
  res.contentType('json')

  fbData.setCheckDone(JSON.stringify(req.body.uID), () => {
    res.status(200).send(JSON.stringify({ Obj: 'done' }))
  })
})

router.post('/return', function (req, res, next) {
  res.contentType('json')

  fbData.setReturn(JSON.stringify(req.body.uID), () => {
    res.status(200).send(JSON.stringify({ Obj: 'done' }))
  })
})

module.exports = router
