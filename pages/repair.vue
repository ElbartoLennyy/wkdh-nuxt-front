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
              @click="getPhone(1, brand)"
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
              @click="getPhone(2, phone)"
            >
              <div class="bg-gray-200 hover:bg-yellowDark hover:text-white text-yellowDark font-bold p-4 rounded-lg text-left">
                {{ phone }}
              </div>
            </button>
          </template>
          <template v-else-if="stage === 2">
            <p class="text-white font-bold">
              Was sollen wir reparieren?
            </p>
            <form>
              <div
                v-for="defect in values.defects"
                :key="defect"
                class=" -mt-4"
              >
                <input
                  :id="defect"
                  v-model="request.defects"
                  type="checkbox"
                  class="appearance-none"
                  :value="defect"
                >
                <label
                  class="p-4 rounded-lg block w-full cursor-pointer transform active:scale-98 transition duration-150 ease-in-out"
                  :class="request.defects.includes(defect) ? 'bg-yellowDark text-white font-bold' : 'bg-gray-200 hover:text-black hover:bg-gray-400 text-yellowDark font-bold'"
                  :for="defect"
                >
                  {{ defect }}
                </label>
              </div>
            </form>
            <button
              class="mt-4 block w-full"
              :disabled="request.defects.length === 0"
              @click="getRepairPrice()"
            >
              <div class="bg-gray-100 hover:bg-gray-400 font-bold text-black p-4 rounded-lg text-left" :class="request.defects.length === 0 ? 'bg-gray-500 ' : ''">
                Weiter
              </div>
            </button>
          </template>
          <template v-else-if="stage === 3">
            <template v-if="!offer">
              <div style="width:100%">
                <div id="loader" />
              </div>
            </template>
            <template v-if="offer != null">
              <div class="text-white font-bold text-center rounded-lg">
                <p class="text-3xl">Kosten {{ offer }}</p>
                <button class="bg-white text-yellowDark rounded-lg border-yellowDark border-2 p-2 font-bold text-3xl w-full" @click="acceptOffer" :disabled="acceptIsDisabeld">
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
              v-if="stage !== 0 && stage !== 3"
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
import RecaptchaNotice from '~/components/RecaptchaNotice'

export default {
  components: {
    RecaptchaNotice,
  },
  data: () => ({
    stage: 0,
    brands: null,
    request: {
      brand: null,
      phone: null,
      defects: [],
    },
    offer: null,
    values: {
      phones: null,
      defects: null,
    },
    acceptIsDisabeld: false,
  }),
  computed: {
    progress() {
      return [5, 15, 30, 45, 60, 68, 75][this.stage]
    },
  },
  created() {
    this.getPhone(0)
  },
  methods: {

    async getPhone(stage, phoneData) {
      try {
        if (stage === 0) {
          const res = await this.$axios.$post('/repair/getData', { Stage: 0 })
          this.brands = res
        } else if (stage === 1) {
          this.request.brand = phoneData
          const res = await this.$axios.$post('/repair/getData', { Stage: 1, Brand: phoneData })
          this.values.phones = res
          this.next()
        } else if (stage === 2) {
          this.request.phone = phoneData
          const res = await this.$axios.$post('/repair/getData', { Stage: 2, Brand: this.request.brand, Phone: phoneData })
          this.values.defects = res
          this.next()
        }
      } catch (error) {
        console.log(error)
        this.$router.go()
      }
    },
    getRepairPrice() {
      this.offer = null
      this.next()
      try {
        // eslint-disable-next-line no-undef
        grecaptcha.ready(async() => {
          // eslint-disable-next-line no-undef
          const token = await grecaptcha.execute(
            process.env.NUXT_ENV_RECAPTCHA_TOKEN,
            { action: 'request' },
          )

          const res = await this.$axios.$post('/repair/getPrice', {
            Brand: this.request.brand,
            Phone: this.request.phone,
            Defects: this.request.defects,
            token,
          })
          this.offer = res.price
        })
      } catch (error) {
        this.$router.go()
      }
    },
    acceptOffer() {
      try {
        this.acceptIsDisabeld = true
        // eslint-disable-next-line no-undef
        grecaptcha.ready(async() => {
          // eslint-disable-next-line no-undef
          const token = await grecaptcha.execute(
            process.env.NUXT_ENV_RECAPTCHA_TOKEN,
            { action: 'request' },
          )
          const res = await this.$axios.post('/repair/accept', {
            brand: this.request.brand,
            phone: this.request.phone,
            defects: this.request.defects,
            token,
          })
          this.$router.push(`/rUser/${res.data.uId}`)
        })
      } catch (error) {
        console.log(error)
        this.acceptIsDisabeld = false
        this.$router.go()
      }
    },
    back() {
      this.stage--
    },
    next() {
      this.stage++
    },
    rejectOffer() {
      this.$router.go()
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