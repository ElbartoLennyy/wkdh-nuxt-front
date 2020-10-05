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

      <div class="md:w-2/3 p-2 min-h-screen">
        <div class="rounded-lg p-6 md:p-12 bg-yellowDark min-h-screen">
          <p class="text-white text-2xl mb-4 font-bold text-center">Zu deinem Versandlabel</p>
          <div class="md:flex m-4 md:justify-center text-2xl">
            <a class="bg-gray-200 font-bold p-4 rounded-lg w-full md:w-1/4 text-center block md:m-6 " target="_blank" :href="`/user/${this.$route.params.userId}/label.png`"> <img src="~assets/img/svg/qrCode.svg" alt="" class="h-6 mr-2 inline">QR-Code </a>
            <a class="bg-gray-200 font-bold p-4 rounded-lg w-full md:w-1/4 text-center block md:m-6 mt-6 " target="_blank" :href="`/user/${this.$route.params.userId}/label.pdf`"> <img src="~assets/img/svg/printer.svg" alt="" class="h-6 mr-2 inline">Druck-Label </a>
          </div>
          <div class="text-white">
            <p class="font-bold">
              So versendest du dein Paket richtig an uns:
            </p>
            <div class="md:flex mt-4">
              <div class="w-full md:w-1/2 md:m-4">
                <p class="font-bold mb-3">Versand mit QR-Code</p>
                <ol class="list-decimal space-y-2">
                  <li>Klicke auf den QR-Code Button.</li>
                  <li>Packe dein Paket prüfe noch einmal das alles dabei ist und klebe es zu. Checke auch, dass dein Handy zurückgesetzt ist.</li>
                  <li>Bringe das Paket zu deinem DHL-Paketshop.</li>
                  <li>Zeige den QR-Code vor.</li>
                </ol>
              </div>
              <div class="w-full md:w-1/2 md:m-4 mt-4">
                <p class="font-bold mb-3">Versand mit Druck-Label</p>
                <ol class="list-decimal space-y-2">
                  <li>Klicke auf den Druck-Label Button.</li>
                  <li>Packe dein Paket prüfe noch einmal das alles dabei ist und klebe es zu. Checke auch, dass dein Handy zurückgesetzt ist.</li>
                  <li>Drucke das Label an einem Drucker aus.</li>
                  <li>Klebe das Label gut sichtbar auf dein Paket.</li>
                  <li>Bringe das Paket zu einem DHL-Paketshop.</li>
                </ol>
              </div>
            </div>
          </div>
          <nuxt-link to="/contactUs" target="_blank" class="md:block hidden bg-white text-yellowDark rounded-lg border-yellowDark border-2 p-2 mt-6 font-bold px-4">Ich brauche Hilfe!</nuxt-link>
          <a href="https://wa.me/4915236318531?text=" target="_blank" class="md:hidden block bg-white text-yellowDark rounded-lg border-yellowDark border-2 p-2 mt-6 font-bold px-4"><img class="h-6 inline" src="~assets/img/icons/WhatsApp-logo.png" alt="facebook Logo">Ich brauche Hilfe!</a>
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
