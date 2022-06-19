<template>
  <div class="collapsed boundary">
    <h4
      class="collapsed banner"
      :title="statefulTitle"
      @click="toggleState()"
    >
      <slot name="title">
        <span>{{ title || 'Click to expand' }}</span>
      </slot>
      <span class="click-to-expand">
        <label>{{ statefulInstruction }}</label>
        <icon :icon="icon" />
      </span>
    </h4>
    <slot name="banner" />
    <div :class="['collapsed body', statefulClass].join(' ')">
      <slot>
        <p>No collapsed content</p>
        <p>Correct usage:</p>
        <pre>&lt;collapsed title="Title"&gt;Content&lt;/collapsed&gt;</pre>
      </slot>
    </div>
  </div>
</template>

<script>

const state = {
  OPEN: true,
  CLOSED: false
}

export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {
      state: state.CLOSED 
    }
  },
  computed: {
    icon() {
      return this.state === state.OPEN ? 'angle-up' : 'angle-down'
    },
    statefulClass() {
      return this.state === state.OPEN ? 'open' : 'closed'
    },
    statefulTitle() {
      return this.state === state.OPEN ? 'Collapse this content' : 'Expand this content'
    },
    statefulInstruction() {
      return this.state === state.OPEN ? 'Collapse' : 'Expand'
    }
  },
  methods: {
    toggleState() {
      this.state = !this.state
    }
  }
}
</script>

<style scoped>
div.collapsed.boundary {
  font-family: "Nunito Sans", Helvetica, sans-serif;
  border: 2px solid #eee;
  padding: 0;
  margin: 0.5em -0.2em 0.5em -0.2em;
  background: #FEFEFE;
}
h4.collapsed.banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: 0;
  padding: 0.5em;
  background: #EEE;
}
h4.collapsed.banner:hover {
  background: #F2F2F2;
}
div.collapsed.body {
  padding: 0 0.5em 0 0.5em;
}
div.collapsed.body.open {
  display: block;
}
div.collapsed.body.closed {
  display: none;
}
.click-to-expand {
  display: flex;
  color: #CCC;
  vertical-align: middle;
}
.click-to-expand > label {
  font-size: 0.8em;
  margin-right: 0.5em;
}
.icon {
  cursor: default;
}
</style>
