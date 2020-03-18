<template>
  <div class="font-sans min-h-screen">
    <div class="md:flex">
      <div class="md:w-1/3 md:min-h-screen p-12">
        <nuxt-link to="/" @click="back">
          <img
            class="inline w-5 "
            src="~assets/img/svg/back.svg"
            alt="back button"
          >
          <span class="text-blue-900  font-bold">Abbrechen</span>
        </nuxt-link>
        <h1 class="text-5xl font-semibold w-3/4 pt-4 tracking-tighter leading-tight">
          Wähle die passenden Daten für dein Handy aus
        </h1>

        <a href="contactUs" target="_blank" class="block text-blue-500 hover:text-blue-800 pt-4">
          <img
            class="inline w-5 "
            src="~assets/img/svg/help.svg"
            alt="help button"
          >
          Hilfe erhalten
        </a>

        <div class="text-gray-700 text-xs md:w-1/3 pt-4">
          <p>
            Informationen zur Erhebung, Verarbeitung, Speicherung und Löschung deiner Daten findest du in unserer
            <a
              target="_blank"
              href="privacy"
              class="text-blue-500 hover:text-blue-800"
            >Datenschutzerklärung</a>.
            <recaptcha-notice class="pt-4" />
          </p>
        </div>
      </div>
      <div class="md:min-h-screen md:w-2/3 p-2">
        <div class="rounded-lg p-12 bg-gray-900 md:min-h-full text-white">
          <p> test </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecaptchaNotice from '~/components/RecaptchaNotice'

export default {
  components: { RecaptchaNotice },

}
</script>
