const phones = {
  Apple: {
    'iPhone Xs Max': {
      64: {
        price: 610.1428571428571,
      },
      256: {
        price: 676.780487804878,
      },
      512: {
        price: 717.72,
      },
    },
    'iPhone Xs': {
      64: {
        price: 517.5714285714286,
      },
      256: {
        price: 604.0370370370371,
      },
      512: {
        price: 673.1666666666666,
      },
    },
    'iPhone XR': {
      64: {
        price: 490.13513513513516,
      },
      128: {
        price: 541.4473684210526,
      },
      256: {
        price: 622.3703703703703,
      },
    },
    'iPhone X': {
      64: {
        price: 431.525,
      },
      256: {
        price: 486.725,
      },
    },
    'iPhone 8 Plus': {
      64: {
        price: 320.30555555555554,
      },
      128: {
        price: 201.85714285714286,
      },
      256: {
        price: 448.3125,
      },
    },
    'iPhone 8': {
      64: {
        price: 250.73333333333332,
      },
      128: {
        price: 262.14285714285717,
      },
      256: {
        price: 320.82758620689657,
      },
    },
    'iPhone 7 Plus': {
      32: {
        price: 244.4047619047619,
      },
      128: {
        price: 277.0263157894737,
      },
      256: {
        price: 342.2368421052632,
      },
    },
    'iPhone 7': {
      32: {
        price: 147.88235294117646,
      },
      128: {
        price: 179.9655172413793,
      },
      256: {
        price: 268.6764705882353,
      },
    },
    'iPhone 6S Plus': {
      16: {
        price: 173.70967741935485,
      },
      32: {
        price: 205.5,
      },
      64: {
        price: 224.47058823529412,
      },
      128: {
        price: 230.9,
      },
    },
    'iPhone 6S': {
      16: {
        price: 98.53846153846153,
      },
      32: {
        price: 115.5,
      },
      64: {
        price: 128.41176470588235,
      },
      128: {
        price: 150,
      },
    },
    'iPhone 6 Plus': {
      16: {
        price: 150.30434782608697,
      },
      32: {
        price: 205.76190476190476,
      },
      64: {
        price: 179.11764705882354,
      },
      128: {
        price: 211.625,
      },
    },
    'iPhone 6': {
      16: {
        price: 79.45454545454545,
      },
      32: {
        price: 98.73333333333333,
      },
      64: {
        price: 132.8,
      },
      128: {
        price: 138.2,
      },
    },
  },
  Samsung: {
    'Galaxy S10 Plus': {
      128: {
        price: 607,
      },
      512: {
        price: 581.9,
      },
    },
    'Galaxy S10': {
      128: {
        price: 428.13793103448273,
      },
    },
    'Galaxy S10e': {
      128: {
        price: 444.53846153846155,
      },
    },
    'Galaxy S9 Plus': {
      64: {
        price: 317.73333333333335,
      },
    },
    'Galaxy S9': {
      64: {
        price: 235.75862068965517,
      },
    },
    'Galaxy S8 Plus': {
      64: {
        price: 256.76190476190476,
      },
    },
    'Galaxy S8': {
      64: {
        price: 176.5625,
      },
    },
    'Galaxy S7 Edge': {
      32: {
        price: 154.46153846153845,
      },
    },
    'Galaxy S7': {
      32: {
        price: 122.89285714285714,
      },
    },
    'Galaxy S6 Edge': {
      32: {
        price: 143.16666666666666,
      },
      64: {
        price: 158.8,
      },
      128: {
        price: 207.33333333333334,
      },
    },
    'Galaxy S6': {
      32: {
        price: 105.80645161290323,
      },
      64: {
        price: 178.8125,
      },
      128: {
        price: 208.625,
      },
    },
    'Galaxy S5 Neo': {
      16: {
        price: 114.18181818181819,
      },
    },
    'Galaxy S5 mini': {
      16: {
        price: 74.3076923076923,
      },
    },
    'Galaxy S5': {
      16: {
        price: 78.29629629629629,
      },
    },
    'Galaxy Note 10 Plus': {
      256: {
        price: 691.3333333333334,
      },
    },
    'Galaxy Note 10': {
      256: {
        price: 522.3333333333334,
      },
    },
    'Galaxy Note 9': {
      128: {
        price: 378.4047619047619,
      },
      512: {
        price: 468.5,
      },
    },
    'Galaxy Note 8 Duos': {
      64: {
        price: 281,
      },
    },
    'Galaxy Note 8': {
      64: {
        price: 282.05,
      },
    },
    'Galaxy Note 5': {
      32: {
        price: 112.5,
      },
    },
    'Galaxy Note 4': {
      32: {
        price: 141.8235294117647,
      },
    },
    'Galaxy Note 3': {
      16: {
        price: 119.25,
      },
      32: {
        price: 103.7,
      },
    },
    'Galaxy Grand Prime': {
      8: {
        price: 64.4,
      },
    },
    'Galaxy Alpha': {
      32: {
        price: 98.25,
      },
    },
    'Galaxy A80': {},
    'Galaxy A8 (2018)': {
      32: {
        price: 193.85714285714286,
      },
    },
    'Galaxy A70': {
      128: {
        price: 287.6,
      },
    },
    'Galaxy A7 (2018)': {
      64: {
        price: 221.25,
      },
    },
    'Galaxy A7': {
      64: {
        price: 221.25,
      },
    },
    'Galaxy A50': {
      128: {
        price: 240.3,
      },
    },
    'Galaxy A5 (2017)': {
      32: {
        price: 118.46341463414635,
      },
    },
    'Galaxy A5 (2016)': {
      16: {
        price: 102.1,
      },
    },
    'Galaxy A5': {
      16: {
        price: 88.91176470588235,
      },
      32: {
        price: 111.91428571428571,
      },
    },
    'Galaxy A40': {
      64: {
        price: 188.25,
      },
    },
    'Galaxy A3 (2017)': {
      16: {
        price: 105.14285714285714,
      },
    },
    'Galaxy A3 (2016)': {
      16: {
        price: 95.89285714285714,
      },
    },
    'Galaxy A3': {
      16: {
        price: 90.88888888888889,
      },
    },
  },
  LG: {
    V30: {
      64: {
        price: 252.5,
      },
    },
    'Nexus 5': {
      16: {
        price: 121.2,
      },
    },
    'G6 Platinum': {
      32: {
        price: 147.75,
      },
    },
    G6: {
      32: {
        price: 153.125,
      },
    },
    'G5 Titan': {
      32: {
        price: 184.57142857142858,
      },
    },
    G5: {
      32: {
        price: 158.84615384615384,
      },
    },
    G3: {},
    G2: {
      16: {
        price: 66.42857142857143,
      },
    },
  },
  Huawei: {
    'P30 Pro': {
      128: {
        price: 457.3235294117647,
      },
    },
    'P30 lite': {
      128: {
        price: 209.71428571428572,
      },
    },
    P30: {
      128: {
        price: 325.3125,
      },
    },
    'P20 Pro': {
      128: {
        price: 277.775,
      },
    },
    'P20 Lite': {
      64: {
        price: 143.44444444444446,
      },
    },
    P20: {
      64: {
        price: 144.1891891891892,
      },
      128: {
        price: 186.60714285714286,
      },
    },
    'P10 Plus': {
      128: {
        price: 228.05882352941177,
      },
    },
    'P10 Lite': {
      32: {
        price: 106.12903225806451,
      },
    },
    P10: {
      32: {
        price: 108.16666666666667,
      },
      64: {
        price: 168.55172413793105,
      },
    },
    'P9 Lite': {
      16: {
        price: 88.2,
      },
    },
    P9: {
      16: {
        price: 87.7741935483871,
      },
      32: {
        price: 109.41666666666667,
      },
    },
    'P8 Lite 2017': {
      16: {
        price: 76.13333333333334,
      },
    },
    'P8 Lite': {
      16: {
        price: 71.29729729729729,
      },
    },
    P8: {
      16: {
        price: 69.83333333333333,
      },
    },
    'Mate 20 Pro': {
      128: {
        price: 364.0487804878049,
      },
    },
    'Mate 20 Lite': {
      64: {
        price: 164.36,
      },
    },
    'Mate 20': {
      64: {
        price: 156.48,
      },
      128: {
        price: 254.38888888888889,
      },
    },
    'Mate 10 Pro': {
      128: {
        price: 207.67857142857142,
      },
    },
    'Mate 10 Lite': {
      64: {
        price: 173.6,
      },
    },
    'Mate 10': {
      64: {
        price: 170.2,
      },
    },
    'Mate 9': {
      64: {
        price: 176.64285714285714,
      },
    },
    'P Smart': {
      32: {
        price: 119,
      },
      64: {
        price: 150.125,
      },
    },
    'Nova 2': {
      64: {
        price: 143.4,
      },
    },
    Nova: {
      32: {
        price: 104.88888888888889,
      },
      64: {
        price: 143.4,
      },
    },
    'Honor 8': {
      32: {
        price: 95.41666666666667,
      },
    },
  },
  Nokia: {
    'Nokia 8': {
      8: {
        price: 77.82352941176471,
      },
      16: {
        price: 99.23076923076923,
      },
      32: {
        price: 58.6,
      },
    },
    'Nokia 7': {
      8: {
        price: 95.33333333333333,
      },
      16: {
        price: 109,
      },
      32: {
        price: 155.25,
      },
    },
    'Nokia 6': {
      8: {
        price: 101.5,
      },
      16: {
        price: 93.4,
      },
      32: {
        price: 112.05,
      },
    },
    'Nokia 5': {
      8: {
        price: 103.6,
      },
      16: {
        price: 79.26666666666667,
      },
      32: {
        price: 122.4,
      },
    },
    'Nokia 4': {
      8: {
        price: 104.33333333333333,
      },
    },
    'Nokia 3': {
      8: {
        price: 123,
      },
    },
  },
}

module.exports = { phones }
