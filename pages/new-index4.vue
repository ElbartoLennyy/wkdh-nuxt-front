<template>
  <div class="min-h-screen w-full font-sans">
    <div class="w-full">
      <div class="relative">
        <img
          class="h-auto w-2/3 object-contain ml-auto hidden md:block "
          src="~assets/img/pictures/HappyFacesSchräg.jpg"
        >
        <img
          class="h-auto w-2/3 object-contain ml-auto md:hidden"
          src="~assets/img/pictures/HappyFaces-onlymanSchräg.jpg"
        >
        <button v-if="isOpen" class="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-25 w-full h-full z-10 cursor-default" @click="isOpen = false" />
        <div v-if="isOpen" class=" h-screen bg-white w-2/3 z-10 fixed left-0 top-0">
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
          <div class="w-full text-center space-y-10 mt-8 ">
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
            </div>
          </div>
        </div>
        <div class="absolute top-0 h-full w-full">
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
            <div class="w-full flex-grow flex">
              <div class="flex flex-col md:space-y-8 xl:space-y-2 w-1/2 p-2 md:p-8">
                <nuxt-link to="/handy" class="uppercase font-semibold md:font-bold md:text-center text-xl md:text-2xl lg:text-4xl xl:text-6xl hover:text-gray-800">Verkaufe dein Handy<br> in 2 Minuten!</nuxt-link>
                <img src="~assets/img/icons/Swoosh+text200.png" class="object-scale-down flex-grow md:mx-auto">
                <nuxt-link to="/handy">
                  <img src="~assets/img/icons/Kringel-breit.png" class="object-scale-down flex-grow md:mx-auto">
                </nuxt-link>
              </div>
              <div class="w-1/2 relative">
                <div
                  class="flex bg-yellowDark rounded-lg absolute bottom-0 right-0 lg:m-20 mb-2 md:mb-6 h-auto items-center"
                >
                  <p class="text-white p-2 xl:p-5 justify-center text-xs md:text-base lg:text-lg xl:text-2xl font-bold h-auto">
                    100% Preisgarantie
                    <br>Verkaufen mit Sicherheit
                  </p>
                  <img
                    src="~assets/img/icons/Garantie-Sherpe.png"
                    class="object-contain h-8 md:h-20 xl:h-24 xl:m-5 m-2 flex-initial"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div ref="ablauf" class="w-full h-auto">
      <div class="w-full bg-yellowDark text-white p-6 items-center hidden md:flex ">
        <img src="~assets/img/icons/datasheet.png" class="object-contain w-1/6 p-6">
        <div>
          <p class="font-bold text-2xl uppercase">Dateneingabe</p>
          <p
            class="text-lg"
          >
            Gebe die Daten deines Handys an und erhalte ein uverbindliches Angebot.
          </p>
        </div>
        <div class="bg-white w-1/5 mx-2 h-1" />

        <img src="~assets/img/icons/Box.png" class="object-contain w-1/6 p-6">
        <div>
          <p class="font-bold text-2xl uppercase">Versand an uns</p>
          <p class="text-lg">Einfach dein kostenloses Paketlabel ausdrucken und an uns senden.</p>
        </div>
        <div class="bg-white w-1/5 mx-2 h-1" />

        <img src="~assets/img/icons/Moneybag.png" class="object-contain w-1/6 p-6">
        <div>
          <p class="font-bold text-2xl uppercase">Zahltag</p>
          <p class="text-lg">Hi dafür benöte ich noch einen Text lul!</p>
        </div>
      </div>
      <div class="w-full bg-yellowDark text-white flex p-2 items-center md:hidden space-x-6">
        <div class="flex-grow">
          <img src="~assets/img/svg/Datenangabe.svg" class="h-12 mx-auto">
          <p class="text-center">Datenangabe</p>
        </div>
        <div class="flex-grow">
          <img src="~assets/img/svg/Versand.svg" class="h-12 mx-auto">
          <p class="text-center">Versand an uns</p>
        </div>
        <div class="flex-grow">
          <img src="~assets/img/svg/Zahltag.svg" class="h-12 mx-auto">
          <p class="text-center">Zahltag</p>
        </div>
      </div>
      <div ref="vorteile" class="flex text-yellowDark justify-around">
        <img src="~assets/img/icons/Garantie-Sherpe.png" class="w-3/12 m-2 mt-4 md:m-8 object-contain object-top">
        <div class="w-9/12 md:w-1/2 p-2 md:p-8 flex flex-col">
          <p class="flex-grow text-xl md:text-6xl font-bold">100% Preisgarantie</p>
          <p class="flex-grow text-lg md:text-5xl">Verkaufen mit Sicherheit</p>
          <p class="flex-grow pt-2 md:pt-6 text-base md:text-4xl font-bold">
            <img src="~assets/img/svg/Häkchen.svg" class="inline h-4 md:h-8"> Das bekommen, was vereinbart wurde.
          </p>
          <p class="flex-grow pt-2 md:pt-6 text-base md:text-4xl font-bold">
            <img src="~assets/img/svg/Häkchen.svg" class="inline h-4 md:h-8"> Gewissenhafte und ehrliche Zweitprüfung.
          </p>
          <p class="flex-grow pt-2 md:pt-6 text-base md:text-4xl font-bold">
            <img src="~assets/img/svg/Häkchen.svg" class="inline h-4 md:h-8"> Faire Preise im An- und Verkauf.
          </p>
        </div>
      </div>
    </div>
    <div class="w-full flex h-auto">
      <img src="~assets/img/pictures/StadttripPaarSchräg.jpg" class="object-contain h-full w-2/3">
      <div class="w-1/2 flex flex-col justify-around p-2 md:p-6 -ml-10">
        <img src="~assets/img/icons/Swoosh+text200.png" class="object-contain flex-grow">
        <p class="text-yellowDark text-sm md:text-4xl xl:text-6xl font-bold flex-grow">Mit deinem neuen Geld könntest du...</p>
        <p class="text-black text-sm md:text-4xl xl:text-6xl font-bold flex-grow text-center">Romantischer Städtetrip mit deinem Partner</p>
        <div class="flex-grow">
          <nuxt-link to="/handy" class="text-yellowDark block font-bold text-lg md:text-3xl xl:text-5xl border-yellowDark border-4 md:border-8 md:p-2 rounded-lg text-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">Jetzt VERKAUFEN</nuxt-link>
        </div>
      </div>
    </div>
    <div class="w-full p-2 md:p-6 flex flex-col items-center">
      <div class="w-full md:w-2/3 bg-yellowDark text-center text-white rounded-lg uppercase">
        <p class="text-lg md:text-4xl font-bold py-2 md:py-4">Verkaufe jetzt dein Handy</p>
        <p class="text-base md:text-2xl py-2">& Erhalter dein Geld</p>
      </div>
      <nuxt-link to="/handy" class="text-yellowDark font-bold text-xl md:text-3xl border-yellowDark border-4 md:border-8 p-2 rounded-lg text-center m-2 md:m-6 hover:text-yellowLight hover:border-yellowLight">Jetzt VERKAUFEN</nuxt-link>
    </div>
    <div class="w-full bg-yellowDark text-white p-2 md:p-6 text-center flex flex-col items-center">
      <p class="text-xl md:text-4xl font-bold pb-4">Noch irgendwelche Fragen?</p>
      <p class="hidden md:block text-xl font-bold w-1/2 pb-4">Solltest du noch weitere Fragen haben, beantworten wir diese gerne per Mail oder Telefon. Ansonsten schaue gerne mal bei unserem FAQ vorbei</p>
      <div class="flex uppercase text-lg md:text-3xl justify-around font-bold w-full md:w-2/3">
        <nuxt-link to="/faq" class=" border-white border-2 md:border-4 rounded-lg p-2 px-2 md:px-8 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">FAQ</nuxt-link>
        <nuxt-link to="/contactUs" class=" bg-white text-yellowDark rounded-lg p-2 px-2 md:px-8 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">Kontakt</nuxt-link>
      </div>
    </div>
    <footerTemplate />
  </div>
</template>

<script>
import footerTemplate from '~/components/newFooter'

export default {
  components: { footerTemplate },
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
