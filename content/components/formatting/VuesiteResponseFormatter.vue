<template>
  <pre v-if="response"><code>{{ formatJson(response) }}</code></pre>
</template>

<script>
export default {
  props: {
    response: {
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    return {}
  },
  methods: {
    formatJson(data) {
      return JSON.stringify(data, null, 2)
    }
  }
}
</script>

<style scoped>
pre {
  color: white;
}
</style>
