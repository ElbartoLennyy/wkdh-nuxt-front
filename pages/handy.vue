<template>
  <div id="toolbox">
    <section class="meta-content">
      <div id="meta-progress" class="progress-indicator">
        <div :style="{ width: `${progress}%` }" />
      </div>
      <button id="meta-back" class="inline-button" @click="back">
        <i class="material-icons">chevron_left</i>Zurück
      </button>
      <h1 id="explanation" class="typo-title">
        Wähle die passenden Daten für dein Handy aus
      </h1>
      <a id="meta-help" href="contactUs" class="inline-button">
        <i class="material-icons">help_outline</i>Hilfe
      </a>
      <div class="typo-footnote">
        <p>
          Informationen zur Erhebung, Verarbeitung, Speicherung und Löschung deiner Daten findest du in unserer
          <a
            target="_blank"
            href="privacy"
          >Datenschutzerklärung</a>.
        </p>
        <recaptcha-notice />
      </div>
      <button class="elevated-button" onclick="window.location = '/'">
        Startseite
      </button>
    </section>
    <section class="selection-content" data-switch-appearance>
      <div class="box">
        <div id="selGrid" class="grid">
          <template v-if="stage === 0">
            <h1 class="typo-subheader">
              Von welcher Marke ist dein Handy?
            </h1>
            <button
              v-for="brand in values.brands"
              :key="brand"
              class="toolbox-field"
              @click="selectBrand(brand)"
            >
              {{ brand }}
            </button>
          </template>
          <template v-else-if="stage === 1">
            <h1 class="typo-subheader">
              Was für ein Modell ist es?
            </h1>
            <button
              v-for="phone in values.phones"
              :key="phone"
              class="toolbox-field"
              @click="selectPhone(phone)"
            >
              {{ phone }}
            </button>
          </template>
          <template v-else-if="stage === 2">
            <h1 class="typo-subheader">
              Wieviel internen Speicher hat dein Handy?
            </h1>
            <div class="tile-box">
              <button
                v-for="(storage, storageId) in values.storages"
                :key="storageId"
                class="toolbox-field"
                @click="selectStorage(storage.title)"
              >
                <span :class="`unit-figure ${storage.color}`" data-unit="GB">{{ storage.title }}</span>
              </button>
            </div>
          </template>
          <template v-else-if="stage === 3">
            <h1 class="typo-subheader">
              In welchem äußerlichen Zustand ist dein Handy?
            </h1>
            <form>
              <div v-for="(condition, conditionId ) in values.conditions" :key="conditionId">
                <input
                  :id="conditionId"
                  v-model="request.condition"
                  class="toolbox-checkbox"
                  name="condition"
                  type="radio"
                  :value="conditionId"
                >
                <label class="toolbox-field" :for="conditionId">
                  {{ condition.title }}
                  <i class="material-icons selection-icon">check</i>
                </label>
                <p class="typo-caption">
                  {{ condition.description }}
                </p>
              </div>
            </form>
            <button
              class="toolbox-field selected"
              :disabled="!request.condition"
              @click="next"
            >
              Weiter
            </button>
          </template>
          <template v-else-if="stage === 4">
            <h1 class="typo-subheader">
              Welche Defekte besitzt dein Handy?
            </h1>
            <form>
              <div
                v-for="(defect, defectId) in values.defects"
                :key="defectId"
              >
                <input
                  :id="defectId"
                  v-model="request.defects"
                  class="toolbox-checkbox"
                  type="checkbox"
                  :value="defectId"
                >
                <label class="toolbox-field" :for="defectId">
                  {{ defect.title }}
                  <i class="material-icons selection-icon">check</i>
                </label>
                <p class="typo-caption">
                  {{ defect.description }}
                </p>
              </div>
            </form>
            <button
              class="toolbox-field selected"
              @click="next"
            >
              Weiter {{ request.defects.length === 0 ? 'ohne Defekte' : '' }}
            </button>
          </template>
          <template v-else-if="stage === 5">
            <h1 class="typo-subheader">
              Welches Zubehör hast du noch?
            </h1>
            <form>
              <div v-for="(accessory,accessoryId) in values.accessories" :key="accessoryId">
                <input
                  :id="accessoryId"
                  v-model="request.accessories"
                  class="toolbox-checkbox"
                  type="checkbox"
                  :value="accessoryId"
                >
                <label class="toolbox-field" :for="accessoryId">
                  {{ accessory }}
                  <i class="material-icons selection-icon">check</i>
                </label>
              </div>
            </form>
            <button class="toolbox-field selected" @click="confirmAccessories">
              Weiter
            </button>
          </template>
          <template v-else-if="stage === 6">
            <template v-if="!offer">
              <div style="width:100%">
                <div id="loader" />
              </div>
            </template>
            <template v-else-if="!offer.price.price">
              <h3
                class="icon-header-title"
              >
                Entweder sind einige Daten falsch oder wir kaufen dein Handy derzeit nicht an
              </h3>
              <h2 class="typo-subheader">
                Trotzdem vielen Dank für deine Anfrage :D
              </h2>
            </template>
            <template v-else>
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
                  {{ request.brand }} {{ request.phone }}
                </h3>
              </div>

              <h2 class="typo-subheader">
                Speicher
              </h2>
              <p> {{ request.storage }} Gb</p>

              <h2 class="typo-subheader">
                Zustand
              </h2>
              <p>{{ values.conditions[request.condition].title }}</p>

              <template v-if="request.defects.length >= 1">
                <h2 class="typo-subheader">
                  Defekte
                </h2>
                <p>
                  <template v-for="defect in request.defects">
                    {{ values.defects[defect].title }}
                    <br :key="defect">
                  </template>
                </p>
              </template>
              <h2 class="typo-subheader">
                Zubehör
              </h2>
              <p>
                <template v-for="accessory in request.accessories">
                  {{ values.accessories[accessory] }}
                  <br :key="accessory">
                </template>
              </p>

              <h2 class="typo-subheader">
                Wir kaufen dein Handy!
              </h2>
              <h1 class="icon-header-title">
                Wir bieten dir
                <b>{{ offer.price.price }}</b>€
              </h1>
              <br>
              <button class="toolbox-field selected" @click="acceptOffer">
                Weiter
              </button>
              <button class="toolbox-field" @click="rejectOffer">
                Ablehnen
              </button>
            </template>
          </template>
        </div>
      </div>
    </section>
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
      if (this.stage === 0) { return this.$router.back() }
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
