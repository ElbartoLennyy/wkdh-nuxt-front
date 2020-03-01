const phones = require('../data/priceListPhones')

function getPrice(userPhone) {
// get Price from JSON
  console.log(phones)
  let price

  for (const phone of phones) {
    if (phone.Phone === userPhone.Phone && phone.Storage === userPhone.Storage) {
      price = phone.Price
      break
    }
  }
  calcPrice(userPhone, price)
}

function calcPrice(userPhone, price) {
  price = price * calcCondition(price, userPhone)
}

function calcCondition(price, phoneData) {
  let discount = 0

  if (price > 300) {
    discount = (price - 300) / 200 * 0.1
    if (discount > 0.1) {
      discount = 0.1
    }
  }

  if (phoneData.Condition === 'LIKE_NEW') {
    return 1.15 - discount
  } else if (phoneData.Condition === 'REALLY_GOOD') {
    return 1.03 - discount
  } else if (phoneData.Condition === 'GOOD') {
    return 0.95 - discount
  } else if (phoneData.Condition === 'ACCEPTABLE') {
    return 0.8 - discount
  }
}

module.exports = { getPrice }
