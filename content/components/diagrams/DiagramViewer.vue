<template>
  <div :class="fullscreenClass">
    <pan-and-zoom @apiReady="registerPanAndZoomApi">
      <slot>
        <svg width="300px" height="300px">
          <circle
            cx="150"
            cy="150"
            r="100"
            fill="blue"
          />
        </svg>
      </slot>
    </pan-and-zoom>
    <div class="action-icons">
      <div @click="fitDiagram">
        <icon
          icon="expand-alt"
          class="fit icon-button"
          title="Fit diagram content"
        />
      </div>
      <div
        v-if="!fullscreen"
        @click="goFullscreen"
      >
        <icon
          icon="expand"
          class="fit icon-button"
          title="Go fullscreen"
        />
      </div>
      <div
        v-if="fullscreen"
        @click="exitFullscreen"
      >
        <icon
          icon="compress"
          class="fit icon-button"
          title="Exit fullscreen"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PanAndZoom from './PanAndZoom.vue'

export default {
  components: {
    PanAndZoom
  },
  data() {
    return {
      panAndZoom: false,
      fullscreen: false
    }
  },
  computed: {
    fullscreenClass() {
      return this.fullscreen ? 'diagram-maker fullscreen' : 'diagram-maker not-fullscreen'
    }
  },
  methods: {
    registerPanAndZoomApi(api) {
      this.panAndZoom = api
    },
    fitDiagram() {
      const { panAndZoom } = this
      panAndZoom.reset()
    },
    goFullscreen() {
      this.fullscreen = true
    },
    exitFullscreen() {
      this.fullscreen = false
      this.fitDiagram()
    }
  }
}
</script>

<style scoped>
.diagram-maker {
  position: relative;
  display: flex;
  height: 480px;
  justify-content: stretch;
  align-items: stretch;
  border: 2px solid #ddd;
}
.diagram-maker:hover {
  border: 2px solid #ccc;
}
.diagram-maker:active {
  border: 2px solid rgb(141, 175, 189);
}
.diagram-maker.fullscreen {
  position: fixed;
  background: white;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
}
pre, code {
  color: white;
}
.action-icons {
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 5px;
  right: 5px;
}
.icon-button {
  margin: 5px;
  padding: 10px;
  font-size: 20px;
  background: #fff;
  border-radius: 5px;
  outline: 1px solid #ccc;
  outline-offset: -1px;
  box-shadow: 1px 1px 4px rgba(0,0,0,0.2);
  color: #999;
}
.icon-button:hover {
  outline: 1px solid #ddd;
  background: #fafafa;
  color: #333;
}
.icon-button:active {
  outline: 1px solid #ddd;
  background: #fff;
  color: #000;
}
</style>

<style>
.diagram-maker table {
  background: white;
}
.diagram-maker td {
  white-space: nowrap;
}
.theme-default-content:not(.custom) img {
  max-width: 740px;
}
</style>
