require('dotenv').config()

module.exports = {
  telemetry: false,
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
    script: [
      { src: 'https://consent.cookiebot.com/uc.js', 'data-cbid': process.env.NUXT_ENV_COOKIE_TOKEN, 'data-blockingmode': 'auto' },
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
    /* ['nuxt-facebook-pixel-module', {
      pixelId: process.env.FACEBOOK_PIXEL_ID,
    }],
    ['@netsells/nuxt-hotjar', {
      id: process.env.HOTJAR_ID,
      sv: 6,
    }],
    */
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
    extend(config, { isDev, isClient }) {
      config.module.rules.forEach((rule) => {
        if (String(rule.test) === String(/\.(png|jpe?g|gif|svg|webp)$/)) {
          // add a second loader when loading images
          rule.use.push({
            loader: 'image-webpack-loader',
            options: {
              svgo: {
                plugins: [
                  // use these settings for internet explorer for proper scalable SVGs
                  // https://css-tricks.com/scale-svg/
                  { removeViewBox: false },
                  { removeDimensions: true },
                ],
              },
            },
          })
        }
      })
    },
  },
}
