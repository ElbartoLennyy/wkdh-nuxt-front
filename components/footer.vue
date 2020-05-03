<template>
  <footer class="mt-12 sm:mt-24 py-4 border-t border-gray-800 text-gray-500">
    Wirkaufendeinhandy GbR
    <div class="flex m-4 w-full">
      <img class="h-8 w-auto" src="~assets/img/icons/paypal-logo.png" alt="PayPal">
      <img class="h-8 w-auto ml-3 md:ml-6" src="~assets/img/icons/dpd-logo.png" alt="Dpd Logo">
      <a href="https://www.instagram.com/wirkaufendeinhandy.shop/?hl=de" target="_blank"><img class="h-8 w-auto ml-3 md:ml-6" src="~assets/img/icons/Instagram-logo.png" alt="Instagram Logo"></a>
      <a href="https://www.facebook.com/wirkaufendeinhandy" target="_blank"><img class="h-8 w-auto ml-3 md:ml-6" src="~assets/img/icons/facebook-logo.png" alt="facebook Logo"></a>
      <a href="https://wa.me/004915206318531" target="_blank"><img class="h-8 w-auto ml-3 md:ml-6" src="~assets/img/icons/WhatsApp-logo.png" alt="facebook Logo"></a>
    </div>

    <div class="mt-2 text-gray-600 text-sm font-bold">
      <nuxt-link
        v-for="[linkLabel, linkUrl] in nuxtLinks"
        :key="linkUrl"
        :to="linkUrl"
        class="mr-1"
      >
        {{ linkLabel }}
      </nuxt-link>
      <a
        v-for="[linkLabel, linkUrl] in links"
        :key="linkUrl"
        :href="linkUrl"
        class="mr-1"
      >
        {{ linkLabel }}
      </a>
    </div>
  </footer>
</template>

<script>
export default {
  data: () => ({
    nuxtLinks: [
      ['Kontakt', '/contactUs'],
      ['Impressum', '/imprint'],
    ],
    links: [
      ['Datenschutzerklärung', '/privacy.pdf'],
      ['AGB', '/agb.pdf'],
    ],
  }),
}
</script>
