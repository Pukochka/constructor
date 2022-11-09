<template>
  <div
    ref="button_element"
    class="rounded-borders custom-outline col q-py-sm q-pl-sm q-px-sm row justify-between items-center no-wrap bg-white position-relative"
    :class="{
      reverse: button.connection.reverse,
      'z-max shadow-4': drag_state,
    }"
    :style="{ transform: `translate3d(0, ${transform_value}px , 0)` }"
  >
    <div class="row items-center no-wrap" :class="{ reverse: button.connection.reverse }">
      <q-btn
        dense
        flat
        size="10px"
        color="primary"
        text-color="primary"
        icon="drag_indicator"
        @click="drag_state = !drag_state"
      >
        <q-tooltip anchor="top middle" self="bottom middle">
          Переместить кнопку
        </q-tooltip>
      </q-btn>
    </div>
    <div class="q-px-sm ellipsis absolute-center">{{ button.label }}</div>
    <div
      class="row items-center no-wrap"
      @click="SelectButton"
      :class="{ reverse: button.connection.reverse }"
    >
      <ButtonMenu :block="block" :button="button" />
      <div ref="helper">
        <RouteMenu :block="block" :button="button" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, PropType, ref, watch, computed, onUpdated } from "vue";
import { useSelectStore, useSvgStore } from "../../../stores";
import { useBeizerCurvature, usePolygonPoints } from "../../../helpers";

import ButtonMenu from "./ButtonMenu.vue";
import RouteMenu from "./RouteMenu.vue";

import { Button, Block, Coords } from "../../../types";

const props = defineProps({
  button: Object as PropType<Button>,
  block: Object as PropType<Block>,
  button_container: Element,
});
const store = useSvgStore();
const { UpdateButtonConnectionLine } = useSvgStore();
const { SelectState } = useSelectStore();

const button_element = ref<Element>();
const drag_state = ref<boolean>(false);
const transform_value = ref<number>(0);
const helper = ref<Element>();

const size_of_button = computed(() => button_element.value.getBoundingClientRect());
const scroll_effect_y = computed(() => store.svg.scroll_effect.vertical);
const computed_drag = computed(() => drag_state.value);

const SelectButton = () => {
  SelectState(props.block, "block");
  SelectState(props.button, "button");
};

function DragingButton(e: MouseEvent) {
  transform_value.value =
    e.pageY +
    scroll_effect_y.value -
    size_of_button.value.y -
    size_of_button.value.height / 2;
}

watch(computed_drag, (val) => {
  if (val) document.addEventListener("mousemove", DragingButton, false);
  else document.removeEventListener("mousemove", DragingButton, false);
  if (!val) transform_value.value = 0;
});

onUpdated(() => {
  if (!props.button.connection.coords.start_x) return;
  const { x, y } = helper.value.getBoundingClientRect();

  const start_x =
    x - store.gett.parent.x + store.gett.radius + store.gett.scroll_effect.horizontal;
  const start_y =
    y - store.gett.parent.y + store.gett.radius + store.gett.scroll_effect.vertical;
  const end_x = props.button.connection.coords.end_x;
  const end_y = props.button.connection.coords.end_y;

  const updated_coords: Coords = {
    start_x: start_x,
    start_y: start_y,
    end_x: end_x,
    end_y: end_y,
    path: useBeizerCurvature(start_x, start_y, end_x, end_y),
    polygon: usePolygonPoints(end_x, end_y, start_x),
  };

  UpdateButtonConnectionLine(props.block, props.button, updated_coords);
});
</script>
<style lang="scss">
.drag-active {
  z-index: 100;
}
</style>
