const fs = require('fs')
const path = require('path')
const axios = require('axios')

const publicKey = process.env.SENDCLOUD_PUBLIC_KEY
const secretKey = process.env.SENDCLOUD_PRIVATE_KEY

const client = axios.create({
  auth: {
    username: publicKey,
    password: secretKey,
  },
})

async function createParcel(userID, data, _callback) {
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
        // TODO: Turn this into an environment variable
        id: 111, // 111 for production
      },
      weight: '1.000',
      order_number: userID,

      from_name: data.FirstName + ' ' + data.Name,
      from_company_name: '',
      from_address_1: data.Location.streetName,
      from_address_2: '',
      from_house_number: data.Location.streetNumber,
      from_city: data.Location.city,
      from_postal_code: data.Location.zipcode,
      from_country: 'DE',
      from_telephone: '',
      from_email: '',
    },
  }

  const { data: body } = await client.post('https://panel.sendcloud.sc/api/v2/parcels', newParcelData)
  try {
    if (body.parcel.status.id === 1000) {
      _callback(body.parcel.id)
    } else {
      _callback('error')
    }
  } catch (e) {
    _callback('error')
  }
}

async function downloadLabel(parcelID, outputPath) {
  const response = await client.get(
    `https://panel.sendcloud.sc/api/v2/labels/normal_printer/${parcelID}?start_from=0`,
    { responseType: 'stream' },
  )
  return { stream: response.data, length: response.headers['content-length'] }
}

async function deleteParcel(parcelID, _callback) {
  const { data } = await client.post(`https://panel.sendcloud.sc/api/v2/parcels/${parcelID}/cancel`)
  _callback(data)
}

async function returnParcel(parcelID, _callback) {
  const { data } = await axios.get(`https://panel.sendcloud.sc/api/v2/parcels/${parcelID}/return_portal_url`)
  _callback(data)
}

async function getParcels(_callback) {
  const { data } = await axios.get('https://panel.sendcloud.sc/api/v2/parcels')
  _callback(data)
}

module.exports = { createParcel, downloadLabel }
