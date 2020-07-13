<template>
  <div class="font-sans min-h-screen overflow-y-scroll">
    <div class="md:flex">
      <div class="md:w-1/3 md:min-h-screen p-4 md:p-12 md:pl-16 flex flex-col justify-between">
        <div>
          <div class="flex items-center text-center">
            <img
              class="inline w-5"
              src="~assets/img/svg/back.svg"
              alt="back button"
            >

            <nuxt-link to="/" @click="back">
              <span class="text-yellowDark font-bold pl-2">Abbrechen</span>
            </nuxt-link>
          </div>

          <p class="text-3xl md:text-5xl font-bold w-4/5 mt-8 tracking-tighter leading-none">
            Wähle die passenden Daten für dein Handy aus
          </p>

          <div class="flex items-center text-center md:pt-4">
            <img
              class="inline w-5 "
              src="~assets/img/svg/help.svg"
              alt="help button"
            >

            <a href="contactUs" target="_blank" class="text-yellowDark hover:text-yellowLight pl-2">
              Hilfe erhalten
            </a>
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
            <recaptcha-notice class="pt-6" />
          </div>
        </div>

        <div class="bg-gray-300 shadow rounded-full overflow-hidden mt-10 md:w-1/2">
          <div
            class="bg-yellowLight h-2 m-1 transition-all duration-300 ease-in-out rounded-full"
            :style="{ width: `${progress}%` }"
          />
        </div>
      </div>
      <div class="md:w-2/3 p-2 h-screen md:overflow-y-auto">
        <div class="rounded-lg p-6 md:p-12 bg-yellowLight min-h-full">
          <template v-if="stage === 0">
            <p class="text-white font-bold">
              Von welcher Marke ist dein Handy?
            </p>
            <button
              v-for="brand in brands"
              :key="brand"
              class="mt-3 block w-full text-left"
              @click="selectBrand(brand)"
            >
              <div class="bg-gray-200 hover:bg-yellowDark hover:text-white text-yellowDark font-bold p-4 rounded-lg">
                {{ brand }}
              </div>
            </button>
          </template>
          <template v-else-if="stage === 1">
            <p class="text-white font-bold">
              Was für ein Modell ist es?
            </p>
            <button
              v-for="phone in values.phones"
              :key="phone"
              class="mt-3 block w-full"
              @click="selectPhone(phone)"
            >
              <div class="bg-gray-200 hover:bg-yellowDark hover:text-white text-yellowDark font-bold p-4 rounded-lg text-left">
                {{ phone }}
              </div>
            </button>
          </template>
          <template v-else-if="stage === 2">
            <p class="text-white font-bold">
              Wieviel internen Speicher hat dein Handy?
            </p>
            <button
              v-for="storageId in values.storages"
              :key="storageId"
              class="mt-3 block w-full"
              @click="selectStorage(storageId)"
            >
              <div class="bg-gray-200 hover:bg-yellowDark hover:text-white text-yellowDark font-bold p-4 rounded-lg text-left">
                <span :class="`text-4xl`">{{ storageId }}</span> <span class="text-sm">GB</span>
              </div>
            </button>
          </template>
          <template v-else-if="stage === 3">
            <p class="text-white font-bold">
              Welche Defekte besitzt dein Handy?
            </p>
            <form>
              <div
                v-for="(defect, defectId) in values.defects"
                :key="defectId"
                class=" -mt-4"
              >
                <input
                  :id="defectId"
                  v-model="request.defects"
                  type="checkbox"
                  class="appearance-none"
                  :value="defectId"
                >
                <label
                  class="p-4 rounded-lg block w-full cursor-pointer transform active:scale-98 transition duration-150 ease-in-out"
                  :class="request.defects.includes(defectId) ? 'bg-yellowDark text-white font-bold' : 'bg-gray-200 hover:text-black hover:bg-gray-400 text-yellowDark font-bold'"
                  :for="defectId"
                >
                  {{ defect.title }}
                </label>
                <p class="mt-1 text-gray-900 text-sm">
                  {{ defect.description }}
                </p>
              </div>
            </form>
            <button
              class="mt-4 block w-full"
              @click="next"
            >
              <div class="bg-gray-100 hover:bg-gray-400 font-bold text-black p-4 rounded-lg text-left">
                Weiter {{ request.defects.length === 0 ? 'ohne Defekte' : '' }}
              </div>
            </button>
          </template>
          <template v-else-if="stage === 4">
            <p class="text-white font-bold">
              In welchem äußerlichen Zustand ist dein Handy?
            </p>
            <form>
              <div
                v-for="(condition, conditionId ) in values.conditions"
                :key="conditionId"
                class="w-full -mt-4"
              >
                <input
                  :id="conditionId"
                  v-model="request.condition"
                  name="condition"
                  type="radio"
                  class="appearance-none"
                  :value="conditionId"
                >
                <label
                  class="p-4 rounded-lg block w-full cursor-pointer transform active:scale-98 transition duration-150 ease-in-out"
                  :class="request.condition === conditionId ? 'bg-yellowDark text-white font-bold' : 'bg-gray-200 hover:text-black hover:bg-gray-400 text-yellowDark font-bold'"
                  :for="conditionId"
                >
                  {{ condition.title }}
                </label>
                <p class="mt-1 text-black text-sm">
                  {{ condition.description }}
                </p>
              </div>
            </form>
            <button
              class="mt-4 block w-full"
              :disabled="!request.condition"
              @click="next"
            >
              <div class="bg-gray-100 hover:bg-gray-400 font-bold text-black p-4 rounded-lg text-left">
                Weiter
              </div>
            </button>
          </template>
          <template v-else-if="stage === 5">
            <p class="text-white font-bold">
              Welches Zubehör hast du noch?
            </p>
            <form>
              <div
                v-for="(accessory,accessoryId) in values.accessories"
                :key="accessoryId"
                class=" -mt-4"
              >
                <input
                  :id="accessoryId"
                  v-model="request.accessories"
                  type="checkbox"
                  class="appearance-none"
                  :value="accessoryId"
                >
                <label
                  class="p-4 rounded-lg block w-full cursor-pointer transform active:scale-98 transition duration-150 ease-in-out"
                  :class="request.accessories.includes(accessoryId) ? 'bg-yellowDark text-white font-bold' : 'bg-gray-200 hover:text-black hover:bg-gray-400 text-yellowDark font-bold'"
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
              <div class="bg-gray-100 hover:bg-gray-400 font-bold text-black p-4 rounded-lg text-left">
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
                class="text-2xl text-white font-bold"
              >
                Wir kaufen dein Handy mit diesem Defekt leider nicht an.
              </p>
              <p class="text-base text-white">
                Trotzdem vielen Dank für deine Anfrage.
              </p>
            </template>
            <template v-else>
              <div class="text-white font-bold text-center rounded-lg">
                <p class="text-3xl">Du erhältst...</p>
                <div class="text-6xl">
                  <ICountUp
                    :end-val="offer.price.price"
                    :options="options"
                    class="text-6xl"
                    @ready="onReady"
                  />
                  €
                </div>
                <p class="text-xl px-8 pt-6">Mit diesem Geld könntest du...</p>
                <client-only>
                  <agile
                    :autoplay="true"
                    :nav-buttons="false"
                    :dots="false"
                    :pause-on-hover="false"
                    class="my-6"
                  >
                    <div v-for="event in eventListComputed" :key="event.name">
                      <h3>{{ event.description }}</h3>
                      <img
                        :src="require(`../assets/img/pictures/events/${event.picName}.jpg`)"
                        :alt="event.name"
                        class="mt-4 max-w-lg mx-auto"
                      >
                    </div>
                  </agile>
                </client-only>
                <button class="bg-white text-yellowDark rounded-lg border-yellowDark border-2 p-2 font-bold text-3xl w-full" @click="acceptOffer">
                  Weiter zum Verkauf
                </button>
                <button class="block mx-auto bg-gray-400 p-2 text-md border-2 mt-6 border-gray-500 rounded-lg font-bold px-4" @click="rejectOffer">
                  zurück zu Home
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
              <div class="bg-gray-200 hover:bg-yellowDark hover:text-white text-yellowDark font-bold p-4 rounded-lg text-left">
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
import { VueAgile } from 'vue-agile'
import ICountUp from 'vue-countup-v2'
import RecaptchaNotice from '~/components/RecaptchaNotice'
import * as values from '~/data/values'

