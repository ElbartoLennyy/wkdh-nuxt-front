const fs = require('fs')
const { promises: fsp } = require('fs')
const path = require('path')
const fbData = require('../lib/firebase')

module.exports = async(req, res) => {
  const { userId } = req.params
  const parcelData = await fbData.getShippmentData(userId)

  const pngPath = `cache/shipping-labels/${parcelData.shipmentNumber}.png`

  const dirLabels = 'cache/shipping-labels'
  await fsp.mkdir(dirLabels, { recursive: true })

  if (!fs.existsSync(pngPath)) {
    fs.writeFile(pngPath, parcelData.qrLabelData, 'base64', function(err) {
      if (err) {
        throw new Error(err)
      } else {
        res.sendFile(path.resolve(pngPath))
      }
    })
  } else {
    res.sendFile(path.resolve(pngPath))
  }
}
