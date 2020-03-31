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
        if (data.Price === undefined || Number.isNaN(data.Price)) {
          return false
        }
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

async function setUserLocation(uID, location, pickUpPossible) {
  const docRequest = db.collection('DEV').doc(uID)

  await docRequest.update({
    Location: location,
    PickUpPossible: pickUpPossible,
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
  const refUser = db.collection('DEV').doc(uID)

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

module.exports = { /* deleteUser, */ getUser, setRejectNewOffer, setReturn, setOfferAccept, getNewOffer, getShippmentData, uploadPriceRequest, deletePriceRequest, creatNewUser, setUserLocation }
