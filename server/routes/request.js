const express = require('express')
const request = require('request')
const fb = require('../server/fb')
const priceCalc = require('../server/priceCalc')
const helper = require('../server/helper')
const router = express.Router()

const brands = {
  brands: ['Apple', 'Samsung', 'LG', 'Huawei', 'Nokia', 'HTC', 'Google', 'OnePlus', 'Sony', 'Xiaomi']
}

const phones = {
  Apple: {
    phones: ['iPhone 11 Pro Silver',
      'iPhone 11 Pro Max Silver',
      'iPhone 11 Pro Max Grey',
      'iPhone 11 Pro Max Green',
      'iPhone 11 Pro Max Gold',
      'iPhone 11 Pro Grey',
      'iPhone 11 Pro Green',
      'iPhone 11 Pro Gold',
      'iPhone 11 Yellow',
      'iPhone 11 White',
      'iPhone 11 Red',
      'iPhone 11 Purple',
      'iPhone 11 Green',
      'iPhone 11 Black',
      'iPhone Xs Space Grey',
      'iPhone Xs Silver',
      'iPhone Xs Max Space Grey',
      'iPhone Xs Max Silver',
      'iPhone Xs Max Gold',
      'iPhone Xs Gold',
      'iPhone XR Yellow',
      'iPhone XR White',
      'iPhone XR Red',
      'iPhone XR Coral',
      'iPhone XR Blue',
      'iPhone XR Black',
      'iPhone X Silver',
      'iPhone X Black',
      'iPhone 8 Silver',
      'iPhone 8 Plus Silver',
      'iphone 8 Plus Red',
      'iphone 8 Plus Gold',
      'iPhone 8 Plus Black',
      'iPhone 8 Gold',
      'iPhone 8 Black',
      'iPhone 7 Silver',
      'iPhone 7 Rose Gold',
      'iPhone 7 Red',
      'iPhone 7 Plus Silver',
      'iPhone 7 Plus Rose Gold',
      'iPhone 7 Plus Jet Black',
      'iPhone 7 Plus Gold',
      'iPhone 7 Plus Black',
      'iPhone 7 Jet Black',
      'iPhone 7 Gold',
      'iPhone 7 Black',
      'iPhone 6S Space Grey',
      'iPhone 6S Silver',
      'iPhone 6S Rose gold',
      'iPhone 6S Plus Space grey',
      'iPhone 6S Plus Silver',
      'iPhone 6S Plus Rose gold',
      'iPhone 6S Plus Gold',
      'iPhone 6S Gold',
      'iPhone 6 Space grey',
      'iPhone 6 Silver',
      'iPhone 6 Plus Space grey',
      'iPhone 6 Plus Silver',
      'iPhone 6 Plus Gold',
      'iPhone 6 Gold',
      'iPhone SE Space Grey',
      'iPhone SE Silver',
      'iPhone SE Rose Gold',
      'iPhone SE Gold'
    ]
  },
  Samsung: {
    phones: [
      'Galaxy S10 Plus',
      'Galaxy S10',
      'Galaxy S10e',
      'Galaxy S9 Plus',
      'Galaxy S9',
      'Galaxy S8 Plus',
      'Galaxy S8',
      'Galaxy S7 Edge',
      'Galaxy S7',
      'Galaxy S6 Edge Plus',
      'Galaxy S6 Edge',
      'Galaxy S6',
      'Galaxy S5 Plus',
      'Galaxy S5 Neo',
      'Galaxy S5 mini',
      'Galaxy S5 activ',
      'Galaxy S5',
      'Galaxy Note 10 Plus 5G',
      'Galaxy Note 10 Plus',
      'Galaxy Note 10 Lite',
      'Galaxy Note 10',
      'Galaxy Note 9',
      'Galaxy Note 8 Duos',
      'Galaxy Note 8',
      'Galaxy Note 7',
      'Galaxy Note 5',
      'Galaxy Note 4 Edge',
      'Galaxy Note 4',
      'Galaxy Note 3 Neo Duos',
      'Galaxy Note 3 Neo',
      'Galaxy Note 3',
      'Galaxy Note 2 LTE',
      'Galaxy Note 2',
      'Galaxy Note',
      'Galaxy Grand Prime 4G',
      'Galaxy Grand Prime',
      'Galaxy Grand 2 Dual',
      'Galaxy Alpha',
      'Galaxy A90 5G',
      'Galaxy A9 (2018)',
      'Galaxy A80',
      'Galaxy A8 Plus (2018)',
      'Galaxy A8 (2018)',
      'Galaxy A70s',
      'Galaxy A70',
      'Galaxy A7 (2018)',
      'Galaxy A7',
      'Galaxy A60',
      'Galaxy A6 Plus (2018)',
      'Galaxy A6 (2018)',
      'Galaxy A50s',
      'Galaxy A50',
      'Galaxy A5 (2017)',
      'Galaxy A5 (2016)',
      'Galaxy A5',
      'Galaxy A40',
      'Galaxy A30s',
      'Galaxy A30',
      'Galaxy A3 (2017)',
      'Galaxy A3 (2016)',
      'Galaxy A3',
      'Galaxy A20s',
      'Galaxy A20e',
      'Galaxy A20',
      'Galaxy A10s',
      'Galaxy A10'
    ]

  },
  LG: {
    phones: ['V30',
      'V20',
      'V10',
      'Q8',
      'Optimus G',
      'Nexus 5X',
      'Nexus 5',
      'L Bello',
      'K8',
      'K7 Titan',
      'K7',
      'K10',
      'G6 Platinum',
      'G6',
      'G5 Titan',
      'G5',
      'G4c',
      'G3s',
      'G3',
      'G2 mini ',
      'G2'
    ]
  },
  Nokia: {
    phones: ['Nokia 9 PureView',
      'Nokia 8',
      'Nokia 7.2',
      'Nokia 7 Steel',
      'Nokia 7 Plus',
      'Nokia 7',
      'Nokia 6',
      'Nokia 5 Plus',
      'Nokia 5 Copper',
      'Nokia 5',
      'Nokia 4',
      'Nokia 3.2 Steel',
      'Nokia 3.2',
      'Nokia 3',
      'Nokia 2.2 Steel',
      'Nokia 2.2'
    ]

  },
  HTC: {
    phones: ['Desire 12s', 'U12 life', 'U12+', 'Desire 12/12+', 'U11 life', 'U11+', 'U11']
  },
  Huawei: {
    phones: ['P30 Pro',
      'P30 lite',
      'P30',
      'P20 Pro',
      'P20 Lite',
      'P20',
      'P10 Plus',
      'P10 Lite',
      'P10',
      'P9 Lite',
      'P9',
      'P8 Lite 2017',
      'P8 Lite',
      'P8',
      'Mate 20 Pro',
      'Mate 20 Lite',
      'Mate 20',
      'Mate 10 Pro',
      'Mate 10 Lite',
      'Mate 10',
      'Mate 9',
      'P Smart Plus',
      'P Smart (2019)',
      'P Smart',
      'Y7 (2018)',
      'Y6 (2018)',
      'Nova 3',
      'Nova 2',
      'Nova',
      'Honor 8'
    ]

  },
  Google: {
    phones: [
      'Pixel 2',
      'Pixel 2 XL',
      'Pixel 3',
      'Pixel 3 XL',
      'Pixel 3A XL',
      'Pixel 4',
      'Pixel 4 XL'
    ]
  },
  OnePlus: {
    phones: ['7 Pro Nebula',
      '7 Pro Almond',
      '7 Mirror',
      '6T Mirror',
      '6T Midnight',
      '6T',
      '6 Rose',
      '6',
      '5T',
      '5',
      '3T',
      '3'
    ]

  },
  Sony: {
    phones: ['Xperia Z5 Premium Dual Chrome',
      'Xperia Z5 Premium Dual',
      'Xperia Z5 Premium Chrome',
      'Xperia Z5 Premium',
      'Xperia Z5 Green',
      'Xperia Z5 Dual Green',
      'Xperia Z5 Dual',
      'Xperia Z5 Compact Yellow',
      'Xperia Z5 Compact',
      'Xperia Z5',
      'Xperia Z3 Plus Dual Copper',
      'Xperia Z3 Plus Dual',
      'Xperia Z3 Plus Copper',
      'Xperia Z3 Plus',
      'Xperia Z3 Dual Copper',
      'Xperia Z3 Dual',
      'Xperia Z3 Copper',
      'Xperia Z3 Compact Orange',
      'Xperia Z3 Compact Green',
      'Xperia Z3 Compact',
      'Xperia Z3  green',
      'Xperia Z3',
      'Xperia Z2',
      'Xperia XZ3 Green',
      'Xperia XZ3',
      'Xperia XZ2 Green',
      'Xperia XZ2 Compact Green',
      'Xperia XZ2 Compact',
      'Xperia XZ2',
      'Xperia XZ1 Compact ',
      'Xperia XZ1',
      'Xperia XZ Premium ',
      'Xperia XZ Dual ',
      'Xperia XZ',
      'Xperia XA2 Ultra',
      'Xperia XA2 Plus Green',
      'Xperia XA2 Plus ',
      'Xperia XA2',
      'Xperia XA1 Ultra ',
      'Xperia XA1',
      'Xperia XA Rose',
      'Xperia XA Lime',
      'Xperia XA Dual Lime',
      'Xperia XA Dual',
      'Xperia XA',
      'Xperia X Performance Rose',
      'Xperia X Performance',
      'Xperia X Lime',
      'Xperia X Compact',
      'Xperia X',
      'Xperia M4 Aqua',
      'Xperia L3',
      'Xperia L2',
      'Xperia 5',
      'Xperia 10 Plus Navy',
      'Xperia 10 Plus',
      'Xperia 10 Navy',
      'Xperia 10',
      'Xperia 1',
      'Xperia XZ2 Compact'
    ]

  },
  Xiaomi: {
    phones: ['mi Note 5A Prime',
      'mi Note 5A',
      'mi Note 4',
      'Mi A2 Lite',
      'Mi 9 Lite',
      'mi 6A',
      'Mi 6',
      'mi 5A',
      'mi 5',
      'mi 4 (4X)'
    ]
  }

}

