<template>
  <div class="font-sans min-h-screen">
    <headerTemplate />

    <div class="pl-4 max-w-3xl mx-auto">
      <p class="mt-6 font-bold text-3xl">Email</p>
      <p>
        <a class="text-xl text-yellowDark" href="mailto:kontakt@wirkaufendeinhandy.shop">kontakt@wirkaufendeinhandy.shop</a>
      </p>
      <p class="mt-6 font-bold text-3xl">Instagram</p>
      <p>
        <a class="text-xl text-yellowDark" href="https://www.instagram.com/wirkaufendeinhandy.shop/?hl=de">wirkaufendeinhandy.shop</a>
      </p>
      <p class="mt-6 font-bold text-3xl">Telefon</p>
      <p>
        <a class="text-xl text-yellowDark" href="tel:+4915236318531">01523 6318531</a>
      </p>
      <p class="mt-6 font-bold text-3xl">WhatsApp</p>
      <p>
        <a class="text-xl text-yellowDark" href="https://wa.me/4915236318531" target="_blank">01523 6318531</a>
      </p>
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
