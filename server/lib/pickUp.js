const util = require('util')
const Distance = require('geo-distance')
const firebase = require('./firebase')

async function checkPickUp(userLocation) {
  const couriers = await firebase.getCourierData(userLocation.city)

  const avaibleCouriers = []
  for (const courier of couriers) {
    const userCoordinates = {
      lat: userLocation.latitude,
      lon: userLocation.longitude,
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
}

module.exports = { checkPickUp }
