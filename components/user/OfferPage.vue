<template>
  <div id="toolbox">
    <section class="meta-content">
      <div id="meta-progress" class="progress-indicator">
        <div :style="{ width: `${progress}%` }" />
      </div>

      <nuxt-link id="meta-back" to="/" class="inline-button" @click="back">
        <i class="material-icons">chevron_left</i>
        <span class="text-gray-800">Abbrechen</span>
      </nuxt-link>

      <div id="idSection">
        <div>
          <h1 id="explanation" class="typo-title">
            Wir kaufen dein Handy!
          </h1>
          <h3 class="icon-header-title">
            Wir bieten dir
            <b>{{ offer.Price.price }}</b>€
          </h3>
        </div>

        <div class="typo-footnote">
          <p>Bitte trage deine Daten ein und bestätige die AGBs sowie die Datenschutzbestimmungen um den Kauf erfolgreich abzuschließen.</p>
          <recaptcha-notice />
        </div>
      </div>
    </section>

    <section class="selection-content" data-switch-appearance>
      <div class="box">
        <div id="selGrid" class="grid">
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

          <form v-else-if="stage === 2" @submit.prevent="validateAddress">
            <h2 class="typo-subheader">
              Adresse
            </h2>

            <div class="toolbox-row">
              <div style="width: 100%; margin-right: 2%">
                <input
                  id="Adress"
                  v-model.trim="address.Adress"
                  class="toolbox-field"
                  type="text"
                  placeholder="Straße"
                  required
                >
                <p class="typo-caption">
                  Straße
                </p>
              </div>
              <div style="width: 75%">
                <input
                  id="HouseNumber"
                  v-model.trim="address.HouseNumber"
                  class="toolbox-field"
                  type="text"
                  placeholder="Hausnummer"
                  required
                >
                <p class="typo-caption">
                  Hausnummer
                </p>
              </div>
            </div>

            <div class="toolbox-row">
              <div class="left">
                <input
                  id="PLZ"
                  v-model.trim="address.PLZ"
                  class="toolbox-field"
                  type="text"
                  placeholder="PLZ"
                  required
                >
                <p class="typo-caption">
                  Postleitzahl
                </p>
              </div>
              <div class="right">
                <input
                  id="Place"
                  v-model.trim="address.Place"
                  class="toolbox-field"
                  type="text"
                  placeholder="Ort"
                  required
                >
                <p class="typo-caption">
                  Ort
                </p>
              </div>
            </div>

            <button type="submit" class="toolbox-field selected">
              Weiter
            </button>
            <button type="button" class="toolbox-field" @click.prevent="back()">
              Zurück
            </button>
          </form>

          <form v-else-if="stage === 3" @submit.prevent="validatePaymentData">
            <template v-if="form.TransportType === 'pickUp'">
              <h2 class="typo-subheader">
                Wir holen dein Handy ab!
              </h2>

              <h2 class="typo-subheader">
                Willst du dein Gerät lieber selber verschicken?
              </h2>
              <button
                type="button"
                class="toolbox-field"
                @click="form.TransportType = 'shipping'"
              >
                Selber verschicken
              </button>

              <h2 class="typo-subheader">
                Bitte wähle die Zeit aus, wann wir dein Gerät abholen sollen
              </h2>

              <pickup-time-picker
                v-model="form.TransportData"
                class="toolbox-field"
              />
              <p class="typo-caption">
                Das Gerät werden wir innerhalb der darauffolgenden Stunde abholen
              </p>
            </template>

            <template v-else-if="form.TransportType === 'shipping'">
              <p v-if="!form.PickUpPossible">
                Leider ist dein Gerät nicht in unserem Abholradius.
                Wir bitten dich es daher an uns kostenlos per Post zu schicken.
              </p>
              <p>Nach dem Abschluss des Verkaufs erhältst du die Versandmarke, sowie eine Versandguideline.</p>

              <template v-if="form.PickUpPossible">
                <h2 class="typo-subheader">
                  Willst du dein Gerät doch lieber abholen lassen?
                </h2>
                <button
                  type="button"
                  class="toolbox-field"
                  @click="form.TransportType = 'pickUp'"
                >
                  Abholen lassen
                </button>
              </template>
            </template>

            <!-- TODO: Consider splitting this into a separate stage -->
            <h2 class="typo-subheader">
              Wie willst du das Geld erhalten?
            </h2>
            <input
              id="PayPal"
              v-model="form.PaymentMethod"
              class="toolbox-checkbox"
              name="paymentMethod"
              type="radio"
              value="PayPal"
            >
            <label class="toolbox-field" for="PayPal">PayPal-Gutschrift<i class="material-icons selection-icon">check</i></label>
            <input
              id="Überweisung"
              v-model="form.PaymentMethod"
              class="toolbox-checkbox"
              name="paymentMethod"
              type="radio"
              value="Überweisung"
            >
            <label class="toolbox-field" for="Überweisung">Überweisung<i class="material-icons selection-icon">check</i></label>

            <input
              id="paymentData"
              v-model.trim="form.PaymentData"
              class="toolbox-field"
              :placeholder="form.PaymentMethod === 'PayPal' ? 'PayPal-Emailadresse' : 'IBAN'"
              :type="form.PaymentMethod === 'PayPal' ? 'email' : 'text'"
              required
            >
            <p
              v-if="form.PaymentMethod === 'PayPal' && form.PaymentData !== form.Email"
              class="typo-caption"
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

            <button type="submit" class="toolbox-field selected">
              Weiter
            </button>
            <button type="button" class="toolbox-field" @click="back()">
              Zurück
            </button>
          </form>

          <form v-else-if="stage === 4" @submit.prevent="next">
            <h2 class="typo-subheader">
              Dein Handy
            </h2>
            <div class="icon-header">
              <div class="icon-header-icon material-icons">
                smartphone
              </div>
              <h3
                class="icon-header-title"
              >
                {{ offer.phone.Brand }} {{ offer.phone.Phone }}
              </h3>
            </div>

            <h2 class="typo-subheader">
              Speicher
            </h2>
            <p> {{ offer.phone.Storage }} GB</p>

            <h2 class="typo-subheader">
              Zustand
            </h2>
            <p>{{ values.conditions[offer.phone.Condition].title }}</p>

            <template v-if="offer.phone.Defects.length >= 1">
              <h2 class="typo-subheader">
                Defekte
              </h2>
              <p>
                <template v-for="defect in offer.phone.Defects">
                  {{ values.defects[defect].title }}
                  <br :key="defect">
                </template>
              </p>
            </template>
            <h2 class="typo-subheader">
              Zubehör
            </h2>
            <p>
              <template v-for="accessory in offer.phone.Accessorys">
                {{ values.accessories[accessory] }}
                <br :key="accessory">
              </template>
            </p>

            <h2 class="typo-subheader">
              Name
            </h2>

            <div class="toolbox-row">
              <div class="left">
                <input id="firstName" class="toolbox-field" type="text" :value="form.FirstName" readonly>
              </div>
              <div class="right">
                <input id="name" class="toolbox-field" type="text" :value="form.Name" readonly>
              </div>
            </div>

            <h2 class="typo-subheader">
              Adresse
            </h2>

            <div class="toolbox-row">
              <div style="width: 100%; margin-right: 2%">
                <input id="Adress" class="toolbox-field" type="text" :value="form.Location.streetName" readonly>
                <p class="typo-caption">
                  Straße
                </p>
              </div>
              <div style="width: 75%">
                <input id="HouseNumber" class="toolbox-field" type="text" :value="form.Location.streetNumber" readonly>
                <p class="typo-caption">
                  Hausnummer
                </p>
              </div>
            </div>

            <div class="toolbox-row">
              <div class="left">
                <input id="PLZ" class="toolbox-field" type="text" :value="form.Location.zipcode" readonly>
                <p class="typo-caption">
                  Postleitzahl
                </p>
              </div>
              <div class="right">
                <input id="Place" class="toolbox-field" type="text" :value="form.Location.city" readonly>
                <p class="typo-caption">
                  Ort
                </p>
              </div>
            </div>

            <h2 v-if="offer.TransportType === 'pickUp'" class="typo-subheader">
              Wir holen dein Handy ab am {{ form.TransportData }}
            </h2>
            <h2 v-else-if="offer.TransportType === 'shipping'" class="typo-subheader">
              Du verschickst dein Handy selbst. Das Label erhältst du am Ende.
            </h2>

            <h2 class="typo-subheader">
              Du erhältst dein Geld via
            </h2>
            <input class="toolbox-field" type="text" :value="form.PaymentMethod" readonly>
            <input class="toolbox-field" type="text" :value="form.PaymentData" readonly>

            <p>Daten fehlerhaft? Nutze den Zurück-Knopf.</p>

            <button type="submit" class="toolbox-field selected">
              Weiter
            </button>
            <button type="button" class="toolbox-field" @click="back()">
              Zurück
            </button>
          </form>

          <form v-else-if="stage === 5" @submit.prevent="next">
            <h2 class="typo-subheader">
              Bitte bestätige folgendes
            </h2>
            <input id="privacy" class="toolbox-checkbox" type="checkbox" value="privacy" required>
            <label id="privacy-box" class="toolbox-field" for="privacy">
              Ich bin mit der Speicherung meiner Daten gemäß Datenschutzerklärung einverstanden.
              <i class="material-icons selection-icon">check</i>
            </label>
            <a href="privacy" target="_blank">Datenschutzerklärung</a>

            <input id="Widerrufsrecht" class="toolbox-checkbox" type="checkbox" value="Widerrufsrecht" required>
            <label id="Widerrufsrecht-box" class="toolbox-field" for="Widerrufsrecht">
              Ich bestätige die Regelung bezüglich des Wiederrufsrechts bei wirkaufendeinhandy.shop (AGBs siehe 3.2)
              <i class="material-icons selection-icon">check</i>
            </label>

            <input id="AGBs" class="toolbox-checkbox" type="checkbox" value="AGBs" required>
            <label id="AGB-box" class="toolbox-field" for="AGBs">
              Ich bin mit den geltenden AGBs einverstanden
              <i class="material-icons selection-icon">check</i>
            </label>
            <a href="AGB" target="_blank">AGBs</a>

            <h2 class="typo-subheader">
              Schließe den Verkauf deines Gerätes verbindlich ab
            </h2>

            <button class="toolbox-field" value="submit" @click="acceptOffer">
              Bestätigen und Verkauf abschließen
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PickupTimePicker from '~/components/PickupTimePicker'
import RecaptchaNotice from '~/components/RecaptchaNotice'

import * as values from '~/data/values'

export default {
  components: { PickupTimePicker, RecaptchaNotice },
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
  methods: {
    async validateAddress() {
      try {
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
