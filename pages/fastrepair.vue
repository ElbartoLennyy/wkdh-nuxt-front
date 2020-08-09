<template>
  <div class="w-full min-h-screen font-sans max-w-screen-3xl mx-auto">
    <headerTemplate />

    <div class="max-w-screen-xl mx-auto">
      <div class="w-full h-auto bg-gradient text-center text-white font-bold p-2">
        <p class="text-xl">Reparatur? Wirkaufendeinhandy.shop!</p>
      </div>

      <div class="w-full h-auto relative">
        <div>
          <img src="~assets/img/pictures/repair.jpg" class="object-contain w-7/12 md:w-1/2">
        </div>
        <div class="w-1/2 flex flex-col md:p-6 z-10 absolute top-0 right-0 h-full">
          <div class="ml-auto w-5/6 justify-between flex flex-col h-full mt-6">
            <p class="text-sm md:text-2xl font-bold flex-grow">  <img src="~assets/img/svg/check.svg" class="inline h-5 md:h-10"> Zuverlässig</p>
            <p class="text-sm md:text-2xl font-bold flex-grow -ml-2">  <img src="~assets/img/svg/check.svg" class="inline h-5 md:h-10"> Unkompliziert</p>
            <p class="text-sm md:text-2xl font-bold flex-grow -ml-4">  <img src="~assets/img/svg/check.svg" class="inline h-5 md:h-10"> Super Schnell</p>
            <p class="text-sm md:text-2xl font-bold flex-grow -ml-6">  <img src="~assets/img/svg/check.svg" class="inline h-5 md:h-10"> Sicher durch Garantie</p>

            <div class="mx-auto transition duration-300 ease-in-out transform hover:scale-110 flex-grow ">
              <nuxt-link to="/repair" class="p-1 text-yellowDark font-bold text-md md:text-3xl xl:text-5xl border-yellowDark border-4 md:border-8 md:p-2 rounded-lg">JETZT&nbsp;REPARIEREN</nuxt-link>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-fastRepair w-full p-2 mt-4">
        <img src="~assets/img/svg/fastRepair.svg" class="object-contain h-6 md:h-10 mx-auto">
        <p class="uppercase text-yellowDark text-center font-bold mb-4">von Wirkaufendeinhandy.shop</p>
        <div class="flex text-white w-5/6 md:w-5/12 mx-auto text-sm font-semibold justify-between">
          <img src="~assets/img/svg/5days.svg" alt="" class="w-1/6 h-6 md:h-10 mr-2">
          <p class="w-5/6 md:text-lg">Reparatur und Rückversand in nur 5 Tagen</p>
        </div>
        <div class="flex text-white w-5/6 md:w-5/12 mx-auto text-sm font-semibold justify-between mt-4">
          <img src="~assets/img/svg/card.svg" alt="" class="w-1/6 h-6 md:h-10 mr-2">
          <p class="w-5/6 md:text-lg">Schnelle und unkomplizierte Bezahlung</p>
        </div>
        <div class="flex text-white w-5/6 md:w-5/12 mx-auto text-sm font-semibold justify-between mt-4">
          <img src="~assets/img/svg/scherpe.svg" alt="" class="w-1/6 h-6 md:h-10 mr-2">
          <p class="w-5/6 md:text-lg">Garantiert sicher zur erfolgreichen Reparatur</p>
        </div>
      </div>

      <div class="w-full h-auto relative mt-4 mb-4">
        <div>
          <img src="~assets/img/pictures/dhl.jpg" class="object-contain w-7/12 md:w-1/2">
        </div>
        <div class="w-3/4 flex flex-col md:p-6 z-10 absolute top-0 right-0 h-full">
          <p class="bg-white p-2 text-xl md:text-2xl font-bold mt-6">Kostenfreier Versand mit DHL</p>
          <div class="ml-auto w-2/3 justify-between flex flex-col h-full">
            <p class="text-sm md:text-2xl text-center font-bold w-5/6 ml-auto">Dein kostenloses<br>Versandlabel via Mail</p>
            <div class="flex text-sm md:text-2xl font-semibold justify-end">
              <img src="~assets/img/svg/qrCode.svg" alt="" class="w-1/6 h-6 md:h-10 my-auto">
              <p class="w-5/6 md:text-2xl text-center -ml-4">einfach als QR-Code<br>(ohne durcken)</p>
            </div>
            <p class="text-center w-5/6 ml-auto">oder</p>
            <div class="flex text-sm md:text-2xl font-semibold justify-between">
              <img src="~assets/img/svg/printer.svg" alt="" class="w-1/6 h-6 md:h-10 my-auto">
              <p class="w-5/6 md:text-2xl text-center">zum selbst ausdrucken<br>für Zuhause</p>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full bg-gradient text-white p-2 md:p-6 text-center flex flex-col items-center">
        <p class="text-xl md:text-4xl font-bold pb-4">Noch irgendwelche Fragen?</p>
        <p class="hidden md:block text-xl font-bold w-1/2 pb-4">Solltest du noch weitere Fragen haben, beantworten wir diese gerne per Mail oder Telefon. Ansonsten schaue gerne mal bei unserem FAQ vorbei</p>
        <div class="flex uppercase text-lg md:text-3xl justify-around font-bold w-full md:w-2/3 mb-1">
          <nuxt-link to="/faq" class="border-white w-1/3 border-4 md:border-4 rounded-lg p-1 px-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">FAQ</nuxt-link>
          <nuxt-link to="/contactUs" class="border-white w-1/3 border-4 md:border-4 rounded-lg p-1 px-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">Kontakt</nuxt-link>
        </div>
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
