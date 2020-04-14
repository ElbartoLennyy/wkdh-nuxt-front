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
      courier.location.distance = distance
      avaibleCouriers.push(courier)
    }
  }
  console.log(JSON.stringify(avaibleCouriers))
}

module.exports = { checkPickUp }
