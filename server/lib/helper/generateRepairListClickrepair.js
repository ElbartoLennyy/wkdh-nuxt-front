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
        Dauer: '96',
      }

      // if (repairPhone.brand === 'Apple') {
      //   repairPhone.Ersatzteilqualität = 'B'
      // } else {
      //   repairPhone.Ersatzteilqualität = 'A'
      // }

      repairPhone.price = (Math.ceil((repair.getRepairPrice(repairPhone)) / 5) * 5)
      if (repairPhone.defect === 'Akku') {
        repairPhone.defect = 'reparatur-akku'
      } else if (repairPhone.defect === 'Display') {
        repairPhone.defect = 'reparatur-lcd-toucheinheit'
      } else if (repairPhone.defect === 'Port') {
        repairPhone.defect = 'reparatur-ladeanschluss'
      } else if (repairPhone.defect === 'Backplate') {
        repairPhone.defect = 'reparatur-akkudeckel'
      } else if (repairPhone.defect === 'Hörmuschel') {
        repairPhone.defect = 'reparatur-ohrmuschel'
      } else if (repairPhone.defect === 'Lautsprecher') {
        repairPhone.defect = 'reparatur-lautsprecher'
      } else if (repairPhone.defect === 'Kamera (komplett)') {
        repairPhone.defect = 'reparatur-hauptkamera'
      }

      repairPhone.brand = `${repairPhone.brand} ${repairPhone.phone}`
      delete repairPhone.phone

      repairPhones.push(repairPhone)
    }
  }
}

console.log(repairPhones)

const xls = json2xls(repairPhones)

fs.writeFileSync('repaitPhone.xlsx', xls, 'binary')
