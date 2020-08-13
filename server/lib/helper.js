function checkAccessory(acc, accID) {
  switch (accID) {
    case 1:
      return acc.includes('Originalverpackung')
    case 2:
      return acc.includes('Ladekabel')
    case 3:
      return acc.includes('Netzstecker')
    case 4:
      return acc.includes('Kopfhörer')
  }
}

function getRandomId() {
  return Math.random().toString(36).substr(2, 11)
}

function convertToSafeString(s) {
  const str = s.replace(/[&/\\#+()$~%'":*?<>{}]/g, '')
  return str
}

function convertToJsonPhone(obj) {
  obj.Brand = convertToSafeString(JSON.stringify(obj.Brand))
  obj.Phone = convertToSafeString(JSON.stringify(obj.Phone))
  obj.Storage = convertToSafeString(JSON.stringify(obj.Storage))
  obj.Condition = convertToSafeString(JSON.stringify(obj.Condition))
  obj.Condition = convertToSafeString(JSON.stringify(obj.Condition))
  obj.TechnicalCondition = convertToSafeString(JSON.stringify(obj.TechnicalCondition))
  obj.Accessorys = {
    OVP: checkAccessory(JSON.stringify(obj.Accessorys), 1),
    Cabel: checkAccessory(JSON.stringify(obj.Accessorys), 2),
    Charger: checkAccessory(JSON.stringify(obj.Accessorys), 3),
    Headphones: checkAccessory(JSON.stringify(obj.Accessorys), 4),
  }

  return {
    Brand: obj.Brand,
    Phone: obj.Phone,
    Storage: obj.Storage,
    Condition: obj.Condition,
    TechnicalCondition: obj.TechnicalCondition,
    Accessorys: {
      OVP: obj.Accessorys.OVP,
      cabel: obj.Accessorys.Cabel,
      charger: obj.Accessorys.Charger,
      headphones: obj.Accessorys.Headphones,
    },
  }
}

module.exports = { checkAccessory, getRandomId, convertToSafeString, convertToJsonPhone }
