const noma = require('nodemailer')

const addHours = require('date-fns/addHours')
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

const sendTestMail = message => sendMail(message, true)

const timeFormat = new Intl.DateTimeFormat([], {
  hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin',
})

function sendOfferAcceptMail(uID, userDetails, userLocation) {
  if (userDetails.TransportType === 'pickUp') {
    const startDate = new Date(userDetails.TransportData.time)
    const endDate = addHours(startDate, 1)
    const formattedDay = formatDate(startDate, 'PPPP', { locale: deLocale })
    const formattedStartTime = timeFormat.format(startDate)
    const formattedEndTime = timeFormat.format(endDate)

    sendMail({
      from: 'info@wirkaufendeinhandy.shop',
      to: userDetails.Email,
      subject: 'Auftragsbestätigung - Abholung von deinem Handy',
      text: `Hey ${userDetails.FirstName}, hiermit bestätigen wir dir den Eingang deiner Ankaufsanfrage für dein Handy.
      Du hast bei deiner Versandmethode gewählt, dass einer unserer Boten dein Gerät am
      ${formattedDay} zwischen ${formattedStartTime}
      und ${formattedEndTime} bei dir Zuhause, ${userLocation.Place} ${userLocation.Adress}, abholen
      soll.`,
      html: `<h2>Hey ${userDetails.FirstName},</h2>

      <p>hiermit bestätigen wir dir den Eingang deiner Ankaufsanfrage für dein Handy.</p>
      
      <p>Du hast bei deiner Versandmethode gewählt, dass einer unserer Boten dein Gerät am
      <strong>${formattedDay}</strong> zwischen <strong>${formattedStartTime}</strong>
      und <strong>${formattedEndTime}</strong> bei dir Zuhause, ${userLocation.Place} ${userLocation.Adress}, abholen
      soll.</p>
      
      <p>Dein Geld überweisen wir dir nach erfolgreichem Check deines Geräts automatisch auf dein
      angegebenes Konto.</p>
      
      <p>Wir freuen uns bereits auf dein Gerät und bitten darum, dass du zu dem genannten Zeitraum
      bitte bei dir Zuhause bist.</p>

      <p>Hättest du kurz 30 Sekunden, um uns <a href="https://surveys.hotjar.com/s?siteId=1716177&surveyId=156379">drei Fragen zu beantworten?</a>  </p>
      
      <p>Falls du noch Fragen haben solltest oder gewisse Angaben falsch sein sollten kontaktiere
      uns doch bitte einfach via Mail an <a href="mailto:kontakt@wirkaufendeinhandy.shop">kontakt@wirkaufendeinhandy.shop.</a></p>

      <p>Bitte denke daran vor der Abholung dein Handy zurückzusetzen.</p>
      
      <h3>Bis bald und alles Gute,<br>
      Alex von Wirkaufendeinhandy.shop</h3>`,
    })
  } else if (userDetails.TransportType === 'shipping') {
    let date = new Date()
    date.setDate(date.getDate() + 7)
    date = formatDate(date, 'PPPP', { locale: deLocale })
    sendMail({
      from: 'info@wirkaufendeinhandy.shop',
      to: userDetails.Email,
      subject: 'Auftragsbestätigung - Versandt von deinem Handy',
      text: `Sehe alle Details über die Abholung: https://wirkaufendeinhandy.shop/user/${uID}`,
      html: `<h2>Hey ${userDetails.FirstName},</h2>

      <p>hiermit bestätigen wir dir den Eingang deiner Ankaufsanfrage für dein Handy.</p>
      
      <p>Du hast bei deiner Versandmethode gewählt, dass du uns dein Gerät via Post zusendest.
      Den Versandschein um dein Gerät zu versenden findest als PDF Datei auf unserer Website. <a href='https://wirkaufendeinhandy.shop/user/${uID}'>Folge einfach dem Link</a></p>
      
      <p>Dein Geld überweisen wir dir nach erfolgreichem Check deines Geräts automatisch auf dein
      angegebenes Konto.</p>
      
      <p>Wir freuen uns bereits auf dein Gerät und bitten darum, dass du uns dein Gerät spätestens
      bis zum ${date} losschickst.</p>

      <p>Hättest du kurz 30 Sekunden, um uns <a href="https://surveys.hotjar.com/s?siteId=1716177&surveyId=156379">drei Fragen zu beantworten?</a>  </p>
      
      <p>Falls du noch Fragen haben solltest oder gewisse Angaben falsch sein sollten kontaktiere
      uns doch bitte einfach via Mail an kontakt@wirkaufendeinhandy.shop.</p>

      <p>Bitte denke daran vor dem Versand dein Handy zurückzusetzen.</p>
      
      <h3>Bis bald und alles Gute,<br>
      Alex von Wirkaufendeinhandy.shop</h3>`,
    })
  }
}

module.exports = { sendOfferAcceptMail }
