/* eslint-disable */
// TODO: Refactor this entire file

let Ebay = require('ebay-node-api')
var xlsx = require('xlsx');


let ebay = new Ebay({
    clientID: process.env.EBAY_CLIENT_ID,
    clientSecret: process.env.EBAY_CLIENT_SECRET,
    headers: { // optional
        'X-EBAY-C-MARKETPLACE-ID': 'EBAY_DE'
    },
    body: {
        grant_type: 'client_credentials',
        scope: 'https://api.ebay.com/oauth/api_scope'
    }
});


function getPrice(currentPhone, _callback) {

    phone = currentPhone

    if (phone.Brand == "Apple") {
        currentPhone.Phone = currentPhone.Phone.replace("Silver", "").replace("Grey", "").replace("Gold", "").replace("Green", "").replace("Yellow", "").replace("White", "").replace("Red", "").replace("Black", "").replace("Space grey", "").replace("Coral", "").replace("Jet Black", "").replace("Rose", "")
    }
    console.log(currentPhone.Phone)


    //Search for Items by Keyword.
    ebay.getAccessToken()
        .then((data) => {
            ebay.searchItems({
                keyword: phone.Brand + " " + currentPhone.Phone + " " + phone.Storage + "Gb",
                categoryId: 9355,
                limit: '50',
                filter: {
                    itemLocationCountry: "DE",
                    price: '[50..800]',
                    priceCurrency: 'EUR',
                    conditionIds: "{5000|3000|4000}",
                    buyingOptions: "{FIXED_PRICE}",

                },
                aspect_filter: {
                    categoryId: 9355,
                    Brand: "{" + phone.Brand + "}",
                    Storage: "{" + phone.Storage + "}"
                }
            }).then((data) => {
                calcPrice(data, phone, price => {
                    _callback(price)
                })
            }, (error) => {
                //console.log(error);
            });
        });
}


function calcPrice(data, phoneData, _callback) {

    var jsonData = JSON.parse(data)
    var priceArray = []

    for (let i = 0; i < Object.keys(jsonData.itemSummaries).length; i++) {

        title = (jsonData.itemSummaries[i].title).toLowerCase()


        if (checkTitle(jsonData.itemSummaries[i].title, phoneData)) {
            console.log(jsonData.itemSummaries[i].title)

            var price = parseInt(jsonData.itemSummaries[i].price.value)

            if (!(Number.isNaN(price)) && price != undefined && price != null) {
                priceArray.push(price)

            }
        }

    }

    var optimizedPriceArray = optimisePriceArray(priceArray)

    if (optimisePriceArray == false) {
        _callback(false)
        console.log("price Array too short")
        return;
    }
    var currentPrice = optimizedPriceArray
    currentPrice = calcCondition(currentPrice, phoneData)
    currentPrice = currentPrice - calcAccessories(currentPrice, phoneData)
    console.log("Marktpreis" + currentPrice)
    var technicalConditionPrice = checkTechnicalCondition(phoneData.TechnicalCondition, phoneData)

    if (technicalConditionPrice == false || currentPrice < technicalConditionPrice) {
        console.log("TechnicalCondition error")
        _callback(false);
        return;
    }

    currentPrice -= technicalConditionPrice
    currentPrice -= 15.45

    if (currentPrice < 100) { currentPrice = currentPrice * 0.62 } else if (currentPrice < 150) { currentPrice = currentPrice * 0.68 } else if (currentPrice < 200) { currentPrice = currentPrice * 0.74 } else if (currentPrice < 300) { currentPrice = currentPrice * 0.78 } else if (currentPrice < 400) { currentPrice = currentPrice * 0.82 } else if (currentPrice >= 400) { currentPrice = currentPrice * 0.84 }

    if (currentPrice < 40) {
        _callback(false)
        return
    }

    _callback(Math.floor(currentPrice))
}


