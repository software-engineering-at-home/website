<template>
  <div class="icon wrapper">
    <font-awesome-icon :icon="icon" />
  </div>
</template>

<script>
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)
Vue.component('FontAwesomeIcon', FontAwesomeIcon)
Vue.config.productionTip = false

export default {
  props: {
    icon: {
      type: String,
      default: 'user-secret'
    }
  }
}

</script>

<style scoped>
.icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 1.5em;
  height: 1.5em;
  text-align: center;
  vertical-align: middle;
  user-select: none;
}
</style>
