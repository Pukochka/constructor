<template>
  <q-menu fit style="max-height: 400px">
    <q-list>
      <q-item
        class="text-center"
        :class="{ 'bg-blue-4': item.value === select_item.value }"
        v-for="(item, index) in CONFIG.WEBS"
        :key="index"
        clickable
        @click="emit('select', item)"
        v-close-popup
      >
        <q-item-section>{{ item.text }}</q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>
<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import CONFIG from "../../../../../botconfig";
import { WebsRoute } from "../../../../types";

defineProps({
  select_item: Object as PropType<WebsRoute>,
});

const emit = defineEmits<{
  (e: "select", value): void;
}>();
</script>
