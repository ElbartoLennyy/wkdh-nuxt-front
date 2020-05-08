<template>
  <header>
    <div class="w-full h-6 md:h-8 bg-gray-800">
      <p class="text-center text-white tracking-tight md:tracking-wide text-sm md:text-base md:pt-1">Trotz Covid-19 sicherer und hygienischer Abholservice!</p>
    </div>
    <div>
      <nav class="bg-gray-700 shadow-xl">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="justify-between h-auto text-center md:pt-4">
            <img class="h-20 w-auto object-contain inline" src="~assets/img/icons/wkdh-logo-text.png">
            <div class="flex pb-2">
              <div v-if="$route.name !== 'ankauf-landing'" class="flex w-full">
                <div class="w-1/3 md:w-auto">
                  <nuxt-link
                    to="/"
                    class="md:ml-8 inline-flex md:pb-2 items-center px-1 md:pt-1 border-b-2 border-transparent text-lg font-medium leading-5  transition duration-150 ease-in-out"
                    :class="$route.name === 'index' ? 'text-gray-800 border-gray-800' : ' text-gray-200 hover:text-gray-800 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:border-gray-300'"
                  >
                    Home
                  </nuxt-link>
                </div>
                <div class="w-1/3  md:w-auto">
                  <nuxt-link
                    to="/ankauf"
                    class="md:ml-8 inline-flex md:pb-2 items-center px-1 md:pt-1 border-b-2 border-transparent text-lg font-medium leading-5  transition duration-150 ease-in-out"
                    :class="$route.name === 'ankauf' ? 'text-gray-800 border-gray-800' : ' text-gray-200 hover:text-gray-800 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:border-gray-300'"
                  >
                    Ankauf
                  </nuxt-link>
                </div>
                <div class="w-1/3  md:w-auto">
                  <a
                    href="https://kaufedeinhandy.de"
                    target="_blank"
                    class="md:ml-8 inline-flex md:pb-2 items-center px-1 md:pt-1 border-b-2 border-transparent text-lg font-medium leading-5  transition duration-150 ease-in-out"
                    :class="$route.name === 'shop' ? 'text-gray-800 border-gray-800' : ' text-gray-200 hover:text-gray-800 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:border-gray-300'"
                  >
                    zum Shop
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>
