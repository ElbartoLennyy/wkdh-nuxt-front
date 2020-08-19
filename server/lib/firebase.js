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

const FieldValue = admin.firestore.FieldValue

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

async function setUserLocation(uID, location) {
  const docRequest = db.collection(dbReference).doc(uID)

  await docRequest.update({
    Location: location,
  })
  return true
}

async function getShippmentData(uID) {
  const refUser = db.collection(dbReference).doc(uID)
  const user = await refUser.get()
  if (user.data() !== undefined) {
    if (user.data().State === 'shipping') {
      return (user.data().data.TransportData)
    }
  } else {
    const repairUser = db.collection(`${dbReference}Repair`).doc(uID)
    const repair = await repairUser.get()
    if (repair.data() !== undefined) {
      if (repair.data().State === 'shipping') {
        return (repair.data().TransportData)
      }
    }
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

async function getPersonalDataForForm(uId) {
  const docUser = db.collection(dbReference).doc(uId)

  try {
    let userData = await docUser.get()
    userData = userData.data()

    if (userData.personalDataIsAvaible === undefined || userData.personalDataIsAvaible === false) {
      return false
    } else if (userData.personalDataIsAvaible && userData.State === 'offer') {
      return { userdata: userData.data, location: userData.Location }
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

async function setPersonalData(data, Location, uId) {
  const docUser = db.collection(dbReference).doc(uId)

  try {
    let userData = await docUser.get()
    userData = userData.data()

    if (userData.State === 'offer') {
      await docUser.update({
        personalDataIsAvaible: true,
        data,
      })
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}
// REPAIR --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

async function createRepairOffer(repairData) {
  const uId = helper.getRandomId()

  const docRepair = db.collection(`${dbReference}Repair`).doc(uId)

  try {
    await docRepair.set({
      Date: getCurrentDate(),
      ID: uId,
      State: 'offer',
      repairData,
    })
  } catch (error) {
    console.log(error)
    return false
  }
  return uId
}

async function getRepairOffer(uId) {
  const docRepair = db.collection(`${dbReference}Repair`).doc(uId)

  try {
    let repairOffer = await docRepair.get()
    repairOffer = repairOffer.data()
    if (repairOffer.State === 'offer' || repairOffer.State === 'shipping') {
      return repairOffer
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

async function getPersonalDataForFormRepair(uId) {
  const docUser = db.collection(`${dbReference}Repair`).doc(uId)

  try {
    let userData = await docUser.get()
    userData = userData.data()

    if (userData.personalDataIsAvaible === undefined || userData.personalDataIsAvaible === false) {
      return false
    } else if (userData.personalDataIsAvaible && userData.State === 'offer') {
      return { userdata: userData.data, location: userData.Location }
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

async function setPersonalDataRepair(data, uId) {
  const docUser = db.collection(`${dbReference}Repair`).doc(uId)

  try {
    let userData = await docUser.get()
    userData = userData.data()
    if (userData.State === 'offer') {
      await docUser.update({
        personalDataIsAvaible: true,
        data,
      })
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

async function setUserLocationRepair(uID, location) {
  const docRequest = db.collection(`${dbReference}Repair`).doc(uID)

  await docRequest.update({
    Location: location,
  })
  return true
}

// PAYMENT

async function createSessionCode(uId) {
  const docRequest = db.collection(`${dbReference}Repair`).doc(uId)

  const sessionCode = helper.getRandomId()

  await docRequest.update({
    sessionCode,
  })

  return sessionCode
}

function deleteSessionCode(uId) {
  const docRequest = db.collection(`${dbReference}Repair`).doc(uId)

  docRequest.update({
    sessionCode: FieldValue.delete(),

  })
}

async function getSessionCode(uId) {
  const docRequest = db.collection(`${dbReference}Repair`).doc(uId)

  try {
    const doc = await docRequest.get()

    if (doc.data().State === 'offer') {
      return doc.data().sessionCode
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}

async function setPaymentSucessful(uId, parcel) {
  deleteSessionCode(uId)

  const docRequest = db.collection(`${dbReference}Repair`).doc(uId)

  try {
    await docRequest.update({
      State: 'shipping',
      TransportData: parcel,
    })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

module.exports = { setPaymentSucessful, createSessionCode, getSessionCode, deleteSessionCode, setUserLocationRepair, setPersonalDataRepair, getPersonalDataForFormRepair, getRepairOffer, createRepairOffer, setPersonalData, getPersonalDataForForm, getUser, setRejectNewOffer, setReturn, setOfferAccept, getNewOffer, getShippmentData, uploadPriceRequest, deletePriceRequest, creatNewUser, setUserLocation, getCourierData }
