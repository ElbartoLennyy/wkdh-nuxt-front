const phonesData = require('../data/mobileparts')
const repair = require('../repairPrice')

const repairPhones = []

for (const brand in phonesData.parts) {
  for (const phone in phonesData.parts[brand]) {
    for (const defect in phonesData.parts[brand][phone].defects) {
      const repairPhone = {
        brand,
        phone,
        defect,
      }

      repairPhone.price = repair.getRepairPrice(repairPhone)
      repairPhones.push(repairPhone)
    }
  }
}

console.log(repairPhones)
