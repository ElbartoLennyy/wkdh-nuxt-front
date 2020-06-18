const axios = require('axios')

const publicKey = process.env.SENDCLOUD_PUBLIC_KEY
const secretKey = process.env.SENDCLOUD_PRIVATE_KEY

const client = axios.create({
  auth: {
    username: publicKey,
    password: secretKey,
  },
})

async function createParcel(userID, userData, location) {
  const newParcelData = {
    parcel: {
      name: 'Alexander Gerick',
      company_name: 'Wirkaufendeinhandy GbR',
      address: 'Azaleenweg',
      house_number: '11',
      city: 'Görlitz',
      postal_code: '02827',
      telephone: '+49 1523 6318531',
      request_label: true,
      email: 'dev@wirkaufendeinhandy.shop',
      country: 'DE',
      shipment: {
        id: process.env.SENDCLOUD_SHIPMENT_ID,
      },
      weight: '1.000',
      order_number: userID,

      from_name: userData.FirstName + ' ' + userData.Name,
      from_company_name: '',
      from_address_1: location.streetName,
      from_address_2: '',
      from_house_number: location.streetNumber,
      from_city: location.city,
      from_postal_code: location.zipcode,
      from_country: 'DE',
      from_telephone: '',
      from_email: userData.Email,
    },
  }

  const { data: body } = await client.post('https://panel.sendcloud.sc/api/v2/parcels', newParcelData)
  try {
    if (body.parcel.status.id === 1000) {
      return body.parcel.id
    } else {
      return false
    }
  } catch (e) {
    return false
  }
}

async function downloadLabel(parcelID, outputPath) {
  const response = await client.get(
    `https://panel.sendcloud.sc/api/v2/labels/normal_printer/${parcelID}?start_from=0`,
    { responseType: 'stream' },
  )
  return { stream: response.data, length: response.headers['content-length'] }
}

async function deleteParcel(parcelID) {
  const { data } = await client.post(`https://panel.sendcloud.sc/api/v2/parcels/${parcelID}/cancel`)
  return data
}

async function returnParcel(parcelID) {
  const { data } = await axios.get(`https://panel.sendcloud.sc/api/v2/parcels/${parcelID}/return_portal_url`)
  return data
}

async function getParcel() {
  const { data } = await axios.get('https://panel.sendcloud.sc/api/v2/parcels')
  return data
}

module.exports = { createParcel, downloadLabel }
