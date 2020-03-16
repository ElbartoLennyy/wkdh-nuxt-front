<template>
  <offer-page
    v-if="offer === 'offer'"
    :offer="offer"
  />
  <pick-up-page
    v-else-if="offer === 'pickUp'"
    :offer="offer"
  />
  <shipping-page
    v-else-if="offer === 'shipping'"
    :offer="offer"
  />
</template>

<script>
import OfferPage from '~/components/user/OfferPage'
import PickUpPage from '~/components/user/PickUpPage'
import ShippingPage from '~/components/user/ShippingPage'

export default {
  components: { OfferPage, PickUpPage, ShippingPage },
  async asyncData(context) {
    const offer = (
      await context.$axios.$post('/offer/getState', {
        uID: context.route.params.userId,
      })
    ).Obj

    return { offer }
  },
  head() {
    return {
      title: ({
        offer: 'Angebot',
        pickUp: 'Abholung',
        shipping: 'Versand',
      })[this.offer],
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
