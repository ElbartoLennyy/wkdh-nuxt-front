const parts = {
  Apple: {
    // 'iPhone SE (2020)': {
    //   defects: {},
    //   color: ['Schwarz', 'Weiß', 'Rot'],
    // },
    // 'iPhone 11 Pro Max': {},
    // 'iPhone 11 Pro': {},
    // 'iPhone 11': {},
    'iPhone Xs Max': {
      defects: {
        Akku: { price: 17.50, time: 1.5 },
        Display: { price: 167.00, time: 1.5 },
        Port: { price: 4.95, time: 1.5 },
      },
      color: ['Gold', 'Space Grau', 'Silber'],
    },
    'iPhone Xs': {
      defects: {
        Akku: { price: 14.00, time: 1.5 },
        Display: { price: 97.00, time: 1.5 },
        Port: { price: 4.95, time: 1.5 },
      },
      color: ['Gold', 'Space Grau', 'Silber'],
    },
    'iPhone XR': {
      defects: {
        Akku: { price: 15.50, time: 1.5 },
        Display: { price: 57.00, time: 1.5 },
        Port: { price: 4.95, time: 1 },
      },
      color: ['Rot', 'Gelb', 'Weiß', 'Koralle', 'Schwarz', 'Blau'],
    },
    'iPhone X': {
      defects: {
        Akku: { price: 13.75, time: 1.5 },
        Display: { price: 65.00, time: 1.5 },
        Hörmuschel: { price: 12.50, time: 1.5 },
        Lautsprecher: { price: 2.75, time: 1.5 },
        Port: { price: 3.75, time: 1.5 },
      },
      color: ['Space Grau', 'Silber'],
    },
    'iPhone 8 Plus': {
      defects: {
        Akku: { price: 8.50, time: 1.25 },
        Display: { price: 18.00, time: 1.25 },
        Hörmuschel: { price: 1.75, time: 0.75 },
        Port: { price: 4.25, time: 1.25 },
      },
      color: ['Schwarz', 'Gold', 'Rot', 'Silber'],
    },
    'iPhone 8': {
      defects: {
        Akku: { price: 8.50, time: 1.25 },
        Display: { price: 16.25, time: 1.25 },
        Hörmuschel: { price: 0.95, time: 0.75 },
        Port: { price: 3.95, time: 1.5 },
      },
      color: ['Schwarz', 'Gold', 'Rot', 'Silber'],
    },
    'iPhone 7 Plus': {
      defects: {
        Akku: { price: 8.50, time: 1.25 },
        Display: { price: 18.50, time: 0.75 },
        Hörmuschel: { price: 1.75, time: 0.6 },
        Port: { price: 3.95, time: 1.5 },
      },
      color: ['Schwarz', 'Gold', 'Rose Gold', 'Silber'],
    },
    'iPhone 7': {
      defects: {
        Akku: { price: 8.50, time: 1.25 },
        Display: { price: 16.25, time: 1.25 },
        Hörmuschel: { price: 0.95, time: 0.6 },
        Lautsprecher: { price: 1.75, time: 1.25 },
        Port: { price: 3.75, time: 1.5 },
      },
      color: ['Schwarz', 'Gold', 'Rose Gold', 'Silber'],
    },
    'iPhone SE (2016)': {
      defects: {
        Akku: { price: 6.75, time: 1.25 },
        Display: { price: 12.00, time: 1.25 },
        Hörmuschel: { price: 0.75, time: 0.8 },
        Port: { price: 3.50, time: 1.75 },
      },
      color: ['Gold', 'Grau', 'Rose Gold', 'Silber'],
    },
    'iPhone 6S Plus': {
      defects: {
        Akku: { price: 8.25, time: 0.5 },
        Display: { price: 18.00, time: 1.25 },
        Hörmuschel: { price: 0.95, time: 0.6 },
        Port: { price: 3.95, time: 2.5 },
      },
      color: ['Gold', 'Grau', 'Rose Gold', 'Silber'],
    },
    'iPhone 6S': {
      defects: {
        Akku: { price: 7.25, time: 0.5 },
        Display: { price: 16.00, time: 0.75 },
        Hörmuschel: { price: 1.15, time: 0.4 },
        Port: { price: 3.25, time: 1.5 },
      },
      color: ['Gold', 'Grau', 'Rose Gold', 'Silber'],
    },
    'iPhone 6 Plus': {
      defects: {
        Akku: { price: 8.25, time: 0.5 },
        Display: { price: 16.00, time: 1.5 },
        Hörmuschel: { price: 1.15, time: 0.6 },
        Lautsprecher: { price: 1.95, time: 0.5 },
        Port: { price: 3.50, time: 1.2 },
      },
      color: ['Gold', 'Grau', 'Silber'],
    },
    'iPhone 6': {
      defects: {
        Akku: { price: 8.75, time: 0.5 },
        Display: { price: 14.00, time: 0.6 },
        Hörmuschel: { price: 0.57, time: 0.75 },
        Lautsprecher: { price: 1.95, time: 0.6 },
        Port: { price: 3.25, time: 1.5 },
      },
      color: ['Gold', 'Grau', 'Silber'],
    },
  },

  Samsung: {
    'Galaxy S20 Ultra': {
      defects: {
        Akku: { price: 19.50, time: 0.75 },
        Display: { price: 205, time: 1.5 },
        Backplate: { price: 28.00, time: 0.5 },
      },
      color: ['Schwarz', 'Grau'],
    },
    'Galaxy S20 Plus': {
      defects: {
        Akku: { price: 18.00, time: 1 },
        Display: { price: 175, time: 1.4 },
        Backplate: { price: 30.00, time: 0.7 },
      },
      color: ['Schwarz', 'Grau', 'Blau'],
    },
    'Galaxy S20': {
      defects: {
        Akku: { price: 17.00, time: 1 },
        Display: { price: 180, time: 1.4 },
        Backplate: { price: 26.00, time: 0.5 },
      },
      color: ['Schwarz', 'Grau', 'Pink', 'Weiß'],
    },
    'Galaxy S10 Plus': {
      defects: {
        Akku: { price: 17.00, time: 1.5 },
        Display: { price: 210.16, time: 1.5 },
        Backplate: { price: 33.00, time: 0.4 },
      },
      color: ['Schwarz', 'Blau', 'Grün', 'Weiß', 'Cermaic Black', 'Ceramic Weiß'],
    },
    'Galaxy S10': {
      defects: {
        Akku: { price: 16.50, time: 1.5 },
        Display: { price: 190.00, time: 1.5 },
        Backplate: { price: 29.50, time: 0.7 },
      },
      color: ['Schwarz', 'Blau', 'Grün', 'Silber', 'Weiß'],
    },
    'Galaxy S10e': {
      defects: {
        Akku: { price: 15.50, time: 1.5 },
        Display: { price: 124.00, time: 1.5 },
        Backplate: { price: 29.50, time: 0.75 },
      },
      color: ['Schwarz', 'Blau', 'Grün', 'Weiß', 'Gelb'],
    },
    'Galaxy S9 Plus': {
      defects: {
        Akku: { price: 16.75, time: 1.3 },
        Display: { price: 159.00, time: 1.4 },
        Backplate: { price: 25.00, time: 0.5 },
      },
      color: ['Schwarz', 'Blau', 'Gold', 'Grau', 'Lila'],
    },
    'Galaxy S9': {
      defects: {
        Akku: { price: 15.75, time: 1.3 },
        Display: { price: 155.00, time: 1.4 },
        Backplate: { price: 25.00, time: 0.5 },
      },
      color: ['Schwarz', 'Blau', 'Gold', 'Grau', 'Lila'],
    },
    'Galaxy S8 Plus': {
      defects: {
        Akku: { price: 18.00, time: 1.5 },
        Display: { price: 134.00, time: 1.5 },
        Backplate: { price: 25.50, time: 0.6 },
      },
      color: ['Schwarz', 'Blau', 'Gold', 'Orchid Grey', 'Pink', 'Silber'],
    },
    'Galaxy S8': {
      defects: {
        Akku: { price: 23.00, time: 0.6 },
        Display: { price: 125.00, time: 1.3 },
        Backplate: { price: 23.00, time: 0.6 },
      },
      color: ['Schwarz', 'Blau', 'Gold', 'Orchid Grey', 'Pink', 'Silber'],
    },
    'Galaxy S7 Edge': {
      defects: {
        Akku: { price: 15.50, time: 1.5 },
        Display: { price: 133.00, time: 2.5 },
        Backplate: { price: 28.00, time: 0.5 },
        'Kamera (komplett)': { price: 1.75, time: 2.5 },
      },
      color: ['Schwarz', 'Blau', 'Pink', 'Gold', 'Weiß', 'Silber'],
    },
    'Galaxy S7': {
      defects: {
        Akku: { price: 14.95, time: 0.5 },
        Display: { price: 63.00, time: 2.5 },
        Backplate: { price: 28.00, time: 0.5 },
        'Kamera (komplett)': { price: 1.50, time: 1.5 },
        Kameraglas: { price: 2.75, time: 0.5 },
      },
      color: ['Schwarz', 'Pink', 'Gold', 'Weiß', 'Silber'],
    },
    // 'Galaxy S6 Edge Plus': {},
    'Galaxy S6 Edge': {
      defects: {
        Akku: { price: 12.95, time: 1.3 },
        Display: { price: 62.00, time: 1.5 },
        Backplate: { price: 19.00, time: 0.5 },
      },
      color: ['Schwarz', 'Gold', 'Grün', 'Weiß'],
    },
    'Galaxy S6': {
      defects: {
        Akku: { price: 12.95, time: 0.8 },
        Display: { price: 80.00, time: 2.5 },
        Backplate: { price: 19.00, time: 0.6 },
      },
      color: ['Schwarz', 'Gold', 'Blau', 'Weiß'],
    },
    'Galaxy Note 10 Plus': {
      defects: {
        Akku: { price: 20.00, time: 1.5 },
        Display: { price: 210.00, time: 1.5 },
        Backplate: { price: 23.00, time: 0.75 },
      },
      color: ['Schwarz', 'Blau', 'Silber', 'Weiß'],
    },
    'Galaxy Note 10': {
      defects: {
        Akku: { price: 18.00, time: 1.5 },
        Display: { price: 185.00, time: 1.5 },
        Backplate: { price: 25.00, time: 0.75 },
      },
      color: ['Schwarz', 'Pink', 'Silber', 'Weiß'],
    },
    'Galaxy Note 10 Lite': {
      defects: {
        Akku: { price: 18.15, time: 1.5 },
        Display: { price: 107.00, time: 1.5 },
        Backplate: { price: 15.50, time: 0.75 },
      },
      color: ['Schwarz', 'Silber'],
    },
    'Galaxy Note 9': {
      defects: {
        Akku: { price: 18.25, time: 1.3 },
        Display: { price: 168.00, time: 1.4 },
        Backplate: { price: 28.00, time: 0.5 },
      },
      color: ['Schwarz', 'Blau', 'Kupfer', 'Lila'],
    },
    'Galaxy Note 8': {
      defects: {
        Akku: { price: 16.75, time: 1 },
        Display: { price: 156.00, time: 0.9 },
        Backplate: { price: 18.00, time: 0.7 },
      },
      color: ['Schwarz', 'Blau', 'Gold'],
    },
    'Galaxy Alpha': {
      defects: {
        Display: { price: 70.00, time: 0.5 },
      },
      color: ['Schwarz', 'Blau', 'Gold', 'Weiß', 'Silber'],
    },
    'Galaxy A9 (2018)': {
      defects: {
        Akku: { price: 15.00, time: 1.5 },
        Display: { price: 62.00, time: 1.75 },
        Backplate: { price: 30.50, time: 1.5 },
      },
      color: ['Schwarz', 'Blau'],
    },
  },

  Huawai: {
    'P Smart Plus': {
      defects: {
        Akku: { price: 50.00, time: 0.5 },
        Display: { price: 50.00, time: 1.5 },
        Backplate: { price: 13, time: 0.7 },
      },
      color: ['Schwarz', 'Lila'],
    },
    'P Smart Pro (2019)': {
      defects: {},
      color: ['Schwarz', 'Breathing Crystal'],
    },
    'P Smart (2019)': {
      defects: {
        Akku: { price: 50.00, time: 0.5 },
        Display: { price: 50.00, time: 1.5 },
        Backplate: { price: 13, time: 0.7 },
        Port: { price: 6, time: 2 },
      },
      color: ['Schwarz', 'Sapphire Blau'],
    },
    'P Smart': {
      defects: {
        Akku: { price: 8.5, time: 1.5 },
        Display: { price: 21, time: 1.5 },
        Backplate: { price: 14, time: 0.7 },
      },
      color: ['Schwarz', 'Blau', 'Gold'],
    },
    'P 40 Pro': {
      defects: {
        Display: { price: 260.00, time: 1.6 },
        Backplate: { price: 45, time: 0.7 },
      },
      color: ['Schwarz', 'Gold', 'Weiß'],
    },
    'P 40 Lite': {
      defects: {
        Akku: { price: 70, time: 1.5 },
        Display: { price: 70, time: 1.5 },
        Backplate: { price: 14, time: 0.7 },
      },
      color: ['Schwarz', 'Grün', 'Pink'],
    },
    'P 40': {
      defects: {
        Akku: { price: 144.00, time: 1.5 },
        Display: { price: 144.00, time: 1.5 },
        Backplate: { price: 36, time: 0.7 },
      },
      color: ['Schwarz', 'Gold', 'Weiß'],
    },
    'P 30 Pro': {
      defects: {
        Akku: { price: 13, time: 1 },
        Backplate: { price: 30, time: 0.7 },
      },
      color: ['Schwarz', 'Blau', 'Breathing Crytal', 'Amber Sunrise'],
    },
    'P 30 Lite': {
      defects: {},
      color: ['Schwarz', 'Blau', 'Weiß'],
    },
    'P 30': {
      defects: {
        Display: { price: 115.00, time: 1.5 },
        Backplate: { price: 35, time: 0.7 },
      },
      color: ['Schwarz', 'Aurora Blue', 'Breathing Crystal'],
    },
    'Mate 20 Pro': {
      defects: {
        Akku: { price: 8.75, time: 1.5 },
        Display: { price: 210.00, time: 1.5 },
        Port: { price: 6, time: 1 },
      },
      color: ['Twilight', 'Schwarz', 'Blau', 'Grün'],
    },
    'Mate 20 Lite': {
      defects: {
        Akku: { price: 8.75, time: 1.5 },
        Display: { price: 60.00, time: 1.5 },
        Backplate: { price: 15, time: 1 },
      },
      color: ['Schwarz', 'Blau', 'Gold'],
    },
    'Mate 20': {
      defects: {
        Display: { price: 105.00, time: 1.5 },
      },
      color: ['Twilight', 'Schwarz', 'Blau'],
    },
  },
}

module.exports = { parts }
