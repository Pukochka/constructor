<template>
  <div
    ref="button_element"
    class="rounded-borders custom-outline col q-py-sm q-pl-sm q-px-sm row justify-between items-center no-wrap bg-white position-relative q-mt-sm"
    :class="{
      reverse: is_reverse,
      'shadow-4': drag_state,
    }"
    :style="{ transform: `translate3d(0, ${transform_value}px , 0)` }"
  >
    <q-tooltip anchor="top middle" self="bottom middle" v-if="button.type === 6">
      Добавите путь, чтобы кнопка была активна
    </q-tooltip>
    <q-badge rounded color="orange" label="Нет пути" v-if="button.type === 6" />
    <div class=""></div>
    <div class="q-px-sm ellipsis absolute-center">{{ button.data.text }}</div>
    <div
      class="row items-center no-wrap"
      @click="SelectButton"
      :class="{ reverse: is_reverse }"
    >
      <ButtonMenu :message="message" :button="button" />

      <RouteMenu :message="message" :button="button" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, PropType, ref, computed } from "vue";
import { useSelectStore, useVectorStore } from "../../../stores";

import ButtonMenu from "./ButtonMenu.vue";
import RouteMenu from "./RouteMenu.vue";

import { MessageInstance, InlineMenuButtonInstance } from "../../../types";

const props = defineProps({
  message: Object as PropType<MessageInstance>,
  button: Object as PropType<InlineMenuButtonInstance>,
});

const vector = useVectorStore();
const select = useSelectStore();

const is_reverse = computed(
  () => vector.VectorLines.find((item) => item.id === props.button.id)?.line?.reverse
);

const button_element = ref<Element>();
const drag_state = ref<boolean>(false);
const transform_value = ref<number>(0);

const SelectButton = () => {
  select.SelectState(props.message, "message");
  select.SelectState(props.button, "button");
};
</script>
<style lang="scss">
.drag-active {
  z-index: 100;
}
</style>
