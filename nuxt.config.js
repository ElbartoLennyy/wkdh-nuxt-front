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
      {
        rel: 'stylesheet',
      },
      {
        rel: 'stylesheet',
        // TODO: Reconsider including the entirety of Bootstrap for some typography styles
        // href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
      },
    ],
  },
  css: [
    '~/assets/css/loader.css',
  ],
  loading: { color: '#fff' },
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
  ],
  modules: [
    '@nuxtjs/sentry',
    '@nuxtjs/axios',
    /*
    ['nuxt-facebook-pixel-module', {
      pixelId: process.env.FACEBOOK_PIXEL_ID,
    }],
    ['@netsells/nuxt-hotjar', {
      id: process.env.HOTJAR_ID,
      sv: 6,
    }], */
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
    extractCSS: true,
  },
}
