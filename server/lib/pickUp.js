const util = require('util')
const Distance = require('geo-distance')
const firebase = require('./firebase')
const geocoder = require('./geocoder')

checkPickUp({
  Adress: 'Azaleenweg 11',
  PLZ: ' 02827',
  City: 'Görlitz',
})

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
  if (avaibleCouriers.length === 0) {
    return { location: userGeoLocation, pickUpData: false }
  } else if (avaibleCouriers.length >= 1) {
    generateAllPossibleTimes(avaibleCouriers)
    return { location: userGeoLocation, pickUpData: avaibleCouriers }
  }
}

function generateAllPossibleTimes(times) {
  console.log(util.inspect(times, false, null, true /* enable colors */))

  const startTimes = {}

  for (const courierTimes of times) {
    for (const day in courierTimes.pickUpTimes) {
      for (const slot of courierTimes.pickUpTimes[day]) {
        const starts = []
        const startHour = new Date(slot.start).getHours()
        const startMinute = new Date(slot.start).getMinutes()
        const endHour = new Date(slot.end).getHours()
        const endMinute = new Date(slot.end).getMinutes()

        for (let h = startHour; h < endHour; h++) {
          const exclude00 = h === startHour && startMinute === 30
          if (!exclude00) {
            starts.push([h, 0])
          }

          const exclude30 = h === (endHour - 1) && endMinute !== 30
          if (!exclude30) {
            starts.push([h, 30])
          }
        }

        for (const start in starts) {
          starts[start].push(courierTimes.cId)
        }

        if (startTimes[day] === undefined) {
          startTimes[day] = starts
        } else {
          for (const times of startTimes[day]) {
            console.log(times)
          }
        }
      }
    }
  }
  // console.log(util.inspect(startTimes, false, null, true /* enable colors */))
}

module.exports = { checkPickUp }
