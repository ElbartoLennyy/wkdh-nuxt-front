const util = require('util')
const Distance = require('geo-distance')
const firebase = require('./firebase')
const geocoder = require('./geocoder')

async function checkPickUp(userLocation) {
  const userGeoLocation = await geocoder.validateAddress(userLocation)

  if (userGeoLocation === false) {
    return userGeoLocation
  }

  const couriers = await firebase.getCourierData(userGeoLocation.city)

  const avaibleCouriers = []
  for (const courier of couriers) {
    const userCoordinates = {
      lat: userGeoLocation.latitude,
      lon: userGeoLocation.longitude,
    }
    const distance = Distance.between(courier.location, userCoordinates)
    if (distance <= Distance('5 km')) {
      courier.location = distance.radians
      avaibleCouriers.push(courier)
    }
  }

  avaibleCouriers.sort((a, b) => {
    return a.location.distance - b.location.distance
  })
  console.log(util.inspect(avaibleCouriers, false, null, true /* enable colors */))

  if (avaibleCouriers.length === 0) {
    return { location: userGeoLocation, pickUpData: false }
  } else if (avaibleCouriers.length >= 1) {
    return { location: userGeoLocation, pickUpData: avaibleCouriers }
  }
}

module.exports = { checkPickUp }
