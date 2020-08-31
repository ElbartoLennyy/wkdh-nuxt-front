<template>
  <div class="font-sans min-h-screen">
    <div v-if="error" class="w-full bg-red-400 text-center p-2">
      <p>
        Leider ist etwas schief gelaufen. Versuche es erneut oder kontaktiere uns
        <nuxt-link to="/contactUs" class="underline hover:text-gray-600">
          hier
        </nuxt-link>
      </p>
    </div>
    <div class="md:flex md:overflow-y-hidden">
      <div class="md:w-1/3 md:min-h-screen p-4 md:p-8 md:pl-16 flex flex-col justify-between md:overflow-hidden">
        <div>
          <div class="flex items-center text-center">
            <img
              class="inline w-5 "
              src="~assets/img/svg/back.svg"
              alt="back button"
            >

            <nuxt-link to="/" @click="back">
              <span class="text-yellowDark font-bold pl-2">Abbrechen</span>
            </nuxt-link>
          </div>

          <p class="text-3xl md:text-5xl font-bold w-4/5 mt-8 tracking-tighter leading-none">
            Wir reparieren dein Handy!
          </p>

          <p class="text-2xl md:text-4xl">
            Dein Preis:
            <b>{{ offer.repairData.price }}</b> €
          </p>

          <nuxt-link to="/contactUs" target="_blank" class="md:pt-4 flex text-yellowDark hover:text-yellowLight">
            <img
              class="w-5 mr-2"
              src="~assets/img/svg/help.svg"
              alt="help button"
            >

            Hilfe erhalten
          </nuxt-link>

          <div class="text-gray-700 text-xs md:w-3/4 pt-4">
            <p>
              Informationen zur Erhebung, Verarbeitung, Speicherung und Löschung deiner Daten findest du in unserer
              <a
                target="_blank"
                href="/privacy"
                class="text-yellowDark hover:text-yellowLight"
              >Datenschutzerklärung</a>
            </p>
            <recaptcha-notice class="pt-4 md:pt-6" />
            <div class="pt-4 md:pt-6 flex">
              <img
                class="inline w-1/5 object-scale-down"
                src="~assets/img/icons/Lets_encrypt-logo.png"
                alt="help button"
              >
              <p class="w-4/5 m-auto">
                Deine Daten sind sicher! Die Website wird durch ein Let’s Encrypt-Zertifikat SSL verschlüsselt.
              </p>
            </div>
          </div>
          <div class="text-center hidden md:block">
            <p class="p-1 text-lg">1. Datenangabe <img class="inline-block h-4" src="~assets/img/icons/green-check-icon.png"></p>
            <img class="object-center inline-block h-4" src="~assets/img/icons/further-icon.png">

            <p class="p-1 text-lg">2. Überprüfung <img v-if="stage >=1" class="inline-block h-4" src="~assets/img/icons/green-check-icon.png"></p>
            <img class="object-center inline-block h-4" src="~assets/img/icons/further-icon.png">

            <p class="p-1 text-lg">3. Bezahlung <img v-if="stage >=2" class="inline-block h-4" src="~assets/img/icons/green-check-icon.png"></p>
          </div>
        </div>
        <div>
          <div class="text-center md:hidden">
            <p v-if="stage==0" class="text-base font-bold -mb-4">2. Versand</p>
            <p v-if="stage==1" class="text-base font-bold -mb-4">3. Auszahlung </p>
            <p v-if="stage==2" class="text-base font-bold -mb-4">4. Zusammenfassung </p>
            <p v-if="stage==3" class="text-base font-bold -mb-4">Fast Fertig <img class="inline-block h-4" src="~assets/img/icons/green-check-icon.png"></p>
          </div>
        </div>

        <div class="bg-gray-300 shadow rounded-full overflow-hidden mt-10 md:hidden">
          <div
            class="bg-yellowLight h-2 m-1 transition-all duration-300 ease-in-out rounded-full"
            :style="{ width: `${progress}%` }"
          />
        </div>
      </div>
      <div class="md:w-2/3 p-2 h-screen md:overflow-y-auto">
        <div class="rounded-lg p-6 md:p-12 bg-yellowDark min-h-full text-left">
          <form
            v-if="stage === 0"
            @submit.prevent="next"
          >
            <p class="text-white text-xl">
              Anrede
            </p>

            <select id="salutation" v-model="form.Salutation" class="bg-white hover:bg-gray-300 text-black p-4 rounded-md">
              <option value="Herr">
                Herr
              </option>
              <option value="Frau">
                Frau
              </option>
            </select>

            <p class="text-white text-xl mt-4">
              Name
            </p>
            <div class="flex w-full">
              <div class="w-1/3">
                <input
                  id="firstName"
                  v-model.trim="form.FirstName"
                  class="mt-3 p-4 block w-full bg-white rounded-md hover:bg-gray-300 text-black py-3"
                  type="text"
                  placeholder="Vorname*"
                  required
                >
                <p class="text-white text-base font-light mb-4 mt-1">
                  Vorname
                </p>
              </div>
              <div class="ml-4 w-2/3">
                <input
                  id="name"
                  v-model.trim="form.Name"
                  class="mt-3 p-4 block w-full bg-white rounded-md hover:bg-gray-300 text-black py-3"
                  type="text"
                  placeholder="Nachname*"
                  required
                >
                <p class="text-white text-base font-light mb-4 mt-1">
                  Nachname
                </p>
              </div>
            </div>

            <p class="text-white text-xl mt-4">
              Adresse
            </p>

            <input
              id="Adress"
              v-model.trim="address.Adress"
              class="mt-3 p-4 block w-full bg-white rounded-md hover:bg-gray-300 text-black py-3"
              type="text"
              placeholder="Straße, Hausnummer*"
              required
              autocomplete="shipping street-address"
              @blur="validateAdress"
            >
            <p class="text-white text-base font-light mb-4 mt-1">
              Straße, Hausnummer
            </p>

            <div class="flex">
              <div class="w-1/3">
                <input
                  id="PLZ"
                  v-model.trim="address.PLZ"
                  class="mt-3 p-4 block w-full bg-white rounded-md hover:bg-gray-300 text-black py-3"
                  type="text"
                  placeholder="PLZ*"
                  required
                  autocomplete="shipping postal-code"
                  @blur="validateAdress"
                >
                <p class="text-white text-base font-light mb-4 mt-1">
                  Postleitzahl
                </p>
              </div>
              <div class="w-2/3 ml-4">
                <input
                  id="Place"
                  v-model.trim="address.Place"
                  class="mt-3 p-4 block w-full bg-white rounded-md hover:bg-gray-300 text-black py-3"
                  type="text"
                  placeholder="Ort*"
                  required
                  autocomplete="shipping locality"
                  @blur="validateAdress"
                >
                <p class="text-white text-base font-light mb-4 mt-1">
                  Ort
                </p>
              </div>
            </div>
            <p v-if="adressError" class="text-red-700 font-bold text-sm">Die angegebene Adresse scheint nicht zu existieren. Bitte überprüfe deine Eingaben.</p>
            <p class="text-white text-xl mt-4">
              Kontakt
            </p>

            <input
              id="email"
              v-model.trim="form.Email"
              class="mt-3 p-4 block w-full bg-white rounded-md hover:bg-gray-300 text-black py-3"
              type="email"
              placeholder="Email*"
              required
            >
            <p class="text-white text-base font-light mb-4 mt-1">
              Email
            </p>
            <input
              id="phoneNumber"
              v-model.trim="form.PhoneNumber"
              class="mt-3 p-4 block w-full bg-white rounded-md hover:bg-gray-300 text-black py-3"
              type="tel"
              placeholder="Telefonnummer"
            >
            <p class="text-white text-base font-light mb-4 mt-1">
              Telefonnummer (optional)
            </p>

            <p class="text-white text-xl mt-4">
              Transportart
            </p>

            <div class="p-4 w-full bg-gray-100 mb-2 rounded-md text-black py-3 flex justify-between" @click="shippingInformationIsOpen = !shippingInformationIsOpen">
              <p>
                Kostenlos verschicken <img class="inline-block h-6 object-scale-down" src="~assets/img/svg/DHL_logo_rgb.svg">
              </p>
              <img
                class="w-5 inline"
                src="~assets/img/svg/help.svg"
                alt="help button"
              >
            </div>

            <div v-if="shippingInformationIsOpen" class="fixed top-0 bottom-0 left-0 right-0 m-12 md:m-16 p-4 rounded-lg bg-white z-30">
              <button class="absolute top-0 right-0 p-2" @click="shippingInformationIsOpen = false">X</button>
              <div class=" flex flex-col justify-around w-full h-full">
                <p>1. Du erhältst das Versandlabel nach Verkaufsabschluss via Mail.</p>
                <p>2. Packe dein Paket, prüfe noch einmal das alles dabei ist und klebe es zu.</p>
                <p>3. Drucke das Label an einem Drucker aus.</p>
                <p>4. Klebe das Label gut sichtbar auf dein Paket.</p>
                <p>5. Bringe das Paket zu einem DPD-Paketshop.</p>
                <button class="bg-yellowDark rounded-lg p-2 text-white" @click="shippingInformationIsOpen = false">Zurück zum Verkauf</button>
              </div>
            </div>
            <button v-if="shippingInformationIsOpen" class="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-25 w-full h-full z-20 cursor-default" @click="shippingInformationIsOpen = false" />

            <label class="flex text-white">
              <input class="mr-2 mt-1" type="checkbox" required>
              <span class="text-sm">
                Mit der Bestätigung meiner Daten erkläre ich mich mit den
                <nuxt-link class="underline hover:text-gray-400" to="/agb" target="_blank">AGB</nuxt-link> von Wirkaufendeinhandy.shop einverstanden und habe die <nuxt-link class="underline hover:text-gray-400" to="/privacy" target="_blank">
                  Datenschutzhinweise</nuxt-link> zur Kenntnis genommen
              </span>
            </label>

            <button
              type="submit"
              class="mt-4 block w-full"
              :disabled="adressError"
            >
              <div class="bg-gray-200 hover:bg-gray-400 font-bold p-4 rounded-md text-left">
                Weiter
              </div>
            </button>
          </form>
          <div v-else-if="stage === 1">
            <div>
              <p class="text-white text-2xl mb-4 font-bold text-center">
                Bitte überprüfe noch einmal deine Daten
              </p>

              <div class="md:flex">
                <div
                  class="mb-3 block text-left md:w-1/3"
                >
                  <div class="bg-gray-200 text-yellowDark font-bold p-4 rounded-lg">
                    {{ offer.repairData.brand }}
                  </div>
                </div>
                <div
                  class="mb-3 block text-left md:w-1/3 md:ml-4"
                >
                  <div class="bg-gray-200 text-yellowDark font-bold p-4 rounded-lg">
                    {{ offer.repairData.phone }}
                  </div>
                </div>
                <div
                  class="mb-3 block text-left md:w-1/3 md:ml-4"
                >
                  <div class="bg-gray-200 text-yellowDark font-bold p-4 rounded-lg">
                    {{ offer.repairData.color }}
                  </div>
                </div>
                <div
                  class="mb-3 block text-left md:w-1/3 md:ml-4"
                >
                  <div class="bg-gray-200 text-yellowDark font-bold p-4 rounded-lg">
                    {{ offer.repairData.defects.join() }}
                  </div>
                </div>
              </div>
            </div>
            <p class="text-white text-xl mt-4">
              Name
            </p>
            <div class="flex">
              <p
                class="w-1/2 mt-3 p-4 block bg-white rounded-md hover:bg-gray-300 text-black py-3"
              >
                {{ form.FirstName }}
              </p>
              <p
                class="w-1/2 ml-4 mt-3 p-4 block bg-white rounded-md hover:bg-gray-300 text-black py-3"
              >
                {{ form.Name }}
              </p>
            </div>
            <p
              class="mt-3 p-4 block w-full bg-white rounded-md hover:bg-gray-300 text-black py-3"
            >
              {{ form.Email }}
            </p>
            <template v-if="form.PhoneNumber != ''">
              <p
                class="mt-3 p-4 block w-full bg-white rounded-md hover:bg-gray-300 text-black py-3"
              >
                {{ form.PhoneNumber }}
              </p>
            </template>
            <p class="text-white text-xl mt-4">
              Adresse
            </p>
            <p
              class="mt-3 p-4 block w-full bg-white rounded-md hover:bg-gray-300 text-black py-3 w-full rounded-md"
            >
              {{ address.Adress }}
            </p>
            <p class="text-white text-base font-light mb-4">
              Straße, Hausnummer
            </p>
            <div class="flex">
              <div class="w-1/3">
                <p
                  class="mt-3 p-4 block w-full bg-white rounded-md hover:bg-gray-300 text-black py-3 w-full rounded-md"
                >
                  {{ address.PLZ }}
                </p>
                <p class="text-white text-base font-light mb-4">
                  Postleitzahl
                </p>
              </div>
              <div class="w-2/3 ml-4">
                <p
                  class="mt-3 p-4 block w-full bg-white rounded-md hover:bg-gray-300 text-black py-3 w-full rounded-md"
                >
                  {{ address.Place }}
                </p>
                <p class="text-white text-base font-light mb-4">
                  Ort
                </p>
              </div>
            </div>

            <button
              type="submit"
              class="mt-4 block w-full"
              :disabled="loadingData"
              @click="next"
            >
              <div class="bg-gray-200 hover:bg-gray-400 font-bold p-4 rounded-md text-left">
                Weiter zur Bezahlung
              </div>
            </button>

            <button
              type="button"
              class="mt-4 block w-full"
              :disabled="validatingAddress"
              @click.prevent="back()"
            >
              <div class="bg-white hover:bg-gray-300 p-4 rounded-lg text-left text-yellowDark">
                Zurück
              </div>
            </button>
          </div>
          <div v-if="stage === 2">
            <p class="text-white font-bold">Wähle deine Zahlungsmethode aus</p>
            <button
              id="checkout-button"
              class="bg-gray-200 hover:bg-gray-300 p-2 rounded-md text-left font-bold block w-full mt-4 flex justify-center space-x-2 max-w-screen-payPalButton"
              @click="finishPaymentStripe"
            >
              <img class=" my-auto inline-block h-6 mr-2" src="~assets/img/icons/Visa_inc.png" alt="Visa"> <img class=" my-auto inline-block h-10 mr-2" src="~assets/img/svg/mc_vrt_pos.svg" alt="Mastercard"><img class=" my-auto inline-block h-8 mr-2" src="~assets/img/icons/giropay.png" alt="giropay"> <img class=" my-auto inline-block h-8 mr-2" src="~assets/img/icons/IDEAL.png" alt="IDEAL">
            </button>
            <div id="paypal-button-container" ref="paypalButton" class="max-w-screen-payPalButton mt-4" />

            <button
              type="button"
              class="mt-4 w-full max-w-screen-payPalButton"
              :disabled="validatingAddress"
              @click.prevent="back()"
            >
              <div class="bg-white hover:bg-gray-300 p-4 rounded-lg text-left text-yellowDark">
                Zurück
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js'
import RecaptchaNotice from '~/components/RecaptchaNotice'
import * as values from '~/data/values'

