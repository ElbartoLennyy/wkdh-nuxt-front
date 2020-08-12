const phonesData = require('./data/mobileparts')

function getRepairPrice(phone) {
  console.log(phone)

  const shippingPart = 4
  const pricePerHour = 16

  const multiplikator = 1.6

  const shippingCost = 9

  const time = phonesData.parts[phone.Brand][phone.Phone][phone.Defect].time
  const partPrice = phonesData.parts[phone.Brand][phone.Phone][phone.Defect].price

  const price = (partPrice + pricePerHour * time) * multiplikator + shippingPart + shippingCost

  return price
}

module.exports = { getRepairPrice }
