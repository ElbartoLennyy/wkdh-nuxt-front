const axios = require('axios')

async function recaptchaVerification(req, res, next) {
  const token = req.body.Token
  const ip = req.connection.remoteAddress

  if (!token) {
    return res.status(400).send('Missing reCAPTCHA token!')
  }

  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}&remoteip=${ip}`
  const { data } = await axios.get(verificationURL)

  if (data.success !== true) {
    return res.status(400).send(`reCAPTCHA verfication failed: ${data['error-codes']}`)
  }

  next()
}

module.exports = recaptchaVerification
