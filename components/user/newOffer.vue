<template>
  <div class="font-sans min-h-screen">
    <div class="md:flex">
      <div class="md:w-1/3 md:min-h-screen p-4 md:p-12 md:pl-16 flex flex-col justify-between">
        <div>
          <div class="flex items-center text-center">
            <img
              class="inline w-5 "
              src="~assets/img/svg/back.svg"
              alt="back button"
            >

            <nuxt-link to="/" @click="back">
              <span class="text-blue-900 font-bold pl-2">Abbrechen</span>
            </nuxt-link>
          </div>

          <p class="text-3xl md:text-5xl font-bold w-4/5 mt-8 tracking-tighter leading-none">
            Wir kaufen dein Handy!
          </p>

          <div class="flex items-center text-center md:pt-6">
            <img
              class="inline w-5 "
              src="~assets/img/svg/help.svg"
              alt="help button"
            >

            <a href="contactUs" target="_blank" class="text-blue-500 hover:text-blue-800 pl-2">
              Hilfe erhalten
            </a>
          </div>

          <div class="text-gray-700 text-xs md:w-3/4 pt-4">
            <p>
              Informationen zur Erhebung, Verarbeitung, Speicherung und Löschung deiner Daten findest du in unserer
              <a
                target="_blank"
                href="privacy"
                class="text-blue-500 hover:text-blue-800"
              >Datenschutzerklärung</a>
            </p>
            <recaptcha-notice class="pt-6" />
          </div>
        </div>

        <div class="bg-gray-300 shadow rounded-full overflow-hidden mt-10">
          <div
            class="bg-blue-600 h-2 m-1 transition-all duration-300 ease-in-out rounded-full"
            :style="{ width: `${progress}%` }"
          />
        </div>
      </div>
      <div class="md:w-2/3 p-2 h-screen overflow-y-auto">
        <div class="rounded-lg p-6 md:p-12 bg-gray-900 min-h-full">
          <p>hallo</p>
        </div>
      </div>
    </div>
  </div>
</template>
