require('dotenv').config()
const admin = require('firebase-admin')
const serviceAccount = require('../../firebase-account.json')
const helper = require('./helper')

const dbReference = process.env.FIREBASE_DATABASE_REFERENCE

function getCurrentDate() {
  return (new Date().toISOString())
}

// console.log(getCurrentDate());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()
db.settings({ timestampsInSnapshots: true })

async function uploadPriceRequest(price, phone) {
  const id = helper.getRandomId()

  if (price.price === undefined || Number.isNaN(price.price)) { return false }

  const docRequest = db.collection('request').doc(id)
  await docRequest.set({
    Date: getCurrentDate(),
    ID: id,
    Price: price,
    phone,
  })
  return id
}

function deletePriceRequest(id) {
  db.collection('request').doc(id).delete()
}
/*
function deleteUser(id, _callback) {
    let deleteDoc = db.collection(dbReference).doc(id).delete()
        .then(() => {
            _callback();
        })
}
*/

async function creatNewUser(id) {
  const docRequest = db.collection('request').doc(id)
  const docUser = db.collection(dbReference).doc(id)

  let data
  try {
    const docData = await (await docRequest.get())
    data = docData.data()

    const phone = data.phone
    if (data.Price === undefined || Number.isNaN(data.Price)) {
      return false
    }
    await docUser.set({
      Date: getCurrentDate(),
      ID: id,
      Price: data.Price,
      State: 'offer',
      phone,
    })
  } catch (error) {
    console.log(error)
    return false
  }

  deletePriceRequest(id)
  return true
}

function setRejectNewOffer(uID) {
  const docRequest = db.collection(dbReference).doc(uID)

  docRequest.set({
    Date: getCurrentDate(),
    ID: uID,
    State: 'reject/newOffer',
  })
}

async function setOfferAccept(uID, data) {
  const docRequest = db.collection(dbReference).doc(uID)

  data.Name = helper.convertToSafeString(data.Name)
  data.FirstName = helper.convertToSafeString(data.FirstName)

  data.PaymentData = helper.convertToSafeString(data.PaymentData)

  await docRequest.update({
    Date: getCurrentDate(),
    ID: uID,
    State: 'shipping',
    data,
  })

  return true
}

async function setUserLocation(uID, location, pickUpPossible) {
  const docRequest = db.collection(dbReference).doc(uID)

  await docRequest.update({
    Location: location,
    PickUpPossible: pickUpPossible,
  })
  return true
}

async function getShippmentData(uID) {
  const refUser = db.collection(dbReference).doc(uID)
  const user = await refUser.get()

  if (user.data().State === 'shipping') {
    return user.data()
  }
  return false
}

async function getUser(uID) {
  if (uID === undefined || uID === '') { return false }

  const refUser = db.collection(dbReference).doc(uID)

  const user = await refUser.get()

  try {
    if (user.data().State === 'offer') {
      return user.data()
    } else if (user.data().State === 'shipping' || user.data().State === 'pickUp') {
      return { State: user.data().State }
    }
  } catch (error) {
    console.log(`current user: ${uID} \n error: ${error}`)
    const returnValueUser = await setTimeout(getUserAfterError(uID), 800)
    return returnValueUser
  }
}
async function getUserAfterError(uID) {
  const refUser = db.collection(dbReference).doc(uID)

  const user = await refUser.get()

  try {
    if (user.data().State === 'offer') {
      return user.data()
    } else if (user.data().State === 'shipping' || user.data().State === 'pickUp') {
      return { State: user.data().State }
    }
  } catch (error) {
    console.log(`current user: ${user} \n error: ${error}`)
  }
  return false
}

async function getNewOffer(uID) {
  // console.log(uID)
  const refUser = db.collection(dbReference).doc(uID)

  const user = await refUser.get()

  if (user.data().State === 'newOffer') {
    return user.data()
  }
  return false
}

async function setReturn(uID) {
  const docRequest = db.collection(dbReference).doc(uID)

  await docRequest.update({
    Date: getCurrentDate(),
    State: 'return',
  })
  return true
}

async function getCourierData(city) {
  try {
    const couriers = await db.collection('courier').where('location.city', '==', city).get()
    const pickUpTimes = []
    for (const courier of couriers.docs) {
      pickUpTimes.push({
        cId: courier.data().id,
        pickUpTimes: courier.data().pickUpTimes,
        location: {
          lat: courier.data().location.latitude,
          lon: courier.data().location.longitude,
        },
      })
    }
    return pickUpTimes
  } catch (error) {
    console.log(error)
    return false
  }
}

module.exports = { /* deleteUser, */ getUser, setRejectNewOffer, setReturn, setOfferAccept, getNewOffer, getShippmentData, uploadPriceRequest, deletePriceRequest, creatNewUser, setUserLocation, getCourierData }
