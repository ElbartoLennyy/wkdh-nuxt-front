const phonesData = require('./data/mobileparts')

getRepairPrice({
  Brand: 'Samsung',
  Phone: 'Galaxy S8',
  defect: 'Display',
})

function getRepairPrice(phone) {
  const shippingPart = 4
  const pricePerHour = 16
  const time = 1.5

  const multiplikator = 1.6

  const shippingCost = 9

  const partPrice = phonesData.parts[phone.Brand][phone.Phone][phone.defect]

  const price = (partPrice + pricePerHour * time) * multiplikator + shippingPart + shippingCost

  console.log(price)
}
