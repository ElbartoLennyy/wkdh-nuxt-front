<template>
  <div class="font-sans pt-24 bg-gray-900 text-white min-h-screen">
    <div class="fixed top-0 inset-x-0 flex">
      <div class="mt-3 bg-gray-800 mx-auto flex rounded-full items-center p-1 shadow-md">
        <nuxt-link to="/" class="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex py-1">
          <img class="h-full mx-auto" src="~assets/img/icons/logo-link.png" alt="Logo">
        </nuxt-link>
        <div class="ml-1 p-1 flex">
          <nuxt-link to="/ankauf" class="block py-1 px-3 bg-gray-700 hover:bg-gray-600 hover:text-white hover:no-underline rounded-full">Ankauf</nuxt-link>
          <!--    <nuxt-link to="/shop" class="ml-2 block py-1 px-3 bg-gray-700 hover:bg-gray-600 hover:text-white hover:no-underline rounded-full">Shop</nuxt-link> -->
        </div>
      </div>
    </div>

    <div class="sm:bg-illustration bg-contain bg-no-repeat min-h-screen px-4">
      <div class="max-w-4xl mx-auto">
        <section class="text-center">
          <img
            class="mt-5 inline w-24"
            src="~assets/img/icons/logo.png"
            alt="Logo"
          >
          <h1 class="mt-5 text-5xl md:text-6xl font-semibold leading-tight md:tracking-wide">
            Wir Kaufen Dein Handy
          </h1>
          <h2 class="block mt-2 text-3xl md:text-4xl text-blue-300 font-semibold">So kontaktierst du uns</h2>
        </section>

        <section>
          <h2 class="mt-6 font-bold text-3xl">WhatsApp</h2>
          <p>
            <a class="text-xl text-blue-300" href="mailto:kontakt@wirkaufendeinhandy.shop">kontakt@wirkaufendeinhandy.shop</a>
          </p>
          <h2 class="mt-6 font-bold text-3xl">Instagram</h2>
          <p>
            <a class="text-xl text-blue-300" href="https://www.instagram.com/wirkaufendeinhandy.shop/?hl=de">wirkaufendeinhandy.shop</a>
          </p>
          <h2 class="mt-6 font-bold text-3xl">WhatsApp</h2>
          <p>
            <a class="text-xl text-blue-300" href="tel:+4915236318531">01523 6318531</a>
          </p>
        </section>

        <footer class="mt-12 sm:mt-24 py-4 border-t border-gray-800 text-gray-500">
          Wirkaufendeinhandy GbR
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    nuxtLinks: [
      ['Impressum', '/imprint'],
      ['Kontakt', '/contactUs'],
    ],
    links: [
      ['Datenschutzerklärung', '/privacy.pdf'],
      ['AGB', '/agb.pdf'],
    ],
  }),
}
</script>

<style>
@responsive {
  .bg-illustration {
    background-image: url('~assets/img/background.svg');
  }
}
</style>
