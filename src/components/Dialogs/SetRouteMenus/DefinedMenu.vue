<template>
  <q-menu fit style="max-height: 400px">
    <q-list>
      <q-item
        class="text-center"
        :class="{
          'bg-blue-4': select_item['id']
            ? item['id'] === select_item['id']
            : item['route'] === select_item['route'],
        }"
        v-for="(item, index) in current.data"
        :key="index"
        @click="emit('select', item)"
        clickable
        v-close-popup
      >
        <q-item-section>{{ item["text"] ?? item["title"] }}</q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>
<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import {
  RoutesSelectCurrent,
  RoutesOptionsStatic,
  RoutesOptionsEdit,
} from "../../../types/types";

defineProps({
  current: Object as PropType<RoutesSelectCurrent>,
  select_item: Object as PropType<RoutesOptionsStatic | RoutesOptionsEdit>,
});

const emit = defineEmits<{
  (e: "select", value): void;
}>();
</script>
