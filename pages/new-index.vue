<template>
  <div class="min-h-screen min-w-full font-sans">
    <div class="bg-faces bg-right-top min-h-screen bg-contain bg-no-repeat">
      <div class="p-8 flex">
        <div class="w-1/4">
          <img class="w-full h-auto max-h-full object-contain" src="~assets/img/icons/Logo-new-1000.png" alt="Wirkaufendeinhandy - Logo">
        </div>
        <div class="w-3/4 m-auto flex pl-24">
          <div class="w-1/5 w-auto">
            <p class="uppercase inline-flex items-center border-b-4 border-transparent text-2xl font-bold text-yellowDark border-yellowLight">Home</p>
          </div>
          <div class="w-1/5">
            <p class="uppercase inline-flex items-center text-2xl font-bold text-yellowDark">Ablauf</p>
          </div>
          <div class="w-1/5">
            <p class="uppercase inline-flex items-center text-2xl font-bold text-white">Vorteile</p>
          </div>
          <div class="w-1/5">
            <p class="uppercase inline-flex items-center text-2xl font-bold text-white">Über uns</p>
          </div>
          <div class="w-1/5">
            <p class="uppercase p-2 rounded-lg inline-flex items-center text-2xl font-bold text-white border-white border-8 ">Verkaufen</p>
          </div>
        </div>
      </div>
      <div class="flex m-16 min-h-full">
        <div class="w-1/2 items-center">
          <p class="font-bold text-6xl">VERKAUFE DEIN HANDY IN 2 MINUTEN!</p>
          <img src="~assets/img/icons/Swoosh+text200.png" class="-ml-48 h-20 m-auto">
          <img src="~assets/img/icons/Kringel und Text.png" class="h-32 mt-4 m-auto">
        </div>
        <div class="w-1/2 min-h-full" />
      </div>
    </div>
    <div class="relative h-32 text-center">
      <div class="z-40 absolute w-24 h-24 ml-0 mt-0 bg-gray-400 flex justify-center items-center">z-40</div>
      <div class="z-30 absolute w-24 h-24 ml-2 mt-2 bg-gray-500 flex justify-center items-center">z-30</div>
      <div class="z-20 absolute w-24 h-24 ml-4 mt-4 bg-gray-600 flex justify-center items-center">z-20</div>
      <div class="z-10 absolute w-24 h-24 ml-6 mt-6 bg-gray-700 flex justify-center items-center">z-10</div>
      <div class="z-0 absolute w-24 h-24 ml-8 mt-8 bg-gray-800 flex justify-center items-center">z-0</div>
    </div>
    <div class="relative h-32 text-center">
      <div class="absolute w-24 h-24 ml-8 mt-8 bg-gray-800 flex justify-center items-center">z-0</div>
      <div class="absolute w-24 h-24 ml-6 mt-6 bg-gray-700 flex justify-center items-center">z-10</div>
      <div class="absolute w-24 h-24 ml-4 mt-4 bg-gray-600 flex justify-center items-center">z-20</div>
      <div class="absolute w-24 h-24 ml-2 mt-2 bg-gray-500 flex justify-center items-center">z-30</div>
      <div class="absolute w-24 h-24 ml-0 mt-0 bg-gray-400 flex justify-center items-center">z-40</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
@responsive {
  .bg-faces {
    background-image: url('~assets/img/pictures/HappyFacesSchräg.jpg');
  }
}
</style>
