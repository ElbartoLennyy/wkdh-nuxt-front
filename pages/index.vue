<template>
  <div class="min-h-screen w-full font-sans max-w-screen-3xl mx-auto">
    <script id="CookieDeclaration" src="https://consent.cookiebot.com/00000000-0000-0000-0000-000000000000/cd.js" type="text/javascript" async />
    <div class="w-full">
      <div class="relative w-full">
        <div class="md:hidden fixed bottom-0 w-full text-center z-20 h-24">
          <nuxt-link to="/handy" class="uppercase bg-gradient text-white font-bold inline-block p-3 text-xl rounded-lg border-white border-2">Verkaufe hier!</nuxt-link>
        </div>
        <img
          class="h-auto w-2/3 object-cover ml-auto hidden md:block"
          src="~assets/img/pictures/HappyFacesaslant.jpg"
        >
        <img
          class="h-auto w-2/3 object-contain ml-auto md:hidden"
          src="~assets/img/pictures/HappyFaces-onlymanaslant.jpg"
        >
        <button v-if="sidebarIsOpen" class="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-25 w-full h-full z-20 cursor-default" @click="sidebarIsOpen = false" />
        <div v-if="sidebarIsOpen" class="bg-white w-2/3 z-30 fixed inset-y-0 left-0 flex flex-col justify-between">
          <div>
            <div class="flex p-2 justify-between">
              <div class="w-2/3">
                <img
                  class="w-full h-auto object-contain"
                  src="~assets/img/icons/Logo-new-1000.png"
                  alt="Wirkaufendeinhandy - Logo"
                >
              </div>
              <button class="w-1/6 p-2" @click="sidebarIsOpen = false">
                <img
                  class="h-full w-full object-contain"
                  src="~assets/img/svg/cross.svg"
                  alt="Wirkaufendeinhandy - Logo"
                >
              </button>
            </div>
            <div class="text-center space-y-10 mt-8 ">
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
                  class="uppercase block p-2 text-xl font-bold text-yellowDark bg-white rounded-sm"
                >
                  Verkaufen
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="mb-8">
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
        <div class="absolute top-0 h-full w-full">
          <div class="w-full flex flex-col h-full">
            <div class="flex w-full p-6 text-center space-x-6 items-center md:justify-around">
              <button class="md:hidden w-1/12" @click="sidebarIsOpen = !sidebarIsOpen">
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
              <div class="hidden md:block bg-white rounded-lg p-2 xl:px-8">
                <p
                  class="uppercase text-xl lg:text-2xl xl:text-3xl font-bold text-yellowDark hover:border-b-4 hover:border-yellowDark"
                >
                  Home
                </p>
              </div>

              <button class="hidden md:block bg-white rounded-lg p-2 xl:px-8" @click="scrollMeTo('ablauf')">
                <p
                  class="uppercase text-xl lg:text-2xl xl:text-3xl font-bold text-yellowDark hover:border-b-4 hover:border-yellowDark"
                >
                  Ablauf
                </p>
              </button>
              <button class="hidden md:block bg-white rounded-lg p-2 xl:px-8" @click="scrollMeTo('vorteile')">
                <p
                  class="uppercase text-xl lg:text-2xl xl:text-3xl font-bold text-yellowDark hover:border-b-4 hover:border-yellowDark"
                >
                  Vorteile
                </p>
              </button>
              <nuxt-link to="/aboutUs" class="hidden md:block bg-white rounded-lg p-2 xl:px-8">
                <p
                  class="uppercase text-xl lg:text-2xl xl:text-3xl font-bold text-yellowDark hover:border-b-4 hover:border-yellowDark"
                >
                  Über uns
                </p>
              </nuxt-link>
              <nuxt-link to="/handy" class="hidden md:block bg-white rounded-lg transition duration-300 ease-in-out transform hover:scale-110 p-2">
                <p
                  class="uppercase p-2 text-xl lg:text-2xl xl:text-3xl font-bold text-white bg-yellowDark rounded-sm"
                >
                  Verkaufen
                </p>
              </nuxt-link>
            </div>
            <div class="w-full flex-grow flex">
              <div class="flex flex-col lg:-space-y-1 xl:space-y-0 w-1/2 md:p-2 md:ml-0">
                <nuxt-link to="/handy" class="uppercase font-bold text-xl md:text-2xl lg:text-4xl xl:text-6xl hover:text-gray-800 ml-6 md:ml-16">Verkaufe dein<br>Handy in 2 <br>Minuten!</nuxt-link>
                <img src="~assets/img/icons/Swoosh+text200.png" class="object-scale-down flex-grow -ml-6 md:-ml-0 md:w-5/6">
                <nuxt-link to="/handy" class="flex-grow mt-6">
                  <img src="~assets/img/icons/Kringel-breit.png" class="object-scale-down -ml-6 md:mx-auto md:ml-0 md:w-4/6 transition duration-300 ease-in-out transform hover:scale-110">
                </nuxt-link>
              </div>
              <div class="w-1/2 relative">
                <div
                  class="flex bg-yellowDark rounded-lg absolute bottom-0 right-0 md:m-6 mb-2 h-auto items-center -ml-12 md:-ml-0 mr-2"
                >
                  <p class="text-white p-2 md:p-5 justify-center text-xs md:text-lg lg:text-xl xl:text-2xl font-bold h-auto ">
                    100% Preisgarantie
                    <br><span class="tracking-tight ext-xs md:text-base lg:text-lg xl:text-2xl">Verkaufen mit Sicherheit</span>
                  </p>
                  <img
                    src="~assets/img/icons/Garantie-Sherpe.png"
                    class="object-contain h-10 md:h-16 xl:h-20 xl:m-3 m-1 flex-initial"
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
      <div class="w-full bg-yellowDark text-white p-1 pt-2 md:hidden">
        <div class="flex justify-between font-bold">
          <div class="w-1/3">
            <img src="~assets/img/svg/Datenangabe.svg" class="h-12 mx-auto">
            <p class="text-center">Dateneingabe</p>
          </div>
          <div class="w-1/3">
            <img src="~assets/img/svg/Versand.svg" class="h-12 mx-auto">
            <p class="text-center">Versand an uns</p>
          </div>
          <div class="w-1/3">
            <img src="~assets/img/svg/Zahltag.svg" class="h-12 mx-auto">
            <p class="text-center">Zahltag</p>
          </div>
        </div>
        <div v-if="!procedureIsOpen" @click="procedureIsOpen = !procedureIsOpen">
          <p class="text-center text-sm pt-2">mehr erfahren</p>
          <img src="~assets/img/svg/keyboard_arrow_down-white-18dp.svg" alt="Pfeil nach unten" class="h-6 -mt-1 mx-auto">
        </div>
        <div v-if="procedureIsOpen" @click="procedureIsOpen = !procedureIsOpen">
          <p class="text-center text-sm pt-2">weniger anzeigen</p>
          <img src="~assets/img/svg/keyboard_arrow_up-white-18dp.svg" alt="Pfeil nach oben" class="h-6 -mt-1 mx-auto">
        </div>
      </div>
      <div v-if="procedureIsOpen">
        <div class="w-full bg-gradientMirrored text-white p-6">
          <div class="flex">
            <img src="~assets/img/icons/datasheet.png" class="object-contain w-1/4 m-auto h-16 lg:h-32 p-2">
            <div>
              <p class="font-bold text-xl lg:text-2xl uppercase">Dateneingabe</p>
              <p
                class="text-base lg:text-lg"
              >
                Gebe die Daten deines Handys an und erhalte ein uverbindliches Angebot.
              </p>
            </div>
          </div>
          <img src="~assets/img/svg/arrow_downward-white-18dp.svg" class="object-contain h-16 p-2 mx-auto">

          <div class="flex">
            <img src="~assets/img/icons/Box.png" class="object-contain w-1/4 m-auto h-16 lg:h-32 p-2">
            <div>
              <p class="font-bold text-xl lg:text-2xl uppercase">Versand an uns</p>
              <p class="text-base lg:text-lg">Einfach dein kostenloses Paketlabel ausdrucken und an uns senden.</p>
            </div>
          </div>
          <img src="~assets/img/svg/arrow_downward-white-18dp.svg" class="object-contain h-16 p-2 mx-auto">
          <div class="flex">
            <img src="~assets/img/icons/Moneybag.png" class="object-contain w-1/4 m-auto h-16 lg:h-32 p-2">
            <div>
              <p class="font-bold text-xl lg:text-2xl uppercase">Zahltag</p>
              <p class="text-base lg:text-lg">Dein Geld wird auf dein Konto überwiesen.</p>
            </div>
          </div>
        </div>
      </div>
      <div ref="vorteile" class="flex justify-around">
        <div class="w-1/4 md:w-2/6 my-auto">
          <img src="~assets/img/icons/Garantie-Sherpe-drehwurm.png" class="w-full md:mt-6 object-contain md:-mr-10">
        </div>
        <div class="w-2/3 md:w-1/2 p-1 md:p-8 mt-4">
          <p class="text-xl md:text-6xl font-bold text-yellowDark">100% Preisgarantie</p>
          <p class="text-lg md:text-4xl text-yellowDark font-bold">Verkaufen mit Sicherheit</p>
          <div class="flex pt-2 md:pt-6 text-sm md:text-2xl font-bold mt-2">
            <img src="~assets/img/svg/check.svg" class="inline h-6 md:h-10"> <p class="w-11/12 ml-auto">Das bekommen, was vereinbart wurde. </p>
          </div>
          <div class="flex pt-2 md:pt-6 text-sm md:text-2xl font-bold">
            <img src="~assets/img/svg/check.svg" class="inline h-6 md:h-10"> <p class="w-11/12 ml-auto">Gewissenhafte und ehrliche Zweitprüfung.</p>
          </div>
          <div class="flex pt-2 md:pt-6 text-sm md:text-2xl font-bold">
            <img src="~assets/img/svg/check.svg" class="inline h-6 md:h-10"> <p class="w-11/12 ml-auto">Faire Preise im An- und Verkauf.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-auto mt-4 relative">
      <client-only>
        <agile
          :autoplay="true"
          :nav-buttons="false"
          :autoplay-speed="5000"
          :dots="false"
          :pause-on-hover="false"
          :swipe-distance="5000"
        >
          <div>
            <img src="~assets/img/pictures/StadttripPaaraslant.jpg" class="object-contain w-7/12 md:w-1/2">
          </div>
          <div>
            <img src="~assets/img/pictures/Quad-aslant.jpg" class="object-contain w-7/12 md:w-1/2">
          </div>
          <div>
            <img src="~assets/img/pictures/cocktails-aslant.jpg" class="object-contain w-7/12 md:w-1/2">
          </div>
        </agile>
      </client-only>
      <div class="w-7/12 xs:w-2/3 flex flex-col md:p-6 z-10 absolute top-0 right-0 h-full">
        <img src="~assets/img/icons/Swoosh+text200.png" class="object-contain -ml-2 -mt-2">
        <div class="ml-auto w-5/6 justify-between flex flex-col h-full text-center mt-6">
          <p class="text-yellowDark text-sm sm:text-md md:text-3xl xl:text-5xl 2xl:text-6 font-bold flex-grow  mr-2">Mit deinem neuen Geld <br>könntest du...</p>
          <client-only>
            <agile
              :autoplay="true"
              :nav-buttons="false"
              :autoplay-speed="5000"
              :dots="false"
              :pause-on-hover="false"
              :swipe-distance="5000"
              class="text-black text-sm sm:text-md md:text-3xl xl:text-5xl font-bold flex-grow"
            >
              <div>
                <p class="mr-2">einen Romantischer Städtetrip<br>mit deinem Partner erleben</p>
              </div>
              <div>
                <p class="mr-2">eine Quadtour<br>mit deinen Freunden machen</p>
              </div>
              <div>
                <p class="mr-2">einen Cocktail Kurs<br>mit deinem Freunden besuchen</p>
              </div>
            </agile>
          </client-only>
          <div class="sm:mr-4 md:mx-auto transition duration-300 ease-in-out transform hover:scale-110">
            <nuxt-link to="/handy" class="p-1 text-yellowDark font-bold text-md md:text-3xl xl:text-5xl border-yellowDark border-4 md:border-8 md:p-2 rounded-lg">JETZT VERKAUFEN</nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col items-center mt-6">
      <div class="w-5/6 bg-gradient text-center text-white rounded-lg uppercase">
        <p class="text-lg md:text-4xl font-extrabold pt-4">Verkaufe jetzt dein Handy</p>
        <p class="text-base md:text-2xl font-bold pb-4">& Erhalte dein Geld</p>
      </div>
      <nuxt-link to="/handy" class="text-yellowDark m-6 p-2 font-extrabold text-xl md:text-3xl border-yellowDark border-4 md:border-8 rounded-lg text-center transition duration-300 ease-in-out transform hover:scale-110">JETZT VERKAUFEN</nuxt-link>
    </div>
    <div class="w-full bg-gradient text-white p-2 md:p-6 text-center flex flex-col items-center">
      <p class="text-xl md:text-4xl font-bold pb-4">Noch irgendwelche Fragen?</p>
      <p class="hidden md:block text-xl font-bold w-1/2 pb-4">Solltest du noch weitere Fragen haben, beantworten wir diese gerne per Mail oder Telefon. Ansonsten schaue gerne mal bei unserem FAQ vorbei</p>
      <div class="flex uppercase text-lg md:text-3xl justify-around font-bold w-full md:w-2/3 mb-1">
        <nuxt-link to="/faq" class="border-white w-1/3 border-4 md:border-4 rounded-lg p-1 px-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">FAQ</nuxt-link>
        <nuxt-link to="/contactUs" class="border-white w-1/3 border-4 md:border-4 rounded-lg p-1 px-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">Kontakt</nuxt-link>
      </div>
    </div>
    <footerTemplate />
    <dir class="h-16 w-full" />
  </div>
</template>

<script>
import footerTemplate from '~/components/newFooter'

export default {

  components: { footerTemplate },
  data() {
    return {
      sidebarIsOpen: false,
      procedureIsOpen: false,
    }
  },
  mounted() {
    const cookieScript = document.createElement('script')
    cookieScript.setAttribute('src', 'https://consent.cookiebot.com/uc.js')
    cookieScript.setAttribute('data-cbid', `${process.env.NUXT_ENV_COOKIE_TOKEN}`)
    cookieScript.setAttribute('data-blockingmode', 'auto')
    document.head.appendChild(cookieScript)
    const agile = document.createElement('script')
    agile.setAttribute('src', 'https://unpkg.com/vue-agile')
    document.head.appendChild(agile)
    const agileStyle = document.createElement('link')
    agileStyle.setAttribute('rel', 'stylesheet')
    agileStyle.setAttribute('href', 'https://unpkg.com/vue-agile/dist/VueAgile.css')
    document.head.appendChild(agileStyle)
  },
  methods: {
    scrollMeTo(refName) {
      const element = this.$refs[refName]
      const top = element.offsetTop

      window.scrollTo({ top, behavior: 'smooth' })
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
