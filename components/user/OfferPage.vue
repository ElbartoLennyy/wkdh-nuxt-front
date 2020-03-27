<template>
  <div class="font-sans min-h-screen">
    <div class="md:flex">
      <div class="md:w-1/3 md:min-h-screen p-4 md:p-12 md:pl-16 flex flex-col justify-between">
        <div>
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

          <p class="text-3xl md:text-5xl font-bold w-4/5 mt-8 tracking-tighter leading-none">
            Wir kaufen dein Handy!
          </p>

          <p class="text-2xl md:text-4xl">
            Wir bieten dir
            <b>{{ offer.Price.price }}</b> €
          </p>

          <div class="text-gray-700 text-xs md:w-3/4 pt-4">
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

        <div class="bg-gray-300 shadow rounded-full overflow-hidden mt-10">
          <div
            class="bg-blue-600 h-2 m-1 transition-all duration-300 ease-in-out rounded-full"
            :style="{ width: `${progress}%` }"
          />
        </div>
      </div>
      <div class="md:w-2/3 p-2 h-screen overflow-y-auto">
        <div class="rounded-lg p-6 md:p-12 bg-gray-900 min-h-full">
          <form
            v-if="stage === 1"
            @submit.prevent="next"
          >
            <h2 class="typo-subheader">
              Anrede
            </h2>

            <select id="salutation" v-model="form.Salutation" class="toolbox-field">
              <option value="Herr">
                Herr
              </option>
              <option value="Frau">
                Frau
              </option>
            </select>

            <h2 class="typo-subheader">
              Name
            </h2>

            <div class="toolbox-row">
              <div class="left">
                <input
                  id="firstName"
                  v-model.trim="form.FirstName"
                  class="toolbox-field"
                  type="text"
                  placeholder="Vorname"
                  required
                >
                <p class="typo-caption">
                  Vorname
                </p>
              </div>
              <div class="right">
                <input
                  id="name"
                  v-model.trim="form.Name"
                  class="toolbox-field"
                  type="text"
                  placeholder="Nachname"
                  required
                >
                <p class="typo-caption">
                  Nachname
                </p>
              </div>
              <div class="right">
                <input
                  id="email"
                  v-model.trim="form.Email"
                  class="toolbox-field"
                  type="email"
                  placeholder="Email"
                  required
                >
                <p class="typo-caption">
                  Email
                </p>
              </div>
            </div>

            <button type="submit" class="toolbox-field selected">
              Weiter
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PickupPicker from '~/components/PickupPicker'
import RecaptchaNotice from '~/components/RecaptchaNotice'
import * as values from '~/data/values'
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { PickupPicker, RecaptchaNotice },
  props: {
    offer: { type: Object, required: true },
  },
  data: () => ({
    // TODO: Start at 0 instead of 1 (stage 0 was a loading screen)
    stage: 1,
    values,
    form: {
      Email: '',
      Salutation: 'Herr',
      Name: '',
      FirstName: '',
      Location: '',
      PaymentMethod: 'PayPal',
      PaymentData: '',
      TransportData: '',
      TransportType: 'shipping',
      PickUpPossible: false,
    },
    pickupTime: null,
    validatingAddress: false,
    // TODO: Fix "Adress" typo and weird terminology
    address: {
      Adress: '',
      HouseNumber: '',
      PLZ: '',
      Place: '',
    },
  }),
  computed: {
    progress() {
      return [0, 20, 40, 60, 80][this.stage]
    },
  },
  watch: {
    pickupTime({ date }) {
      this.form.TransportData = date.toISOString()
    },
  },
  methods: {
    async validateAddress() {
      try {
        this.validatingAddress = true
        const { Location, PickUp } = await this.$axios.$post('/offer/validateAddress', this.address)
        // TODO: Move this validation logic to the back-end (and return appropriate status code)
        if (!Location.streetName || !Location.streetNumber) {
          throw new Error('Not enough details!')
        }
        this.form.Location = Location
        this.form.PickUpPossible = PickUp
        this.form.TransportType = PickUp ? 'pickUp' : 'shipping'
        this.next()
      } catch {
        // TODO: Make sure server returns appropriate status code instead of 502
        alert('Die angegebene Adresse scheint nicht zu existieren. Bitte überprüfe deine Eingaben.')
      }
      this.validatingAddress = false
    },
    async validatePaymentData() {
      try {
        const { PaymentMethod, PaymentData } = this.form
        await this.$axios.$post('/offer/validatePaymentData', {
          PaymentMethod, PaymentData,
        })
        this.next()
      } catch {
        // TODO: Make this error message more helpful
        alert('Es gibt ein Problem mit den angegebenen Zahlungsdaten. Bitte überprüfe deine Eingaben.')
      }
    },
    acceptOffer() {
      // eslint-disable-next-line no-undef
      grecaptcha.ready(async() => {
        // eslint-disable-next-line no-undef
        const token = await grecaptcha.execute(process.env.NUXT_ENV_RECAPTCHA_TOKEN, { action: 'acceptOffer' })
        await this.$axios.post('/offer/accept', {
          uID: this.offer.ID,
          data: this.form,
          Token: token,
        })
        this.offer.State = this.form.TransportType
      })
    },
    next() {
      this.stage++
    },
    back() {
      this.stage--
    },
  },
  head: () => ({
    script: [
      {
        src: `https://www.google.com/recaptcha/api.js?render=${process.env.NUXT_ENV_RECAPTCHA_TOKEN}`,
      },
    ],
  }),
}
</script>
