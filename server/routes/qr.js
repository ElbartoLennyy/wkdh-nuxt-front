const fs = require('fs')
const path = require('path')
const fbData = require('../lib/firebase')

module.exports = async(req, res) => {
  const { userId } = req.params
  const parcelData = await fbData.getShippmentData(userId)

  const pngPath = `cache/shipping-labels/${parcelData.shipmentNumber}.png`

  if (!fs.existsSync(pngPath)) {
    await fs.writeFile(pngPath, parcelData.qrLabelData, 'base64', function(err) {
      if (err) {
        console.log(err)
      }
    })
  }
  res.sendFile(path.resolve(pngPath))
}
