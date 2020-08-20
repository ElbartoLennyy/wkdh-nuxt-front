const fs = require('fs')
const path = require('path')
const fbData = require('../lib/firebase')

module.exports = async(req, res) => {
  const { userId } = req.params
  const parcelData = await fbData.getShippmentData(userId)

  const pdfPath = `cache/shipping-labels/${parcelData.shipmentNumber}.pdf`

  if (!fs.existsSync(pdfPath)) {
    fs.writeFile(pdfPath, parcelData.labelData, 'base64', function(err) {
      if (err) {
        throw new Error(err)
      } else {
        res.sendFile(path.resolve(pdfPath))
      }
    })
  } else {
    res.sendFile(path.resolve(pdfPath))
  }
}
