<template>
  <div class="w-full min-h-screen font-sans max-w-screen-3xl mx-auto">
    <headerTemplate />
    <div class="bg-gradient w-full text-center">
      <p class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white font-bold tracking-wide p-6">
        Willkommen im Wirkaufendeinhandy Hilfe-Center
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-20 px-20 py-12 text-center text-xl lg:text-2xl xl:text-4xl font-semibold">
      <div class="border-gray-500 border-2 rounded-lg" @click="scrollMeTo('versand')">
        <img class="h-12 xl:h-20 mx-auto m-8" src="~assets/img/svg/Versand-Lieferstatus.svg" alt="">
        <p class="mb-8">Versand & Lieferstatus</p>
      </div>
      <div class="border-gray-500 border-2 rounded-lg" @click="scrollMeTo('verkaufen')">
        <img class="h-12 xl:h-20 mx-auto m-8" src="~assets/img/svg/Verkaufen-Bewertung.svg" alt="">
        <p class="mb-8">Verkaufen & Bewertung</p>
      </div>
      <div class="border-gray-500 border-2 rounded-lg" @click="scrollMeTo('preisgarantie')">
        <img class="h-12 xl:h-20 mx-auto m-8" src="~assets/img/svg/Scherpe orange.svg" alt="">
        <p class="mb-8">Unsere Preisgarantie</p>
      </div>
      <div class="border-gray-500 border-2 rounded-lg" @click="scrollMeTo('auszahlung')">
        <img class="h-12 xl:h-20 mx-auto m-8" src="~assets/img/svg/Auszahlung-Icon.svg" alt="">
        <p class="mb-8">Auszahlung</p>
      </div>
    </div>
    <p class="text-center font-bold text-lg">Häufige Fragen</p>

    <div class="w-full p-4">
      <div v-for="(group, index) in groups" :ref="group.ref" :key="index" class="w-full border-gray-500 border-2 p-2 mb-4 rounded-lg">
        <p class="w-full cursor-pointer text-lg font-bold" @click="activeItem = index">{{ group.name }} </p>
        <div v-if="activeItem === index">
          <p>{{ group.desc }} </p>
        </div>
      </div>
    </div>
    <footerTemplate />
  </div>
</template>

<script>
import footerTemplate from '~/components/newFooter'
import headerTemplate from '~/components/newHeader'

