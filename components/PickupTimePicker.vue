<template>
  <flat-pickr
    class="toolbox-field"
    placeholder="Wähle deine Abholzeit aus"
    :config="flatPickrConfig"
    :value="value"
    @input="$emit('input', $event)"
  />
</template>

<script>
import FlatPickr from 'vue-flatpickr-component'
import { German } from 'flatpickr/dist/l10n/de.js'
import 'flatpickr/dist/flatpickr.css'
import 'flatpickr/dist/themes/dark.css'

export default {
  components: { FlatPickr },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data: () => ({
    flatPickrConfig: {
      enableTime: true,
      // TODO: Consider improving this date format
      dateFormat: 'F, d Y H:i',
      time_24hr: true,
      minDate: new Date().fp_incr(3),
      maxDate: new Date().fp_incr(14),
      minTime: '12:00',
      maxTime: '19:30',
      disableMobile: true,
      locale: German
    }
  })
}
</script>
