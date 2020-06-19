<template>
  <div class="font-sans max-h-screen w-full">
    <img
      height="1"
      width="1"
      style="display:none"
      src="https://www.facebook.com/tr?id=480915019270567&ev=Lead&noscript=1"
    >
    <div class="md:flex w-screen h-screen">
      <div class="md:w-1/3 md:pl-10 pl-2 md:h-full flex flex-col justify-between p-8">
        <div>
          <p class="text-3xl md:text-5xl font-bold tracking-tighter leading-none">
            Du willst dein Handy verschicken
          </p>
          <p class="text-gray-900 text-xl">
            Bitte sorge dafür, dass dein Paket sicher und unbeschädigt bei uns ankommt.
          </p>
          <div class="flex items-center text-center md:pt-4">
            <img
              class="inline w-5 "
              src="~assets/img/svg/help.svg"
              alt="help button"
            >

            <a href="/contactUs" target="_blank" class="text-yellowDark hover:text-blue-800 pl-2">
              Hilfe erhalten
            </a>
          </div>
        </div>
        <div class="">
          <a href="/" class="text-xl mx-auto underline">Zurück zum Home</a>
        </div>
      </div>

      <div class="md:w-2/3 p-2 h-full">
        <div class="rounded-lg p-6 md:p-12 bg-yellowDark h-full">
          <p class="text-white">Drucke einfach das Label aus und klebe es auf das Paket.</p>
          <object
            width="80%"
            height="80%"
            type="application/pdf"
            :data="labelUrl"
          />
          <p class="text-white">
            Wird es nicht richtig angezeit?
            <a :href="labelUrl" class="text-blue-500 hover:underline">Klicke hier!</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    labelUrl() {
      return `/user/${this.$route.params.userId}/label.pdf`
    },
  },
}
</script>
