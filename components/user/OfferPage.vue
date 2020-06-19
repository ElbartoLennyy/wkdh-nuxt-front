<template>
  <div class="font-sans min-h-screen">
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
            Wir kaufen dein Handy!
          </p>

          <p class="text-2xl md:text-4xl">
            Wir bieten dir
            <b>{{ offer.Price.price }}</b> €
          </p>

          <div class="flex items-center text-center md:pt-4">
            <img
              class="inline w-5 "
              src="~assets/img/svg/help.svg"
              alt="help button"
            >

            <nuxt-link to="/contactUs" target="_blank" class="text-yellowDark hover:text-yellowLight pl-2">
              Hilfe erhalten
            </nuxt-link>
          </div>

          <div class="text-gray-700 text-xs md:w-3/4 pt-4">
            <p>
              Informationen zur Erhebung, Verarbeitung, Speicherung und Löschung deiner Daten findest du in unserer
              <a
                target="_blank"
                href="privacy"
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
            <p class="p-1 text-lg">1. Handyauswahl <img class="inline-block h-4" src="~assets/img/icons/green-check-icon.png"></p>
            <img class="object-center inline-block h-4" src="~assets/img/icons/further-icon.png">

            <p class="p-1 text-lg">2. Versand <img v-if="stage >=1" class="inline-block h-4" src="~assets/img/icons/green-check-icon.png"></p>
            <img class="object-center inline-block h-4" src="~assets/img/icons/further-icon.png">

            <p class="p-1 text-lg">3. Auszahlung <img v-if="stage >=2" class="inline-block h-4" src="~assets/img/icons/green-check-icon.png"></p>
            <img class="object-center inline-block h-4" src="~assets/img/icons/further-icon.png">
            <p class="p-1 text-lg">4. Zusammenfassung <img v-if="stage >=3" class="inline-block h-4" src="~assets/img/icons/green-check-icon.png"></p>
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

            <select id="salutation" v-model="form.Salutation" class="bg-white hover:bg-yellowLight hover:text-white text-black p-4 rounded-md">
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
                  class="mt-3 p-4 block w-full bg-white rounded-md hover:bg-yellowLight hover:text-white text-black py-3 w-full rounded-md"
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
                  class="mt-3 p-4 block w-full bg-white rounded-md hover:bg-yellowLight hover:text-white text-black py-3 w-full rounded-md"
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
              class="mt-3 p-4 block w-full bg-white rounded-md hover:bg-yellowLight hover:text-white text-black py-3 w-full rounded-md"
              type="text"
              placeholder="Straße, Hausnummer*"
              required
              autocomplete="shipping street-address"
              @blur="checkPickUp"
            >
            <p class="text-white text-base font-light mb-4 mt-1">
              Straße, Hausnummer
            </p>

            <div class="flex">
              <div class="w-1/3">
                <input
                  id="PLZ"
                  v-model.trim="address.PLZ"
                  class="mt-3 p-4 block w-full bg-white rounded-md hover:bg-yellowLight hover:text-white text-black py-3 w-full rounded-md"
                  type="text"
                  placeholder="PLZ*"
                  required
                  autocomplete="shipping postal-code"
                  @blur="checkPickUp"
                >
                <p class="text-white text-base font-light mb-4 mt-1">
                  Postleitzahl
                </p>
              </div>
              <div class="w-2/3 ml-4">
                <input
                  id="Place"
                  v-model.trim="address.Place"
                  class="mt-3 p-4 block w-full bg-white rounded-md hover:bg-yellowLight hover:text-white text-black py-3 w-full rounded-md"
                  type="text"
                  placeholder="Ort*"
                  required
                  autocomplete="shipping locality"
                  @blur="checkPickUp"
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
              class="mt-3 p-4 block w-full bg-white rounded-md hover:bg-yellowLight hover:text-white text-black py-3 w-full rounded-md"
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
              class="mt-3 p-4 block w-full bg-white rounded-md hover:bg-yellowLight hover:text-white text-black py-3 w-full rounded-md"
              type="tel"
              placeholder="Telefonnummer"
            >
            <p class="text-white text-base font-light mb-4 mt-1">
              Telefonnummer (optional)
            </p>

            <p class="text-white text-xl mt-4">
              Transportart
            </p>
            <p class="p-4 w-full bg-gray-100 mb-2 rounded-md text-black py-3 rounded-md">Kostenlos verschicken <img class="inline-block h-6 object-scale-down" src="~assets/img/icons/dpd-logo.png"> </p>

            <p class="text-green-600 font-bold text-sm">Du verschickst dein Handy kostenlos selber</p>
            <p class="text-green-600 font-bold text-sm">Das Label erhältst du nach Abschluss</p>

            <button
              type="submit"
              class="mt-4 block w-full"
              :disabled="adressError"
            >
              <div class="bg-gray-200 hover:bg-gray-400 text-yellowDark font-bold p-4 rounded-md text-left">
                Weiter
              </div>
            </button>
          </form>
          <form v-else-if="stage === 1" @submit.prevent="validatePaymentData">
            <p class="text-white text-xl mt-4">
              Wie willst du das Geld erhalten?
            </p>
            <p class="text-white text-base font-light mb-4 mt-1">
              Das Geld bekommst du nachdem dein Handy überprüft wurde direkt ausgezahlt.
            </p>
            <input
              id="PayPal"
              v-model="form.PaymentMethod"
              name="paymentMethod"
              type="radio"
              class="appearance-none"
              value="PayPal"
            >
            <label
              class="p-4 rounded-lg block w-full cursor-pointer transform active:scale-98 transition duration-150 ease-in-out text-lg"
              for="PayPal"
              :class="form.PaymentMethod === 'PayPal' ? 'bg-yellowLight text-white' : 'bg-gray-200 hover:text-black hover:bg-gray-400 text-yellowDark font-bold'"
            ><img class="inline-block h-10 mr-2" src="~assets/img/icons/paypal-logo.png" alt="PayPal">Gutschrift</label>
            <input
              id="Überweisung"
              v-model="form.PaymentMethod"
              name="paymentMethod"
              type="radio"
              class="appearance-none"
              value="Überweisung"
            >
            <label
              class="-mt-4 p-4 rounded-lg block w-full cursor-pointer transform active:scale-98 transition duration-150 ease-in-out text-lg"
              for="Überweisung"
              :class="form.PaymentMethod === 'Überweisung' ? 'bg-yellowLight text-white' : 'bg-gray-200 hover:text-black hover:bg-gray-400 text-yellowDark font-bold'"
            ><img class="inline-block h-10 mr-2" src="~assets/img/icons/baseline_account_balance_black_24dp.png" alt="Bankkonto">Überweisung auf dein Bankkonto</label>

            <input
              id="paymentData"
              v-model.trim="form.PaymentData"
              class="mt-3 p-4 block w-full bg-white rounded-md hover:bg-yellowLight hover:text-white text-black py-3 w-full rounded-md"
              :placeholder="form.PaymentMethod === 'PayPal' ? 'PayPal-Emailadresse' : 'IBAN'"
              :type="form.PaymentMethod === 'PayPal' ? 'email' : 'text'"
              required
            >
            <p
              v-if="form.PaymentMethod === 'PayPal' && form.PaymentData !== form.Email"
              class="text-sm text-gray-900"
            >
              <button
                type="button"
                class="hover:underline text-left"
                @click="form.PaymentData = form.Email"
              >
                Gleiche Emailadresse (<span
                  class="text-gray-700"
                >{{ form.Email }}</span>) für PayPal verwenden
              </button>
            </p>

            <p v-if="paymentDataError" class="text-red-500 text-sm">Bitte überprüfe deine Daten um die Auszahlung zu erhalten</p>

            <button
              type="submit"
              class="mt-4 block w-full"
            >
              <div class="bg-gray-200 hover:bg-gray-400 text-yellowDark font-bold p-4 rounded-lg text-left">
                Weiter
              </div>
            </button>

            <button
              type="button"
              class="mt-4 block w-full"
              :disabled="validatingAddress"
              @click.prevent="back()"
            >
              <div class="bg-white hover:bg-yellowLight hover:text-white p-4 rounded-lg text-left">
                Zurück
              </div>
            </button>
          </form>
          <div v-else-if="stage === 2">
            <div>
              <p class="text-white text-2xl mb-4 font-bold text-center">
                Bitte überprüfe noch einmal deine Daten
              </p>
              <p class="text-gray-700 text-lg">
                Dein Handy<br>
                <span class="text-white font-bold text-xl">
                  {{ offer.phone.Brand }} {{ offer.phone.Phone }}
                </span>
              </p>

              <p class="text-gray-700 text-lg ">
                Speicher<br>
                <span class="text-white font-bold text-base">
                  {{ offer.phone.Storage }} Gb
                </span>
              </p>
              <p class="text-gray-700 text-lg ">
                Zustand<br>
                <span class="text-white font-bold text-base">
                  {{ values.conditions[offer.phone.Condition].title }}
                </span>
              </p>
              <template v-if="offer.phone.Defects.length >= 1">
                <p class="text-gray-700 text-lg ">
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
                <p class="text-gray-700 text-lg ">
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
            <div class="flex">
              <p
                class="w-1/2 mt-3 p-4 block w-full bg-white rounded-md hover:bg-yellowLight hover:text-white text-black py-3 w-full rounded-md"
              >
                {{ form.FirstName }}
              </p>
              <p
                class="w-1/2 ml-4 mt-3 p-4 block w-full bg-white rounded-md hover:bg-yellowLight hover:text-white text-black py-3 w-full rounded-md"
              >
                {{ form.Name }}
              </p>
            </div>
            <p
              class="mt-3 p-4 block w-full bg-white rounded-md hover:bg-yellowLight hover:text-white text-black py-3 w-full rounded-md"
            >
              {{ form.Email }}
            </p>
            <template v-if="form.PhoneNumber != ''">
              <p
                class="mt-3 p-4 block w-full bg-white rounded-md hover:bg-yellowLight hover:text-white text-black py-3 w-full rounded-md"
              >
                {{ form.PhoneNumber }}
              </p>
            </template>
            <p class="text-white text-xl mt-4">
              Adresse
            </p>
            <p
              class="mt-3 p-4 block w-full bg-white rounded-md hover:bg-yellowLight hover:text-white text-black py-3 w-full rounded-md"
            >
              {{ address.Adress }}
            </p>
            <p class="text-white text-base font-light mb-4">
              Straße, Hausnummer
            </p>
            <div class="flex">
              <div class="w-1/3">
                <p
                  class="mt-3 p-4 block w-full bg-white rounded-md hover:bg-yellowLight hover:text-white text-black py-3 w-full rounded-md"
                >
                  {{ address.PLZ }}
                </p>
                <p class="text-white text-base font-light mb-4">
                  Postleitzahl
                </p>
              </div>
              <div class="w-2/3 ml-4">
                <p
                  class="mt-3 p-4 block w-full bg-white rounded-md hover:bg-yellowLight hover:text-white text-black py-3 w-full rounded-md"
                >
                  {{ address.Place }}
                </p>
                <p class="text-white text-base font-light mb-4">
                  Ort
                </p>
              </div>
            </div>
            <p class="text-gray-800">
              Du verschickst dein Handy selbst. Das Label erhältst du am Ende.
            </p>
            <p class="text-gray-800 text-sm">
              Du erhältst dein Geld via
            </p>
            <p
              class="mt-3 p-4 block w-full bg-white rounded-md hover:bg-yellowLight hover:text-white text-black py-3 w-full rounded-md"
            >
              {{ form.PaymentMethod }}
            </p>
            <p
              class="mt-3 p-4 block w-full bg-white rounded-md hover:bg-yellowLight hover:text-white text-black py-3 w-full rounded-md"
            >
              {{ form.PaymentData }}
            </p>
            <button
              class="mt-4 block w-full"
              @click="next"
            >
              <div class="bg-gray-200 hover:bg-gray-400 text-yellowDark font-bold p-4 rounded-lg text-left">
                Weiter
              </div>
            </button>
            <button
              type="button"
              class="mt-4 block w-full"
              :disabled="validatingAddress"
              @click.prevent="back()"
            >
              <div class="bg-white hover:bg-yellowLight hover:text-white p-4 rounded-lg text-left">
                Zurück
              </div>
            </button>
          </div>
          <form v-else-if="stage === 3" @submit.prevent="acceptOffer">
            <p class="text-white text-xl mt-4">
              Bitte bestätige folgendes
            </p>

            <input
              id="privacy"
              v-model="endCheckbox"
              type="checkbox"
              class="appearance-none"
              value="privacy"
              required
            >
            <label
              class="p-4 rounded-md block w-full cursor-pointer transform active:scale-98 transition duration-150 ease-in-out"
              :class="endCheckbox.includes('privacy') ? 'bg-yellowLight text-white' : 'bg-gray-200 hover:text-black hover:bg-gray-400 text-yellowDark font-bold'"
              :for="'privacy'"
            >
              Ich bin mit der Speicherung meiner Daten gemäß Datenschutzerklärung einverstanden.
            </label>
            <a class="text-blue-900 hover:underline" href="privacy" target="_blank">Datenschutzerklärung</a>

            <input
              id="rightOfWithdrawal"
              v-model="endCheckbox"
              type="checkbox"
              class="appearance-none"
              value="rightOfWithdrawal"
              required
            >
            <label
              class="p-4 rounded-md block w-full cursor-pointer transform active:scale-98 transition duration-150 ease-in-out"
              :class="endCheckbox.includes('rightOfWithdrawal') ? 'bg-yellowLight text-white' : 'bg-gray-200 hover:text-black hover:bg-gray-400 text-yellowDark font-bold'"
              :for="'rightOfWithdrawal'"
            >
              Ich bestätige die Regelung bezüglich des Wiederrufsrechts bei wirkaufendeinhandy.shop (AGBs siehe 3.2)
            </label>

            <input
              id="ToS"
              v-model="endCheckbox"
              type="checkbox"
              class="appearance-none"
              value="ToS"
              required
            >
            <label
              class="p-4 rounded-md block w-full cursor-pointer transform active:scale-98 transition duration-150 ease-in-out"
              :class="endCheckbox.includes('ToS') ? 'bg-yellowLight text-white' : 'bg-gray-200 hover:text-black hover:bg-gray-400 text-yellowDark font-bold'"
              :for="'ToS'"
            >
              Ich bin mit den geltenden AGBs einverstanden
            </label>
            <a class="text-blue-900 hover:underline" href="AGB" target="_blank">AGBs</a>

            <button
              v-if="endCheckbox.length === 3"
              type="submit"
              class="mt-4 block w-full"
            >
              <div class="bg-gray-100 hover:bg-gray-400 text-black p-4 rounded-md text-left">
                Bestätigen und Verkauf verbindlich abschließen
              </div>
            </button>
            <p v-else-if="endCheckbox.length != 3" class="text-white font-bold text-xl">Bitte klick auf die Button oben, um alles zu bestätigen.</p>
            <button
              type="button"
              class="mt-4 block w-full"
              @click.prevent="back()"
            >
              <div class="bg-white hover:bg-yellowLight hover:text-white p-4 rounded-md text-left">
                Zurück
              </div>
            </button>
          </form>
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
  props: {
    offer: { type: Object, required: true },
  },
  data: () => ({
    stage: 0,
    values,
    endCheckbox: [],
    form: {
      Email: '',
      Salutation: 'Herr',
      Name: '',
      FirstName: '',
      PhoneNumber: '',
      PaymentMethod: 'PayPal',
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
  }),
  computed: {
    progress() {
      return [25, 50, 75, 99][this.stage]
    },
  },
  methods: {
    checkPickUp() {
      if (this.address.Adress !== '' && this.address.PLZ !== '' && this.address.Place !== '') {
        // eslint-disable-next-line no-undef
        grecaptcha.ready(async() => {
          // eslint-disable-next-line no-undef
          const token = await grecaptcha.execute(process.env.NUXT_ENV_RECAPTCHA_TOKEN, { action: 'acceptOffer' })
          try {
            const { location, pickUpData } = await this.$axios.$post('/offer/checkPickUp', { uID: this.offer.ID, Adress: this.address, Token: token })
            this.address.Adress = location.streetName + ' ' + location.streetNumber
            this.address.PLZ = location.zipcode
            this.address.Place = location.city
            console.log(pickUpData)
            this.adressError = false
          } catch (error) {
            this.adressError = true
          }
        })

        this.validatingAddress = false
      }
    },
    async validatePaymentData() {
      try {
        const { PaymentMethod, PaymentData } = this.form
        const res = await this.$axios.$post('/offer/validatePaymentData', {
          PaymentMethod, PaymentData,
        })
        if (res.Result === true) {
          this.next()
          this.paymentDataError = false
        } else {
          this.paymentDataError = true
        }
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
        try {
          await this.$axios.post('/offer/accept', {
            uID: this.offer.ID,
            data: this.form,
            Token: token,
            locationData: this.address,
          })
          this.offer.State = 'shipping'
        } catch (error) {
          console.error(error)
          alert('Fehler')
          this.$router.go()
        }
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
