require('dotenv').config()
const noma = require('nodemailer')

const formatDate = require('date-fns/format')
const deLocale = require('date-fns/locale/de')

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

function sendOfferAcceptMail(uID, userDetails) {
  let date = new Date()
  const currentDate = date
  date.setDate(date.getDate() + 7)
  date = formatDate(date, 'PPPP', { locale: deLocale })
  sendMail({
    from: 'info@wirkaufendeinhandy.shop',
    to: userDetails.Email,
    subject: 'Auftragsbestätigung - Versandt von deinem Handy',
    text: `Sehe alle Details über die Abholung: https://wirkaufendeinhandy.shop/user/${uID}`,
    html: `<div class="header" style="padding-block-end: 2rem;display: flex;flex-wrap: nowrap;">
    <img src="cid:wkdh-logo" style="max-width: 30%;height: auto;object-fit: scale-down;">
    <div class="text-left" style="text-align: right;min-width: 70%;">
        <p class="email" style="font-family: Arial, Helvetica, sans-serif;color: blue;text-decoration: underline;">
            ${userDetails.Email}
        </p>


        <p style="font-family: Arial, Helvetica, sans-serif;">${currentDate}</p>
    </div>
</div>

<h1 style="font-family: Arial, Helvetica, sans-serif;color: orange;">Deine Auftragsbestätigung</h1>

<h2 style="font-family: Arial, Helvetica, sans-serif;">Hey ${userDetails.FirstName},</h2>

<p style="font-family: Arial, Helvetica, sans-serif;">hiermit bestätigen wir dir den Eingang deiner Ankaufsanfrage für dein Handy.</p>

<p style="font-family: Arial, Helvetica, sans-serif;">Du hast bei deiner Versandmethode gewählt, dass du uns dein Gerät via Post zusendest.
    Den Versandschein um dein Gerät zu versenden findest als PDF Datei auf unserer Website. <a href="https://wirkaufendeinhandy.shop/user/${uID}">Folge einfach dem Link</a></p>

<p style="font-family: Arial, Helvetica, sans-serif;">Dein Geld überweisen wir dir nach erfolgreichem Check deines Geräts automatisch auf dein
    angegebenes Konto.</p>

<p style="font-family: Arial, Helvetica, sans-serif;">Wir freuen uns bereits auf dein Gerät und bitten darum, dass du uns dein Gerät spätestens
    bis zum ${date} losschickst.</p>

<p style="font-family: Arial, Helvetica, sans-serif;">Hättest du kurz 30 Sekunden, um uns <a href="https://surveys.hotjar.com/s?siteId=1716177&surveyId=156379">drei
        Fragen zu beantworten?</a> </p>

<p style="font-family: Arial, Helvetica, sans-serif;">Falls du noch Fragen haben solltest oder gewisse Angaben falsch sein sollten kontaktiere
    uns doch bitte einfach via Mail an kontakt@wirkaufendeinhandy.shop.</p>

<p style="font-family: Arial, Helvetica, sans-serif;">Bitte denke daran vor dem Versand dein Handy zurückzusetzen.</p>

<h3 style="font-family: Arial, Helvetica, sans-serif;">Bis bald und alles Gute,<br>
    Alex von Wirkaufendeinhandy.shop</h3>

    <hr>

    <div class="footer" style="text-align: center;font-size: small;">
        <p style="font-family: Arial, Helvetica, sans-serif;">© 2020 Wirkaufendeinhandy GbR</p>
        <p style="font-family: Arial, Helvetica, sans-serif;">
          <a href="https://wirkaufendeinhandy.shop/imprint">
            Impressum
          </a> | <a href="https://wirkaufendeinhandy.shop/privacy">
            Datenschutz
          </a> | <a href="https://wirkaufendeinhandy.shop/agb">
            AGB
          </a>
        </p>
      </div>`,
    attachments: [{
      filename: 'Logo-new-1000.png',
      path: `${__dirname}/../../assets/img/icons/Logo-new-1000.png`,
      cid: 'wkdh-logo', // same cid value as in the html img src
    }],
  })
}

// E:\User\Alex\Dokumente\code\js\wkdh-nuxt-front\assets\img\icons\Logo-new-1000.png
// E:\User\Alex\Dokumente\code\js\wkdh-nuxt-front\server\lib\assets\img\icons\Logo-new-1000.png
module.exports = { sendOfferAcceptMail }
