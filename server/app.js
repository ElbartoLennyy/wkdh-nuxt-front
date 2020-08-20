const express = require('express')
const logger = require('morgan')

const app = express()

app.get('/user/:userId/label.pdf', require('./routes/label'))
app.get('/user/:userId/label.png', require('./routes/qr'))

const api = express.Router()
app.use('/api', api)

api.use(logger('dev'))
api.use(express.json())
api.use(express.urlencoded({ extended: false }))

api.use('/handy', require('./routes/request'))
api.use('/offer', require('./routes/offer'))
api.use('/repair', require('./routes/repair'))
api.use('/checkout', require('./routes/checkout'))

app.use((error, req, res, next) => {
  console.log(error)
  res.status(500).json({
    message: error.message,
    info: 'Internal Server Error - try again or contact the support uner https://wirkaufendeinhandy.shop/contactUs',
  })
})

module.exports = app
