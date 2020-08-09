<template>
  <repair-offer
    v-if="offer.State === 'offer'"
    :offer="offer"
  />
</template>

<script>
import repairOffer from '~/components/repair/repairOffer'
export default {
  components: { repairOffer },
  async asyncData(context) {
    const offer =
      await context.$axios.$post('/repair/getRepair', {
        uId: context.route.params.repairId,
      })
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
