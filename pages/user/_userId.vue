<template>
  <offer-page
    v-if="offer.userData.State === 'offer'"
    :offer="offer.userData"
  />
  <shipping-page
    v-else-if="offer.userData.State === 'shipping'"
    :offer="offer.userData"
  />
</template>

<script>
import OfferPage from '~/components/user/OfferPage'
import ShippingPage from '~/components/user/ShippingPage'
export default {
  components: { OfferPage, ShippingPage },
  async asyncData(context) {
    const offer = (
      await context.$axios.$post('/offer/getData', {
        uID: context.route.params.userId,
      })
    )
    console.log(offer)
    return { offer }
  },
  head() {
    return {
      title: ({
        offer: 'Angebot',
        shipping: 'Versand',
      })[this.offer.State],
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