function checkTechnicalCondition(technicalCondition, phoneData) {

    var finalPrice = 0;


    var noDefect = false;
    var batteryDefect = false
    var portDefect = false
    var screenDefect = false
    var backcoverDefect = false

    var priceBattery = []
    var pricePort = []
    var priceScreen = []
    var priceBackcover = []


    if (technicalCondition.includes("Kein Technischer Defekt")) {
        noDefect = true
    }
    if (technicalCondition.includes("Akku in schlechtem Zustand")) {
        noDefect = false
        batteryDefect = true
    }
    if (technicalCondition.includes("Defekter Anschluss")) {
        noDefect = false
        portDefect = true
    }
    if (technicalCondition.includes("Displayschaden")) {
        noDefect = false
        screenDefect = true
    }
    if (technicalCondition.includes("Kaputte Rückseite")) {
        noDefect = false
        backcoverDefect = true
    }

    if (noDefect) {
        console.log("kein Defect")
        return true;
    }

    switch (phoneData.Brand) {
        case "Apple":


            var workbook = xlsx.readFile("./priceParts/apple.xlsx")
            var sheet_name_list = workbook.SheetNames;
            var currentPrices = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

            currentPrices.forEach(element => {

                if (batteryDefect) {

                    if (element['Model code'].trim() == (phoneData.Phone).trim() && element['Part category'].includes("Battery")) {
                        priceBattery.push(element["Price ex tax"])
                    }

                }

                if (portDefect) {
                    if (element['Model code'].trim() == (phoneData.Phone).trim() && element['Part category'].includes("Connector")) {
                        pricePort.push(element["Price ex tax"])
                    }
                }

                if (screenDefect) {
                    if (element['Model code'].trim() == (phoneData.Phone).trim() && element['Part category'].includes("Display") && element['Quality'].includes("OEM pulled")) {
                        priceScreen.push(element["Price ex tax"])
                    }
                }

                if (backcoverDefect) {
                    if (element['Model code'].trim() == (phoneData.Phone).trim() && element['Part category'].includes("Housing")) {
                        priceBackcover.push(element["Price ex tax"])
                    }
                }

            });

            console.log(priceBattery)

            if (batteryDefect) {
                if (priceBattery.length == 0) {
                    priceBattery.push(9)
                }
            }
            console.log(priceBattery)


            break;
        case "Google":
            console.log("Google")

            if (batteryDefect || portDefect || backcoverDefect) return false;

            var workbook = xlsx.readFile("./priceParts/apple.xlsx")
            var sheet_name_list = workbook.SheetNames;
            var currentPrices = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

            currentPrices.forEach(element => {

                if (element['Model description'].includes(phoneData.Phone)) {
                    priceScreen.push(element["Price ex tax"])
                }
            });

            break;
        case "Huawei":
            console.log("Huawei")

            var workbook = xlsx.readFile("./priceParts/huawei.xlsx")
            var sheet_name_list = workbook.SheetNames;
            var currentPrices = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

            currentPrices.forEach(element => {

                if (batteryDefect) {

                    if (element['Model code'].trim() == ((phoneData.Brand).trim() + " " + (phoneData.Phone).trim()) && element['Part category'].includes("Battery")) {
                        priceBattery.push(element["Price ex tax"])
                    }
                }

                if (portDefect) {
                    if (element['Model code'].trim() == ((phoneData.Brand).trim() + " " + (phoneData.Phone).trim()) && element['Part category'].includes("Connector")) {
                        pricePort.push(element["Price ex tax"])
                    }
                }

                if (screenDefect) {
                    if (element['Model code'].trim() == ((phoneData.Brand).trim() + " " + (phoneData.Phone).trim()) && element['Part category'].includes("Display")) {
                        priceScreen.push(element["Price ex tax"])
                    }
                }

                if (backcoverDefect) {
                    if (element['Model code'].trim() == ((phoneData.Brand).trim() + " " + (phoneData.Phone).trim()) && element['Part category'].includes("Housing")) {
                        priceBackcover.push(element["Price ex tax"])
                    }
                }

            });

            break;
        case "LG":
            console.log("LG")


            if (backcoverDefect) {
                return false;
            }

            var workbook = xlsx.readFile("./priceParts/lg.xlsx")
            var sheet_name_list = workbook.SheetNames;
            var currentPrices = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

            currentPrices.forEach(element => {

                if (batteryDefect) {

                    if (element['Model code'].trim() == ((phoneData.Brand).trim() + " " + (phoneData.Phone).trim()) && element['Part category'].includes("Battery")) {
                        priceBattery.push(element["Price ex tax"])
                    }
                }

                if (portDefect) {
                    if (element['Model code'].trim() == ((phoneData.Brand).trim() + " " + (phoneData.Phone).trim()) && element['Part category'].includes("Connector")) {
                        pricePort.push(element["Price ex tax"])
                    }
                }

                if (screenDefect) {
                    if (element['Model code'].trim() == ((phoneData.Brand).trim() + " " + (phoneData.Phone).trim()) && element['Part category'].includes("Display")) {
                        priceScreen.push(element["Price ex tax"])
                    }
                }

            });
            break;
        case "Nokia":


            var workbook = xlsx.readFile("./priceParts/nokia.xlsx")
            var sheet_name_list = workbook.SheetNames;
            var currentPrices = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

            currentPrices.forEach(element => {

                if (batteryDefect) {

                    if (element['Model code'].trim() == ((phoneData.Brand).trim() + " " + (phoneData.Phone).trim()) && element['Part category'].includes("Battery")) {
                        priceBattery.push(element["Price ex tax"])
                    }
                }

                if (portDefect) {
                    if (element['Model code'].trim() == ((phoneData.Brand).trim() + " " + (phoneData.Phone).trim()) && element['Part category'].includes("Connector")) {
                        pricePort.push(element["Price ex tax"])
                    }
                }

                if (screenDefect) {
                    if (element['Model code'].trim() == ((phoneData.Brand).trim() + " " + (phoneData.Phone).trim()) && element['Part category'].includes("Display")) {
                        priceScreen.push(element["Price ex tax"])
                    }
                }

                if (backcoverDefect) {
                    if (element['Model code'].trim() == ((phoneData.Brand).trim() + " " + (phoneData.Phone).trim()) && element['Part category'].includes("Housing")) {
                        priceBackcover.push(element["Price ex tax"])
                    }
                }

            });

            break;
        case "OnePlus":

            if (batteryDefect || portDefect || backcoverDefect) return false;

            var workbook = xlsx.readFile("./priceParts/oneplus.xlsx")
            var sheet_name_list = workbook.SheetNames;
            var currentPrices = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])


            currentPrices.forEach(element => {

                if (element['Model code'].trim() == ((phoneData.Brand).trim() + " " + (phoneData.Phone).trim())) {
                    priceScreen.push(element["Price ex tax"])
                }
            });

            console.log(priceScreen)

            break;
        case "Samsung":

            var samsung_name = xlsx.readFile("./priceParts/samsung_name.xlsx")
            var samsung_name_list = samsung_name.SheetNames;
            var samsungNames = xlsx.utils.sheet_to_json(samsung_name.Sheets[samsung_name_list[0]])

            var phoneName


            samsungNames.forEach(element => {

                if (element['Modell Bezeichnung'].trim() == ((phoneData.Brand).trim() + " " + (phoneData.Phone).trim())) {
                    phoneName = element["Modell Nummer"];
                    console.log(phoneName)
                }
            });



            var workbook = xlsx.readFile("./priceParts/samsung.xlsx")
            var sheet_name_list = workbook.SheetNames;
            var currentPrices = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])


            currentPrices.forEach(element => {

                if (element['Model description'].includes(phoneName)) {
                    priceScreen.push(element["Price ex tax"])
                }

                if (batteryDefect) {

                    if (element['Model description'].includes(phoneName) && element['Part category'].includes("Battery")) {
                        priceBattery.push(element["Price ex tax"])
                    }
                }

                if (portDefect) {
                    if (element['Model description'].includes(phoneName) && element['Part category'].includes("Connector")) {
                        pricePort.push(element["Price ex tax"])
                    }
                }

                if (screenDefect) {
                    if (element['Model description'].includes(phoneName) && element['Part category'].includes("LCD")) {
                        priceScreen.push(element["Price ex tax"])
                    }
                }

                if (backcoverDefect) {
                    if (element['Model description'].includes(phoneName) && element['Part category'].includes("Covers")) {
                        priceBackcover.push(element["Price ex tax"])
                    }
                }
            });




            break;
        case "Sony":


            var workbook = xlsx.readFile("./priceParts/sony.xlsx")
            var sheet_name_list = workbook.SheetNames;
            var currentPrices = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

            currentPrices.forEach(element => {

                if (batteryDefect) {

                    if (element['Model code'].trim() == ((phoneData.Brand).trim() + " " + (phoneData.Phone).trim()) && element['Part category'].includes("Battery")) {
                        priceBattery.push(element["Price ex tax"])
                    }
                }

                if (portDefect) {
                    if (element['Model code'].trim() == ((phoneData.Brand).trim() + " " + (phoneData.Phone).trim()) && element['Part category'].includes("Connector")) {
                        pricePort.push(element["Price ex tax"])
                    }
                }

                if (screenDefect) {
                    if (element['Model code'].trim() == ((phoneData.Brand).trim() + " " + (phoneData.Phone).trim()) && element['Part category'].includes("Display")) {
                        priceScreen.push(element["Price ex tax"])
                    }
                }

                if (backcoverDefect) {
                    if (element['Model code'].trim() == ((phoneData.Brand).trim() + " " + (phoneData.Phone).trim()) && element['Part category'].includes("Housing")) {
                        priceBackcover.push(element["Price ex tax"])
                    }
                }

            });
            break;
        case "Xiaomi":

            if (batteryDefect || portDefect || backcoverDefect) return false;

            var workbook = xlsx.readFile("./priceParts/xiaomi.xlsx")
            var sheet_name_list = workbook.SheetNames;
            var currentPrices = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

            currentPrices.forEach(element => {

                if (element['Model description'].includes(phoneData.Phone)) {
                    priceScreen.push(element["Price ex tax"])
                }
            });

            break;
        default:
            return false
    }



    if (batteryDefect) {

        if (priceBattery.length == 0) return false;

        var sum = priceBattery.reduce((previous, current) => current += previous);
        var priceBattery = sum / priceBattery.length * 1.05;
        if (priceBattery == 0) return false
        finalPrice += (priceBattery + 12) * 1.45
    }

    if (portDefect) {

        if (pricePort.length == 0) return false;

        var sum = pricePort.reduce((previous, current) => current += previous);
        var pricePort = sum / pricePort.length * 1.05;
        if (pricePort == 0) return false

        finalPrice += (pricePort + 16) * 1.45
    }

    if (screenDefect) {

        if (priceScreen.length == 0) return false;

        var sum = priceScreen.reduce((previous, current) => current += previous);

        var priceScreen = sum / priceScreen.length * 1.05;

        if (priceScreen == 0) return false

        finalPrice += (priceScreen + 16) * 1.45
    }

    if (backcoverDefect) {

        if (priceBackcover.length == 0) return false;

        var sum = priceBackcover.reduce((previous, current) => current += previous);
        var priceBackcover = sum / priceBackcover.length * 1.05;
        if (priceBackcover == 0) return false

        finalPrice += (priceBackcover + 16) * 1.45

    }

    console.log("reparaturpreis: " + finalPrice)
    return finalPrice

}

