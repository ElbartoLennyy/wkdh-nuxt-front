const admin = require('firebase-admin')
const serviceAccount = require('../../firebase-account.json')
const helper = require('./helper')

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
    let deleteDoc = db.collection('DEV').doc(id).delete()
        .then(() => {
            _callback();
        })
}
*/

async function creatNewUser(id) {
  const docRequest = db.collection('request').doc(id)
  const docUser = db.collection('DEV').doc(id)

  let data

  await docRequest.get()
    .then((doc) => {
      if (!doc.exists) {
        // console.log('No such document!');
      } else {
        data = (doc.data())
        const phone = data.phone
        docUser.set({
          Date: getCurrentDate(),
          ID: id,
          Price: data.Price,
          State: 'offer',
          phone,
        })
      }
    })

  deletePriceRequest(id)
  return id
}

function setRejectNewOffer(uID) {
  const docRequest = db.collection('DEV').doc(uID)

  docRequest.set({
    Date: getCurrentDate(),
    ID: uID,
    State: 'reject/newOffer',
  })
}

async function setOfferAccept(uID, data) {
  const docRequest = db.collection('DEV').doc(uID)

  data.Location.latitude = helper.convertToSafeString(data.Location.latitude.toString())
  data.Location.longitude = helper.convertToSafeString(data.Location.longitude.toString())
  data.Location.streetName = helper.convertToSafeString(data.Location.streetName)
  data.Location.streetNumber = helper.convertToSafeString(data.Location.streetNumber)

  data.Name = helper.convertToSafeString(data.Name)
  data.FirstName = helper.convertToSafeString(data.FirstName)

  data.PaymentData = helper.convertToSafeString(data.PaymentData)

  await docRequest.update({
    Date: getCurrentDate(),
    ID: uID,
    State: data.TransportType,
    data,
  })

  return true
}

async function getShippmentData(uID) {
  const refUser = db.collection('DEV').doc(uID)
  const user = await refUser.get()

  if (user.data().State === 'shipping') {
    return user.data()
  }
  return false
}

async function getUser(uID) {
  const refUser = db.collection('DEV').doc(uID)

  const user = await refUser.get()

  if (user.data().State === 'offer') {
    return user.data()
  } else if (user.data().State === 'shipping' || user.data().State === 'pickUp') {
    return { State: user.data().State }
  }
  return false
}

async function getNewOffer(uID) {
  // console.log(uID)
  const refUser = db.collection('DEV').doc(uID)

  const user = await refUser.get()

  if (user.data().State === 'newOffer') {
    return user.data()
  }
  return false
}

async function setReturn(uID) {
  const docRequest = db.collection('DEV').doc(uID)

  await docRequest.update({
    Date: getCurrentDate(),
    ID: uID,
    State: 'return',
  })
  return true
}

module.exports = { /* deleteUser, */ getUser, setRejectNewOffer, setReturn, setOfferAccept, getNewOffer, getShippmentData, uploadPriceRequest, deletePriceRequest, creatNewUser }
