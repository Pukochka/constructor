<template>
  <svg class="connectons-container fit" :class="{ 'z-max': useCursor }" id="SvgArea">
    <g v-for="(item, index) in store.gett.collections" :key="index">
      <circle
        stroke="transparent"
        fill="transparent"
        :cx="item.start_x"
        :cy="item.start_y"
        :r="store.gett.radius"
      />
      <path
        class="line"
        v-if="item.action"
        stroke-width="1"
        :d="item.path.beizer_curve"
        fill="transparent"
      />
      <polygon
        class="arrow"
        v-if="item.action"
        :points="item.polygon_points"
        stroke-width="1"
      />
    </g>
  </svg>
</template>
<script lang="ts" setup>
import { computed, watch, ref, onMounted } from "vue";
import { useSvgStore } from "../../stores/index";

import { useBeizerCurvature, usePolygonPoints } from "../../helpers";

const store = useSvgStore();
const { MoveCursorFollowing } = useSvgStore();
const useCursor = computed(() => store.svg.cursor_path);

const start_x = computed(
  () =>
    store.gett.collections.find((item) => item.button_id === store.gett.moving_line)
      .start_x
);
const start_y = computed(
  () =>
    store.gett.collections.find((item) => item.button_id === store.gett.moving_line)
      .start_y
);

const parent = ref<DOMRect>();

onMounted(
  () => (parent.value = document.getElementById("SvgArea").getBoundingClientRect())
);

function FollowingCursor(event: MouseEvent) {
  const { offsetX, offsetY } = event;

  const current_x = offsetX;
  const current_y = offsetY;

  const polygon_points = usePolygonPoints(current_x, current_y);

  const beizerCurvature = useBeizerCurvature(
    start_x.value,
    start_y.value,
    offsetX,
    offsetY
  );

  MoveCursorFollowing(store.svg.moving_line, beizerCurvature, polygon_points);
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
.line,
.arrow {
  stroke: $grey-5;
}
.arrow {
  fill: $grey-5;
}
</style>
