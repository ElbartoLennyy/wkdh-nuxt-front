<template>
  <div>
    <select
      v-model="selectedDay"
      class="block w-full bg-gray-800 rounded-lg text-gray-100 px-3 py-4 hover:bg-gray-700"
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
      <select
        v-model="selectedStart"
        class="block w-full bg-gray-800 rounded-lg text-gray-100 px-3 py-4 hover:bg-gray-700"
        required
      >
        <option value="" disabled selected>Wähle einen Zeitraum aus…</option>
        <option v-for="([startHour, startMinute], startIndex) in orderedStartTime" :key="startIndex" :value="startIndex">
          Zwischen {{ startHour }}:{{ padZeros(startMinute) }}
          und {{ startHour + 1 }}:{{ padZeros(startMinute) }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: null,
    },
    pickUpTimes: { type: Object, required: true },
  },
  data: () => ({
    selectedDay: '',
    selectedStart: null,
  }),
  computed: {
    availableDays() {
      const days = []
      for (const day in this.pickUpTimes) {
        days.push(day)
      }

      return days.sort((a, b) => {
        return new Date(a) - new Date(b)
      })
    },
    finishedDate() {
      if (this.selectedStart == null) {
        return null
      }
      const [startHours, startMinutes] = this.orderedStartTime[this.selectedStart]
      return new Date(`${this.selectedDay} ${this.padZeros(startHours)}:${this.padZeros(startMinutes)}:00.000`).toUTCString()
    },
    orderedStartTime() {
      return this.pickUpTimes[this.selectedDay].slice().sort((a, b) => {
        return a[0] - b[0]
      })
    },
  },
  watch: {
    finishedDate(date) {
      if (date === null) { return }

      this.$emit('input', date ? {
        day: this.selectedDay,
        start: this.selectedStart,
        date,
        formattedDay: this.formatDay(this.selectedDay),
        formattedStartTime: `${this.orderedStartTime[this.selectedStart][0]}:${this.padZeros(this.orderedStartTime[this.selectedStart][1])}`,
        formattedEndTime: `${this.orderedStartTime[this.selectedStart][0] + 1}:${this.padZeros(this.orderedStartTime[this.selectedStart][1])}`,
        cId: this.orderedStartTime[this.selectedStart][2],
      } : null)
    },
  },
  created() {
    if (!this.value) {
      return
    }

    this.selectedDay = this.value.day
    this.selectedStart = this.value.start
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
