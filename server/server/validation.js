const IBAN = require('iban')

function validateEmail (mail) {
  // TODO: Use an npm package instead of this RegEx
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(mail)
}

function validateIBAN (iban) {
  return IBAN.isValid(iban)
}

module.exports = { validateEmail, validateIBAN }
