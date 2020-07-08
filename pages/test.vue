<template>
  <client-only>
    <div class="iCountUp">
      <ICountUp
        :delay="delay"
        :end-val="endVal"
        :options="options"
        @ready="onReady"
      />
    </div>
  </client-only>
</template>

<script type="text/babel">
import ICountUp from 'vue-countup-v2'
export default {
  name: 'Demo',
  components: {
    ICountUp,
  },
  data() {
    return {
      delay: 2000,
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
</script>

<style scoped>
  .iCountUp {
    font-size: 12em;
    margin: 0;
    color: #4d63bc;
  }
</style>
