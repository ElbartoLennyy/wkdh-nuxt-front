'use strict'

/**
 *
 * PayPal Node JS SDK dependency
 */
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk')

/**
 *
 * Returns PayPal HTTP client instance with environment that has access
 * credentials context. Use this instance to invoke PayPal APIs, provided the
 * credentials have access.
 */
function client() {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment())
}

/**
 *
 * Set up and return PayPal JavaScript SDK environment with PayPal access credentials.
 * This sample uses SandboxEnvironment. In production, use LiveEnvironment.
 *
 */
function environment() {
  const clientId = process.env.NUXT_ENV_PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET

  if (process.env.IS_PRODUCTION === 'true') {
    return new checkoutNodeJssdk.core.LiveEnvironment(
      clientId, clientSecret,
    )
  } else {
    return new checkoutNodeJssdk.core.SandboxEnvironment(
      clientId, clientSecret,
    )
  }
}

async function prettyPrint(jsonData, pre = '') {
  let pretty = ''
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }
  for (const key in jsonData) {
    // eslint-disable-next-line no-prototype-builtins
    if (jsonData.hasOwnProperty(key)) {
      if (isNaN(key)) { pretty += pre + capitalize(key) + ': ' } else { pretty += pre + (parseInt(key) + 1) + ': ' }
      if (typeof jsonData[key] === 'object') {
        pretty += '\n'
        pretty += await prettyPrint(jsonData[key], pre + '    ')
      } else {
        pretty += jsonData[key] + '\n'
      }
    }
  }
  return pretty
}

module.exports = { client, prettyPrint }
