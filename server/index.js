require('dotenv').config()

const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const nuxtConfig = require('../nuxt.config.js')
const app = require('./app')

nuxtConfig.dev = process.env.NODE_ENV !== 'production'

async function start() {
  const nuxt = new Nuxt(nuxtConfig)
  const { host, port } = nuxt.options.server

  await nuxt.ready()
  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(nuxt.render)

  app.listen(port)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  })
}
start()
