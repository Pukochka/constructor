<template>
  <div class="row q-col-gutter-sm">
    <div class="col-12" v-for="(button, index) in block.buttons" :key="index">
      <CButton :button="button" :block="block" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { Block } from "../../../types/types";
import CButton from "./SingleButton.vue";

defineProps({
  block: Object as PropType<Block>,
});
</script>
