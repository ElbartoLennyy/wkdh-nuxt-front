<template>
  <div class="w-full min-h-screen font-sans max-w-screen-3xl mx-auto">
    <headerTemplate class="hidden md:block" />
    <div class="w-full relative">
      <headerTemplate class="md:hidden" />
      <div class="w-full relative h-auto bg-gradient text-center text-white font-bold z-10 absolute p-2">
        <p class="text-xl">Über die</p>
        <p class="text-2xl">Wirkaufendeinhandy GbR</p>
      </div>
      <img
        src="~assets/img/pictures/founder.jpg"
        alt="Gründer - Marius Marx - Alexander Gerick"
        class="object-cover w-2/3 relative absolute z-0 max-h-screen"
      >
      <div class="w-2/3 flex text-yellowDark font-bold md:text-2xl md:justify-around">
        <p class="ml-6 md:flex-grow text-center">Marius Marx</p>
        <p class="mr-4 flex-grow text-center pr-6 md:pr-0">Alexander Gerick</p>
      </div>
      <div class="absolute right-0 top-0 h-full w-2/3">
        <div class="absolute right-0 bottom-0 top-0 flex flex-col justify-around md:justify-start md:w-2/3">
          <div class="text-white font-bold md:text-2xl lg:text-3xl xl:text-5xl space-y-2 z-10">
            <div>
              <img src="~assets/img/svg/dieGruender.svg" alt="Die Gründer" class="object-contain h-16 z-10 mt-32 md:hidden">
              <img src="~assets/img/svg/gruender-fett.svg" alt="Die Gründer" class="object-contain h-20  lg:h-24 xl:h-32 z-10 mt-20 mx-auto hidden md:block">
            </div>
            <div class="w-7/12 space-y-6 md:space-y-10 xl:space-y-16 ml-auto md:m-auto m-2 mr-6 xs:mr-2">
              <p class="ml-auto pl-4">#jungunternehmer</p>
              <p class="ml-auto pl-6">#professionell</p>
              <p class="ml-auto pl-8">#zielstrebig</p>
              <p class="ml-auto pl-10">#kreativ</p>
            </div>
          </div>
        </div>
        <div class="absolute w-9/12 xs:w-2/3 right-0 top-0 h-full bg-yellowDark founder-div-sm xs:founder-div" />
      </div>
    </div>
    <div class="flex bg-gradientMirrored justify-around p-2 text-white text-lg md:text-xl font-semibold">
      <div class="flex">
        <img src="~assets/img/svg/kalender.svg" alt="Kalender" class="h-12 object-contain my-auto mr-4">
        <p>
          Gegründet:
          <br>Januar 2020
        </p>
      </div>
      <div class="flex">
        <img src="~assets/img/svg/ort.svg" alt="Ort" class="h-12 object-contain my-auto mr-4">
        <p>
          Hauptsitz:
          <br>Görlitz
        </p>
      </div>
    </div>
    <div class="w-full relative pb-6 md:hidden">
      <img src="~assets/img/pictures/Handyübergabe.jpg" alt="Handyübergabe" class="object-contain">
      <div class="absolute bottom-0 bg-gradientMirrored w-full text-white text-center text-3xl font-bold we-are-div">
        <p class="pt-8">Wir sind:</p>
      </div>
    </div>
    <div class="hidden md:block text-4xl text-yellowDark font-bold m-6">
      <p>Wir sind:</p>
    </div>
    <div class="flex w-full justify-around p-2 text-yellowDark font-bold">
      <img src="~assets/img/svg/shop.svg" alt="Shop" class="object-contain h-12 md:h-16 p-2 my-auto">
      <p class="w-3/4 my-auto md:text-xl">
        Ankauf, Reparatur und Verkauf von gebrauchten Smartphones
      </p>
    </div>
    <p class="w-full bg-gradient text-white text-center md:text-xl p-1">jedoch komplett</p>
    <div class="flex w-full justify-around p-2 text-yellowDark font-bold">
      <img src="~assets/img/svg/globus.svg" alt="Globus" class="object-contain h-12 md:h-16 p-2 my-auto">
      <p class="w-3/4 my-auto md:text-xl">
        Webbasiert und mit modernster
        Automatisierungssofware ausgestattet
      </p>
    </div>
    <p class="w-full bg-gradient text-white text-center md:text-xl p-1">Das ist aber nicht alles! Wir bieten:</p>
    <div class="flex w-full justify-around p-2 text-yellowDark font-bold">
      <img src="~assets/img/svg/2.svg" alt="2" class="object-contain h-12 md:h-16 p-2 my-auto">
      <p class="w-3/4 my-auto md:text-xl">Sofortankauf in nur 2 Minuten</p>
    </div>
    <div class="flex w-full justify-around p-2 text-yellowDark font-bold">
      <img src="~assets/img/svg/sicherheit.svg" alt="Sicherheit" class="object-contain h-12 md:h-16 p-2 my-auto">
      <p class="w-3/4 my-auto md:text-xl">
        Unübertroffene Sicherheit und Preisgarantie
        im Ankauf gebrauchter Geräte
      </p>
    </div>
    <div class="flex w-full justify-around p-2 text-yellowDark font-bold">
      <img src="~assets/img/svg/lock.svg" alt="Lock" class="object-contain h-12 md:h-16 p-2 my-auto">
      <p class="w-3/4 my-auto md:text-xl">
        Preisaufschlüsselung bei dem Ankauf
        jedes Geräts für den vollen Durchblick
      </p>
    </div>
    <p class="w-full bg-gradient text-white text-center md:text-xl p-1">Und das Beste ist, wir sind:</p>
    <div class="flex w-full justify-around p-2 text-yellowDark font-bold">
      <img src="~assets/img/svg/germany.svg" alt="Deutschland" class="object-contain h-12 md:h-16 p-2 my-auto">
      <p class="w-3/4 my-auto md:text-xl">In ganz Deutschland rund um die Uhr verfügbar!</p>
    </div>
    <footerTemplate />
  </div>
</template>

<script>
import footerTemplate from '~/components/newFooter'
import headerTemplate from '~/components/newHeader'

export default {
  components: { footerTemplate, headerTemplate },
}
</script>

<style>
.bg-gradient {
  background: linear-gradient(
    90deg,
    rgba(255, 187, 57, 1) 0%,
    rgba(250, 164, 1, 1) 100%
  );
}

.bg-gradientMirrored {
  background: linear-gradient(
    90deg,
    rgba(250, 164, 1, 1) 0%,
    rgba(255, 187, 57, 1) 100%
  );
}

.we-are-div {
  clip-path: polygon(0 50%, 100% 0, 100% 100%, 0% 100%);
}

.founder-div{
  clip-path: polygon(0 0, 100% 0, 100% 100%, 28% 100%);
}

.founder-div-sm{
  clip-path: polygon(0 0, 100% 0, 100% 100%, 20% 100%);
}

</style>
