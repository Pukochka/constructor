<template>
  <div
    ref="button_element"
    class="rounded-borders custom-outline col q-py-sm q-pl-sm q-px-sm row justify-between items-center no-wrap bg-white position-relative q-mt-sm"
    :class="{
      reverse: false,
      'shadow-4': drag_state,
    }"
    :style="{ transform: `translate3d(0, ${transform_value}px , 0)` }"
  >
    <q-tooltip anchor="top middle" self="bottom middle" v-if="button.type === 6">
      Добавите путь, чтобы кнопка была активна
    </q-tooltip>
    <q-badge rounded color="orange" label="Нет пути" v-if="button.type === 6" />
    <div class="row items-center no-wrap" :class="{ reverse: false }">
      <!-- <q-icon
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
      </q-icon> -->
    </div>
    <div class="q-px-sm ellipsis absolute-center">{{ button.data.text }}</div>
    <div
      class="row items-center no-wrap"
      @click="SelectButton"
      :class="{ reverse: false }"
    >
      <ButtonMenu :message="message" :button="button" />

      <RouteMenu :message="message" :button="button" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, PropType, ref /*, onUpdated , computed */ } from "vue";
import { useSelectStore /*, useSvgStore , useDataStore*/ } from "../../../stores";

import ButtonMenu from "./ButtonMenu.vue";
import RouteMenu from "./RouteMenu.vue";

import { MessageInstance, InlineMenuButtonInstance } from "../../../types";

const props = defineProps({
  message: Object as PropType<MessageInstance>,
  button: Object as PropType<InlineMenuButtonInstance>,
  button_container: Element,
});
// const main = useDataStore();
// const select = useSelectStore();
// const { UpdateButtonConnectionLine, AccountAssambly } = useSvgStore();

const { SelectState } = useSelectStore();

// const is_reverse = computed(
//   () =>
//     main.all_commands
//       .find((item) => item.id === select.SelectedCommand.id)
//       .columns.find((item) => item.id === props.block.column_id)
//       .blocks.find((item) => item.id === props.block.id)
//       .buttons.find((item) => item.id === props.button.id).connection.reverse
// );

const button_element = ref<Element>();

const drag_state = ref<boolean>(false);
const transform_value = ref<number>(0);

const SelectButton = () => {
  SelectState(props.message, "message");
  SelectState(props.button, "button");
};

// function DragingButton({ e, ...custom }) {
//   const { top, bottom } = props.button_container.getBoundingClientRect();
//   const { direction, distance, isFinal, position } = custom;
//   console.log(e);
//   if (isFinal) transform_value.value = 0;
//   else if (top > position.top || bottom < position.top) return;
//   else if (direction === "up") transform_value.value = -distance.y;
//   else if (direction === "down") transform_value.value = distance.y;
// }

// onUpdated(() => {
//   if (false) {
//     const updated_coords = AccountAssambly(props.button);

//     UpdateButtonConnectionLine(updated_coords);
//   }
// });
</script>
<style lang="scss">
.drag-active {
  z-index: 100;
}
</style>
