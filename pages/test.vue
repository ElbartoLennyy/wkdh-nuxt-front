<template>
  <div>
    <div class="iCountUp">
      <ICountUp
        :delay="delay"
        :end-val="endVal"
        :options="options"
        @ready="onReady"
      />
    </div>
  </div>
</template>

<script>
/*
import ICountUp from 'vue-countup-v2'
export default {
  components: {
    ICountUp,
  },
  data() {
    return {
      delay: 1000,
      endVal: 120500,
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: '',
      },
    }
  },
  methods: {
    onReady(instance, CountUp) {
      const that = this
      instance.update(that.endVal + 100)
    },
  },
}
*/
</script>
