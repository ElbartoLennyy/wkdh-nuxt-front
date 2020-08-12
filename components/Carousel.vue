<template>
  <agile
    :autoplay="true"
    :nav-buttons="false"
    :autoplay-speed="4000"
    :dots="false"
    :pause-on-hover="false"
    :swipe-distance="5000"
  >
    <slot />
  </agile>
</template>

<script>
import { VueAgile } from 'vue-agile'

export default {
  name: 'Carousel',
  components: { agile: VueAgile },
}
</script>
