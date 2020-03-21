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
            Wähle die passenden Daten für dein Handy aus
          </p>

          <div class="flex items-center text-center md:pt-6">
            <img
              class="inline w-5 "
              src="~assets/img/svg/help.svg"
              alt="help button"
            >

            <a href="contactUs" target="_blank" class="text-blue-500 hover:text-blue-800 pl-2">
              Hilfe erhalten
            </a>
          </div>

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
          <template v-else-if="stage === 2">
            <p class="text-gray-200">
              Wieviel internen Speicher hat dein Handy?
            </p>
            <button
              v-for="(storage, storageId) in values.storages"
              :key="storageId"
              class="mt-3 block w-full"
              @click="selectStorage(storage.title)"
            >
              <div class="bg-gray-800 hover:bg-gray-700 text-gray-100 p-4 rounded-lg">
                <span :class="`text-${storage.color} text-4xl`">{{ storage.title }}</span> <span class="text-sm">GB</span>
              </div>
            </button>
          </template>
          <template v-else-if="stage === 3">
            <p class="text-gray-200">
              In welchem äußerlichen Zustand ist dein Handy?
            </p>
            <form>
              <div
                v-for="(condition, conditionId ) in values.conditions"
                :key="conditionId"
                class="w-full"
              >
                <input
                  :id="conditionId"
                  v-model="request.condition"
                  name="condition"
                  type="radio"
                  :value="conditionId"
                >
                <label
                  class="p-4 rounded-lg block w-full cursor-pointer transform active:scale-98 transition duration-150 ease-in-out"
                  :class="request.condition === conditionId ? 'bg-gray-200 text-black' : 'bg-gray-800 hover:bg-gray-700 text-gray-100'"
                  :for="conditionId"
                >
                  {{ condition.title }}
                </label>
                <p class="mt-2 text-gray-600 text-sm">
                  {{ condition.description }}
                </p>
              </div>
            </form>
            <button
              class="mt-4 block w-full"
              :disabled="!request.condition"
              @click="next"
            >
              <div class="bg-gray-100 hover:bg-gray-400 text-black p-4 rounded-lg">
                Weiter
              </div>
            </button>
          </template>
          <template v-else-if="stage === 4">
            <p class="text-gray-200">
              Welche Defekte besitzt dein Handy?
            </p>
            <form>
              <div
                v-for="(defect, defectId) in values.defects"
                :key="defectId"
              >
                <input
                  :id="defectId"
                  v-model="request.defects"
                  type="checkbox"
                  :value="defectId"
                >
                <label
                  class="p-4 rounded-lg block w-full cursor-pointer transform active:scale-98 transition duration-150 ease-in-out"
                  :class="request.defects.includes(defectId) ? 'bg-gray-200 text-black' : 'bg-gray-800 hover:bg-gray-700 text-gray-100'"
                  :for="defectId"
                >
                  {{ defect.title }}
                </label>
                <p class="mt-2 text-gray-600 text-sm">
                  {{ defect.description }}
                </p>
              </div>
            </form>
            <button
              class="mt-4 block w-full"
              @click="next"
            >
              <div class="bg-gray-100 hover:bg-gray-400 text-black p-4 rounded-lg">
                Weiter {{ request.defects.length === 0 ? 'ohne Defekte' : '' }}
              </div>
            </button>
          </template>
          <template v-else-if="stage === 5">
            <p class="text-gray-200">
              Welches Zubehör hast du noch?
            </p>
            <form>
              <div v-for="(accessory,accessoryId) in values.accessories" :key="accessoryId">
                <input
                  :id="accessoryId"
                  v-model="request.accessories"
                  type="checkbox"
                  :value="accessoryId"
                >
                <label
                  class="p-4 rounded-lg block w-full cursor-pointer transform active:scale-98 transition duration-150 ease-in-out"
                  :class="request.accessories.includes(accessoryId) ? 'bg-gray-200 text-black' : 'bg-gray-800 hover:bg-gray-700 text-gray-100'"
                  :for="accessoryId"
                >
                  {{ accessory }}
                </label>
              </div>
            </form>

            <button
              class="mt-4 block w-full"
              @click="confirmAccessories"
            >
              <div class="bg-gray-100 hover:bg-gray-400 text-black p-4 rounded-lg">
                Weiter
              </div>
            </button>
          </template>
          <template v-else-if="stage === 6">
            <template v-if="!offer">
              <div style="width:100%">
                <div id="loader" />
              </div>
            </template>
            <template v-else-if="!offer.price.price">
              <p
                class="text-2xl text-white"
              >
                Entweder sind einige Daten falsch oder wir kaufen dein Handy derzeit nicht an
              </p>
              <p class="text-base text-gray-600">
                Trotzdem vielen Dank für deine Anfrage :D
              </p>
            </template>
            <template v-else>
              <div>
                <p class="text-gray-500 text-lg">
                  Dein Handy<br>
                  <span class="text-white font-bold text-xl">
                    {{ request.brand }} {{ request.phone }}
                  </span>
                </p>

                <p class="text-gray-500 text-lg ">
                  Speicher<br>
                  <span class="text-white font-bold text-base">
                    {{ request.storage }} Gb
                  </span>
                </p>
                <p class="text-gray-500 text-lg ">
                  Zustand<br>
                  <span class="text-white font-bold text-base">
                    {{ values.conditions[request.condition].title }}
                  </span>
                </p>
                <template v-if="request.defects.length >= 1">
                  <p class="text-gray-500 text-lg ">
                    Defekte<br>
                    <span class="text-white font-bold text-base">
                      <template v-for="defect in request.defects">
                        {{ values.defects[defect].title }}
                        <br :key="defect">
                      </template>
                    </span>
                  </p>
                </template>
                <template v-if="request.accessories.length >= 1">
                  <p class="text-gray-500 text-lg ">
                    Zubehör<br>
                    <span class="text-white font-bold text-base">
                      <template v-for="accessory in request.accessories">
                        {{ values.accessories[accessory] }}
                        <br :key="accessory">
                      </template>
                    </span>
                  </p>
                </template>
                <p class="text-white text-xl">Wir kaufen dein Handy!</p>
                <p class="text-white text-2xl md:text-4xl">
                  Wir bieten dir
                  <b>{{ offer.price.price }}</b> €
                </p>
                <button @click="priceDetailsShown = !priceDetailsShown">
                  <div class="text-gray-500 text-sm flex items-center">
                    <span class="icon-header-icon material-icons">
                      {{ priceDetailsShown ? 'expand_less' : 'expand_more' }}
                    </span>
                    Wie entsteht der Preis?
                  </div>
                </button>
                <div
                  v-if="priceDetailsShown"
                  class="w-full mt-2 mb-4 bg-white text-gray-900 p-4"
                  style="border-radius: 14px"
                >
                  <div class="font-semibold">Potentieller Endverkaufswert: {{ offer.price.sellingPrice }} €</div>
                  <div class="text-gray-700">
                    <div>– Marktplatz-Verkaufsgebühren (5%): {{ offer.price.sellingPrice * 0.05 }} €</div>
                    <div>– Überprüfungs- und Verwaltungsaufwand: 4 €</div>
                    <div>– Hosting- und Marketingkosten: 6 €</div>
                    <div>– Differenzbesteuerung (19%): {{ (offer.price.sellingPrice - offer.price.price) * 0.19 }} €</div>
                    <div>– Versandkosten: 10 €</div>
                    <div>– Abholkosten (optional): 6 €</div>
                    <div v-if="request.defects.length > 0">– Reparaturkosten</div>
                  </div>
                  <div class="font-semibold">= Unser Angebot: {{ offer.price.price }} €</div>
                </div>
                <button
                  class="mt-4 block w-full"
                  @click="acceptOffer"
                >
                  <div class="bg-gray-100 hover:bg-gray-400 text-black p-4 rounded-lg">
                    Weiter zur Dateneingabe
                  </div>
                </button>
                <button
                  class="mt-4 block w-full"
                  @click="rejectOffer"
                >
                  <div class="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg">
                    Ablehnen
                  </div>
                </button>
              </div>
            </template>
          </template>
          <div class="mt-2 w-full">
            <button
              v-if="stage !== 0 && stage !== 6"
              class="mt-4 block w-full"
              @click.prevent="back()"
            >
              <div class="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg">
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
