<template>
  <div class="card boundary">
    <h3 v-if="title">
      {{ title }}
    </h3>
    <slot>
      <p>No card content</p>
      <p>Correct usage:</p>
      <pre>&lt;card title="Title"&gt;Content&lt;/card&gt;</pre>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
div.card.boundary {
  font-family: "Nunito Sans", Helvetica, sans-serif;
  border: 2px solid #eee;
  border-radius: 0.5em;
  padding: 0.5em 1em 0.5em 1em;
  margin: 0 0 0.5em 0;
  background: #FEFEFE;
}
</style>
