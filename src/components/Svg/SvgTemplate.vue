<template>
  <svg class="connectons-container fit" id="SvgArea">
    <g stroke="green" fill="white" stroke-width="6">
      <circle
        v-for="(item, index) in store.SvgView.circle.circles"
        :key="index"
        :cx="item.x"
        :cy="item.y"
        :r="store.SvgView.circle.radius"
      />

      <line
        v-for="(item, index) in store.SvgView.g_lines"
        :key="index"
        :x1="item.start_x"
        :y1="item.start_y"
        :x2="item.now_x"
        :y2="item.now_y"
        stroke-width="2"
      />
    </g>
  </svg>
</template>
<script lang="ts" setup>
import { computed, watch, ref } from "vue";
import { useSvgStore } from "../../stores/index";

const store = useSvgStore();
const { MoveCursorFollowing } = useSvgStore();
const useCursor = computed(() => store.svg.cursor_path);

const cursor_data = ref({
  x: null,
  y: null,
});

function FollowingCursor(event: MouseEvent) {
  const { offsetX, offsetY } = event;
  cursor_data.value = {
    x: offsetX,
    y: offsetY,
  };
  MoveCursorFollowing(store.svg.moving_line, offsetX, offsetY);
}

watch(useCursor, (val) => {
  if (val) document.addEventListener("mousemove", FollowingCursor, false);
  else document.removeEventListener("mousemove", FollowingCursor, false);
});
</script>
<style lang="scss">
.connectons-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: block;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  overflow: visible;
}
</style>
