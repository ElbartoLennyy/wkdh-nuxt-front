<template>
  <div class="font-sans bg-gray-900 text-white min-h-screen">
    <headerTemplate />

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
          <h2 class="mt-6 font-bold text-3xl">Email</h2>
          <p>
            <a class="text-xl text-blue-300" href="mailto:kontakt@wirkaufendeinhandy.shop">kontakt@wirkaufendeinhandy.shop</a>
          </p>
          <h2 class="mt-6 font-bold text-3xl">Instagram</h2>
          <p>
            <a class="text-xl text-blue-300" href="https://www.instagram.com/wirkaufendeinhandy.shop/?hl=de">wirkaufendeinhandy.shop</a>
          </p>
          <h2 class="mt-6 font-bold text-3xl">Telefon</h2>
          <p>
            <a class="text-xl text-blue-300" href="tel:+4915236318531">01523 6318531</a>
          </p>
          <h2 class="mt-6 font-bold text-3xl text-blue-300">  <a href="https://wa.me/4915236318531" target="_blank">WhatsApp </a></h2>
        </section>

        <footerTemplate />
      </div>
    </div>
  </div>
</template>

<script>
import footerTemplate from '~/components/footer'
import headerTemplate from '~/components/header'

export default {
  components: { footerTemplate, headerTemplate },
}
</script>

<style>
@responsive {
  .bg-illustration {
    background-image: url('~assets/img/background.svg');
  }
}
</style>
