<template>
  <div class="template-one">
    <nav id="pagenav">
      <ul>
        <li>
          <nuxt-link to="/" class="link-home" />
        </li>
        <li>
          <nuxt-link to="/ankauf" class="local-link-active">
            <span>Ankauf</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/shop">
            <span>Shop</span>
          </nuxt-link>
        </li>

        <li class="hidden-on-phone">
          <nuxt-link to="handy" class="link-action">
            <span class="hidden-on-tablet">Jetzt anfragen &#8594;</span>
            <span class="hidden-on-desktop">Anfragen &#8594;</span>
            </a>
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <main id="main" role="main">
      <section id="l" class="area area-hero area-action">
        <div class="area-content">
          <div class="hero-container">
            <div class="hero-left">
              <figure id="logo" /><nuxt-link to="/handy" class="elevated-button">Jetzt Handy verkaufen &#8594;</nuxt-link>
              <p class="font-caption" data-translucent="">
                Deine Anfrage ist kostenlos und unverbindlich.
              </p>
            </div>
            <div class="hero-right">
              <h1 class="font-headline-big">
                Wir kaufen dein altes Handy.
              </h1>
              <h2 class="font-headline" data-grey>
                Und holen es an deiner Haustür ab!
              </h2><nuxt-link to="/handy" class="elevated-button">Jetzt Handy verkaufen &#8594;</nuxt-link>
              <p class="font-caption" data-translucent="">
                Deine Anfrage ist kostenlos und unverbindlich.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="area">
        <div class="area-content">
          <div class="card-header is-animatable fade-in">
            <h2 class="font-headline-regular text-center">
              Das alte Handy einfach gegen Geld eintauschen!
            </h2>
          </div>

          <div class="timeline">
            <div class="timeline-entry">
              <figure class="picture background-click-here" />
              <div>
                <h3 class="font-headline-small" data-lblue>
                  Formular ausfüllen
                </h3>
                <!-- <p class="font-subtitle" data-grey>Beantworten Sie alle Fragen zu Ihrem Smartphone.</p>  --->
              </div>
            </div>
            <div class="timeline-entry">
              <figure class="picture background-message" />
              <div>
                <h3 class="font-headline-small" data-lblue>
                  Angebot erhalten
                </h3>
              </div>
            </div>
            <div class="timeline-entry">
              <figure class="picture background-calendar" />
              <div>
                <h3 class="font-headline-small" data-lblue>
                  Daten angeben und Abholtermin vereinbaren.
                </h3>
              </div>
            </div>
            <div class="timeline-entry">
              <figure class="picture background-phone" />
              <div>
                <h3 class="font-headline-small" data-lblue>
                  Bote holt Handy ab
                </h3>
              </div>
            </div>
            <div class="timeline-entry" style="margin-bottom:0">
              <figure class="picture background-earn-money" />
              <div>
                <h3 class="font-headline-small" data-lblue>
                  Geldbetrag erhalten
                </h3>
              </div>
            </div>
          </div>
          <div id="divider" class="divider" />
        </div>
      </section>
      <section class="area" style="padding-bottom:100px">
        <div class="area-content">
          <div class="card-header is-animatable fade-in">
            <figure class="picture inlinee background-privacy" style="width: 200px; height: 164px" />
            <h3 class="font-headline" data-lblue="">
              Deine Daten bleiben auch privat!
            </h3>
            <p class="font-subtitle" data-lgrey="">
              Auf Handys sind heutzutage Informationen über jegliche Lebensbereiche eines Menschen gespeichert. Diese Daten gehen niemanden etwas an! Um deine Privatsphäre zu schützen, setzen wir deshalb jedes Handy vor dem Weiterverkauf auf die
              Werkseinstellungen zurück. Im Anschluss verwenden wir noch so genannte Shredder-Apps, wodurch deine Daten endgültig und unwiderruflich überschrieben werden. Du kannst dein Mobilgerät auch gerne schon vor Übergabe zurücksetzen oder
              uns auf das Thema Datenschutz ansprechen, wenn du Fragen oder Bedenken hast.
            </p>
          </div>

          <div class="card-header is-animatable fade-in">
            <h2 class="font-headline-regular">
              Abholservice derzeit begrenzt
            </h2>
            <p class="font-subtitle" data-grey="">
              Wir von wirkaufendeinhandy.shop arbeiten täglich an der Ausweitung unserer Kundenbereiche. Da wir derzeit noch am Beginn unserer Firmengeschichte stehen, ist der Abholservice derzeit nur auf den städtischen Raum von Dresden und Görlitz
              begrenzt.
            </p>
          </div>

          <div class="card-header is-animatable fade-in">
            <h2 class="font-headline-regular">
              Paket selbst versenden? Kein Problem!
            </h2>
            <p class="font-subtitle" data-grey="">
              Sende einfach das entsprechende Paket an unsere Adresse und fülle das unterstehende Formular dafür aus. Der Kauf wird im Anschluss nach genormter Prüfung standardisiert abgewickelt und du erhältst sogar 5€ zusätzlich für dein Gerät
              als Aufwandsentschädigung!
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

<style src="~/assets/css/main.css" />

<style>
.background-click-here { background-image: url('~assets/img/svg/click-here.svg'); }
.background-message { background-image: url('~assets/img/svg/message.svg'); }
.background-calendar { background-image: url('~assets/img/svg/calendar.svg'); }
.background-phone { background-image: url('~assets/img/svg/phone.svg'); }
.background-earn-money { background-image: url('~assets/img/svg/earn-money.svg'); }
.background-privacy { background-image: url('~assets/img/svg/privacy.svg'); }

.timeline-entry {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.timeline-entry .picture {
  width: 200px;
  max-width: 200px;
  height: auto;
  background-size: 100%;
  background-position: left center;
}

.timeline-entry > div {
  width: 70%;
  padding-left: 80px;
}

#divider {
  margin-top: 80px;
}

@media screen and (max-width: 735px) {
  .timeline-entry {
    margin-bottom: 36px
  }
  .timeline-entry>div {
    padding-left: 32px
  }
}

@media screen and (min-width: 730px) {
  .timeline {
    width: 700px;
    margin: 0 auto
  }
  .timeline-entry>div {
    width: calc(100% - 200px)
  }
}
</style>
