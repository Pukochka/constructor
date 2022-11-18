<template>
  <svg class="connectons-container fit" id="SvgArea"></svg>
</template>
<script lang="ts" setup>
import { computed, watch, onMounted } from "vue";
import { useSvgStore, useDataStore, useSelectStore } from "../../stores";

import { useBeizerCurvature, usePolygonPoints } from "../../helpers";

const store = useSvgStore();
const { MoveCursorFollowing, SetParent } = useSvgStore();
const main = useDataStore();
const select = useSelectStore();

const useCursor = computed(() => store.svg.cursor_path);
const useScrollEffect = computed(() => store.svg.scroll_effect);

const start_x = computed(
  () => store.svg.collections.find((item) => item.id === store.gett.moving_line).start_x
);
const start_y = computed(
  () => store.svg.collections.find((item) => item.id === store.gett.moving_line).start_y
);
const column_id = computed(
  () => store.svg.collections.find((item) => item.id === store.gett.moving_line).column_id
);
const block_id = computed(
  () => store.svg.collections.find((item) => item.id === store.gett.moving_line).block_id
);
const is_reverse = computed(
  () =>
    main.all_commands
      .find((item) => item.id === select.SelectedCommand.id)
      .columns.find((item) => item.id === select.SelectedBlock.column_id)
      .blocks.find((item) => item.id === select.SelectedBlock.id)
      .buttons.find((item) => item.id === select.SelectedButton.id).connection.reverse
);

function FollowingCursor(event: MouseEvent) {
  const { x, y } = event;

  const current_x = x + useScrollEffect.value.horizontal - store.gett.parent.x;
  const current_y = y + useScrollEffect.value.vertical - store.gett.parent.y;

  if (!is_reverse.value && current_x < start_x.value - 169) ChangeReverse(true);
  else if (is_reverse.value && current_x > start_x.value + 169) ChangeReverse(false);

  const assambly = {
    id: store.gett.moving_line,
    column_id: column_id.value,
    block_id: block_id.value,
    position: 0,
    start_x: start_x.value,
    start_y: start_y.value,
    end_x: current_x,
    end_y: current_y,
    path: useBeizerCurvature(
      start_x.value,
      start_y.value,
      current_x,
      current_y,
      is_reverse.value
    ),
    polygon: usePolygonPoints(current_x, current_y, start_x.value, is_reverse.value),
  };

  MoveCursorFollowing(assambly);
}

function ChangeReverse(value: boolean) {
  main.all_commands
    .find((item) => item.id === select.SelectedCommand.id)
    .columns.find((item) => item.id === select.SelectedBlock.column_id)
    .blocks.find((item) => item.id === select.SelectedBlock.id)
    .buttons.find(
      (item) => item.id === select.SelectedButton.id
    ).connection.reverse = value;
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
