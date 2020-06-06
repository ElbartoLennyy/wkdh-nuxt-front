<template>
  <div class="min-h-screen w-full font-sans">
    <div class="flex flex-col h-screen w-full shadow-md">
      <img
        class="h-screen object-contain absolute top-0 right-0"
        src="~assets/img/pictures/HappyFacesSchräg.jpg"
      >
      <div class="flex p-6 justify-between">
        <div class="w-1/4 z-10">
          <img
            class="w-full h-auto max-h-full object-contain"
            src="~assets/img/icons/Logo-new-1000.png"
            alt="Wirkaufendeinhandy - Logo"
          >
        </div>
        <div class="w-4/5 flex z-10 items-center text-center space-x-6">
          <div class="flex-grow">
            <p
              class="uppercase text-2xl xl:text-4xl font-bold text-yellowDark bg-white rounded-lg"
            >
              Home
            </p>
          </div>
          <div class="flex-grow">
            <p
              class="uppercase text-2xl xl:text-4xl font-bold text-yellowDark bg-white rounded-lg"
            >
              Ablauf
            </p>
          </div>
          <div class="flex-grow">
            <p
              class="uppercase text-2xl xl:text-4xl font-bold text-yellowDark bg-white rounded-lg"
            >
              Vorteile
            </p>
          </div>
          <div class="flex-grow">
            <p
              class="uppercase text-2xl xl:text-4xl font-bold text-yellowDark bg-white rounded-lg"
            >
              Über uns
            </p>
          </div>
          <div class="flex-grow bg-white rounded-lg p-2">
            <p
              class="uppercase p-2 text-2xl xl:text-4xl font-bold text-white bg-yellowDark rounded-lg"
            >
              Verkaufen
            </p>
          </div>
        </div>
      </div>
      <div class="flex flex-grow max-h-full">
        <div class="w-1/2 z-10 p-8 flex flex-col justify-around max-h-full">
          <p class="font-bold text-7xl pl-20">
            VERKAUFE DEIN
            <br>HANDY IN 2 MINUTEN!
          </p>
          <img src="~assets/img/icons/Swoosh+text200.png" class="object-contain h-auto">
          <img src="~assets/img/icons/Kringel und Text.png" class="object-contain h-auto">
        </div>
        <div class="w-1/2 z-10 relative">
          <div
            class="flex bg-yellowDark rounded-lg absolute bottom-0 right-0 m-20 h-auto items-center"
          >
            <p class="text-white p-5 justify-center text-2xl font-bold h-auto">
              100% Preisgarantie
              <br>Verkaufen mit Sicherheit
            </p>
            <img
              src="~assets/img/icons/Garantie-Sherpe.png"
              class="object-contain h-24 m-5 flex-initial"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-screen flex flex-col">
      <div class="w-full bg-yellowDark text-white flex p-6 items-center">
        <div class="flex-grow flex items-center">
          <img src="~assets/img/icons/datasheet.png" class="object-contain">
          <div>
            <p class="font-bold text-2xl uppercase">Dateneingabe</p>
            <p
              class="text-lg"
            >
              Gebe die Daten deines Handys an und erhalte ein uverbindliches Angebot.
            </p>
          </div>
        </div>
        <div class="bg-white w-1/3 h-1" />

        <div class="flex-grow flex items-center">
          <img src="~assets/img/icons/Box.png" class="object-contain">
          <div>
            <p class="font-bold text-2xl uppercase">Versand an uns</p>
            <p class="text-lg">Einfach dein kostenloses Paketlabel ausdrucken und an uns senden.</p>
          </div>
        </div>
        <div class="bg-white w-1/3 h-1" />

        <div class="flex-grow flex items-center">
          <img src="~assets/img/icons/Moneybag.png" class="object-contain">
          <div>
            <p class="font-bold text-2xl uppercase">Zahltag</p>
            <p class="text-lg">Hi dafür benöte ich noch einen Text lul!</p>
          </div>
        </div>
      </div>
      <div class="flex text-yellowDark justify-around">
        <img src="~assets/img/icons/Garantie-Sherpe.png" class="w-1/4 m-8 object-contain">
        <div class="w-1/2 p-8 flex flex-col">
          <p class="flex-grow text-6xl font-bold">100% Preisgarantie</p>
          <p class="flex-grow text-5xl">Verkaufen mit Sicherheit</p>
          <p class="flex-grow pt-6 text-4xl font-bold">
            <img src="~assets/img/svg/Häkchen.svg" class="inline h-8"> Das bekommen, was vereinbart wurde.
          </p>
          <p class="flex-grow pt-6 text-4xl font-bold">
            <img src="~assets/img/svg/Häkchen.svg" class="inline h-8"> Gewissenhafte und ehrliche Zweitprüfung.
          </p>
          <p class="flex-grow pt-6 text-4xl font-bold">
            <img src="~assets/img/svg/Häkchen.svg" class="inline h-8"> Faire Preise im An- und Verkauf.
          </p>
        </div>
      </div>
    </div>
    <div class="w-full h-screen relative">
      <img src="~assets/img/pictures/StadttripPaarSchräg.jpg" class="object-contain h-full absolute top-0 left-0 z-0">
      <div class="w-1/2 z-10 absolute inset-y-0 right-0 flex flex-col justify-around p-6">
        <img src="~assets/img/icons/Swoosh+text200.png" class="object-contain flex-grow">
        <p class="text-yellowDark text-5xl font-bold flex-grow">Mit deinem neuen Geld könntest du...</p>
        <p class="text-black text-4xl font-bold flex-grow">Romantischer Städtetrip mit deinem Partner</p>
        <div class="flex-grow">
          <p class="text-yellowDark font-bold text-3xl border-yellowDark border-8 p-2 rounded-lg text-center">Jetzt VERKAUFEN</p>
        </div>
      </div>
    </div>
    <div class="w-full p-6 flex flex-col items-center">
      <div class="w-2/3 bg-yellowDark text-center text-white rounded-lg uppercase">
        <p class="text-4xl font-bold py-4">Verkaufe jetzt dein Handy</p>
        <p class="text-2xl py-2">& Erhalter dein Geld</p>
      </div>
      <p class="text-yellowDark font-bold text-3xl border-yellowDark border-8 p-2 rounded-lg text-center m-6">Jetzt VERKAUFEN</p>
    </div>
    <div class="w-full bg-yellowDark text-white p-6 text-center flex flex-col items-center">
      <p class="text-4xl font-bold pb-4">Noch irgendwelche Fragen?</p>
      <p class="text-xl font-bold w-1/2 pb-4">Solltest du noch weitere Fragen haben, beantworten wir diese gerne per Mail oder Telefon. Ansonsten schaue gerne mal bei unserem FAQ vorbei</p>
      <div class="flex uppercase text-3xl justify-around font-bold w-2/3">
        <p class="border-white border-4 rounded-lg p-2 px-8">FAQ</p>
        <p class="bg-white text-yellowDark rounded-lg p-2 px-8">Kontakt</p>
      </div>
    </div>
    <footerTemplate />
  </div>
</template>

<script>
export default {}
</script>

<script>
import footerTemplate from '~/components/newFooter'

export default {
  components: { footerTemplate },
}
</script>
