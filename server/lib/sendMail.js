const noma = require('nodemailer')

const testTransport = noma.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: `${process.env.ETHEREAL_USERNAME}@ethereal.email`,
    pass: process.env.ETHEREAL_PASSWORD,
  },
  pool: true,
})

const realTransport = noma.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  pool: true,
  secure: true,
})

function sendMail(message, test = false) {
  return new Promise((resolve, reject) => {
    const transport = test ? testTransport : realTransport

    transport.sendMail(message, (error, info) => {
      if (error) {
        return reject(error)
      }

      if (test) {
        console.log('Preview URL: %s', noma.getTestMessageUrl(info))
      }

      resolve()
    })
  })
}

const sendTestMail = (message) => sendMail(message, true)

function sendOfferAcceptMail(uID, email, shippingType) {
  sendMail({
    from: 'info@wirkaufendeinhandy.shop',
    to: email,
    // TODO: Insert actual email copy
    subject: 'Details über die Abholung',
    text: `Sehe alle Details über die Abholung: https://wirkaufendeinhandy.shop/user/${uID}`,
    html: `<p><a href='https://wirkaufendeinhandy.shop/user/${uID}'>Sehe alle Details über die Abholung</a></p>`,
  })
}

module.exports = { sendOfferAcceptMail }
