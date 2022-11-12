<template>
  <div
    ref="button_element"
    class="rounded-borders custom-outline col q-py-sm q-pl-sm q-px-sm row justify-between items-center no-wrap bg-white position-relative"
    :class="{
      reverse: button.connection.reverse,
      'shadow-4': drag_state,
    }"
    :style="{ transform: `translate3d(0, ${transform_value}px , 0)` }"
  >
    <div class="row items-center no-wrap" :class="{ reverse: button.connection.reverse }">
      <q-icon
        class="cursor-pointer"
        size="16px"
        color="primary"
        text-color="primary"
        name="drag_indicator"
        v-touch-pan.vertical.prevent.mouse="DragingButton"
      >
        <q-tooltip anchor="top middle" self="bottom middle">
          Переместить кнопку
        </q-tooltip>
      </q-icon>
    </div>
    <div class="q-px-sm ellipsis absolute-center">{{ button.label }}</div>
    <div
      class="row items-center no-wrap"
      @click="SelectButton"
      :class="{ reverse: button.connection.reverse }"
    >
      <ButtonMenu :block="block" :button="button" />

      <RouteMenu :block="block" :button="button" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, PropType, ref, onUpdated } from "vue";
import { useSelectStore, useSvgStore } from "../../../stores";

import ButtonMenu from "./ButtonMenu.vue";
import RouteMenu from "./RouteMenu.vue";

import { Button, Block, Coords } from "../../../types";

const props = defineProps({
  button: Object as PropType<Button>,
  block: Object as PropType<Block>,
  button_container: Element,
});
const { UpdateButtonConnectionLine, AccountAssambly } = useSvgStore();

const { SelectState } = useSelectStore();

const button_element = ref<Element>();

const drag_state = ref<boolean>(false);
const transform_value = ref<number>(0);

const SelectButton = () => {
  SelectState(props.block, "block");
  SelectState(props.button, "button");
};

function DragingButton({ e, ...custom }) {
  const { top, bottom } = props.button_container.getBoundingClientRect();
  const { direction, distance, isFinal, position } = custom;
  console.log(e);
  if (isFinal) transform_value.value = 0;
  else if (top > position.top || bottom < position.top) return;
  else if (direction === "up") transform_value.value = -distance.y;
  else if (direction === "down") transform_value.value = distance.y;
}

onUpdated(() => {
  if (!props.button.connection.coords.start_x) return;
  const updated_coords: Coords = AccountAssambly(props.button);

  UpdateButtonConnectionLine(props.block, props.button, updated_coords);
});
</script>
<style lang="scss">
.drag-active {
  z-index: 100;
}
</style>
