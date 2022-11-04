<template>
  <q-menu fit style="max-height: 400px">
    <q-scroll-area style="height: 400px">
      <q-list>
        <q-item
          class="text-center"
          :class="{ 'bg-blue-4': false }"
          v-for="(item, index) in Routes"
          :key="index"
          clickable
          @click="emit('select', item)"
          v-close-popup
        >
          <q-item-section>{{ item.text }}</q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-menu>
</template>
<script lang="ts" setup>
import { Routes } from "../../../data/Routes";
// import { MainRoutes } from "../../../types/types";

const emit = defineEmits<{
  (e: "select", value): void;
}>();
</script>
