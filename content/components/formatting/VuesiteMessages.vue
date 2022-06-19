<template>
  <div class="messages">
    <p v-for="(message, i) in messages" :key="`cell-${message}-${i}`">
      <span v-if="Array.isArray(message)" class="nested">
        <div v-for="(m, idx) in message" :key="`line-${m}-${idx}`" class="line">{{ m }}</div>
      </span>
      <span v-else class="single">{{ message }}</span>
    </p>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
div.messages > p {
  line-height: 1.0em;
  margin: 0.6em 0; 
}
div.line {
  margin: 0.5em 0;
  height: 1em;
}
</style>
