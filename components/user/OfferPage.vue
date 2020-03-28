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

        <div class="bg-gray-300 shadow rounded-full overflow-hidden mt-10 md:w-1/2">
          <div
            class="bg-blue-600 h-2 m-1 transition-all duration-300 ease-in-out rounded-full"
            :style="{ width: `${progress}%` }"
          />
        </div>
      </div>
      <div class="md:w-2/3 p-2 h-screen overflow-y-auto">
        <div class="rounded-lg p-6 md:p-12 bg-gray-900 min-h-full">
          <form
            v-if="stage === 0"
            @submit.prevent="next"
          >
            <p class="text-white text-xl">
              Anrede
            </p>

            <select id="salutation" v-model="form.Salutation" class="bg-gray-800 hover:bg-gray-700 text-gray-100 p-4 rounded-lg">
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

            <div class="mt-3 p-4 block w-full bg-gray-800 rounded-lg hover:bg-gray-700">
              <input
                id="firstName"
                v-model.trim="form.FirstName"
                class="bg-transparent text-gray-100 py-4 w-full rounded-lg"
                type="text"
                placeholder="Vorname*"
                required
              >
            </div>
            <p class="text-white text-base font-light mb-4">
              Vorname
            </p>
            <div class="mt-3 p-4 block w-full bg-gray-800 rounded-lg hover:bg-gray-700">
              <input
                id="name"
                v-model.trim="form.Name"
                class="bg-transparent text-gray-100 py-4 w-full rounded-lg"
                type="text"
                placeholder="Nachname*"
                required
              >
            </div>
            <p class="text-white text-base font-light mb-4">
              Nachname
            </p>
            <div class="mt-3 p-4 block w-full bg-gray-800 rounded-lg hover:bg-gray-700">
              <input
                id="email"
                v-model.trim="form.Email"
                class="bg-transparent text-gray-100 py-4 w-full rounded-lg"
                type="email"
                placeholder="Email*"
                required
              >
            </div>
            <p class="text-white text-base font-light mb-4">
              Email
            </p>
            <div class="mt-3 p-4 block w-full bg-gray-800 rounded-lg hover:bg-gray-700">
              <input
                id="phoneNumber"
                v-model.trim="form.PhoneNumber"
                class="bg-transparent text-gray-100 py-4 w-full rounded-lg"
                type="tel"
                placeholder="Telefonnummer"
              >
            </div>
            <p class="text-white text-base font-light mb-4">
              Telefonnummer (optional)
            </p>

            <button
              type="submit"
              class="mt-4 block w-full"
            >
              <div class="bg-gray-100 hover:bg-gray-400 text-black p-4 rounded-lg">
                Weiter
              </div>
            </button>
          </form>
          <form v-else-if="stage === 1" @submit.prevent="validateAddress">
            <p class="text-white text-xl mt-4">
              Adresse
            </p>

            <div class="mt-3 p-4 block w-full bg-gray-800 rounded-lg hover:bg-gray-700">
              <input
                id="Adress"
                v-model.trim="address.Adress"
                class="bg-transparent text-gray-100 py-4 rounded-lg w-full"
                type="text"
                placeholder="Straße, Hausnummer"
                required
                autocomplete="shipping street-address"
              >
            </div>
            <p class="text-white text-base font-light mb-4">
              Straße, Hausnummer
            </p>

            <div class="flex">
              <div class="w-1/3">
                <div class="mt-3 p-4 block w-full bg-gray-800 rounded-lg hover:bg-gray-700">
                  <input
                    id="PLZ"
                    v-model.trim="address.PLZ"
                    class="bg-transparent text-gray-100 py-4 rounded-lg w-full"
                    type="text"
                    placeholder="PLZ"
                    required
                    autocomplete="shipping postal-code"
                  >
                </div>
                <p class="text-white text-base font-light mb-4">
                  Postleitzahl
                </p>
              </div>
              <div class="w-2/3 ml-4">
                <div class="mt-3 p-4 block w-full bg-gray-800 rounded-lg hover:bg-gray-700">
                  <input
                    id="Place"
                    v-model.trim="address.Place"
                    class="bg-transparent text-gray-100 py-4 rounded-lg w-full"
                    type="text"
                    placeholder="Ort"
                    required
                    autocomplete="shipping locality"
                  >
                </div>
                <p class="text-white text-base font-light mb-4">
                  Ort
                </p>
              </div>
            </div>

            <button
              type="submit"
              class="mt-4 block w-full"
              :disabled="validatingAddress"
            >
              <div class="bg-gray-100 hover:bg-gray-400 text-black p-4 rounded-lg">
                Weiter
              </div>
            </button>

            <button
              type="button"
              class="mt-4 block w-full"
              :disabled="validatingAddress"
              @click.prevent="back()"
            >
              <div class="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg">
                Zurück
              </div>
            </button>
          </form>
          <template v-else-if="stage === 2 && form.TransportType === 'pickUp'">
            <p class="text-white text-2xl font-bold">Wir holen dein Handy bei dir Zuhause ab!</p>
            <p class="text-white text-xl">Wähle bitte eine Abholzeit aus</p>
            <pickup-picker v-model="pickupTime" />

            <button
              type="button"
              class="mt-4 block w-full"
              :disabled="pickupTime === null"
              @click.prevent="next()"
            >
              <div
                class="bg-gray-100 hover:bg-gray-400 text-black p-4 rounded-lg"
                :class="pickupTime === null ? 'bg-gray-400' : ''"
              >
                Weiter
              </div>
            </button>

            <button
              type="button"
              class="mt-8 block w-full"
              @click.prevent="form.TransportType = 'shipping' "
            >
              <div class="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-lg w-1/2">
                Willst du dein Handy lieber selber verschicken? - Klicke hier
              </div>
              <p class="text-gray-300">Das Paketlabel würdest du dann am Ende erhalten</p>
            </button>

            <button
              type="button"
              class="mt-4 block w-full"
              :disabled="validatingAddress"
              @click.prevent="back()"
            >
              <div class="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg">
                Zurück
              </div>
            </button>
          </template>
          <template v-else-if="stage === 2 && form.TransportType === 'shipping'">
            <div v-if="pickUpPossible === true">
              <p class="text-white text-2xl">Du willst dein Paket selber verschicken</p>
            </div>
            <div v-if="pickUpPossible === false">
              <p class="text-white text-2xl">Leider bist du nicht in unserem Abholradius und können dein Handy nicht abholen.</p>
              <p class="text-white text-2xl">Du kannst es uns aber kostenlos zuschicken!</p>
            </div>
            <p class="text-white text-xl">Nach dem Abschluss des Verkaufs erhältst du die Versandmarke, sowie eine Versandguideline.</p>

            <button
              type="button"
              class="mt-4 block w-full"
              :disabled="pickupTime === null && form.TransportType === 'pickUp'"
              @click.prevent="next()"
            >
              <div
                class="bg-gray-100 hover:bg-gray-400 text-black p-4 rounded-lg"
              >
                Weiter
              </div>
            </button>

            <button
              v-if="pickUpPossible === true"
              type="button"
              class="mt-8 block w-full"
              @click.prevent="form.TransportType = 'pickUp' "
            >
              <div class="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-lg w-1/2">
                Du willst dein Handy doch lieber Abholen lassen?
              </div>
            </button>

            <button
              type="button"
              class="mt-4 block w-full"
              @click.prevent="back()"
            >
              <div class="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg">
                Zurück
              </div>
            </button>
          </template>
          <form
            v-else-if="stage === 3"
            @submit.prevent="next"
          >
            <p class="text-white text-xl mt-4">
              Wie willst du das Geld erhalten?
            </p>
            <input
              id="PayPal"
              v-model="form.PaymentMethod"
              name="paymentMethod"
              type="radio"
              value="PayPal"
            >
            <label
              class="p-4 rounded-lg block w-full cursor-pointer transform active:scale-98 transition duration-150 ease-in-out"
              for="PayPal"
              :class="form.PaymentMethod === 'PayPal' ? 'bg-gray-200 text-black' : 'bg-gray-800 hover:bg-gray-700 text-gray-100'"
            >PayPal-Gutschrift</label>
            <input
              id="Überweisung"
              v-model="form.PaymentMethod"
              name="paymentMethod"
              type="radio"
              value="Überweisung"
            >
            <label
              class="-mt-4 p-4 rounded-lg block w-full cursor-pointer transform active:scale-98 transition duration-150 ease-in-out"
              for="Überweisung"
              :class="form.PaymentMethod === 'Überweisung' ? 'bg-gray-200 text-black' : 'bg-gray-800 hover:bg-gray-700 text-gray-100'"
            >Überweisung</label>

            <div class="p-4 mt-6 block w-full bg-gray-800 rounded-lg hover:bg-gray-700">
              <input
                id="paymentData"
                v-model.trim="form.PaymentData"
                class="bg-transparent text-gray-100 py-4 w-full rounded-lg"
                :placeholder="form.PaymentMethod === 'PayPal' ? 'PayPal-Emailadresse' : 'IBAN'"
                :type="form.PaymentMethod === 'PayPal' ? 'email' : 'text'"
                required
              >
            </div>
            <p
              v-if="form.PaymentMethod === 'PayPal' && form.PaymentData !== form.Email"
              class="text-sm text-gray-600"
            >
              <button
                type="button"
                class="hover:underline"
                @click="form.PaymentData = form.Email"
              >
                Gleiche Emailadresse (<span
                  class="text-gray-500"
                >{{ form.Email }}</span>) für PayPal verwenden
              </button>
            </p>

            <button
              type="submit"
              class="mt-4 block w-full"
            >
              <div class="bg-gray-100 hover:bg-gray-400 text-black p-4 rounded-lg">
                Weiter
              </div>
            </button>
            <button
              type="button"
              class="mt-4 block w-full"
              :disabled="validatingAddress"
              @click.prevent="back()"
            >
              <div class="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg">
                Zurück
              </div>
            </button>
          </form>
          <template v-else-if="stage === 4">
            <div>
              <p class="text-gray-500 text-lg">
                Dein Handy<br>
                <span class="text-white font-bold text-xl">
                  {{ offer.phone.Brand }} {{ offer.phone.Phone }}
                </span>
              </p>

              <p class="text-gray-500 text-lg ">
                Speicher<br>
                <span class="text-white font-bold text-base">
                  {{ offer.phone.Storage }} Gb
                </span>
              </p>
              <p class="text-gray-500 text-lg ">
                Zustand<br>
                <span class="text-white font-bold text-base">
                  {{ values.conditions[offer.phone.Condition].title }}                </span>
              </p>
              <template v-if="offer.phone.Defects.length >= 1">
                <p class="text-gray-500 text-lg ">
                  Defekte<br>
                  <span class="text-white font-bold text-base">
                    <template v-for="defect in offer.phone.Defects">
                      {{ values.defects[defect].title }}
                      <br :key="defect">
                    </template>
                  </span>
                </p>
              </template>
              <template v-if="offer.phone.Accessorys.length >= 1">
                <p class="text-gray-500 text-lg ">
                  Zubehör<br>
                  <span class="text-white font-bold text-base">
                    <template v-for="accessory in offer.phone.Accessorys">
                      {{ values.accessories[accessory] }}
                      <br :key="accessory">
                    </template>
                  </span>
                </p>
              </template>
            </div>
            <p class="text-white text-xl mt-4">
              Name
            </p>
            <div class="mt-3 p-4 block w-full bg-gray-800 rounded-lg">
              <p
                class="bg-transparent text-gray-100 py-4 w-full rounded-lg"
              >
                {{ form.FirstName }}
              </p>
            </div>
            <div class="mt-3 p-4 block w-full bg-gray-800 rounded-lg">
              <p
                class="bg-transparent text-gray-100 py-4 w-full rounded-lg"
              >
                {{ form.Name }}
              </p>
            </div>
            <div class="mt-3 p-4 block w-full bg-gray-800 rounded-lg">
              <p
                class="bg-transparent text-gray-100 py-4 w-full rounded-lg"
              >
                {{ form.Email }}
              </p>
            </div>
            <template v-if="form.PhoneNumber != ''">
              <div class="mt-3 p-4 block w-full bg-gray-800 rounded-lg">
                <p
                  class="bg-transparent text-gray-100 py-4 w-full rounded-lg"
                >
                  {{ form.PhoneNumber }}
                </p>
              </div>

              <p class="text-white text-xl mt-4">
                Adresse
              </p>
              <div class="mt-3 p-4 block w-full bg-gray-800 rounded-lg">
                <p
                  class="bg-transparent text-gray-100 py-4 w-full rounded-lg"
                >
                  {{ address.Adress }}
                </p>
              </div>
              <p class="text-white text-base font-light mb-4">
                Straße, Hausnummer
              </p>
              <div class="flex">
                <div class="w-1/3">
                  <div class="mt-3 p-4 block w-full bg-gray-800 rounded-lg">
                    <p
                      class="bg-transparent text-gray-100 py-4 w-full rounded-lg"
                    >
                      {{ address.Adress }}
                    </p>
                  </div>
                  <p class="text-white text-base font-light mb-4">
                    Postleitzahl
                  </p>
                </div>
                <div class="w-2/3 ml-4">
                  <div class="mt-3 p-4 block w-full bg-gray-800 rounded-lg">
                    <p
                      class="bg-transparent text-gray-100 py-4 w-full rounded-lg"
                    >
                      {{ address.Adress }}
                    </p>
                  </div>
                  <p class="text-white text-base font-light mb-4">
                    Ort
                  </p>
                </div>
              </div>

              <p v-if="form.TransportType === 'pickUp'" class="text-gray-300">
                Wir holen dein Handy ab am <span class="text-white font-bold">{{ pickupTime.formattedDay }}</span>
                zwischen <span class="text-white font-bold">{{ pickupTime.formattedStartTime }}</span> und <span class="text-white font-bold">{{ pickupTime.formattedEndTime }}</span>
              </p>
              <p v-else-if="form.TransportType === 'shipping'" class="text-gray-300">
                Du verschickst dein Handy selbst. Das Label erhältst du am Ende.
              </p>
              <h2 class="typo-subheader">
                Du erhältst dein Geld via
              </h2>
              <div class="mt-3 p-4 block w-full bg-gray-800 rounded-lg">
                <p
                  class="bg-transparent text-gray-100 py-4 w-full rounded-lg"
                >
                  {{ form.PaymentMethod }}
                </p>
              </div> <div class="mt-3 p-4 block w-full bg-gray-800 rounded-lg">
                <p
                  class="bg-transparent text-gray-100 py-4 w-full rounded-lg"
                >
                  {{ form.PaymentData }}
                </p>
              </div>
            </template>
          </template>
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
  components: { PickupPicker, RecaptchaNotice },
  props: {
    offer: { type: Object, required: true },
  },
  data: () => ({
    // TODO: Start at 0 instead of 1 (stage 0 was a loading screen)
    stage: 0,
    values,
    form: {
      Email: '',
      Salutation: 'Herr',
      Name: '',
      FirstName: '',
      PhoneNumber: '',
      PaymentMethod: 'PayPal',
      PaymentData: '',
      TransportData: '',
      TransportType: 'shipping',
    },
    pickUpPossible: false,
    pickupTime: null,
    validatingAddress: false,
    // TODO: Fix "Adress" typo and weird terminology
    address: {
      Adress: '',
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
    validateAddress() {
      this.validatingAddress = true
      // eslint-disable-next-line no-undef
      grecaptcha.ready(async() => {
        // eslint-disable-next-line no-undef
        const token = await grecaptcha.execute(process.env.NUXT_ENV_RECAPTCHA_TOKEN, { action: 'acceptOffer' })
        try {
          const { Location, PickUp } = await this.$axios.$post('/offer/validateAddress', { uID: this.offer.ID, Adress: this.address, Token: token })
          this.address.Adress = Location.streetName + ' ' + Location.streetNumber
          this.address.PLZ = Location.zipcode
          this.address.Place = Location.city
          this.pickUpPossible = PickUp
          this.form.TransportType = PickUp ? 'pickUp' : 'shipping'
          this.next()
        } catch (error) {
          alert('Die angegebene Adresse scheint nicht zu existieren. Bitte überprüfe deine Eingaben.')
        }
      })

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
