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
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
      },
      {
        rel: 'stylesheet',
        // TODO: Reconsider including the entirety of Bootstrap for some typography styles
        href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
      },
    ],
  },
  css: [
    '~/assets/css/main.scss',
    '~/assets/css/toolbox.scss',
  ],
  loading: { color: '#fff' },
  buildModules: [
    '@nuxtjs/eslint-module',
  ],
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    prefix: '/api',
  },
}
