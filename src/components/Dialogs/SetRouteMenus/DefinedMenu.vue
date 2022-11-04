<template>
  <q-menu fit style="max-height: 400px">
    <q-scroll-area style="height: 400px">
      <q-list>
        <q-item
          class="text-center"
          :class="{ 'bg-blue-4': false }"
          v-for="(item, index) in current.data"
          :key="index"
          @click="emit('select', item)"
          clickable
          v-close-popup
        >
          <q-item-section>{{ item["text"] ?? item["title"] }}</q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-menu>
</template>
<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import { RoutesSelectCurrent } from "../../../types/types";

defineProps({ current: Object as PropType<RoutesSelectCurrent> });

const emit = defineEmits<{
  (e: "select", value): void;
}>();
</script>
