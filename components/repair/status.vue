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
          <div v-if="offer.State === 'shipping'">
            <p class="text-3xl md:text-5xl font-bold tracking-tighter leading-none">
              Vielen Dank für dein Vertrauen
            </p>
            <p class="text-3xl md:text-5xl font-bold tracking-tighter leading-none">
              Statusübersicht
            </p>
            <p class="text-gray-900 text-xl">
              Bitte sorge dafür, dass dein Paket sicher und unbeschädigt bei uns ankommt.
            </p>
          </div>
          <div v-else>
            <p class="text-3xl md:text-5xl font-bold tracking-tighter leading-none">
              Statusübersicht
            </p>
            <p class="text-gray-900 text-xl">
              Deine Handyreparatur bei
            </p>
            <img src="~assets/img/icons/Logo-new-1000.png" alt="Wirkaufendeinhandy" class="object-contain w-1/2 my-2">
          </div>
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
          <div class="md:flex">
            <div
              class="mb-3 block text-left md:w-1/3"
            >
              <div class="bg-gray-200 text-yellowDark font-bold p-4 rounded-lg">
                {{ offer.repairData.brand }}
              </div>
            </div>
            <div
              class="mb-3 block text-left md:w-1/3 md:ml-4"
            >
              <div class="bg-gray-200 text-yellowDark font-bold p-4 rounded-lg">
                {{ offer.repairData.phone }}
              </div>
            </div>
            <div
              class="mb-3 block text-left md:w-1/3 md:ml-4"
            >
              <div class="bg-gray-200 text-yellowDark font-bold p-4 rounded-lg">
                {{ offer.repairData.color }}
              </div>
            </div>
            <div
              class="mb-3 block text-left md:w-1/3 md:ml-4"
            >
              <div class="bg-gray-200 text-yellowDark font-bold p-4 rounded-lg">
                {{ offer.repairData.defects.join() }}
              </div>
            </div>
          </div>
          <div v-if="offer.State === 'shipping'">
            <p class="text-white text-2xl mb-4 font-bold text-center">Zu deinem Versandlabel</p>
            <div class="md:flex m-4 md:justify-center text-2xl">
              <a class="bg-gray-200 font-bold p-4 rounded-lg w-full md:w-1/4 text-center block md:m-6 " target="_blank" :href="`/user/${this.$route.params.repairId}/label.png`"> <img src="~assets/img/svg/qrCode.svg" alt="" class="h-6 mr-2 inline">QR-Code </a>
              <a class="bg-gray-200 font-bold p-4 rounded-lg w-full md:w-1/4 text-center block md:m-6 mt-6 " target="_blank" :href="`/user/${this.$route.params.repairId}/label.pdf`"> <img src="~assets/img/svg/printer.svg" alt="" class="h-6 mr-2 inline">Druck-Label </a>
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
                    <li>Packe dein Paket prüfe noch einmal das alles dabei ist und klebe es zu.</li>
                    <li>Bringe das Paket zu deinem DHL-Paketshop.</li>
                    <li>Zeige den QR-Code vor.</li>
                    <li>Wir schicken dir dein repariertes Handy zurück.</li>
                  </ol>
                </div>
                <div class="w-full md:w-1/2 md:m-4 mt-4">
                  <p class="font-bold mb-3">Versand mit Druck-Label</p>
                  <ol class="list-decimal space-y-2">
                    <li>Klicke auf den Druck-Label Button.</li>
                    <li>Packe dein Paket prüfe noch einmal das alles dabei ist und klebe es zu.</li>
                    <li>Drucke das Label an einem Drucker aus.</li>
                    <li>Klebe das Label gut sichtbar auf dein Paket.</li>
                    <li>Bringe das Paket zu einem DHL-Paketshop.</li>
                    <li>Wir schicken dir dein repariertes Handy zurück.</li>
                  </ol>
                </div>
              </div>
            </div>
            <button class="bg-yellowDark rounded-lg p-2 text-white" @click="shippingInformationIsOpen = false">Zurück zum Verkauf</button>
          </div>
          <div v-if="offer.State !== 'shipping'" class="w-full text-center text-lg space-y-4 mt-4 text-white">
            <p class="line-through text-black">Du versendest dein Gerät</p>
            <img class="object-center inline-block h-6" src="~assets/img/icons/further-icon.png">
            <p
              :class="offer.State !== 'inShipping' ? 'line-through': ''"
              class="text-black"
            >
              <img v-if="offer.State === 'inShipping'" class="inline h-4 my-auto" src="~assets/img/svg/arrow-toRight.svg"> Dein Paket ist unerwegs zu Wirkaufendeinhandy.shop
            </p>
            <img class="object-center inline-block h-6" src="~assets/img/icons/further-icon.png">
            <p :class="offer.State === 'shippingBack' ? 'line-through text-black': ''"> <img v-if="offer.State === 'repair'" class="inline h-4 my-auto" src="~assets/img/svg/arrow-toRight.svg">Dein Handy ist bei uns anbekommen und wird repariert</p>
            <img class="object-center inline-block h-6" src="~assets/img/icons/further-icon.png">
            <p class="text-white"> <img v-if="offer.State === 'shippingBack'" class="inline h-4 my-auto " src="~assets/img/svg/arrow-toRight.svg">Dein Handy wurde erflogreich repariert und befindet sich auf dem Weg zurück zu dir</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    offer: { type: Object, required: true },
  },
  computed: {
    labelUrl() {
      return `/user/${this.$route.params.repairId}/label.pdf`
    },
  },
}
</script>