function calcCondition(price, phoneData) {

    if (phoneData.Condition == "Wie neu") {
        return (price * 1.15)
    } else if (phoneData.Condition == "Sehr gut") {
        return (price * 1.03)
    } else if (phoneData.Condition == "Gut") {
        return (price * 0.95)
    } else if (phoneData.Condition == "Akzeptabel") {
        return (price * 0.80)
    }
}

function optimisePriceArray(priceArray) {
    if (priceArray.length <= 5) return false;

    var sum = priceArray.reduce((previous, current) => current += previous);
    var avg = sum / priceArray.length;


    var lowEnd = avg - avg * 0.3
    var highEnd = avg + avg * 0.3
    var finalPriceArray = []

    priceArray.forEach(element => {
        if (lowEnd < element && highEnd > element) {
            finalPriceArray.push(element)
        }

    });
    console.log(finalPriceArray)


    sum = finalPriceArray.reduce((previous, current) => current += previous);
    currentPrice = sum / finalPriceArray.length;
    console.log("currentPrice " + currentPrice)

    return currentPrice
}

function calcAccessories(price, phoneData) {
    var minus = 0

    if (!phoneData.Accessorys.OVP) {
        if (price < 300) {
            minus += 5
        } else {
            minus += 10
        }
    }
    if (!phoneData.Accessorys.headphones) {
        if (price < 300) {
            minus += 3
        } else {
            minus += 8
        }
    }
    if (!phoneData.Accessorys.cabel) {
        minus += 3
    }
    if (!phoneData.Accessorys.OVP) {
        minus += 3
    }
    return minus
}

function checkTitle(title, phoneData) {
    var phoneTitle = (phoneData.Brand + " " + phoneData.Phone + " " + phoneData.Storage).toLowerCase()
    title = title.toLowerCase()

    str = ["plus", "+", "16", "32", "64", "128", "256", "512", "neu", "pro", "max", "glasbruch", "displayschaden", "defekt", "sprung", "bruch", "riss", "starke kratzer", "tiefe kratzer", "edge", "beschädigt", "6s", "6"]


    for (let i = 0; i < str.length; i++) {
        if (phoneTitle.includes(str[i])) {
            if (!title.includes(str[i])) {
                return false;
            }
        }

        if (!phoneTitle.includes(str[i])) {
            if (title.includes(str[i])) {
                return false;
            }
        }

    }
    return true;
}


module.exports = { getPrice }
