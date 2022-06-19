<template>
  <div>
    <div
      v-if="showBar"
      :class="dataSourceClass"
    >
      <div class="widget">
        <span class="icon">🌐</span>
        <span class="url"><a
          :href="dataSourceUrl"
          title="Open the source URL in a new window"
          target="_blank"
        >{{ dataSourceUrl }}</a></span>
        <span
          title="The status of the network request"
          :class="['statusText', statusText].join(' ')"
        >
          <b v-if="status">{{ status }}</b>
          <b>{{ statusText }}</b>
        </span>
        <span
          v-if="responseTime > 0"
          title="The measured in-browser time taken in milliseconds receive a response"
          :class="['responseTime', responseTimeClass].join(' ')"
        >{{ responseTime }} ms</span>
      </div>
      <error-formatter
        v-if="error"
        :error="error"
      />
    </div>
    <slot
      v-if="showResponse"
      :response="localResponse"
    >
      <response-formatter
        v-if="localResponse"
        :response="localResponse"
      />
    </slot>
  </div>
</template>

<script>
import axios from 'axios'

import ResponseFormatter from '../formatting/VuesiteResponseFormatter.vue'
import ErrorFormatter from '../formatting/VuesiteErrorFormatter.vue'

const states = {
  INITIALISED: 'initialised',
  BEFORE_MOUNT: 'before mount',
  URL_CHANGED: 'data source url changed',
  REQUEST_SENT: 'request sent',
  REQUEST_EXCEPTION: 'request exception',
  PROGRESS_EVENT: 'progress event',
  RESPONSE_RECEIVED: 'response received'
}

export default {
  components: { ResponseFormatter, ErrorFormatter },
  model: {
    prop: 'response',
    event: 'response'
  },
  props: {
    dataSourceUrl: {
      type: String,
      default: ''
    },
    hideBar: {
      type: Boolean,
      default: false
    },
    hideResponse: {
      type: Boolean,
      default: false
    },
    response: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      error: false,
      progressEvent: {},
      state: states.INITIALISED,
      startTime: 0,
      endTime: 0,
      updateTimer: false,
      localResponse: {}
    }
  },
  computed: {
    showBar() {
      if (this.hideBar) {
        return this.state !== states.RESPONSE_RECEIVED
      }
      return true
    },
    showResponse() {
      return !this.hideResponse
    },
    dataSourceClass() {
      const type = this.statusText
      return `data source ${type}`
    },
    responseData() {
      return this.response?.data || this.localResponse?.data || {}
    },
    status() {
      return this.response?.status || this.localResponse?.status || 0
    },
    statusText() {
      return this.response?.statusText || this.localResponse?.statusText || this.state
    },
    responseTime() {
      const startTime = this.startTime
      const endTime = this.endTime || Date.now()
      return (startTime) ? endTime - startTime : 0
    },
    responseTimeClass() {
      if (this.responseTime > 2000) {
        return 'broken'
      } else if (this.responseTime > 1000) {
        return 'slow'
      } else if (this.responseTime > 500) {
        return 'fast'
      } else if (this.responseTime > 1) {
        return 'super-fast'
      } else {
        return 'not-started'
      }
    }
  },
  watch: {
    dataSourceUrl() {
      this.state = states.URL_CHANGED
      this.loadSource(this)
    }
  },
  beforeMount() {
    this.state = states.BEFORE_MOUNT
    this.loadSource(this)
  },
  methods: {
    loadSource: async (self) => {
      window.clearInterval(self.updateTimer)
      self.updateTimer = window.setInterval(() => {
        self.endTime = Date.now()
      }, 200)
      let localResponse = {}
      self.error = false
      self.startTime = Date.now()
      try {
        self.state = states.REQUEST_SENT
        localResponse = await axios.get(self.dataSourceUrl, { onDownloadProgress: self.onDownloadProgress })
        self.state = states.RESPONSE_RECEIVED
      } catch (axiosException) {
        self.state = states.REQUEST_EXCEPTION
        const { message, config } = axiosException
        localResponse = axiosException.response
        self.error = {
          message,
          config: {
            url: config ? config.url : self.dataSourceUrl,
            method: config ? config.method : 'GET',
            headers: config ? config.headers : undefined
          }
        }
        self.$emit('error', self.error)
      }

      self.endTime = Date.now()
      window.clearInterval(self.updateTimer)

      const { data, status, statusText, headers, request, config } = localResponse || {}
      self.localResponse = { 
        data,
        status,
        statusText,
        headers,
        config: {
          url: config ? config.url : self.dataSourceUrl,
          method: config ? config.method : 'GET',
          headers: config ? config.headers : undefined
        },
        request
      }
      self.$emit('response', self.localResponse)
    },
    onDownloadProgress(progressEvent) {
      this.state = states.PROGRESS_EVENT
      this.progressEvent = progressEvent
      this.$emit('progress', progressEvent)
    }
  }
}
</script>

<style scoped>
.data.source.info {
  margin: 0.5em 0;
  cursor: default;
}

.icon {
  margin-right: 0.2em;
}
.url {
  flex: 10 1;
}
.url > a {
  color: black;
  text-decoration: none;
}
.url > a:hover {
  color: #1ad48e;
  text-decoration: none;
}

.widget {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.2em;
  font-size: 0.9em;
  padding: 0 0.4em 0.1em 0.4em;
}
.widget > * {
  margin: 0 0.2em;
}
.widget > *:first-child {
  margin: 0 0.2em 0 0;
}
.widget > *:last-child {
  margin: 0 0 0 0.2em;
}

.statusText, .responseTime {
  display: inline-block;
  border-radius: 0.2em;
  background: #DDD;
  font-size: 1.0em;
  padding: 0 0.4em 0.1em 0.4em;
}

.statusText.initialised {
  background: #EEE;
}
.data.source.initialised {
  border-left: 1em solid #CCC;
}

.statusText.before.mount {
  background: #DDD;
}
.data.source.before.mount {
  border-left: 1em solid #BBB;
}

.statusText.data.source.url.changed {
  background: #B7A
}
.data.source.url.changed {
  border-left: 1em solid #B7A;
}

.statusText.request.sent {
  background: #6A4;
}
.data.source.request.sent {
  border-left: 1em solid #6A4;
}

.statusText.exception {
  background: #F98;
}
.data.source.exception {
  border-left: 1em solid #F98;
}

.statusText.Not.Found {
  background: #F98;
}
.data.source.Not.Found {
  border-left: 1em solid #F98;
}

.statusText.Internal.Server.Error {
  background: mediumslateblue;
}
.data.source.Internal.Server.Error {
  border-left: 1em solid mediumslateblue;
}


.statusText.progress.event {
  background: #68A;
}

.statusText.OK {
  background: #AD9;
}

.responseTime.broken {
  background: #F98;
}

.responseTime.slow {
  background: #FC8;
}

.responseTime.fast {
  background: #AD9;
}

.responseTime.very-fast {
  background: #68A;
}

.responseTime.not-started {
  background: #DDD;
}

pre {
  background: #282c34;
  color: white;
}

.data.source {
  border-radius: 0.5em;
  background: #eee;
  padding: 0.5em;
}

</style>
