<template>
  <svg class="connectons-container fit" id="SvgArea"></svg>
</template>
<script lang="ts" setup>
import { computed, watch, onMounted } from "vue";
import { useSvgStore, useMainStore, useSelectStore } from "../../stores";

import { useBeizerCurvature, usePolygonPoints } from "../../helpers";

const store = useSvgStore();
const main = useMainStore();
const select = useSelectStore();
const { MoveCursorFollowing, SetParent } = useSvgStore();

const useCursor = computed(() => store.svg.cursor_path);
const useScrollEffect = computed(() => store.svg.scroll_effect);

const start_x = computed(
  () =>
    main.all_commands
      .find((item) => item.id === select.SelectedCommand.id)
      .columns.find((item) => item.id === select.SelectedBlock.column_id)
      .blocks.find((item) => item.id === select.SelectedBlock.id)
      .buttons.find((item) => item.id === select.SelectedButton.id).connection.coords
      .start_x
);
const start_y = computed(
  () =>
    main.all_commands
      .find((item) => item.id === select.SelectedCommand.id)
      .columns.find((item) => item.id === select.SelectedBlock.column_id)
      .blocks.find((item) => item.id === select.SelectedBlock.id)
      .buttons.find((item) => item.id === select.SelectedButton.id).connection.coords
      .start_y
);
function FollowingCursor(event: MouseEvent) {
  const { x, y } = event;
  const current_x = x + useScrollEffect.value.horizontal - store.gett.parent.x;
  const current_y = y + useScrollEffect.value.vertical - store.gett.parent.y;
  const assambly = {
    start_x: start_x.value,
    start_y: start_y.value,
    path: useBeizerCurvature(start_x.value, start_y.value, current_x, current_y),
    polygon: usePolygonPoints(current_x, current_y, start_x.value),
  };

  MoveCursorFollowing(assambly);
}

watch(useCursor, (val) => {
  if (val) document.addEventListener("mousemove", FollowingCursor, false);
  else document.removeEventListener("mousemove", FollowingCursor, false);
});

onMounted(() => {
  SetParent(document.getElementById("SvgArea").getBoundingClientRect());
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
