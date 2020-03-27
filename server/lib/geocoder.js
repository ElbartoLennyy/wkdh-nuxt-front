const NodeGeocoder = require('node-geocoder')
const Distance = require('geo-distance')

const Zentrum = {
  lat: 51.149588,
  lon: 14.985929,
}
const dustin = {
  lat: 51.043529,
  lon: 13.736304,
}

async function validateAddress(place) {
  const placeString = place.Adress + ' ' + place.PLZ + ' ' + place.Place

  const geocoder = NodeGeocoder({
    provider: 'google',
    apiKey: process.env.GOOGLE_API_KEY,
  })

  const res = await geocoder.geocode(placeString)
  try {
    if (res[0].extra === undefined) { return false }
    if (res[0].extra.confidence >= 4) {
      return false
    }
  } catch (error) {
    return false
  }

  if (res[0].streetName === undefined || res[0].streetName === '') { return false }
  if (res[0].streetNumber === undefined || res[0].streetNumber === '') { return false }
  if (res[0].zipcode === undefined || res[0].zipcode === '') { return false }
  if (res[0].city === undefined || res[0].city === '') { return false }
  if (res[0].countryCode !== 'DE') { return false }
  if (res[0].latitude === undefined || res[0].latitude === '') { return false }
  if (res[0].longitude === undefined || res[0].longitude === '') { return false }

  delete res[0].extra
  delete res[0].administrativeLevels
  console.log(res)
  return { location: res[0], pickUp: checkPickUpDistance(res[0]) }
}

function checkPickUpDistance(data) {
  const userPlace = {
    lat: data.latitude,
    lon: data.longitude,
  }

  const aToB = Distance.between(Zentrum, userPlace)

  if (aToB <= Distance('5 km')) {
    return true
  } else if (Distance.between(dustin, userPlace) <= Distance('5 km')) {
    return true
  } else {
    return false
  }
}

module.exports = { validateAddress }
