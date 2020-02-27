const fs = require('fs')
const path = require('path')
const fbData = require('../lib/firebase')
const sendcloud = require('../lib/sendcloud')

module.exports = (req, res) => {
  const { userId } = req.params

  fbData.getData(userId, async(offer) => {
    const parcelId = offer.data.TransportData
    const pdfPath = `cache/shipping-labels/${parcelId}.pdf`

    if (fs.existsSync(pdfPath)) {
      res.sendFile(path.resolve(pdfPath))
    } else {
      const { stream, length } = await sendcloud.downloadLabel(parcelId, pdfPath)

      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Length': length,
      })
      stream.pipe(res)
      stream.pipe(fs.createWriteStream(pdfPath))
    }
  })
}