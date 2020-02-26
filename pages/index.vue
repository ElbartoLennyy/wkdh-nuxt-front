<template>
  <div class="template-one">
    <nav id="pagenav">
      <ul>
        <li>
          <nuxt-link to="/" class="link-home local-link-active" />
        </li>
        <li>
          <nuxt-link to="/ankauf">
            <span>Ankauf</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/shop">
            <span>Shop</span>
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <main id="main" role="main">
      <section id="l" class="area area-hero area-home">
        <div class="area-content">
          <figure id="logo" />
          <h1 class="font-headline-big">
            Wir Kaufen Dein Handy
          </h1>
          <h2 class="font-headline">
            <nuxt-link to="/ankauf">
              Und holen es an deiner Haustür ab!
            </nuxt-link>
          </h2>
        </div>
      </section>

      <section class="area">
        <div class="area-content">
          <div class="card card-wide is-swapped is-animatable fade-in">
            <div class="card-media has-body">
              <figure class="picture background-svg-exchange" />
            </div>
            <div class="card-content is-compact">
              <h2 class="font-headline-small" data-lblue>
                Was ist
                <span style="font-weight: 300">wir</span>kaufen
                <span style="font-weight: 300">dein</span>handy<span
                  style="font-weight: 300"
                ><span style="font-size: 4px; word-wrap: break-word" />.shop</span>?
              </h2>
              <p>
                Wir sind ein junges Unternehmen, welches Handys und Mobilgeräte ankauft, verkauft, repariert und diese als Serviceleistung bei Ihnen zu Hause abholt. Wir kaufen sowohl ungenutzte als auch gebrauchte Geräte an, egal ob diese noch
                voll funktionsfähig sind, ein defektes Display haben oder scheinbar gar nicht mehr funktionieren. Wir kaufen, was du nicht mehr brauchst!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="area">
        <div class="area-content">
          <div class="card-header is-animatable fade-in">
            <h2 class="font-headline-regular">
              Warum du
              <span style="font-weight: 300">wir</span>kaufen
              <span style="font-weight: 300">dein</span>handy<span
                style="font-weight: 300"
              >.shop</span>
              wählst!
            </h2>
            <p class="font-subtitle" data-grey>
              Das wir deine erste Wahl sind ist logisch. Wirkaufendeinhandy.shop ist zuverlässig und unkompliziert. Wir holen deine Geräte zu deinem Wunschtermin bei dir Zuhause ab, ohne dass du dein Haus verlassen musst. Wir sind da, um dein Leben
              so komfortabel und einfach wie möglich zu halten. Egal ob Handyreparatur, Ankauf eines neuen Geräts oder Verkauf eines Elektronikartikels. Du musst nur ein paar Klicks auf unserer Website tätigen und den Rest übernehmen wir. Also
              worauf wartest du noch? Mit nur ein paar Klicks kannst du über 100€ verdienen!
            </p>
          </div>

          <div class="card card-wide is-animatable fade-in">
            <div class="card-media has-body">
              <figure class="picture background-svg-earth" />
            </div>
            <div class="card-content is-compact">
              <h2 class="font-headline-small" data-lblue>
                Der Grüne Aspekt
              </h2>
              <p>Wir sind zwar ein wirtschaftlich selbstständiges Unternehmen, doch eines unserer wichtigsten Ziele besteht auch darin, etwas an die Gesellschaft und an die Umwelt zurückzugeben.</p>
              <p>
                In Zeiten von großer Umweltverschmutzung und sozialen Unterschieden, wollen wir einfach unseren Beitrag leisten und dafür sorgen, dass alte Mobilgeräte nicht einfach in der Schublade oder im Müll landen, sondern bis zu ihrem endgültigen
                Ableben genutzt werden.
              </p>
              <p>
                Allein in Deutschland lagern über 124.000.000 Althandys in Schubladen. Jedes Jahr werden für die Produktion neuer Handys allein für Deutschland rund 1.440.000 Tonnen CO2 in die Atmosphäre gepustet. Bis 2040 sollen Smartphones der
                größte Klimakiller der Welt werden. Doch wir glauben daran, dass sich diese Zahlen und Prognosen ändern können.
              </p>
              <p>Also, hör auf nur über Klimarettung und Umweltschutz zu reden, sondern handle.</p>
              <p>Verkaufe einfach die Geräte, die du nichtmehr brauchst und leiste so auch deinen Teil für eine gesunde Zukunft</p>
            </div>
          </div>
        </div>
      </section>

      <section class="area" style="padding-bottom: 100px">
        <div class="area-content">
          <div class="card-header is-animatable fade-in">
            <h2 class="font-headline-regular">
              Wer wir sind
            </h2>
            <p class="font-subtitle" data-grey>
              Wir sind die wirkaufendeinhandy.shop GbR und wurden im Januar 2020 durch die Gründer Alexander Gerick und Marius Marx offiziell angemeldet. Die Idee, die wir während unserer Gründung hatten, ist simpel. Wir empfinden es als zu schade
              alte Geräte einfach rumliegen zu lassen oder gar wegzuschmeißen. Das wollen wir einfach ändern.
            </p>
            <p
              class="font-subtitle"
              data-grey
            >
              Deshalb haben wir es uns zur Aufgabe gemacht, den Handy An- und Verkauf von gebrauchten Geräten so simpel wie möglich zu gestalten und auch Reparaturen unkompliziert und zuverlässig anzubieten.
            </p>
          </div>
        </div>
      </section>
    </main>
    <footer id="pagefooter" class="area">
      <div class="area-content">
        <div class="footer-container">
          <p>Wirkaufendeinhandy GbR</p>
          <div class="footer-linklist">
            <nuxt-link to="/imprint">Impressum</nuxt-link>
            <nuxt-link to="/privacy">Datenschutzerklärung</nuxt-link>
            <nuxt-link to="/AGB">AGB</nuxt-link>
            <nuxt-link to="/contactUs">Kontakt</nuxt-link>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Wir kaufen dein Handy und holen es zuverlässig ab!',
      titleTemplate: null,
      meta: [
        { name: 'description', content: 'Du hast ein altes Handy und willst Geld dafür? Füll einfach das Formular aus erhalte ein Preisangebot und wir holen dein Handy kostenlos vor deiner Haustür ab. Du hast keinen Aufwand!' },
        { name: 'keywords', content: ['wirkaufendeinhandy', 'Handy', 'Ankauf', 'Handy Görlitz', 'Handy verkaufen', 'Görlitz', 'Handyreparatur Görlitz'] }
      ]
    }
  }
}
</script>

<style src="~/assets/css/main.css" />

<style scoped>
.background-svg-exchange {
  background-image: url("~assets/img/svg/exchange.svg");
}
.background-svg-earth {
  background-image: url("~assets/img/svg/earth.svg");
}
</style>
