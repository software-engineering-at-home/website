<template>
  <g>
    <path
      :d="computedPath"
      :stroke="color"
      stroke-width="5"
      fill="none"
    />
    <path
      :d="computedPath"
      stroke="#333"
      stroke-width="5"
      fill="none"
      opacity="0.5"
    />
    <circle
      :cx="start.x"
      :cy="start.y"
      r="5"
      fill="#555"
    />
    <circle
      :cx="end.x"
      :cy="end.y"
      r="5"
      fill="#555"
    />
  </g>
</template>

<script>
export default {
  props: {
    start: {
      type: Object,
      default() {
        return {
          x: 0,
          y: 0
        }
      }
    },
    end: {
      type: Object,
      default() {
        return {
          x: 0,
          y: 0
        }
      }
    },
    midOffsetRatio: {
      type: Number,
      default: 0.5
    },
    color: {
      type: String,
      default: '#555'
    }
  },
  computed: {
    computedPath() {
      const { move, line, start, m1, m2, end } = this
      const path = [
        move(start),
        line(m1),
        line(m2),
        line(end)
      ]
      return path.join(' ')
    },
    m1() {
      const { start, end, midOffsetRatio } = this
      return {
        x: start.x + (end.x - start.x) * midOffsetRatio,
        y: start.y
      }
    },
    m2() {
      const { start, end, midOffsetRatio } = this
      return {
        x: start.x + (end.x - start.x) * midOffsetRatio,
        y: end.y
      }
    }
  },
  methods: {
    move(pathCoord) {
      return `M ${pathCoord.x},${pathCoord.y}`
    },
    line(pathCoord) {
      return `L ${pathCoord.x},${pathCoord.y}`
    }
  }
}
</script>