export default {
  components: { RecaptchaNotice },
  props: {
    offer: { type: Object, required: true },
  },
  fetch() {
    if (this.offer.personalDataIsAvaible === true) {
      this.form.Email = this.offer.data.Email
      this.form.Salutation = this.offer.data.Salutation
      this.form.Name = this.offer.data.Name
      this.form.FirstName = this.offer.data.FirstName

      this.address.Adress = `${this.offer.Location.streetName} ${this.offer.Location.streetNumber}`
      this.address.PLZ = this.offer.Location.zipcode
      this.address.Place = this.offer.Location.city

      if (this.offer.PaymentMethod !== '') {
        this.form.PaymentMethod = this.offer.PaymentMethod
        this.form.PaymentData = this.offer.PaymentData
      }
      if (this.offer.data.PhoneNumber !== '') {
        this.form.PhoneNumber = this.offer.data.PhoneNumber
      }
    }
  },
  data: () => ({
    stage: 0,
    values,
    shippingInformationIsOpen: false,
    form: {
      Email: '',
      Salutation: 'Herr',
      Name: '',
      FirstName: '',
      PhoneNumber: '',
      PaymentData: '',
      TransportData: '',
    },
    validatingAddress: false,
    adressError: false,
    paymentDataError: null,
    address: {
      Adress: '',
      PLZ: '',
      Place: '',
    },
    session_id: null,
    payPalSession: null,
    error: null,
    loadingData: false,
  }),
  computed: {
    progress() {
      return [25, 50, 75, 99][this.stage]
    },
  },
  methods: {
    validateAdress() {
      if (this.address.Adress !== '' && this.address.PLZ !== '' && this.address.Place !== '') {
        // eslint-disable-next-line no-undef
        grecaptcha.ready(async() => {
          // eslint-disable-next-line no-undef
          const token = await grecaptcha.execute(process.env.NUXT_ENV_RECAPTCHA_TOKEN, { action: 'acceptOffer' })
          try {
            const { location } = await this.$axios.$post('/repair/validateAdress', { uID: this.offer.ID, Adress: this.address, token })
            this.address.Adress = location.streetName + ' ' + location.streetNumber
            this.address.PLZ = location.zipcode
            this.address.Place = location.city
            this.adressError = false
          } catch (error) {
            this.adressError = true
          }
        })

        this.validatingAddress = false
      }
    },
    async next() {
      if (this.stage === 0) {
        this.$axios.post('/repair/updatePersonalData', {
          uID: this.offer.ID,
          data: this.form,
        })
      } else if (this.stage === 1) {
        this.loadingData = true
        try {
          const sessionID = await this.$axios.post('/checkout/createCheckoutSession', {
            uId: this.offer.ID,
          })
          this.session_id = sessionID.data.session_id
          this.payPalSession = sessionID.data.payPalSession.orderID
          this.loadingData = false
        } catch (error) {
          this.error = true
          this.back()
        }
      }
      this.stage++

      if (this.stage === 2) {
        const payPalSession = this.payPalSession
        const uId = this.offer.ID
        const axios = this.$axios
        const router = this.$router
        this.$nextTick(() => {
          // eslint-disable-next-line no-undef
          paypal.Buttons({
            style: {
              color: 'silver',
            },
            createOrder(data, actions) {
              return payPalSession
            },
            onApprove(data) {
              return axios.post('/checkout/checkPayPalTransaction', {
                orderID: data.orderID,
                uId,
              }).then((res) => {
                if (res.data) {
                  router.go()
                } else {
                  alert('Ein fehler ist aufgetreten')
                }
              })
            },
          }).render(this.$refs.paypalButton)
        })
      }
    },
    back() {
      this.stage--
    },
    async finishPaymentStripe() {
      const stripe = await loadStripe(process.env.NUXT_ENV_STRIPE_PK)
      stripe.redirectToCheckout({
        sessionId: this.session_id,
      })
    },
  },
  head: () => ({
    script: [
      {
        src: `https://www.google.com/recaptcha/api.js?render=${process.env.NUXT_ENV_RECAPTCHA_TOKEN}`,
      }, {
        src: 'https://www.paypal.com/sdk/js?client-id=Ab6GLEFNhy_P1Eg_3KVd8tijXaaw6sQQ5Id-mD8RquZYihy-38itqdjvuiqWrUl_erWI2Z33i1hFl0xI&currency=EUR&disable-funding=credit,card,bancontact,blik,eps,giropay,ideal,mybank,p24,sepa,venmo&buyer-country=DE&locale=de_DE',
      },
    ],
  }),
}
</script>
