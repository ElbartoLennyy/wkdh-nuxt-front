<template>
  <div class="overflow-hidden">
    <button v-if="isOpen" class="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-25 w-full h-full z-20 cursor-default" @click="isOpen = false" />
    <div v-if="isOpen" class=" h-screen bg-white w-2/3 z-30 fixed left-0 top-0">
      <div class="flex p-2 justify-between">
        <img
          class="w-2/3 h-auto object-contain"
          src="~assets/img/icons/Logo-new-1000.png"
          alt="Wirkaufendeinhandy - Logo"
        >
        <button class="w-1/6 p-2" @click="isOpen = false">
          <img
            class="h-full w-full object-contain"
            src="~assets/img/svg/cross.svg"
            alt="Wirkaufendeinhandy - Logo"
          >
        </button>
      </div>
      <div class="w-full text-center space-y-10 overflow-hidden">
        <nuxt-link
          to="/"
          class="uppercase block text-xl font-bold text-yellowDark border-b-4 border-yellowDark w-1/2 mx-auto"
        >
          Home
        </nuxt-link>
        <nuxt-link
          to="/aboutUs"
          class="uppercase block text-xl font-bold text-yellowDark"
        >
          Über Uns
        </nuxt-link>
        <div class="bg-yellowDark rounded-lg p-2 mx-4">
          <nuxt-link
            to="/handy"
            class="uppercase block p-2 text-xl font-bold text-yellowDark bg-white rounded-lg"
          >
            Verkaufen
          </nuxt-link>
        </div>
        <div class="absolute bottom-0 w-full">
          <hr>
          <nuxt-link to="/contactUs" class="flex justify-around">
            <img src="~assets/img/svg/support.svg" class="h-12 w-auto m-2">
            <p class="text-yellowDark text-lg font-bold flex-grow my-auto">Hilfe/Kontakt</p>
          </nuxt-link>
          <hr>
          <div class="text-center text-gray-500 text-xs m-2">
            <p>© 2020 Wirkaufendeinhandy GbR</p>
            <p class="text-black">
              <nuxt-link class="hover:text-blue-900" to="/imprint">
                Impressum
              </nuxt-link> | <nuxt-link class="hover:text-blue-900" to="/privacy">
                Datenschutz
              </nuxt-link> | <nuxt-link class="hover:text-blue-900" to="/agb.pdf">
                AGB
              </nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col h-full">
      <div class="flex w-full p-6 md:justify-around text-center space-x-6 items-center">
        <button class="md:hidden w-1/12" @click="isOpen = !isOpen">
          <img
            class="w-full h-auto object-contain"
            src="~assets/img/svg/menu.svg"
            alt="menu"
          >
        </button>
        <img
          class="w-1/3 md:w-1/5 h-auto object-contain"
          src="~assets/img/icons/Logo-new-1000.png"
          alt="Wirkaufendeinhandy - Logo"
        >
        <div class="flex-grow hidden md:block">
          <p
            class="uppercase text-xl lg:text-2xl xl:text-3xl font-bold text-yellowDark bg-white rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            Home
          </p>
        </div>

        <button class="flex-grow hidden md:block" @click="scrollMeTo('ablauf')">
          <p
            class="uppercase text-xl lg:text-2xl xl:text-3xl font-bold text-yellowDark bg-white rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            Ablauf
          </p>
        </button>
        <button class="flex-grow hidden md:block" @click="scrollMeTo('vorteile')">
          <p
            class="uppercase text-xl lg:text-2xl xl:text-3xl font-bold text-yellowDark bg-white rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            Vorteile
          </p>
        </button>
        <nuxt-link to="/aboutUs" class="flex-grow hidden md:block">
          <p
            class="uppercase text-xl lg:text-2xl xl:text-3xl font-bold text-yellowDark bg-white rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            Über uns
          </p>
        </nuxt-link>
        <nuxt-link to="/handy" class="flex-grow hidden md:block bg-white rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 p-2">
          <p
            class="uppercase p-2 text-xl lg:text-2xl xl:text-3xl font-bold text-white bg-yellowDark rounded-lg"
          >
            Verkaufen
          </p>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    scrollMeTo(refName) {
      const element = this.$refs[refName]
      const top = element.offsetTop

      window.scrollTo(0, top)
    },
  },
}
</script>
