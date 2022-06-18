<template>
  <p class="todo">
    <b>TODO:</b>
    <slot />
  </p>
</template>

<style scoped>
.todo {
  border-left: 1em solid green;
  border-radius: 0.5em;
  background: #eee;
  padding: 0.5em;
}
</style>
