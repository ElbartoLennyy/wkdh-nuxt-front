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

  <footerTemplate />
  </div>
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
