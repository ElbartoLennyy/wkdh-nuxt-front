<template>
  <div>
    <div v-if="error" class="w-full bg-red-400 text-center p-2">
      <p>
        Leider ist etwas schief gelaufen. Versuche es erneut oder kontaktiere uns
        <nuxt-link to="/contactUs" class="underline hover:text-gray-600">
          hier
        </nuxt-link>
      </p>
    </div>
    <repair-offer
      v-if="offer.State === 'offer'"
      :offer="offer"
    />
    <status
      v-if="offer.State === 'shipping'"
      :offer="offer"
    />
  </div>
</template>

<script>
import repairOffer from '~/components/repair/repairOffer'
import status from '~/components/repair/status'
export default {
  components: { repairOffer, status },
  async asyncData(context) {
    let error
    if (context.route.query.success !== undefined) {
      if (context.route.query.success !== 'true' || context.route.query.sessionCode === undefined) {
        error = true
      } else {
        try {
          await context.$axios.$post('/checkout/checkSuccess', {
            uId: context.route.params.repairId,
            sessionCode: context.route.query.sessionCode,
          })
        } catch (errorCode) {
          error = true
          console.log(errorCode)
        }
      }
    }
    try {
      const offer =
      await context.$axios.$post('/repair/getRepair', {
        uId: context.route.params.repairId,
      })
      return { offer, error }
    } catch (errorCode) {
      error = true
      return { error }
    }
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
