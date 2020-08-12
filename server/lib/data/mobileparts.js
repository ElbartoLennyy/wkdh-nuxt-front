const parts = {
  Apple: {
    'iPhone Xs Max': {
      Akku: { price: 17.50, time: 1.5 },
      Display: { price: 167.00, time: 1.5 },
      Port: { price: 4.95, time: 1.5 },
    },
    'iPhone Xs': {
      Akku: { price: 14.00, time: 1.5 },
      Display: { price: 97.00, time: 1.5 },
      Port: { price: 4.95, time: 1.5 },
    },
    'iPhone XR': {
      Akku: { price: 15.50, time: 1.5 },
      Display: { price: 57.00, time: 1.5 },
      Port: { price: 4.95, time: 1 },
    },
    'iPhone X': {
      Akku: { price: 13.75, time: 1.5 },
      Display: { price: 65.00, time: 1.5 },
      Hörmuschel: { price: 12.50, time: 1.5 },
      Lautsprecher: { price: 2.75, time: 1.5 },
      Port: { price: 3.75, time: 1.5 },
    },
    'iPhone 8 Plus': {
      Akku: { price: 8.50, time: 1.25 },
      Display: { price: 18.00, time: 1.25 },
      Hörmuschel: { price: 1.75, time: 0.75 },
      Port: { price: 4.25, time: 1.25 },
    },
    'iPhone 8': {
      Akku: { price: 8.50, time: 1.25 },
      Display: { price: 16.25, time: 1.25 },
      Hörmuschel: { price: 0.95, time: 0.75 },
      Port: { price: 3.95, time: 1.5 },
    },
    'iPhone 7 Plus': {
      Akku: { price: 8.50, time: 1.25 },
      Display: { price: 18.50, time: 0.75 },
      Hörmuschel: { price: 1.75, time: 0.6 },
      Port: { price: 3.95, time: 1.5 },
    },
    'iPhone 7': {
      Akku: { price: 8.50, time: 1.25 },
      Display: { price: 16.25, time: 1.25 },
      Hörmuschel: { price: 0.95, time: 0.6 },
      Lautsprecher: { price: 1.75, time: 1.25 },
      Port: { price: 3.75, time: 1.5 },
    },
    'iPhone SE (2016)': {
      Akku: { price: 6.75, time: 1.25 },
      Display: { price: 12.00, time: 1.25 },
      Hörmuschel: { price: 0.75, time: 0.8 },
      Port: { price: 3.50, time: 1.75 },
    },
    'iPhone 6S Plus': {
      Akku: { price: 8.25, time: 0.5 },
      Display: { price: 18.00, time: 1.25 },
      Hörmuschel: { price: 0.95, time: 0.6 },
      Port: { price: 3.95, time: 2.5 },
    },
    'iPhone 6S': {
      Akku: { price: 7.25, time: 0.5 },
      Display: { price: 16.00, time: 0.75 },
      Hörmuschel: { price: 1.15, time: 0.4 },
      Port: { price: 3.25, time: 1.5 },
    },
    'iPhone 6 Plus': {
      Akku: { price: 8.25, time: 0.5 },
      Display: { price: 16.00, time: 1.5 },
      Hörmuschel: { price: 1.15, time: 0.6 },
      Lautsprecher: { price: 1.95, time: 0.5 },
      Port: { price: 3.50, time: 1.2 },
    },
    'iPhone 6': {
      Akku: { price: 8.75, time: 0.5 },
      Display: { price: 14.00, time: 0.6 },
      Hörmuschel: { price: 0.57, time: 0.75 },
      Lautsprecher: { price: 1.95, time: 0.6 },
      Port: { price: 3.25, time: 1.5 },
    },
  },
  Samsung: {
    'Galaxy S20 Ultra': {
      Akku: { price: 19.50, time: 0.75 },
      Display: { price: 205, time: 1.5 },
      Backplate: { price: 28.00, time: 0.5 },
    },
    'Galaxy S20 Plus': {
      Akku: { price: 18.00, time: 1 },
      Display: { price: 175, time: 1.4 },
      Backplate: { price: 30.00, time: 0.7 },
    },
    'Galaxy S20': {
      Akku: { price: 17.00, time: 1 },
      Display: { price: 180, time: 1.4 },
      Backplate: { price: 26.00, time: 0.5 },
    },
    'Galaxy S10 Plus': {
      Akku: { price: 17.00, time: 1.5 },
      Display: { price: 210.16, time: 1.5 },
      Backplate: { price: 33.00, time: 0.4 },
    },
    'Galaxy S10': {
      Akku: { price: 16.50, time: 1.5 },
      Display: { price: 190.00, time: 1.5 },
      Backplate: { price: 29.50, time: 0.7 },
    },
    'Galaxy S10e': {
      Akku: { price: 15.50, time: 1.5 },
      Display: { price: 124.00, time: 1.5 },
      Backplate: { price: 29.50, time: 0.75 },
    },
    'Galaxy S9 Plus': {
      Akku: { price: 16.75, time: 1.3 },
      Display: { price: 159.00, time: 1.4 },
      Backplate: { price: 25.00, time: 0.5 },
    },
    'Galaxy S9': {
      Akku: { price: 15.75, time: 1.3 },
      Display: { price: 155.00, time: 1.4 },
      Backplate: { price: 25.00, time: 0.5 },
    },
    'Galaxy S8 Plus': {
      Akku: { price: 18.00, time: 1.5 },
      Display: { price: 134.00, time: 1.5 },
      Backplate: { price: 25.50, time: 0.6 },
    },
    'Galaxy S8': {
      Akku: { price: 23.00, time: 0.6 },
      Display: { price: 125.00, time: 1.3 },
      Backplate: { price: 23.00, time: 0.6 },
    },
    'Galaxy S7 Edge': {
      Akku: { price: 15.50, time: 1.5 },
      Display: { price: 133.00, time: 2.5 },
      Backplate: { price: 28.00, time: 0.5 },
      'Kamera (komplett)': { price: 1.75, time: 2.5 },
    },
    'Galaxy S7': {
      Akku: { price: 14.95, time: 0.5 },
      Display: { price: 63.00, time: 2.5 },
      Backplate: { price: 28.00, time: 0.5 },
      'Kamera (komplett)': { price: 1.50, time: 1.5 },
      Kameraglas: { price: 2.75, time: 0.5 },
    },
    'Galaxy S6 Edge': {
      Akku: { price: 12.95, time: 1.3 },
      Display: { price: 62.00, time: 1.5 },
      Backplate: { price: 19.00, time: 0.5 },
    },
    'Galaxy S6': {
      Akku: { price: 12.95, time: 0.8 },
      Display: { price: 80.00, time: 2.5 },
      Backplate: { price: 19.00, time: 0.6 },
    },
    'Galaxy Note 10 Plus': {
      Akku: { price: 20.00, time: 1.5 },
      Display: { price: 210.00, time: 1.5 },
      Backplate: { price: 23.00, time: 0.75 },
    },
    'Galaxy Note 10': {
      Akku: { price: 18.00, time: 1.5 },
      Display: { price: 185.00, time: 1.5 },
      Backplate: { price: 25.00, time: 0.75 },
    },
    'Galaxy Note 10 Lite': {
      Akku: { price: 18.15, time: 1.5 },
      Display: { price: 107.00, time: 1.5 },
      Backplate: { price: 15.50, time: 0.75 },
    },
    'Galaxy Note 9': {
      Akku: { price: 18.25, time: 1.3 },
      Display: { price: 168.00, time: 1.4 },
      Backplate: { price: 28.00, time: 0.5 },
    },
    'Galaxy Note 8': {
      Akku: { price: 16.75, time: 1 },
      Display: { price: 156.00, time: 0.9 },
      Backplate: { price: 18.00, time: 0.7 },
    },
    'Galaxy Alpha': {
      Display: { price: 70.00, time: 0.5 },
    },
    'Galaxy A9 (2018)': {
      Akku: { price: 15.00, time: 1.5 },
      Display: { price: 62.00, time: 1.75 },
      Backplate: { price: 30.50, time: 1.5 },
    },
  },
}

module.exports = { parts }
