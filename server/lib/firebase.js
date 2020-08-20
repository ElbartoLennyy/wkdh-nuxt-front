require('dotenv').config()
const admin = require('firebase-admin')
const serviceAccount = require('../../firebase-account.json')
const helper = require('./helper')

const dbReference = process.env.FIREBASE_DATABASE_REFERENCE

function getCurrentDate() {
  return (new Date().toISOString())
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()
db.settings({ timestampsInSnapshots: true })

const FieldValue = admin.firestore.FieldValue

// update/set Methods Repair / User ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

async function uploadPriceRequest(price, phone) {
  const id = helper.getRandomId()

  if (price.price === undefined || Number.isNaN(price.price)) { throw new Error('price in NaN') }

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

  const docData = await (await docRequest.get())
  const data = docData.data()

  const phone = data.phone
  if (data.Price === undefined || Number.isNaN(data.Price)) {
    throw new Error('price is not a number')
  }
  await docUser.set({
    Date: getCurrentDate(),
    ID: id,
    Price: data.Price,
    State: 'offer',
    phone,
  })

  deletePriceRequest(id)
}

async function setOfferAccept(uID, data) {
  const docRequest = db.collection(dbReference).doc(uID)

  await docRequest.update({
    Date: getCurrentDate(),
    State: 'shipping',
    data,
  })
}

async function setUserLocation(uId, location, isRepair = false) {
  let docUser
  if (isRepair) {
    docUser = db.collection(`${dbReference}Repair`).doc(uId)
  } else {
    docUser = db.collection(dbReference).doc(uId)
  }

  let userData = await docUser.get()
  userData = userData.data()

  if (userData.State === 'offer') {
    await docUser.update({
      Location: location,
    })
  } else {
    throw new Error('cant set location - User not in offer')
  }
}

async function setPersonalData(data, uId, isRepair = false) {
  let docUser
  if (isRepair) {
    docUser = db.collection(`${dbReference}Repair`).doc(uId)
  } else {
    docUser = db.collection(dbReference).doc(uId)
  }

  let userData = await docUser.get()
  userData = userData.data()

  if (userData.State === 'offer') {
    await docUser.update({
      personalDataIsAvaible: true,
      data,
    })
  } else {
    throw new Error('not allowed to update Data')
  }
}

async function createRepairOffer(repairData) {
  const uId = helper.getRandomId()

  const docRepair = db.collection(`${dbReference}Repair`).doc(uId)

  await docRepair.set({
    Date: getCurrentDate(),
    ID: uId,
    State: 'offer',
    repairData,
  })

  return uId
}

// Get Methods Repair / User ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
  throw new Error('can´t get shipping data - user is not defined ')
}

async function getUser(uId, isRepair = false) {
  let docUser
  if (isRepair) {
    docUser = db.collection(`${dbReference}Repair`).doc(uId)
  } else {
    docUser = db.collection(dbReference).doc(uId)
  }

  const user = await docUser.get()

  if (user.data().State === 'offer') {
    return user.data()
  } else if (user.data().State === 'shipping') {
    return { State: user.data().State }
  } else {
    throw new Error('Forbidden to access user')
  }
}

// Payment ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
  const doc = await docRequest.get()

  return doc.data().sessionCode
}

async function setPaymentSucessful(uId, parcel) {
  deleteSessionCode(uId)

  const docRequest = db.collection(`${dbReference}Repair`).doc(uId)

  await docRequest.update({
    State: 'shipping',
    TransportData: parcel,
  })
}

module.exports = { setPaymentSucessful, createSessionCode, getSessionCode, deleteSessionCode, createRepairOffer, setPersonalData, getUser, setOfferAccept, getShippmentData, uploadPriceRequest, deletePriceRequest, creatNewUser, setUserLocation }
