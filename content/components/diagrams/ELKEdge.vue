<template>
  <g>
    <g v-for="section in sections" :key="section.id">
      <path
        :d="computePath(section.startPoint, section.bendPoints, section.endPoint)"
        :stroke="edge.color"
        stroke-width="5"
        fill="none"
      />
      <path
        :d="computePath(section.startPoint, section.bendPoints, section.endPoint)"
        stroke="#333"
        stroke-width="5"
        fill="none"
        opacity="0.5"
      />
      <circle
        :cx="section.startPoint.x"
        :cy="section.startPoint.y"
        r="5"
        fill="#555"
      />
      <circle
        :cx="section.endPoint.x"
        :cy="section.endPoint.y"
        r="5"
        fill="#555"
      />
    </g>
  </g>
</template>

<script>
export default {
  props: {
    edge: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    sections() {
      return this.edge.sections || []
    }
  },
  methods: {
    move(pathCoord) {
      return `M ${pathCoord.x},${pathCoord.y}`
    },
    line(pathCoord) {
      return `L ${pathCoord.x},${pathCoord.y}`
    },
    computePath(start, bendPoints, end) {
      const { move, line } = this
      const midPoints = bendPoints || []
      const path = [
        move(start),
        ...midPoints.map(line),
        line(end)
      ]
      return path.join(' ')
    }
  }
}
</script>
