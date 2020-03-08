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

function validateAddress(place, _callback) {
  const placeString = place.Adress + ' ' + place.HouseNumber + ' ' + place.PLZ + ' ' + place.Place

  const geocoder = NodeGeocoder({
    provider: 'opencage',
    apiKey: process.env.OPENCAGE_API_KEY,
  })

  // eslint-disable-next-line handle-callback-err
  geocoder.geocode(placeString, function(err, res) {
    if (res[0] === undefined) {
      _callback('placeError')
      return
    }

    if (res[0].extra.confidence >= 6) {
      _callback(res[0], checkPickUpDistance(res[0]))
    } else {
      _callback('placeError')
    }
  })
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
