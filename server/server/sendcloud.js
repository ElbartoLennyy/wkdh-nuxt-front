const fs = require('fs')
const path = require('path')
const request = require('request')
const axios = require('axios')

const publicKey = process.env.SENDCLOUD_PUBLIC_KEY
const secretKey = process.env.SENDCLOUD_PRIVATE_KEY

function creatParcel (userID, data, _callback) {
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
        id: 8 // 111 for production
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
      from_email: ''
    }
  }

  const options = {
    url: 'https://panel.sendcloud.sc/api/v2/parcels',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Basic ' + Buffer.from(publicKey + ':' + secretKey).toString('base64')
    },
    json: newParcelData
  }
  request(options, function (_, res, body) {
    console.log(body)

    try {
      if (body.parcel.status.id == 1000) {
        downloadLabel(body.parcel.id, userID)
        _callback(body.parcel.id)
      } else {
        _callback('error')
      }
    } catch (e) {
      _callback('error')
    }
  })
}

function downloadLabel (parcelID, userID) {
  const output = path.join('./data/shippmentLabels', userID + '.pdf')

  const downloadPDF = async (url, output) => {
    await axios({
      method: 'GET',
      url,
      responseType: 'stream',
      auth: {
        username: publicKey,
        password: secretKey
      }
    }).then((response) => {
      response.data.pipe(
        fs.createWriteStream(output)
      )
    })
  }

  (async () => {
    downloadPDF('https://panel.sendcloud.sc/api/v2/labels/normal_printer/' + parcelID + '?start_from=0', output)
  })()
}

function deleteParcel (parcelID, _callback) {
  const options = {
    url: 'https://panel.sendcloud.sc/api/v2/parcels/' + parcelID + '/cancel',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Basic ' + Buffer.from(publicKey + ':' + secretKey).toString('base64')
    }
  }
  request(options, function (_, res, body) {
    _callback(body)
  })
}

function returnParcel (parcelID, _callback) {
  const options = {
    url: 'https://panel.sendcloud.sc/api/v2/parcels/' + parcelID + '/return_portal_url',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Basic ' + Buffer.from(publicKey + ':' + secretKey).toString('base64')
    }
  }
  request(options, function (_, res, body) {
    _callback(body)
  })
}

function getParcels (_callback) {
  const options = {
    url: 'https://panel.sendcloud.sc/api/v2/parcels',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Basic ' + Buffer.from(publicKey + ':' + secretKey).toString('base64')
    }
  }
  request(options, function (_, res, body) {
    _callback(body)
  })
}

module.exports = { creatParcel }
