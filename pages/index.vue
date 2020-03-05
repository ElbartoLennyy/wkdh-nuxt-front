<template>
  <div class="font-sans pt-24 bg-gray-900 text-white min-h-screen">
    <div class="fixed top-0 inset-x-0 flex">
      <div class="mt-3 bg-gray-800 mx-auto flex rounded-full items-center p-1 shadow-md">
        <nuxt-link to="/" class="w-10 h-10 bg-white rounded-full flex py-1">
          <img class="h-full mx-auto" src="~assets/img/icons/logo-link.png" alt="Logo">
        </nuxt-link>
        <div class="ml-1 p-1 flex">
          <nuxt-link to="/ankauf" class="block py-1 px-3 bg-gray-700 hover:bg-gray-600 hover:text-white hover:no-underline rounded-full">Ankauf</nuxt-link>
          <nuxt-link to="/shop" class="ml-2 block py-1 px-3 bg-gray-700 hover:bg-gray-600 hover:text-white hover:no-underline rounded-full">Shop</nuxt-link>
        </div>
      </div>
    </div>

    <div class="sm:bg-illustration bg-contain bg-no-repeat min-h-screen px-4">
      <div class="max-w-4xl mx-auto">
        <section class="text-center">
          <img
            class="mt-5 inline w-24"
            src="~assets/img/icons/logo.png"
            alt="Logo"
          >
          <h1 class="mt-5 text-5xl md:text-6xl font-semibold leading-tight md:tracking-wide">
            Wir Kaufen Dein Handy
          </h1>
          <nuxt-link to="/ankauf" class="block mt-2 text-2xl md:text-3xl text-blue-300 hover:text-blue-200 font-semibold">
            <h2>Und holen es an deiner Haustür ab!</h2>
          </nuxt-link>
        </section>

        <section class="sm:flex mt-24 bg-gray-800 rounded-lg">
          <div class="sm:hidden pt-12">
            <img class="w-3/5 mx-auto" src="~assets/img/svg/exchange.svg">
          </div>
          <div class="sm:w-1/2 p-8 sm:p-12 sm:pr-0">
            <h3 class="font-bold text-3xl text-blue-400 leading-10">
              Was ist <span class="font-normal">wir</span><wbr>kaufen<br class="hidden sm:inline"><wbr><span class="font-normal">dein</span><wbr>handy<wbr><span class="font-normal">.shop</span>?
            </h3>
            <p class="mt-4">
              Wir sind ein junges Unternehmen, welches Handys und Mobilgeräte ankauft, verkauft, repariert und diese als Serviceleistung bei Ihnen zu Hause abholt.
              Wir kaufen sowohl ungenutzte als auch gebrauchte Geräte an, egal ob diese noch voll funktionsfähig sind, ein defektes Display haben oder scheinbar gar nicht mehr funktionieren.
              Wir kaufen, was du nicht mehr brauchst!
            </p>
          </div>
          <div class="w-1/2 hidden sm:flex">
            <img class="w-3/5 m-auto" src="~assets/img/svg/exchange.svg">
          </div>
        </section>

        <section>
          <h2 class="mt-12 sm:mt-24 text-4xl font-bold">
            Warum du <span class="font-normal">wir</span><wbr>kaufen<wbr><span class="font-normal">dein</span><wbr>handy<wbr><span class="font-normal"><wbr>.shop</span> wählst!
          </h2>
          <p class="mt-4 text-xl text-gray-500">
            Das wir deine erste Wahl sind ist logisch.
            Wirkaufendeinhandy.shop ist zuverlässig und unkompliziert.
            Wir holen deine Geräte zu deinem Wunschtermin bei dir Zuhause ab, ohne dass du dein Haus verlassen musst.
            Wir sind da, um dein Leben so komfortabel und einfach wie möglich zu halten.
            Egal ob Handyreparatur, Ankauf eines neuen Geräts oder Verkauf eines Elektronikartikels.
            Du musst nur ein paar Klicks auf unserer Website tätigen und den Rest übernehmen wir.
            Also worauf wartest du noch? Mit nur ein paar Klicks kannst du über 100€ verdienen!
          </p>
        </section>

        <section class="sm:flex mt-12 sm:mt-24 bg-gray-800 rounded-lg">
          <div class="pt-12 sm:pt-0 sm:w-1/2 flex">
            <img class="w-3/5 m-auto" src="~assets/img/svg/earth.svg">
          </div>
          <div class="sm:w-1/2 p-8 sm:p-12 sm:pl-0">
            <h3 class="font-bold text-3xl text-blue-400 leading-10">
              Der Grüne Aspekt
            </h3>
            <p class="mt-4">Wir sind zwar ein wirtschaftlich selbstständiges Unternehmen, doch eines unserer wichtigsten Ziele besteht auch darin, etwas an die Gesellschaft und an die Umwelt zurückzugeben.</p>
            <p class="mt-3">In Zeiten von großer Umweltverschmutzung und sozialen Unterschieden, wollen wir einfach unseren Beitrag leisten und dafür sorgen, dass alte Mobilgeräte nicht einfach in der Schublade oder im Müll landen, sondern bis zu ihrem endgültigen Ableben genutzt werden.</p>
            <p class="mt-3">Allein in Deutschland lagern über 124.000.000 Althandys in Schubladen. Jedes Jahr werden für die Produktion neuer Handys allein für Deutschland rund 1.440.000 Tonnen CO2 in die Atmosphäre gepustet. Bis 2040 sollen Smartphones der größte Klimakiller der Welt werden. Doch wir glauben daran, dass sich diese Zahlen und Prognosen ändern können.</p>
            <p class="mt-3">Also, hör auf nur über Klimarettung und Umweltschutz zu reden, sondern handle.</p>
            <p class="mt-3">Verkaufe einfach die Geräte, die du nicht mehr brauchst und leiste so auch deinen Teil für eine gesunde Zukunft.</p>
          </div>
        </section>

        <section>
          <h2 class="mt-12 sm:mt-24 text-5xl font-bold">
            Wer wir sind
          </h2>
          <div class="text-xl text-gray-500">
            <p class="mt-4">Wir sind die wirkaufendeinhandy GbR und wurden im Januar 2020 durch die Gründer Alexander Gerick und Marius Marx offiziell angemeldet. Die Idee, die wir während unserer Gründung hatten, ist simpel. Wir empfinden es als zu schade alte Geräte einfach rumliegen zu lassen oder gar wegzuschmeißen. Das wollen wir einfach ändern.</p>
            <p class="mt-3">Deshalb haben wir es uns zur Aufgabe gemacht, den Handy An- und Verkauf von gebrauchten Geräten so simpel wie möglich zu gestalten und auch Reparaturen unkompliziert und zuverlässig anzubieten.</p>
          </div>
        </section>

        <footer class="mt-12 sm:mt-24 py-4 border-t border-gray-800 text-gray-500">
          Wirkaufendeinhandy GbR
          <div class="mt-2 text-gray-600 text-sm font-bold">
            <nuxt-link
              v-for="[linkLabel, linkUrl] in links"
              :key="linkUrl"
              :to="linkUrl"
              class="mr-1"
            >
              {{ linkLabel }}
            </nuxt-link>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    links: [
      ['Impressum', '/imprint'],
      ['Datenschutzerklärung', '/privacy.pdf'],
      ['AGB', '/agb.pdf'],
      ['Kontakt', '/contactUs'],
    ],
  }),
}
</script>

<style>
@responsive {
  .bg-illustration {
    background-image: url('~assets/img/background.svg');
  }
}
</style>
