<template>
  <div class="font-sans pt-24 bg-gray-900 text-white min-h-screen">
    <div class="fixed top-0 inset-x-0 flex">
      <div class="mt-3 bg-gray-800 mx-auto flex rounded-full items-center p-1 shadow-md">
        <nuxt-link to="/" class="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex py-1">
          <img class="h-full mx-auto" src="~assets/img/icons/logo-link.png" alt="Logo">
        </nuxt-link>
        <div class="ml-1 p-1 flex">
          <nuxt-link to="/ankauf" class="block py-1 px-3 bg-gray-700 hover:bg-gray-600 hover:text-white hover:no-underline rounded-full">Ankauf</nuxt-link>
      <!--    <nuxt-link to="/shop" class="ml-2 block py-1 px-3 bg-gray-700 hover:bg-gray-600 hover:text-white hover:no-underline rounded-full">Shop</nuxt-link> -->
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
          <h2 class="block mt-2 text-3xl md:text-4xl text-blue-300 font-semibold">Impressum</h2>
        </section>

        <section>
          <h1 class="font-bold text-2xl">Impressum</h1>

          <h2 class="mt-4 font-bold text-xl">Angaben gemäß § 5 TMG</h2>
          <p>Wirkaufendeinhandy GbR <br><br> Alexander Gerick <br> Marius-Julian Marx <br> <br>Azaleenweg 11 <br> 02827 Görlitz</p>

          <h2 class="mt-4 font-bold text-xl">Kontakt</h2>

          <p>E-Mail: kontakt@wirkaufendeinhandy.shop</p>

          <h3 class="mt-4 text-lg font-bold">Haftung für Inhalte</h3>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte
            fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
          <p>
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
            möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>
          <h3 class="mt-4 text-lg font-bold">Haftung für Links</h3>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
            Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
          </p>
          <p>
            Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
          </p>
          <h3 class="mt-4 text-lg font-bold">Urheberrecht</h3>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
            der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
          </p>
          <p>
            Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam
            werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
          </p>
        </section>

        <footer class="mt-12 sm:mt-24 py-4 border-t border-gray-800 text-gray-500">
          Wirkaufendeinhandy GbR
          <div class="mt-2 text-gray-600 text-sm font-bold">
            <nuxt-link
              v-for="[linkLabel, linkUrl] in nuxtLinks"
              :key="linkUrl"
              :to="linkUrl"
              class="mr-1"
            >
              {{ linkLabel }}
            </nuxt-link>
            <a
              v-for="[linkLabel, linkUrl] in links"
              :key="linkUrl"
              :href="linkUrl"
              class="mr-1"
            >
              {{ linkLabel }}
            </a>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    nuxtLinks: [
      ['Impressum', '/imprint'],
      ['Kontakt', '/contactUs'],
    ],
    links: [
      ['Datenschutzerklärung', '/privacy.pdf'],
      ['AGB', '/agb.pdf'],
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
