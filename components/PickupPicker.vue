<template>
  <div>
    <select v-model="selectedDay" class="px-3 py-2">
      <option
        v-for="day in availableDays"
        :key="day"
        :value="day"
      >
        {{ day }}
      </option>
    </select>

    <div v-if="selectedDay" class="mt-3">
      <select v-model="selectedSlot" class="px-3 py-2">
        <option
          v-for="(slot, slotIndex) in daySlots[selectedDay]"
          :key="slotIndex"
          :value="slotIndex"
        >
          {{ slot.start[0] }}:{{ String(slot.start[1]).padStart(2, '0') }}
          – {{ slot.end[0] }}:{{ String(slot.end[1]).padStart(2, '0') }}
        </option>
      </select>
    </div>

    <div v-if="selectedSlot != null" class="mt-3">
      <select v-model="selectedStart" class="px-3 py-2">
        <option v-for="([startHour, startMinute], startIndex) in availableStarts" :key="startIndex" :value="startIndex">
          {{ startHour }}:{{ String(startMinute).padStart(2, '0') }}
          – {{ startHour + 1 }}:{{ String(startMinute).padStart(2, '0') }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { addDays, format as formatDate } from 'date-fns'

export default {
  data: () => ({
    selectedDay: null,
    selectedSlot: null,
    selectedStart: null,
    time: [0, 0],
    daySlots: {
      '2020-03-07': [
        { start: [12, 30], end: [14, 30] },
        { start: [15, 30], end: [17, 0] },
      ],
      '2020-03-08': [
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
        days.push(formatDate(day, 'yyyy-MM-dd'))
      }

      return days
    },
    availableDays() {
      return this.possibleDays.filter(dayKey => dayKey in this.daySlots)
    },
    availableStarts() {
      const starts = []
      const slot = this.daySlots[this.selectedDay][this.selectedSlot]
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

      return starts
    },
    finishedDate() {
      if (!this.selectedStart) {
        return null
      }

      const date = new Date(this.selectedDay)
      date.setHours(this.selectedStart[0])
      date.setMinutes(this.selectedStart[1])
      return date
    },
  },
  watch: {
    selectedDay() {
      this.selectedSlot = null
    },
    selectedSlot() {
      this.selectedStart = null
    },
  },
}
</script>
