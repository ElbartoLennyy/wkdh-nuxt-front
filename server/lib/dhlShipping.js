const axios = require('axios')

const client = axios.create({
  auth: {
    username: process.env.DHL_USERNAME,
    password: process.env.DHL_PASSWORD,
  },
  headers: {
    'DPDHL-User-Authentication-Token': process.env.DHL_AUTH_TOKEN,
  },
})

async function createReturnParcel(userID, userData, location) {
  const newParcelData = {
    receiverId: 'deu',
    customerReference: userID,
    shipmentReference: userID,
    senderAddress:
      {
        name1: `${userData.FirstName} ${userData.Name}`,
        streetName: `${location.streetName}`,
        houseNumber: `${location.streetNumber}`,
        postCode: `${location.zipcode}`,
        city: `${location.city}`,
        country:
        {
          countryISOCode: 'DEU',
          country: 'Germany',
        },
      },
    email: `${userData.Email}`,
    telephoneNumber: '',
    weightInGrams: 1000,
    value: 500,
    returnDocumentType: 'BOTH',
  }

  try {
    const res = await client.post('https://cig.dhl.de/services/sandbox/rest/returns/', newParcelData)
    if (res.status === 201) {
      console.log(res.data)
      return res.data
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

module.exports = { createReturnParcel }