const groups = {
  'GROUP A': {
    name: 'Muss ich den Versand selbst bezahlen?',
    open: false,
    ref: 'versand',
    desc: 'Wir von Wirkaufendeinhandy bezahlen den kompletten Versand für dich. Sobald du unser Angebot angenommen und deine Daten angegeben hast, erhältst du direkt ein digitales Versandlabel. Dieses Label wird dir einmal in deinem Browser angezeigt und aus Sicherheitsgründen noch einmal an dein E-Mai Postfach gesendet.',
  },
  'GROUP B': {
    name: 'Wie kann ich einen Auftrag bei euch aufgeben?',
    open: false,
    ref: 'verkaufen',
    desc: 'Gehe einfach auf unsere Website und klicke auf der Seite Home in dem oberen Teil der Seite einfach auf „Los geht’s!“. Fülle danach einfach die entsprechenden Daten zu deinem Handy in dem vorgefertigten Formular aus. Im Anschluss erhältst du sofort dein persönliches Angebot für dein Gerät, welches du nur noch annehmen brauchst.',
  },
  'GROUP C': {
    name: 'Muss ich mein Handy vor dem Verkauf zurücksetzen?',
    open: false,
    ref: '',
    desc: 'Ja, du musst dein Gerät vor Verkauf zurücksetzen. Deine Daten sind zwar bei uns sicher, doch lassen sich die Geräte von manchen Herstellern (z.B. Apple) nicht ohne die Mitwirkung des Vorbesitzers zurücksetzen.',
  },
  'GROUP D': {
    name: 'Kann ich mehrere Geräte gleichzeitig verkaufen?',
    open: false,
    ref: '',
    desc: 'Derzeit haben wir noch keine Möglichkeit für den Verkauf mehrerer Geräte auf einmal implementiert. Du kannst bei dem Verkauf mehrerer Geräte auch nur einen Versandschein ausdrucken und die Geräte in nur einem Paket versenden, solange das Paket die Anforderungen für den Versand mit unseren Versandlabeln erfüllt. Für mehr Informationen zu dem Versand deines Geräts, klicke bitte hier.',
  },
  'GROUP E': {
    name: 'Wie kann ich mein Gerät auswählen, dass ich verkaufen möchte?',
    open: false,
    ref: '',
    desc: 'Klickst du auf einen Verkaufen Button, so wirst du direkt zu einem vorgefertigten Formular weitergeleitet, welches dich alle relevanten Angaben zu deinem Gerät abfragt.',
  },
  'GROUP F': {
    name: 'Wie kann ich einen Auftrag rückgängig machen?',
    open: false,
    ref: '',
    desc: 'Falls du dein Gerät noch nicht versandt hast, so wird mit nicht versandt deines Geräts innerhalb der Versandfrist das Angebot automatisch ungültig. Hast du dein Gerät hingegen schon versendet, so kontaktiere uns bitte. Unsere Kontaktdaten findest du unter: https://wirkaufendeinhandy.shop/contactUs',
  },
  'GROUP G': {
    name: 'Bis wann kann ich den Verkauf Rückgängig machen?',
    open: false,
    ref: '',
    desc: 'Mit Absendung deines Geräts haben wir theoretisch das Recht dein Gerät für den vereinbarten Preis anzukaufen und dir den vereinbarten Betrag zu überweisen. Du kannst uns jedoch kontaktieren und wir können dann je nach Fall entscheiden die Kaufabwicklung zu unterbinden.',
  },
  'GROUP H': {
    name: 'Was passiert, wenn ihr den Artikel anders bewertet als ich?',
    open: false,
    ref: '',
    desc: 'Wenn es dazu kommt, dass wir feststellen, dass unsere Bewertung von deiner Bewertung abweicht, so existieren zwei Möglichkeiten. Möglichkeit eins ist, dass wir dir dein Gerät kostenlos zurücksenden. Die zweite Möglichkeit ist, dass wir dir ein Gegenangebot zukommen lassen. Dieses kannst du dann entweder annehmen oder ablehnen. Wenn du es ablehnst, erhältst du dein Handy kostenlos zurück.',
  },
  'GROUP I': {
    name: 'Sind eure Ankaufspreise verhandelbar?',
    open: false,
    ref: '',
    desc: 'Alle unsere Angebote sind durch unsere Automatisierungssoftware berechnet und nicht verhandelbar.',
  },
  'GROUP J': {
    name: 'Ich habe doch noch Zubehör gefunden. Kann ich das noch mitgeben und mehr Geld bekommen?',
    open: false,
    ref: '',
    desc: 'Wenn du nach Angebotsanfrage aber vor der Abholung/ Versendung deines Geräts noch zusätzliches Zubehör findest, so lege es am besten dem Lieferumfang hinzu und kontaktiere uns. Falls das Zubehör etwas an unserem Angebot positiv für dich verändern würde, so wird der Überweisungsbetrag optional durch uns nach oben angepasst.',
  },
  'GROUP K': {
    name: 'Bin ich mit der Preisgarantie vor Betrug abgesichert?',
    open: false,
    ref: 'preisgarantie',
    desc: 'Ja! Unsere Preisgarantie gewährleistet, dass bei korrekter Angabe deiner Handydaten auch genau der Preis bezahlt wird, welcher vereinbart wurde?',
  },
  'GROUP L': {
    name: 'Kann ich also einen schlechteren Zustand angeben und ein besseres Angebot erhalten?',
    open: false,
    ref: '',
    desc: 'Die Wirkaufendeinhandy Preisgarantie gewährleistet die garantierte Bezahlung des Ankaufspreises nur dann, wenn der Ist-Zustand mit den Angaben übereinstimmt. Sollte das nicht der Fall sein, so steht es uns frei unter Nennung der Abweichungen dir ein entsprechendes Zweitangebot zu unterbreiten.',
  },
  'GROUP M': {
    name: 'Wann erhalte ich mein Geld?',
    open: false,
    ref: 'auszahlung',
    desc: 'Dein Geld erhältst du nachdem dein Gerät bei uns eingegangen und überprüft wurde. Wird die Richtigkeit deiner Angaben noch einmal von uns bestätigt, so überweisen wir dir innerhalb der nächsten 48 Stunden dein Geld auf das angegebene Konto.',
  },
}

export default {
  components: {
    footerTemplate,
    headerTemplate,
  },
  data() {
    return {
      groups,
      activeItem: null,
    }
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
  background: rgb(255,187,57);
background: linear-gradient(90deg, rgba(255,187,57,1) 0%, rgba(250,164,1,1) 100%);
}
</style>
