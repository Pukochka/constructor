<template>
  <q-item
    clickable
    v-ripple="false"
    class="rounded-borders custom-outline non-selectable"
  >
    <div class="col-12">
      <div class="q-px-sm q-pt-sm flex items-center">
        <q-icon name="text_fields" />

        <div class="q-ml-sm">Текст</div>
      </div>
      <div class="q-pa-md">{{ block.options }}</div>
    </div>
  </q-item>
</template>
<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { Block } from "../../../types";

defineProps({
  block: Object as PropType<Block>,
});
</script>
