<template>
  <div class="font-sans bg-gray-900 text-white min-h-screen">
    <headerTemplate />

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