router.post('/getData', function (req, res, next) {
  if (req.body.Stage === 0) {
    return res.send(brands)
  } else if (req.body.Stage === 1) {
    const brand = req.body.Brand
    return res.send(phones[brand])
  }

  return res.sendStatus(400)
})

router.post('/getPrice', function (req, res, next) {
  res.contentType('json')

  const token = req.body.Token

  if (token === undefined || req.body['g-recaptcha-response'] === '' || token === null) {
    return res.status(500).send(JSON.stringify({ responseError: 'Please select captcha first' }))
  }

  const verificationURL = 'https://www.google.com/recaptcha/api/siteverify?secret=' + process.env.RECAPTCHA_SECRET_KEY + '&response=' + token + '&remoteip=' + req.connection.remoteAddress

  request(verificationURL, (err, response, body) => {
    if (err) {
      console.log(err)
      return res.status(500).send(JSON.stringify({ responseError: JSON.stringify(err) }))
    }

    body = JSON.parse(body)

    if (body.success !== undefined && !body.success) {
      console.log('Failed captcha verification error:' + JSON.stringify(body))
      return res.status(500).sendJSON.stringify(({ responseError: 'Failed captcha verification' }))
    }

    const currentPhone = (helper.convertToJsonPhone(req.body))

    priceCalc.getPrice(currentPhone, (price) => {
      if (price === undefined || price === false) {
        res.status(200).send(JSON.stringify({
          Price: false
        }))
      } else {
        fb.uploadPriceRequest(price, currentPhone, (requestID) => {
          res.status(200).send(JSON.stringify({
            Price: price,
            RequestID: requestID
          }))
        })
      }
    })
  })
})

router.post('/accept', function (req, res, next) {
  res.contentType('json')

  fb.creatNewUser(req.body.ReqID, () => {
    res.status(200).send(JSON.stringify({
      Status: 'done'
    }))
  })
})

router.post('/reject', function (req, res, next) {
  res.contentType('json')

  fb.deletePriceRequest(req.body.ReqID, () => {
    res.status(200).send(JSON.stringify({
      Status: 'done'
    }))
  })
})

module.exports = router
