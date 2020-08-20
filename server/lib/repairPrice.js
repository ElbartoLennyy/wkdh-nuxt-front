const phonesData = require('./data/mobileparts')

function getRepairPrice(phone) {
  const shippingPart = 4
  const pricePerHour = 16

  const multiplikator = 1.6

  const shippingCost = 9

  const time = phonesData.parts[phone.brand][phone.phone].defects[phone.defect].time
  const partPrice = phonesData.parts[phone.brand][phone.phone].defects[phone.defect].price

  const price = (partPrice + pricePerHour * time) * multiplikator + shippingPart + shippingCost

  return price
}

module.exports = { getRepairPrice }
