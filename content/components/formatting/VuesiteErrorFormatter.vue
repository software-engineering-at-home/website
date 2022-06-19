<template>
  <div v-if="error" class="error-formatter">
    <div v-if="error" class="error">
      <p><b>{{ error.message }}</b></p>
      <p v-if="error.message === 'Network Error'">
        <span>Please check your internet connection!</span>
      </p>
      <p v-else>
        <b>Advice:</b>
        <span>Check your connection - see if you can access the URL yourself</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    return {}
  },
  computed: {
    url() {
      return this.config.url
    },
    config() {
      return this.error.config || {}
    },
    baseUrl() {
      return 'http://localhost:10435/'
    },
    connectingToLocal() {
      return (this.url + '').includes(this.baseUrl + '')
    },
    title() {
      const self = this
      const { error, url } = self
      if (this.connectingToLocal) {
        return 'Local Server Offline'
      } else {
        return (url ? `Unable to load from ${url}` : error.message) || 'No error message set'
      }
    }
  },
  methods: {
    formatJson(data) {
      return JSON.stringify(data, null, 2)
    }
  }
}
</script>

<style scoped>
div.error-formatter {
  display: block;
  margin: 1em 0 0.5em 0;
  color: black;
}
div > p:first-of-type {
  margin: 0;
}
div > p:last-of-type {
  margin: 0;
}
</style>
