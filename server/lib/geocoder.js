require('dotenv').config()

const NodeGeocoder = require('node-geocoder')

async function validateAddress(place) {
  const placeString = place.Adress + ' ' + place.PLZ + ' ' + place.Place

  const geocoder = NodeGeocoder({
    provider: 'google',
    apiKey: process.env.GOOGLE_API_KEY,
  })

  const res = await geocoder.geocode(placeString)
  if (res[0].extra === undefined) { throw new Error('location not found') }
  if (res[0].extra.confidence >= 4) {
    throw new Error('location not confident')
  }

  if (res[0].streetName === undefined || res[0].streetName === '') { throw new Error('streetName not found') }
  if (res[0].streetNumber === undefined || res[0].streetNumber === '') { throw new Error('streetNumber not found') }
  if (res[0].zipcode === undefined || res[0].zipcode === '') { throw new Error('zipcode not found') }
  if (res[0].city === undefined || res[0].city === '') { throw new Error('city not found') }
  if (res[0].countryCode !== 'DE') { throw new Error('countryCode not DE') }
  if (res[0].latitude === undefined || res[0].latitude === '') { throw new Error('latitude not found') }
  if (res[0].longitude === undefined || res[0].longitude === '') { throw new Error('longitude not found') }

  delete res[0].extra
  delete res[0].administrativeLevels
  return res[0]
}

module.exports = { validateAddress }
