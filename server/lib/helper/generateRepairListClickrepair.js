const fs = require('fs')
const json2xls = require('json2xls')
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

      repairPhone.price = (Math.ceil((repair.getRepairPrice(repairPhone)) / 5) * 5) - 0.05

      repairPhones.push(repairPhone)
    }
  }
}

console.log(repairPhones)

const xls = json2xls(repairPhones)

fs.writeFileSync('repaitPhone.xlsx', xls, 'binary')
