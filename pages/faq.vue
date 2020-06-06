<template>
  <div class="min-h-screen w-full font-sans">
    <div class="flex w-full p-6 justify-around text-center space-x-6 items-center">
      <img
        class="w-1/5 h-auto object-contain"
        src="~assets/img/icons/Logo-new-1000.png"
        alt="Wirkaufendeinhandy - Logo"
      >
      <div class="flex-grow">
        <p
          class="uppercase text-xl lg:text-2xl xl:text-3xl font-bold text-yellowDark bg-white rounded-lg"
        >
          Home
        </p>
      </div>
      <div class="flex-grow">
        <p
          class="uppercase text-xl lg:text-2xl xl:text-3xl font-bold text-yellowDark bg-white rounded-lg"
        >
          Ablauf
        </p>
      </div>
      <div class="flex-grow">
        <p
          class="uppercase text-xl lg:text-2xl xl:text-3xl font-bold text-yellowDark bg-white rounded-lg"
        >
          Vorteile
        </p>
      </div>
      <div class="flex-grow">
        <p
          class="uppercase text-xl lg:text-2xl xl:text-3xl font-bold text-yellowDark bg-white rounded-lg"
        >
          Über uns
        </p>
      </div>
      <div class="flex-grow bg-white rounded-lg p-2">
        <p
          class="uppercase p-2 text-xl lg:text-2xl xl:text-3xl font-bold text-white bg-yellowDark rounded-lg"
        >
          Verkaufen
        </p>
      </div>
    </div>
    <div class="bg-gradient w-full text-center">
      <p class="text-3xl text-white font-bold tracking-wide p-6">
        Willkommen im Wirkaufendeinhandy Hilfe-Center
      </p>
    </div>
    <div class="grid grid-cols-4 gap-4">
<div></div>
<div></div>
<div></div>
<div></div>
    </div>
    <footerTemplate />
  </div>
</template>

<script>
import footerTemplate from '~/components/newFooter'

export default {
  components: { footerTemplate },
}
</script>

<style>
.bg-gradient{
  background: rgb(255,187,57);
background: linear-gradient(90deg, rgba(255,187,57,1) 0%, rgba(250,164,1,1) 100%);
}
</style>
