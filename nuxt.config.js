require('dotenv').config()

module.exports = {
  mode: 'universal',
  head: {
    title: 'Wir kaufen dein Handy!',
    titleTemplate: '%s • wirkaufendeinhandy.shop',
    htmlAttrs: { lang: 'de' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    ],
  },
  css: [
    '~/assets/css/loader.css',
  ],
  loading: { color: '#fff' },
  plugins: ['~/plugins/vue-agile'],
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
  ],
  modules: [
    '@nuxtjs/sentry',
    '@nuxtjs/axios',
    ['nuxt-facebook-pixel-module', {
      pixelId: process.env.FACEBOOK_PIXEL_ID,
    }],
    ['@netsells/nuxt-hotjar', {
      id: process.env.HOTJAR_ID,
      sv: 6,
    }],
  ],
  sentry: {
    dsn: process.env.SENTRY_DNS, // Enter your project's DSN here
    config: {}, // Additional config
  },
  axios: {
    prefix: '/api',
    proxyHeaders: false,
  },
  build: {
    transpile: ['countup.js', 'vue-countup-v2', 'vue-agile'],
    extractCSS: true,
    postcss: {
      'postcss-cssnext': {
        browsers: ['last 2 versions', 'ie >= 9'],
      },
    },
  },
}
