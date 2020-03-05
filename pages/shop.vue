<template>
  <div class="font-sans pt-24 bg-gray-900 text-white min-h-screen">
    <div class="fixed top-0 inset-x-0 flex">
      <div class="mt-3 bg-gray-800 mx-auto flex rounded-full items-center p-1 shadow-md">
        <nuxt-link to="/" class="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex py-1">
          <img class="h-full mx-auto" src="~assets/img/icons/logo-link.png" alt="Logo">
        </nuxt-link>
        <div class="ml-1 p-1 flex">
          <nuxt-link to="/ankauf" class="block py-1 px-3 bg-gray-700 hover:text-white hover:no-underline rounded-full">Ankauf</nuxt-link>
          <nuxt-link to="/shop" class="ml-2 block py-1 px-3 bg-white hover:no-underline rounded-full text-gray-900">Shop</nuxt-link>
          <a href="https://www.kaufedeinhandy.de" class="ml-2 block py-1 px-3 bg-gray-700 hover:bg-blue-600 text-blue-400 hover:text-white hover:no-underline rounded-full">Zum Shop →</a>
        </div>
      </div>
    </div>

    <div class="sm:bg-illustration bg-contain bg-no-repeat min-h-screen px-4">
      <div class="max-w-4xl mx-auto">
        <section class="md:flex text-center">
          <div class="md:mr-20 text-center">
            <img
              class="mt-5 inline w-24"
              src="~assets/img/icons/logo.png"
              alt="Logo"
            >
            <a href="https://www.kaufedeinhandy.de">
              <button class="bg-buttonBlue rounded-lg font-semibold mt-8 text-lg truncate p-2 pl-12 pr-12 hover:text-blue-200 hover:no-underline shadow-xl ">
                Jetzt Shop besuchen →
              </button>
            </a>
          </div>

          <div>
            <h1 class="mt-5 text-4xl md:text-6xl font-semibold leading-tight md:tracking-wide md:text-left">
              Du willst ein neues Handy?
            </h1>
          </div>
        </section>

        <!-- TODO Shoptext einfügen/Gelbe Logo -->

        <section>
          <h2 class="mt-12 sm:mt-24 text-4xl font-bold">
            Sie wollen ein gebrauchtes Handy zu einem fairen Preis kaufen? Kein Problem!
          </h2>
          <p class="mt-4 text-xl text-gray-500">
            Schicken Sie uns einfach Ihre Vorstellungen über Ihr Wunschtelefon und wir werden unser Bestes geben, um Ihre Erwartungen noch zu übertreffen! Egal, ob Sie schon genau wissen, welches Handymodell Sie wollen oder ob Sie lediglich eine Preisvorstellung haben. Wir werden in unserem Lager nachsehen, ob wir ein für Sie passendes Gerät auf Vorrat haben. Wenn das nicht gleich möglich ist, können Sie uns auch gerne einen Zeitraum nennen, in welchem wir Sie kontaktieren sollen, falls wir in dieser Zeit ein für Sie passendes Telefon ausfindig machen. Seien Sie nicht offen zu uns Ihre Wünsche zu äußern und schenken sie uns Ihr Vertrauen, denn wir sind da, um Ihre Zufriedenheit zu gewährleisten!
          </p>
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
      ['Datenschutzerklärung', '/privacy'],
      ['AGB', '/agb'],
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
