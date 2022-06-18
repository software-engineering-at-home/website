<template>
  <div class="icon browser">
    <formatting-VuesitePaginatedItems :items="iconList">          
      <template #default="{ paginatedItems }">
        <div class="row">
          <div class="column">
            <p v-for="[iconKey, icon] in paginatedItems.slice(0, 10)" :key="iconKey" :title="`${iconKey} ${icon.iconName}`">
              <icon :icon="icon.iconName" class="double-size" />
              <b>{{ icon.iconName }}</b>
            </p>
          </div>
          <div class="column">
            <p v-for="[iconKey, icon] in paginatedItems.slice(10, 20)" :key="iconKey" :title="`${iconKey} ${icon.iconName}`">
              <icon :icon="icon.iconName" class="double-size" />
              <b>{{ icon.iconName }}</b>
            </p>
          </div>
        </div>
      </template>
    </formatting-VuesitePaginatedItems>
  </div>
</template>

<script>
import { fas } from '@fortawesome/free-solid-svg-icons'
import Icon from '../Icon.vue'

export default {
  components: { Icon },
  computed: {
    iconList() {
      return Object.entries(fas)
    }
  }
}
</script>

<style scoped>
.icon.browser p {
  display: flex;
  justify-content: start;
  align-items: center;
}
.icon.browser p > div {
  font-size: 2em;
  width: 1.2em;
  height: 1.2em;
}
.icon.browser p > b {
  margin: 0 0.5em;
}
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
.column {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
}
</style>
