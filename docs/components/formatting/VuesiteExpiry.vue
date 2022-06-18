<template>
  <label :class="labelClass" :title="title">{{ label }}</label>
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
        return 'Expires now'
      }
      return past ? `Expired ${string}` : `Expires in ${string}`
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
label {
  display: inline-block;
  margin: 0.1em;
  padding: 0.2em 0.5em 0.4em 0.5em;
  border-radius: 0.4em;
  background: #EEE;
  font-size: 0.9em;
  white-space: nowrap;
  vertical-align: middle;
}

.unit-week.future,
.unit-day.future {
  background: #C72;
  color: white;
}

.unit-day,
.unit-hour,
.unit-minute,
.unit-second,
.unit-millisecond {
  background: #C42;
  color: white;
}

.past {
  background: #C42;
  color: black;
}

.unit-month.future {
  background: #EB7;
  color: white;
}

.unit-year.future {
  background: rgb(152, 179, 117);
  color: white;
}
</style>
