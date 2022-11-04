<template>
  <q-item clickable class="q-pa-none">
    <div class="rounded-borders custom-outline fit">
      <div class="q-pa-md flex items-center">
        <q-icon name="image" size="20px" />
        <div class="q-pl-sm text-subtitle1">Изображение</div>
      </div>
      <q-separator />
      <div class="full-width relative-position" style="height: 200px">
        <div
          class="image-type fit"
          :style="{ 'background-image': `url(${block.options})` }"
        ></div>
      </div>
    </div>
  </q-item>
</template>
<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import { Block } from "../../../types/types";

defineProps({
  block: Object as PropType<Block>,
});
</script>
