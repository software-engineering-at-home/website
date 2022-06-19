<template>
  <g :transform="`translate(${x} ${y})`">
    <rect
      v-if="stacked"
      :x="boxPadding/2"
      :y="boxPadding/2"
      :width="boxWidth"
      :height="boxHeight"
      :rx="boxPadding * 0.75"
      stroke="black"
      stroke-width="1"
      opacity="0.8"
      :fill="fillColor"
    />
    <rect
      :x="0"
      :y="0"
      :width="boxWidth"
      :height="boxHeight"
      :rx="boxPadding * 0.75"
      stroke="black"
      stroke-width="1"
      :fill="fillColor"
    />
    <circle
      :cx="boxPadding"
      :cy="boxPadding"
      r="30"
      stroke="black"
      stroke-width="1"
      :fill="fillColor"
    />
    <foreignObject
      :x="boxPadding-25"
      :y="boxPadding-25"
      width="50"
      height="50"
    >
      <div class="fo" xmlns="http://www.w3.org/1999/xhtml">
        <icon
          :icon="icon"
          class="server icon"
        />
      </div>
    </foreignObject>
    <foreignObject
      x="0"
      y="0"
      :width="boxWidth"
      :height="boxHeight"
    >
      <div
        class="fo contents"
        xmlns="http://www.w3.org/1999/xhtml"
      >
        <label v-if="label">{{ label }}</label>
        <slot />
      </div>
    </foreignObject>
  </g>
</template>

<script>
export default {
  props: {
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    boxWidth: {
      type: Number,
      default: 200
    },
    boxHeight: {
      type: Number,
      default: 100
    },
    boxPadding: {
      type: Number,
      default: 20
    },
    label: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'server'
    },
    stacked: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    fillColor() {
      return this.color || '#DDD'
    }
  }
}
</script>

<style scoped>
.fo {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.fo.contents {
  color: black;
  justify-content: space-evenly;
  align-content: center;
}
.fo.contents > label {
  color: white;
  text-align: center;
  font-weight: bold;
}
.server.icon {
  font-size: 25px;
  color: white;
  text-shadow: 1px 1px 2px black;
}
</style>
