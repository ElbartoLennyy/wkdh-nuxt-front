<template>
  <offer-page
    v-if="offer.State === 'offer'"
    :offer="offer"
  />
  <pick-up-page
    v-else-if="offer.State === 'pickUp'"
    :offer="offer"
  />
  <shipping-page
    v-else-if="offer.State === 'shipping'"
    :offer="offer"
  />
</template>

<script>
import OfferPage from '~/components/user/OfferPage'
import PickUpPage from '~/components/user/PickUpPage'
import ShippingPage from '~/components/user/ShippingPage'

export default {
  components: { OfferPage, PickUpPage, ShippingPage },
  async asyncData (context) {
    const offer = (
      await context.$axios.$post('/offer/getData', {
        uID: context.route.params.userId
      })
    ).Obj

    return { offer }
  },
  head () {
    return {
      title: ({
        offer: 'Angebot',
        pickUp: 'Abholung',
        shipping: 'Versand'
      })[this.offer.State],
      htmlAttrs: { class: 'toolbox-styles' },
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
        },
        {
          rel: 'stylesheet',
          // TODO: Reconsider including the entirety of Bootstrap for some typography styles
          href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
        }
      ],
      script: [
        {
          src: `https://www.google.com/recaptcha/api.js?render=${process.env.NUXT_ENV_RECAPTCHA_TOKEN}`
        }
      ]
    }
  }
}
</script>
