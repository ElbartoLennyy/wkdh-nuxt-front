<template>
  <div class="w-full min-h-screen">
    <headerTemplate />
    <div class="w-full bg-gradient text-center text-white font-bold">
      <p class="text-xl">Über die</p>
      <p class="text-2xl">WIRKAUFENDEINHANDY GbR</p>
    </div>
    <img src="~assets/img/pictures/founder.jpg" alt="Gründer - Marius Marx - Alexander Gerick" class="object-contain w-2/3">
    <div class="flex w-full justify-around m-4 text-yellowDark font-bold">
      <img src="~assets/img/svg/shop.svg" alt="Shop" class="object-contain h-12 p-2">
      <p class="w-2/3 my-auto">
        An- und Verkäufer für gebrauchte und
        defekte Smartphones
      </p>
    </div>
    <p class="w-full bg-gradient text-white text-center p-1">jedoch komplett</p>
    <div class="flex w-full justify-around m-4 text-yellowDark font-bold">
      <img src="~assets/img/svg/globus.svg" alt="Shop" class="object-contain h-12 p-2">
      <p class="w-2/3 my-auto">
        Webbasiert und mit modernster
        Automatisierungssofware ausgestattet
      </p>
    </div>
    <p class="w-full bg-gradient text-white text-center p-1">Das ist aber nicht alles! Wir bieten:</p>
    <div class="flex w-full justify-around m-4 text-yellowDark font-bold">
      <img src="~assets/img/svg/2.svg" alt="Shop" class="object-contain h-12 p-2">
      <p class="w-2/3 my-auto">
        Sofortankauf in nur 2 Minuten
      </p>
    </div>
    <div class="flex w-full justify-around m-4 text-yellowDark font-bold">
      <img src="~assets/img/svg/sicherheit.svg" alt="Shop" class="object-contain h-12 p-2">
      <p class="flex-grow my-auto">
        Unübertroffene Sicherheit und Preisgarantie
        im Ankauf gebrauchter Geräte
      </p>
    </div>
    <div class="flex w-full justify-around m-4 text-yellowDark font-bold">
      <img src="~assets/img/svg/lock.svg" alt="Shop" class="object-contain h-12 p-2">
      <p class="flex-grow my-auto">
        Preisaufschlüsselung bei dem Ankauf
        jedes Geräts für den vollen Durchblick
      </p>
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
.bg-gradient{
background: linear-gradient(90deg, rgba(255,187,57,1) 0%, rgba(250,164,1,1) 100%);
}

.bg-gradientMirrored{
background: linear-gradient(90deg, rgba(250,164,1,1) 0%, rgba(255,187,57,1) 100%);
}
</style>
