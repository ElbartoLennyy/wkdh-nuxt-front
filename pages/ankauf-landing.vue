<template>
  <div class="font-sans bg-gray-900 text-white min-h-screen">
    <headerTemplate />

    <div class="sm:bg-illustration bg-contain bg-no-repeat min-h-screen px-4">
      <div class="max-w-4xl mx-auto">
        <section class="md:flex text-center">
          <div class="md:mr-20 text-center md:inline hidden">
            <img
              class="mt-5 w-24 inline"
              src="~assets/img/icons/logo.png"
              alt="Logo"
            >
            <nuxt-link to="/handy">
              <button class="bg-buttonBlue rounded-lg font-semibold mt-8 text-lg truncate p-2 pl-12 pr-12 hover:text-blue-200 hover:no-underline shadow-xl ">
                Jetzt Handy verkaufen →
              </button>
            </nuxt-link>
            <p class="text-gray-500 font-light text-sm">
              Deine Anfrage ist kostenlos und unverbindlich.
            </p>
          </div>

          <div>
            <h1 class="mt-5 text-4xl md:text-6xl font-semibold leading-tight md:tracking-wide md:text-left">
              Wir kaufen dein altes Handy.
            </h1>
            <nuxt-link to="/handy" class="block mt-2 text-2xl md:text-3xl text-blue-300 hover:text-blue-200 font-semibold">
              <h2>Und holen es an deiner Haustür ab!</h2>
            </nuxt-link>
          </div>

          <div class="md:hidden">
            <nuxt-link to="/handy">
              <button class="bg-buttonBlue rounded-lg font-semibold mt-8 text-lg truncate p-2 pl-12 pr-12 hover:text-blue-200 hover:no-underline shadow-xl ">
                Jetzt Handy verkaufen →
              </button>
            </nuxt-link>
            <p class="text-gray-500 font-light text-sm">
              Deine Anfrage ist kostenlos und unverbindlich.
            </p>
          </div>
        </section>

        <section>
          <h2 class="mt-12 sm:mt-24 text-2xl md:text-4xl font-bold text-center">
            Das alte Handy gegen Geld eintauschen!
          </h2>
          <div class="text-center mt-6">
            <p class="text-2xl md:text-4xl">
              <img
                src="~assets/img/icons/green-check-icon.png"
                class="inline h-4 md:h-6"
              > Einfach
            </p>
            <p class="text-2xl md:text-4xl">
              <img
                src="~assets/img/icons/green-check-icon.png"
                class="inline h-4 md:h-6"
              > Schnell
            </p>
            <p class="text-2xl md:text-4xl">
              <img
                src="~assets/img/icons/green-check-icon.png"
                class="inline h-4 md:h-6"
              > Sicher
            </p>
          </div>
          <div>
            <div class="flex mt-6 md:mt-10">
              <div class="w-1/4 ml-12">
                <img class="w-auto md:h-56" src="~assets/img/svg/click-here.svg">
              </div>
              <div class="sm:w-1/2 sm:pr-0 m-auto">
                <nuxt-link to="/handy">
                  <p class="text-blue-400 text-lg md:text-3xl font-bold ">Formular ausfüllen</p>
                </nuxt-link>
              </div>
            </div>
            <div class="flex mt-6 md:mt-8">
              <div class="w-1/4 ml-12">
                <img class="w-auto md:h-56" src="~assets/img/svg/message.svg">
              </div>
              <div class="sm:w-1/2 sm:pr-0 m-auto">
                <p class="text-blue-400 text-lg md:text-3xl font-bold ">Angebot erhalten</p>
              </div>
            </div>
            <div class="flex mt-6 md:mt-8">
              <div class="w-1/4 ml-12 flex-shrink-0 mr-5">
                <img class="w-auto md:h-56" src="~assets/img/svg/calendar.svg">
              </div>
              <div class="sm:w-1/2 sm:pr-0 m-auto">
                <p class="text-blue-400 text-lg md:text-3xl font-bold ">Daten angeben und Abholtermin vereinbaren.</p>
              </div>
            </div>
            <div class="flex mt-6 md:mt-8">
              <div class="w-1/4 ml-12">
                <img class="w-auto md:h-56" src="~assets/img/svg/phone.svg">
              </div>
              <div class="sm:w-1/2 sm:pr-0 m-auto">
                <p class="text-blue-400 text-lg md:text-3xl font-bold ">Bote holt Handy ab</p>
              </div>
            </div>
            <div class="flex mt-6 md:mt-8">
              <div class="w-1/4 ml-12">
                <img class="w-auto md:h-56" src="~assets/img/svg/earn-money.svg">
              </div>
              <div class="sm:w-1/2 sm:pr-0 m-auto">
                <p class="text-blue-200 text-lg md:text-3xl font-bold ">Den vorher ausgemachten Geldbetrag erhalten!</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 class="mt-12 sm:mt-24 text-4xl font-bold">
            Wirkt alles sehr unseriös für dich?
          </h2>
          <p class="mt-4 text-xl text-gray-500">
            Dann konntaktiere uns einfach! Wir sind ein sehr jugens Unternehmen, wodurch man noch nichts von uns gehört hat. Deswegen konntaktiere uns einfach wenn du Fragen oder Bedenken hast.
            <br><nuxt-link to="/contactUs" class="text-gray-200 hover:text-blue-300">
              Klicke hier wenn du uns konntaktieren willst.
            </nuxt-link>
          </p>
        </section>

        <section class="sm:flex mt-12 sm:mt-24 bg-gray-800 rounded-lg">
          <div class="pt-12 sm:pt-0 sm:w-1/2 flex">
            <img class="w-3/5 m-auto" src="~assets/img/svg/privacy.svg">
          </div>
          <div class="sm:w-1/2 p-8 sm:p-12 sm:pl-0">
            <h3 class="font-bold text-3xl text-blue-400 leading-10">
              Deine Daten bleiben auch privat!
            </h3>
            <p class="mt-4">
              Auf Handys sind heutzutage Informationen über jegliche Lebensbereiche eines Menschen gespeichert. Diese Daten gehen niemanden etwas an! Um deine Privatsphäre zu schützen, setzen wir deshalb jedes Handy vor dem Weiterverkauf auf die Werkseinstellungen zurück. Im Anschluss verwenden wir noch so genannte Shredder-Apps, wodurch deine Daten endgültig und unwiderruflich überschrieben werden. Du kannst dein Mobilgerät auch gerne schon vor Übergabe zurücksetzen oder uns auf das Thema Datenschutz ansprechen, wenn du Fragen oder Bedenken hast.
            </p>
          </div>
        </section>

        <section>
          <h2 class="mt-12 sm:mt-24 text-4xl font-bold">
            Abholservice derzeit begrenzt
          </h2>
          <p class="mt-4 text-xl text-gray-500">
            Wir von wirkaufendeinhandy.shop arbeiten täglich an der Ausweitung unserer Kundenbereiche. Da wir derzeit noch am Beginn unserer Firmengeschichte stehen, ist der Abholservice derzeit nur auf den städtischen Raum von Dresden und Görlitz begrenzt.
          </p>
        </section>

        <section>
          <h2 class="mt-12 sm:mt-24 text-4xl font-bold">
            Paket selbst versenden? Kein Problem!
          </h2>
          <p class="mt-4 text-xl text-gray-500">
            Wähle einfach am Ende des Verkauf "Selbst Verschicken" aus. Das Versandlabel bekommst du von uns und du musst nur noch dein Handy verschicken
          </p>
        </section>
        <footerTemplate />
      </div>
    </div>
  </div>
</template>

<script>
import footerTemplate from '~/components/footer'
import headerTemplate from '~/components/header'

export default {
  components: { footerTemplate, headerTemplate },
}
</script>

<style>
@responsive {
  .bg-illustration {
    background-image: url('~assets/img/background.svg');
  }
}
</style>
