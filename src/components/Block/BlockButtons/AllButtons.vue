<template>
  <div class="row q-col-gutter-sm" ref="button_container">
    <div class="col-12" v-for="(button, index) in block.buttons" :key="index">
      <CButton :button="button" :block="block" :button_container="button_container" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, PropType, ref } from "vue";
import { Block } from "../../../types";
import CButton from "./SingleButton.vue";

const button_container = ref<Element>();
defineProps({
  block: Object as PropType<Block>,
});
</script>