export default {
  components: {
    RecaptchaNotice,
    agile: VueAgile,
    ICountUp,
  },
  data: () => ({
    stage: 0,
    values,
    brands: null,
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
    eventList: [{
      name: 'Alpaka Wanderung',
      description: 'eine Alpakawanderung unternehmen',
      picName: 'Alpaka',
      startPrice: 30,
      endPrice: 55,
    }, {
      name: 'Paintball spielen',
      description: 'mit deinen Freunden Paintball spielen gehen',
      picName: 'Paintball',
      startPrice: 54,
      endPrice: 80,
    },
    {
      name: 'Dinner',
      description: 'mit deinem Lebenspartner in ein schickes Restaurant essen gehen',
      picName: 'Restaurant',
      startPrice: 60,
      endPrice: 90,
    },
    {
      name: 'Tauchkurs',
      description: 'einen Tauchkurs belegen',
      picName: 'tauchen',
      startPrice: 70,
      endPrice: 90,
    },
    {
      name: 'Quad',
      description: 'mit Freunden eine Offroad Quadtour machen',
      picName: 'Quad-Quer',
      startPrice: 75,
      endPrice: 100,
    },
    {
      name: 'Sushi Kurs',
      description: 'mit Freunden an einem Sushikurs teilnehmen',
      picName: 'Sushikurs',
      startPrice: 85,
      endPrice: 120,
    },
    {
      name: 'Spawochenende',
      description: 'mit einer Freundin ein Spawochenende verbringen',
      picName: 'Spawochenende',
      startPrice: 90,
      endPrice: 2000,
    },
    {
      name: 'Rafting',
      description: 'mit deinen Freunden zum Wildwasserrafting fahren',
      picName: 'Wildwasserrafting',
      startPrice: 120,
      endPrice: 180,
    }, {
      name: 'Paragleiten',
      description: 'Paragleiten gehen',
      picName: 'Paragleiten',
      startPrice: 135,
      endPrice: 200,
    }, {
      name: 'Lamborghini fahren',
      description: 'mit einem Lamborghini auf der Renstrecke fahren',
      picName: 'Lamborghini huracan',
      startPrice: 150,
      endPrice: 220,
    }, {
      name: 'Panzer fahren',
      description: 'mit Panzer fahren',
      picName: 'Panzer',
      startPrice: 170,
      endPrice: 250,
    }, {
      name: 'Motorrad Rennstreckentraining',
      description: 'mit einem Rennmotorrad ein Streckentraining absolvieren',
      picName: 'Motorrad Rennstreckentraining',
      startPrice: 190,
      endPrice: 250,
    }, {
      name: 'Fallschirmsprung',
      description: 'Fallschirmspringen gehen',
      picName: 'Fallschirmsprung',
      startPrice: 200,
      endPrice: 400,
    }, {
      name: 'Kampfflugzeug fliegen',
      description: 'mit einem Kampfflugzeug fliegen',
      picName: 'Kampfflugzeug fliegen',
      startPrice: 300,
      endPrice: 2000,
    }, {
      name: 'Städteurlaub',
      description: 'mit deinem Partner einen 3 Tage Stadturlaub machen',
      picName: 'Stadttrip Paar',
      startPrice: 400,
      endPrice: 2000,
    }, {
      name: 'Disneyland',
      description: 'mit deinem Partner einen 3 Tage Disneylandtrip machen',
      picName: 'Disneyland',
      startPrice: 400,
      endPrice: 2000,
    }, {
      name: 'Audi R8',
      description: 'ein Rennstreckentraining mit einem Audi R8 machen',
      picName: 'Audi R8 Streckentraining',
      startPrice: 570,
      endPrice: 2000,
    }, {
      name: 'Shopingtour',
      description: 'eine Runde shoppen gehen',
      picName: 'Shopingtour',
      startPrice: 100,
      endPrice: 180,
    }, {
      name: 'Reiten',
      description: 'am Strand reiten gehen',
      picName: 'Reiten am Strand',
      startPrice: 55,
      endPrice: 95,
    }, {
      name: 'Cocktailkurs',
      description: 'mit Freunden an einem Cockteilkurs teilnehmen',
      picName: 'Cocktailkurs',
      startPrice: 60,
      endPrice: 110,
    },
    ],
    options: {
      decimalPlaces: 2,
      duration: 3,
      separator: '.',
      decimal: ',',
    },
  }),
  computed: {
    progress() {
      return [5, 15, 30, 45, 60, 68, 75][this.stage]
    },
    eventListComputed() {
      const computedList = []
      for (const event of this.eventList) {
        console.log(event)
        if (this.offer.price.price >= event.startPrice && this.offer.price.price <= event.endPrice) {
          computedList.push(event)
        }
      }
      return computedList
    },
  },
  created() {
    this.getBrands()
  },
  methods: {
    async getBrands() {
      try {
        const res = await this.$axios.$post('/handy/getData', { Stage: 0 })
        console.log(res)
        this.brands = res
      } catch (error) {
        console.log(error)
      }
    },
    async selectBrand(brand) {
      this.request.brand = brand
      this.values.phones = (
        await this.$axios.$post('/handy/getData', { Stage: 1, Brand: brand })
      )
      this.next()
    },
    async selectPhone(phone) {
      this.request.phone = phone
      this.values.storages = (
        await this.$axios.$post('/handy/getData', { Stage: 2, Brand: this.request.brand, Phone: phone })
      )
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
    async acceptOffer() {
      try {
        await this.$axios.post('/handy/accept', { ReqID: this.offer.id })
        this.$router.push(`/user/${this.offer.id}`)
      } catch (error) {
        console.log(error)
      }
    },
    rejectOffer() {
      this.$axios.post('/handy/reject', { ReqID: this.offer.id }).finally(() => {
        this.$router.push('/')
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

<style >

.bg-gradient-vertical{
   background-image: linear-gradient( rgba(250,164,1,1),rgba(255,187,57,1));
}
</style>
