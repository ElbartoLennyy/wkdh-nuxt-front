<template>
  <offer-page
    v-if="state === 'offer'"
    :offer="offer"
    :state="state"
  />
  <pick-up-page
    v-else-if="state === 'pickUp'"
    :state="state"
  />
  <shipping-page
    v-else-if="state === 'shipping'"
    :state="state"
  />
</template>

<script>
import OfferPage from '~/components/user/OfferPage'
import PickUpPage from '~/components/user/PickUpPage'
import ShippingPage from '~/components/user/ShippingPage'

export default {
  components: { OfferPage, PickUpPage, ShippingPage },
  async asyncData(context) {
    const state = (
      await context.$axios.$post('/offer/getState', {
        uID: context.route.params.userId,
      })
    ).Obj
    if (state === 'pickUp' || state === 'shipping') {
      return { state }
    } else if (state === 'offer') {
      const offer = (
        await context.$axios.$post('/offer/getData', {
          uID: context.route.params.userId,
        })
      ).Obj
      return { state, offer }
    }
  },
  head() {
    return {
      title: ({
        offer: 'Angebot',
        pickUp: 'Abholung',
        shipping: 'Versand',
      })[this.state],
      htmlAttrs: { class: 'toolbox-styles' },
      script: [
        {
          src: `https://www.google.com/recaptcha/api.js?render=${process.env.NUXT_ENV_RECAPTCHA_TOKEN}`,
        },
      ],
    }
  },
}
</script>
