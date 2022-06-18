<template>
  <label :class="labelClass" :title="title">
    <slot />
    <span>{{ label }}</span>
  </label>
</template>

<script>
const timeUntil = require('time-until')

export default {
  props: {
    date: {
      type: Date,
      default: false
    },
    context: {
      type: Date,
      default: () => new Date()
    }
  },
  computed: {
    label() {
      const { string, past } = this.timeUntil
      if (string === 'now') {
        return 'Now'
      }
      return past ? `${string}` : `${string}`
    },
    timeUntil() {
      try {
        return timeUntil(this.date, this.context)
      } catch (ex) {
        return { unit: 'second', value: 0, string: `Unknown date / time : (${this.date})`, past: false }
      }
    },
    title() {
      const analysis = this.timeUntil
      if (!this.date) {
        return `"${this.date}" is not a valid date; please check where this data is coming from`
      } else if (analysis.value === 0) {
        return `${this.date} is happening right now!`
      } else if (analysis.past) {
        return `${analysis.string} since ${this.date}`
      } else {
        return `${analysis.string} until ${this.date}`
      }
    },
    labelClass() {
      let { unit, value, past } = this.timeUntil
      if (unit === 'month' && value >= 12) {
        unit = 'year'
      }
      const unitClass = `unit-${unit}`
      const pastClass = past ? 'past' : 'future'
      return [unitClass, pastClass].join(' ')
    }
  }
}
</script>

<style scoped>
td label {
  display: flex;
}
label {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  color: black;
  white-space: nowrap;
}
label > * {
  margin: 0 0.2em;
}

.unit-week.future,
.unit-day.future {
  color: green;
}

.unit-day,
.unit-hour,
.unit-minute,
.unit-second,
.unit-millisecond {
  color: black;
}

.past {
  color: blue;
}
.unit-hour.past {
  color: #35C;
}

.unit-day.past {
  color: #35C;
}

.unit-week.past {
  color: #369;
}

.unit-month.past {
  color: #633;
}

.unit-year.past {
  color: #966;
}
</style>
