<template>
  <div class="font-sans min-h-screen">
    <div class="md:flex">
      <div class="md:w-1/3 md:min-h-screen p-12 pl-16">
        <div class="flex items-center text-center">
          <img
            class="inline w-5 "
            src="~assets/img/svg/back.svg"
            alt="back button"
          >

          <nuxt-link to="/" @click="back">
            <span class="text-blue-900 font-bold pl-2">Abbrechen</span>
          </nuxt-link>
        </div>

        <p class="text-5xl font-bold w-4/5 mt-8 tracking-tighter leading-none">
          Wähle die passenden Daten für dein Handy aus
        </p>

        <div class="flex items-center text-center pt-6">
          <img
            class="inline w-5 "
            src="~assets/img/svg/help.svg"
            alt="help button"
          >

          <a href="contactUs" target="_blank" class="text-blue-500 hover:text-blue-800 pl-2">
            Hilfe erhalten
          </a>
        </div>

        <div class="text-gray-700 text-xs md:w-2/3 pt-4">
          <p>
            Informationen zur Erhebung, Verarbeitung, Speicherung und Löschung deiner Daten findest du in unserer
            <a
              target="_blank"
              href="privacy"
              class="text-blue-500 hover:text-blue-800"
            >Datenschutzerklärung</a>
          </p>
          <recaptcha-notice class="pt-6" />
        </div>
      </div>
      <div class="md:w-2/3 p-2 h-screen overflow-y-auto">
        <div class="rounded-lg p-6 md:p-12 bg-gray-900">
          <template v-if="stage === 0">
            <p class="text-gray-200">
              Von welcher Marke ist dein Handy?
            </p>
            <button
              v-for="brand in values.brands"
              :key="brand"
              class="mt-3 block w-full"
              @click="selectBrand(brand)"
            >
              <div class="bg-gray-800 hover:bg-gray-700 text-gray-100 p-4 rounded-lg">
                {{ brand }}
              </div>
            </button>
          </template>
          <template v-else-if="stage === 1">
            <p class="text-gray-200">
              Was für ein Modell ist es?
            </p>
            <button
              v-for="phone in values.phones"
              :key="phone"
              class="mt-3 block w-full"
              @click="selectPhone(phone)"
            >
              <div class="bg-gray-800 hover:bg-gray-700 text-gray-100 p-4 rounded-lg">
                {{ phone }}
              </div>
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecaptchaNotice from '~/components/RecaptchaNotice'

import * as values from '~/data/values'

export default {
  components: { RecaptchaNotice },
  asyncData: async context => ({
    brandOptions: await context.$axios.$post('/handy/getData', { Stage: 0 }),
  }),
  data: () => ({
    stage: 0,
    values,
    request: {
      brand: null,
      phone: null,
      storage: null,
      condition: null,
      defects: [],
      accessories: [],
    },
    offer: null,
    priceDetailsShown: false,
  }),
  computed: {
    progress() {
      return [5, 15, 30, 45, 60, 68, 75][this.stage]
    },
  },
  created() {
    // TODO: Find a cleaner way to do this
    this.values.brands = this.brandOptions
  },
  methods: {
    async selectBrand(brand) {
      this.request.brand = brand
      this.values.phones = (
        await this.$axios.$post('/handy/getData', { Stage: 1, Brand: brand })
      ).phones
      this.next()
    },
    selectPhone(phone) {
      this.request.phone = phone
      this.next()
    },
    selectStorage(storage) {
      this.request.storage = parseInt(storage)
      this.next()
    },
    confirmAccessories() {
      this.offer = null
      this.next()

      // eslint-disable-next-line no-undef
      grecaptcha.ready(async() => {
        // eslint-disable-next-line no-undef
        const token = await grecaptcha.execute(
          process.env.NUXT_ENV_RECAPTCHA_TOKEN,
          { action: 'request' },
        )

        const data = await this.$axios.$post('/handy/getPrice', {
          Brand: this.request.brand,
          Phone: this.request.phone,
          Storage: this.request.storage,
          Condition: this.request.condition,
          Defects: this.request.defects,
          Accessorys: this.request.accessories,
          Token: token,
        })

        this.offer = { price: data.Price, id: data.RequestID }
      })
    },
    acceptOffer() {
      this.$axios
        .post('/handy/accept', { ReqID: this.offer.id })
        .then(() => (this.$router.push(`/user/${this.offer.id}`)))
        .catch(error => (this.error = error))
    },
    rejectOffer() {
      this.$axios.post('/handy/reject', { ReqID: this.offer.id }).finally(() => {
        this.$router.push('/ankauf')
      })
    },
    back() {
      this.stage--
    },
    next() {
      this.stage++
    },
  },
  head: () => ({
    title: 'Handyauswahl',
    htmlAttrs: { class: 'toolbox-styles' },
    script: [
      { src: `https://www.google.com/recaptcha/api.js?render=${process.env.NUXT_ENV_RECAPTCHA_TOKEN}` },
    ],
  }),
}
</script>
