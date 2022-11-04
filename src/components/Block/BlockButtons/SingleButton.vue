<template>
  <div
    class="rounded-borders custom-outline col q-py-sm q-pl-sm q-px-sm flex justify-between items-center no-wrap"
  >
    <div class="ellipsis">{{ button.label }}</div>
    <div class="flex items-center no-wrap" @click="SelectButton">
      <ButtonMenu :block="block" :button="button" />
      <RouteMenu :block="block" :button="button" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { useSelectStore } from "../../../stores/index";

import ButtonMenu from "./ButtonMenu.vue";
import RouteMenu from "./RouteMenu.vue";

import { Button, Block } from "../../../types/types";

const { SelectState } = useSelectStore();

const props = defineProps({
  button: Object as PropType<Button>,
  block: Object as PropType<Block>,
});

const SelectButton = () => {
  SelectState(props.block, "block");
  SelectState(props.button, "button");
};
</script>
