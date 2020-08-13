const express = require('express')
const logger = require('morgan')

const app = express()

app.get('/user/:userId/label.pdf', require('./routes/label'))

const api = express.Router()
app.use('/api', api)

api.use(logger('dev'))
api.use(express.json())
api.use(express.urlencoded({ extended: false }))

api.use('/handy', require('./routes/request'))
api.use('/offer', require('./routes/offer'))
api.use('/newOffer', require('./routes/newOffer'))
api.use('/repair', require('./routes/repair'))
api.use('/checkout', require('./routes/checkout'))

module.exports = app
