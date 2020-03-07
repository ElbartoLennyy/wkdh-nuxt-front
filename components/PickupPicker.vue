<template>
  <div>
    <select
      v-model="selectedDay"
      class="px-3 py-2 toolbox-field"
      required
      @input="selectedStart = null"
    >
      <option value="" disabled selected>Wähle einen Tag aus…</option>
      <option
        v-for="day in availableDays"
        :key="day"
        :value="day"
      >
        {{ formatDay(day) }}
      </option>
    </select>

    <div v-if="selectedDay" class="mt-3">
      <select v-model="selectedStart" class="px-3 py-2 toolbox-field" required>
        <option value="" disabled selected>Wähle einen Zeitraum aus…</option>
        <option v-for="([startHour, startMinute], startIndex) in availableStarts" :key="startIndex" :value="startIndex">
          Zwischen {{ startHour }}:{{ padZeros(startMinute) }}
          und {{ startHour + 1 }}:{{ padZeros(startMinute) }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { addDays } from 'date-fns'

export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  created() {
    if (!this.value) {
      return
    }

    this.selectedDay = this.value.day
    this.selectedStart = this.value.start
  },
  data: () => ({
    selectedDay: '',
    selectedStart: null,
    daySlots: {
      '2020-03-09': [
        { start: [12, 30], end: [14, 30] },
        { start: [15, 30], end: [17, 0] },
      ],
      '2020-03-10': [
        { start: [11, 0], end: [13, 0] },
        { start: [14, 0], end: [18, 0] },
      ],
    },
  }),
  computed: {
    possibleDays() {
      const days = []
      const today = new Date()

      for (let i = 2; i < 9; i++) {
        const day = addDays(today, i)
        days.push(day.toISOString().substr(0, 10))
      }

      return days
    },
    availableDays() {
      return this.possibleDays.filter(dayKey => dayKey in this.daySlots)
    },
    availableStarts() {
      const starts = []

      for (const slot of this.daySlots[this.selectedDay]) {
        const { start: [startHour, startMinute], end: [endHour, endMinute] } = slot

        for (let h = startHour; h < endHour; h++) {
          const exclude00 = h === startHour && startMinute === 30
          if (!exclude00) {
            starts.push([h, 0])
          }

          const exclude30 = h === (endHour - 1) && endMinute !== 30
          if (!exclude30) {
            starts.push([h, 30])
          }
        }
      }

      return starts
    },
    finishedDate() {
      if (this.selectedStart == null) {
        return null
      }

      const [startHours, startMinutes] = this.selectedStartTime
      return new Date(`${this.selectedDay}T${this.padZeros(startHours)}:${this.padZeros(startMinutes)}:00.000+0100`)
    },
    selectedStartTime() {
      return this.availableStarts[this.selectedStart]
    },
  },
  watch: {
    finishedDate(date) {
      this.$emit('input', date ? {
        day: this.selectedDay,
        start: this.selectedStart,
        date,
      } : null)
    },
  },
  methods: {
    padZeros(number) {
      return String(number).padStart(2, '0')
    },
    formatDay(day) {
      return new Date(day).toLocaleDateString('de', { dateStyle: 'full' })
    },
  },
}
</script>
