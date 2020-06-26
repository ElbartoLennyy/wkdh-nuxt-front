<template>
  <div class="font-sans min-h-screen">
    <headerTemplate />

    <div class="p-4 pb-8 max-w-3xl mx-auto">
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
      <p class="mt-6 font-bold text-3xl">Kontaktiere uns direkt über unsere Website</p>
      <form
        action="https://formspree.io/mrgyabkk"
        method="POST"
      >
        <div class="mt-4">
          <p>
            Deine Email
          </p>
          <input type="text" name="_replyto" class="bg-gray-200 p-2 rounded-sm w-1/3">
        </div>
        <div class="mt-6">
          <p>
            Deine Nachricht
          </p>
          <textarea name="message" class="bg-gray-200 p-2 rounded-sm w-full h-32" />
        </div>
        <button class="bg-yellowDark text-white rounded-lg p-2 mt-6 text-lg" type="submit">Senden</button>
      </form>
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
