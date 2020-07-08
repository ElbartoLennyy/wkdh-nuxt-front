<template>
  <footer class="w-full">
    <hr>
    <div class="w-full p-4 md:p-8 md:flex justify-around text-gray-600 font-light text-center md:text-left">
      <div class="w-full md:w-1/6 flex md:block justify-around">
        <nuxt-link class="h-12 md:h-20 mt-auto" to="/">
          <img
            class="w-auto h-full object-contain"
            src="~assets/img/icons/Logo-new-1000.png"
            alt="Wirkaufendeinhandy - Logo"
          >
        </nuxt-link>
        <div class="md:flex md:pt-4">
          <p class="text-xs pb-1">in Kooperation mit</p>
          <a href="https://www.whitelion-agency.de/" target="_blank"><img
            class="h-8 object-contain mx-auto"
            src="~assets/img/icons/white-lion.png"
            alt="Wirkaufendeinhandy - Logo"
          ></a>
        </div>
      </div>
      <div class="w-full mt-4 md:mt-0 md:w-1/4 space-y-1">
        <p class="font-bold text-black"><nuxt-link to="/">Verkauf</nuxt-link></p>
        <p><nuxt-link to="/">Ablauf</nuxt-link></p>
        <p><nuxt-link to="/">Vorteile</nuxt-link></p>
        <p><nuxt-link to="/handy">Verkaufen</nuxt-link></p>
      </div>
      <div class="w-full md:w-1/4 space-y-1">
        <p class="font-bold text-black pt-4">Wirkaufendeinhandy</p>
        <p><nuxt-link to="/handy">Verkaufen</nuxt-link></p>
        <p><nuxt-link to="/contactUs">Kontakt</nuxt-link></p>
        <p><nuxt-link to="/faq">FAQ</nuxt-link></p>
        <p><nuxt-link to="/aboutUs">Über uns</nuxt-link></p>
      </div>
      <div class="w-full md:w-1/4">
        <p class="font-bold text-black pt-4">Auszahlung</p>
        <div class="flex justify-center md:justify-start">
          <img class="h-8 w-auto object-contain" src="~assets/img/icons/paypal-logo.png" alt="PayPal">
          <img class="h-8 w-auto object-contain pl-6" src="~assets/img/icons/baseline_account_balance_black_24dp.png" alt="Bank">
          <p class="pl-2 my-auto font-bold text-black">IBAN</p>
        </div>
        <p class="font-bold text-black pt-4">Versand</p>
        <img class="h-8 w-auto object-contain mt-2 mx-auto md:m-0" src="~assets/img/icons/dpd-logo.png" alt="Dpd Logo">
        <p class="font-bold text-black">Sozial</p>
        <div class="flex pt-4 space-x-4 justify-center md:justify-start">
          <a href="https://www.instagram.com/wirkaufendeinhandy.shop/?hl=de" target="_blank"><img class="h-8 w-auto object-contain" src="~assets/img/icons/Instagram-logo.png" alt="Instagram Logo"></a>
          <a href="https://www.facebook.com/wirkaufendeinhandy" target="_blank"><img class="h-8 w-auto object-contain" src="~assets/img/icons/f_logo_RGB-Black_72.png" alt="facebook Logo"></a>
          <a href="https://wa.me/4915236318531" target="_blank"><img class="h-8 w-auto object-contain" src="~assets/img/icons/WhatsApp-logo.png" alt="facebook Logo"></a>
        </div>
      </div>
    </div>
    <hr>
    <div class="text-center text-gray-500 text-sm m-6">
      <p>© 2020 Wirkaufendeinhandy GbR</p>
      <p class="text-black">
        <nuxt-link class="hover:text-blue-900" to="/imprint">
          Impressum
        </nuxt-link> | <nuxt-link class="hover:text-blue-900" to="/privacy">
          Datenschutz
        </nuxt-link> | <nuxt-link class="hover:text-blue-900" to="/agb">
          AGB
        </nuxt-link>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
}
</script>
