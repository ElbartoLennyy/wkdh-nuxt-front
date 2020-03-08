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

function uploadPriceRequest(price, phone, _callback) {
  const id = helper.getRandomId()

  const docRequest = db.collection('request').doc(id)

  docRequest.set({
    Date: getCurrentDate(),
    ID: id,
    Price: price,
    phone,
  }).then(() => {
    _callback(id)
  })
}

function deletePriceRequest(id, _callback) {
  db.collection('request').doc(id).delete()
    .then(() => {
      _callback()
    })
}
/*
function deleteUser(id, _callback) {
    let deleteDoc = db.collection('userPhone').doc(id).delete()
        .then(() => {
            _callback();
        })
}
*/

function creatNewUser(id, _callback) {
  const docRequest = db.collection('request').doc(id)
  const docUser = db.collection('userPhone').doc(id)

  let data

  docRequest.get()
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
        }).then(() => {
          deletePriceRequest(id)
          _callback()
        })
      }
    })
    .catch((err) => {
      console.log('Error getting document', err)
    })
}

function setRejectNewOffer(uID) {
  const docRequest = db.collection('userPhone').doc(uID)

  docRequest.set({
    Date: getCurrentDate(),
    ID: uID,
    State: 'reject/newOffer',
  })
}

function setOfferAccept(uID, data, _callback) {
  const docRequest = db.collection('userPhone').doc(uID)

  data.Location.latitude = helper.convertToSafeString(data.Location.latitude.toString())
  data.Location.longitude = helper.convertToSafeString(data.Location.longitude.toString())
  data.Location.streetName = helper.convertToSafeString(data.Location.streetName)
  data.Location.streetNumber = helper.convertToSafeString(data.Location.streetNumber)

  data.Name = helper.convertToSafeString(data.Name)
  data.FirstName = helper.convertToSafeString(data.FirstName)

  data.PaymentData = helper.convertToSafeString(data.PaymentData)

  docRequest.update({
    Date: getCurrentDate(),
    ID: uID,
    State: data.TransportType,
    data,
  })
    .then(() => {
      _callback()
    })
}

function getData(uID, _callback) {
  const refUser = db.collection('userPhone').doc(uID)

  refUser.get()
    .then((doc) => {
      if (!doc.exists) {
        // console.log('No such document!');
      } else {
        const data = (doc.data())
        _callback(data)
      }
    })
}

function getOffer(uID, _callback) {
  // console.log(uID)
  const refUser = db.collection('userPhone').doc(uID)

  let data

  refUser.get()
    .then((doc) => {
      if (!doc.exists) {
        // console.log('No such document!');
      } else {
        data = (doc.data())
        // TODO: Consider security implications of returning offer object outside of "offer" state
        _callback(data)
      }
    })
}

function getNewOffer(uID, _callback) {
  // console.log(uID)
  const refUser = db.collection('userPhone').doc(uID)
  const refPhone = refUser.collection('phone').doc('request')
  const refPrice = refUser.collection('phone').doc('offer')

  let state
  let dataPhone = {}
  let price

  refUser.get()
    .then((doc) => {
      if (!doc.exists) {
        // console.log('No such document!');
      } else {
        state = (doc.data().State)
      }
    })
    .then(function() {
      if (state === 'newOffer') {
        refPhone.get()
          .then((doc) => {
            if (!doc.exists) {
              // console.log('No such document!');
            } else {
              dataPhone = (doc.data())
            }
          })
          .then(function() {
            refPrice.get()
              .then((doc) => {
                if (!doc.exists) {
                  // console.log('No such document!');
                } else {
                  price = doc.data()
                }
              })
              .then(function() {
                const data = [price, dataPhone]
                _callback(data)
              })
          })
      } else {
        // console.log("state not in newOffer");
      }
    })
}

function setReturn(uID, _callback) {
  const docRequest = db.collection('userPhone').doc(uID)

  docRequest.update({
    Date: getCurrentDate(),
    ID: uID,
    State: 'return',
  }).then(() => {
    _callback()
  })
}

module.exports = { /* deleteUser, */ getOffer, setRejectNewOffer, setReturn, setOfferAccept, getNewOffer, getData, uploadPriceRequest, deletePriceRequest, creatNewUser }
