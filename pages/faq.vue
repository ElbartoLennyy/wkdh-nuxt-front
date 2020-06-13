<template>
  <div class="min-h-screen w-full font-sans">
    <headerTemplate />
    <div class="bg-gradient w-full text-center">
      <p class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white font-bold tracking-wide p-6">
        Willkommen im Wirkaufendeinhandy Hilfe-Center
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-20 px-20 py-12 text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold">
      <div class="border-gray-500 border-2 rounded-lg">
        <img class="h-12 xl:h-20 mx-auto m-8" src="~assets/img/svg/Versand-Lieferstatus.svg" alt="">
        <p class="mb-8">Versand & Lieferstatus</p>
      </div>
      <div class="border-gray-500 border-2 rounded-lg">
        <img class="h-12 xl:h-20 mx-auto m-8" src="~assets/img/svg/Verkaufen-Bewertung.svg" alt="">
        <p class="mb-8">Verkaufen & Bewertung</p>
      </div>
      <div class="border-gray-500 border-2 rounded-lg">
        <img class="h-12 xl:h-20 mx-auto m-8" src="~assets/img/svg/Scherpe orange.svg" alt="">
        <p class="mb-8">Unsere Preisgarantie</p>
      </div>
      <div class="border-gray-500 border-2 rounded-lg">
        <img class="h-12 xl:h-20 mx-auto m-8" src="~assets/img/svg/Auszahlung-Icon.svg" alt="">
        <p class="mb-8">Auszahlung</p>
      </div>
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
  background: rgb(255,187,57);
background: linear-gradient(90deg, rgba(255,187,57,1) 0%, rgba(250,164,1,1) 100%);
}
</style>
