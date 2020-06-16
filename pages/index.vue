<template>
  <div class="min-h-screen w-full font-sans max-w-screen-3xl mx-auto">
    <script id="CookieDeclaration" src="https://consent.cookiebot.com/00000000-0000-0000-0000-000000000000/cd.js" type="text/javascript" async />
    <div class="w-full">
      <div class="relative w-full">
        <img
          class="h-auto w-2/3 object-cover ml-auto hidden md:block"
          src="~assets/img/pictures/HappyFacesSchräg.jpg"
        >
        <img
          class="h-auto w-2/3 object-contain ml-auto md:hidden"
          src="~assets/img/pictures/HappyFaces-onlymanSchräg.jpg"
        >
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
            <div class="absolute bottom-0 w-full mb-8">
              <hr>
              <nuxt-link to="/faq" class="flex justify-around">
                <img src="~assets/img/svg/support.svg" class="h-12 w-auto m-2">
                <p
                  class="text-yellowDark text-lg font-bold my-auto"
                >
                  Hilfe/Kontakt
                </p>
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
        <div class="absolute top-0 h-full w-full">
          <div class="w-full flex flex-col h-full">
            <div class="flex w-full p-6 md:justify-around text-center space-x-6 items-center md:justify-around">
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
              <div class="flex-grow mx-2 hidden md:block">
                <p
                  class="uppercase text-xl lg:text-2xl xl:text-3xl font-bold text-yellowDark bg-white rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                >
                  Home
                </p>
              </div>

              <button class="flex-grow mx-2 hidden md:block" @click="scrollMeTo('ablauf')">
                <p
                  class="uppercase text-xl lg:text-2xl xl:text-3xl font-bold text-yellowDark bg-white rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                >
                  Ablauf
                </p>
              </button>
              <button class="flex-grow mx-2 hidden md:block" @click="scrollMeTo('vorteile')">
                <p
                  class="uppercase text-xl lg:text-2xl xl:text-3xl font-bold text-yellowDark bg-white rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                >
                  Vorteile
                </p>
              </button>
              <nuxt-link to="/aboutUs" class="flex-grow mx-2 hidden md:block">
                <p
                  class="uppercase text-xl lg:text-2xl xl:text-3xl font-bold text-yellowDark bg-white rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                >
                  Über uns
                </p>
              </nuxt-link>
              <nuxt-link to="/handy" class="flex-grow mx-2 hidden md:block bg-white rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 p-2">
                <p
                  class="uppercase p-2 text-xl lg:text-2xl xl:text-3xl font-bold text-white bg-yellowDark rounded-lg"
                >
                  Verkaufen
                </p>
              </nuxt-link>
            </div>
            <div class="w-full flex-grow flex">
              <div class="flex flex-col lg:-space-y-1 xl:space-y-0 w-1/2 md:p-2 md:ml-0">
                <nuxt-link to="/handy" class="uppercase font-semibold md:font-bold text-xl md:text-2xl lg:text-4xl xl:text-6xl hover:text-gray-800 ml-6 md:ml-16">Verkaufe dein<br>Handy in 2 <br>Minuten!</nuxt-link>
                <img src="~assets/img/icons/Swoosh+text200.png" class="object-scale-down flex-grow -ml-6 md:-ml-0 md:w-5/6">
                <nuxt-link to="/handy" class="flex-grow mt-6">
                  <img src="~assets/img/icons/Kringel-breit.png" class="object-scale-down -ml-6 md:mx-auto md:ml-0 md:w-4/6">
                </nuxt-link>
              </div>
              <div class="w-1/2 relative">
                <div
                  class="flex bg-yellowDark rounded-lg absolute bottom-0 right-0 md:m-6 p-1 mb-2 h-auto items-center -ml-12 md:-ml-0 mr-2"
                >
                  <p class="text-white p-1 xl:p-5 justify-center text-xs md:text-lg lg:text-xl xl:text-2xl font-bold h-auto ">
                    100% Preisgarantie
                    <br><span class="tracking-tight ext-xs md:text-base lg:text-lg xl:text-2xl">Verkaufen mit Sicherheit</span>
                  </p>
                  <img
                    src="~assets/img/icons/Garantie-Sherpe.png"
                    class="object-contain h-12 md:h-20 xl:h-24 xl:m-5 m-1 flex-initial"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div ref="ablauf" class="w-full h-auto">
      <div class="w-full bg-gradientMirrored text-white p-6 items-center hidden md:flex ">
        <img src="~assets/img/icons/datasheet.png" class="object-contain h-16 lg:h-32 p-2">
        <div>
          <p class="font-bold text-xl lg:text-2xl uppercase">Dateneingabe</p>
          <p
            class="text-base lg:text-lg"
          >
            Gebe die Daten deines Handys an und erhalte ein uverbindliches Angebot.
          </p>
        </div>
        <div class="bg-white w-1/5 mx-2 h-1" />

        <img src="~assets/img/icons/Box.png" class="object-contain h-16 lg:h-32 p-2">
        <div>
          <p class="font-bold text-xl lg:text-2xl uppercase">Versand an uns</p>
          <p class="text-base lg:text-lg">Einfach dein kostenloses Paketlabel ausdrucken und an uns senden.</p>
        </div>
        <div class="bg-white w-1/5 mx-2 h-1" />

        <img src="~assets/img/icons/Moneybag.png" class="object-contain h-16 lg:h-32 p-2">
        <div>
          <p class="font-bold text-xl lg:text-2xl uppercase">Zahltag</p>
          <p class="text-base lg:text-lg">Dein Geld wird auf dein Konto überwiesen.</p>
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
        <img src="~assets/img/icons/Garantie-Sherpe-drehwurm.png" class="w-3/12 md:mt-6 object-contain object-top h-auto md:-mr-10">
        <div class="flex-grow md:w-1/2 p-1 md:p-8 flex flex-col mt-4">
          <p class="flex-grow text-xl md:text-6xl font-bold w-11/12 ml-auto">100% Preisgarantie</p>
          <p class="flex-grow text-lg md:text-5xl w-11/12 ml-auto">Verkaufen mit Sicherheit</p>
          <div class="flex-grow flex pt-2 md:pt-6 text-sm md:text-4xl font-bold mt-2">
            <img src="~assets/img/svg/Häkchen.svg" class="inline my-auto -ml-2 md:-ml-6 w-1/12"> <p class="w-11/12 ml-auto">Das bekommen, was vereinbart wurde. </p>
          </div>
          <div class="flex-grow flex pt-2 md:pt-6 text-sm md:text-4xl font-bold">
            <img src="~assets/img/svg/Häkchen.svg" class="inline my-auto -ml-2 md:-ml-6 w-1/12"> <p class="w-11/12 ml-auto">Gewissenhafte und ehrliche Zweitprüfung.</p>
          </div>
          <div class="flex-grow flex pt-2 md:pt-6 text-sm md:text-4xl font-bold">
            <img src="~assets/img/svg/Häkchen.svg" class="inline my-auto -ml-2 md:-ml-6 w-1/12"> <p class="w-11/12 ml-auto">Faire Preise im An- und Verkauf.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-auto mt-4 relative">
      <img src="~assets/img/pictures/StadttripPaarSchräg.jpg" class="object-contain w-1/2">
      <div class="w-2/3 flex flex-col md:p-6 z-10 absolute top-0 right-0 h-full">
        <img src="~assets/img/icons/Swoosh+text200.png" class="object-contain -ml-2">
        <div class="ml-auto w-2/3 md:w-5/6 lg:w-2/3 justify-between flex flex-col h-full">
          <p class="text-yellowDark text-sm md:text-3xl xl:text-5xl 2xl:text-6 font-bold flex-grow  mr-2">Mit deinem neuen Geld <br>könntest du...</p>
          <p class="text-black text-sm md:text-3xl xl:text-5xl font-bold flex-grow text-center mr-2">Romantischer Städtetrip<br>mit deinem Partner</p>
          <div class="flex-grow sm:mr-4 md:mx-auto">
            <nuxt-link to="/handy" class="p-1 text-yellowDark font-bold text-lg md:text-3xl xl:text-5xl border-yellowDark border-4 md:border-8 md:p-2 rounded-lg text-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">Jetzt VERKAUFEN</nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full p-2 md:p-6 flex flex-col items-center mt-2">
      <div class="w-5/6 p-2 bg-gradient text-center text-white rounded-lg uppercase">
        <p class="text-lg md:text-4xl font-extrabold md:py-2 md:py-4">Verkaufe jetzt dein Handy</p>
        <p class="text-base md:text-2xl font-bold md:py-2">& Erhalter dein Geld</p>
      </div>
      <nuxt-link to="/handy" class="text-yellowDark font-extrabold text-xl md:text-3xl border-yellowDark border-4 md:border-8 p-2 rounded-lg text-center m-2 mt-4 md:m-6 hover:text-yellowLight hover:border-yellowLight">Jetzt VERKAUFEN</nuxt-link>
    </div>
    <div class="w-full bg-gradient text-white p-2 md:p-6 text-center flex flex-col items-center">
      <p class="text-xl md:text-4xl font-bold pb-4">Noch irgendwelche Fragen?</p>
      <p class="hidden md:block text-xl font-bold w-1/2 pb-4">Solltest du noch weitere Fragen haben, beantworten wir diese gerne per Mail oder Telefon. Ansonsten schaue gerne mal bei unserem FAQ vorbei</p>
      <div class="flex uppercase text-lg md:text-3xl justify-around font-bold w-full md:w-2/3 mb-1">
        <nuxt-link to="/faq" class=" border-white w-1/3 border-4 md:border-4 rounded-lg p-1 px-2 md:px-8 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">FAQ</nuxt-link>
        <nuxt-link to="/contactUs" class="bg-white w-1/3 text-yellowDark rounded-lg p-1 px-2 md:px-8 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">Kontakt</nuxt-link>
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
  mounted() {
    const cookieScript = document.createElement('script')
    cookieScript.setAttribute('src', 'https://consent.cookiebot.com/uc.js')
    cookieScript.setAttribute('data-cbid', `${process.env.NUXT_ENV_COOKIE_TOKEN}`)
    cookieScript.setAttribute('data-blockingmode', 'auto')
    document.head.appendChild(cookieScript)
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

<style>
.bg-gradient{
background: linear-gradient(90deg, rgba(255,187,57,1) 0%, rgba(250,164,1,1) 100%);
}

.bg-gradientMirrored{
background: linear-gradient(90deg, rgba(250,164,1,1) 0%, rgba(255,187,57,1) 100%);
}
</style>
