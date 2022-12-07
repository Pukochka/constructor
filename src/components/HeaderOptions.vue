<template>
  <div class="q-px-md flex items-center" id="header" style="height: 50px">
    <q-btn
      padding="2px 4px"
      no-caps
      text-color="primary"
      label="Все маршруты"
      flat
      @click="BackToSelect"
    />
    <q-btn
      class="q-ml-sm"
      padding="2px 4px"
      no-caps
      text-color="primary"
      label="Премиум настройки"
      :href="`/lk/common/main/redirect?bot_id=${CONFIG.BOT.id}`"
      flat
    />

    <q-btn
      class="q-ml-sm"
      padding="2px 4px"
      color="white"
      no-caps
      flat
      text-color="primary"
      icon="refresh"
      @click="useUpdateLines(false)"
    >
      <q-tooltip anchor="top middle" self="bottom middle" max-width="200px">
        Используйте эту кнопку, если линии отображены некорректно
      </q-tooltip>
    </q-btn>
    <q-btn
      flat
      class="q-ml-sm"
      padding="2px 4px"
      no-caps
      text-color="primary"
      icon="add"
      :disable="vector.Scale >= 1"
      @click="vector.IncreaseScale"
    />
    <q-btn
      flat
      class="q-ml-sm"
      padding="2px 4px"
      no-caps
      text-color="primary"
      icon="remove"
      :disable="vector.Scale <= 0.7"
      @click="vector.DecreaseScale"
    />
  </div>
</template>
<script setup lang="ts">
import { useDataStore, useVectorStore } from "../stores";
import CONFIG from "../../botconfig";
import { useUpdateLines } from "../helpers";
const main = useDataStore();
const vector = useVectorStore();

const BackToSelect = () => {
  let id: number;
  for (const [key, value] of Array.from(new URLSearchParams(window.location.search))) {
    if (key == "bot_id") id = Number(value);
  }
  window.history.replaceState(null, document.title, `route?bot_id=${id}`);
  main.ChangeTemplate("select");
  vector.buttons = [];
};
</script>
<style lang="scss">
.mw-300 {
  max-width: 300px !important;
}
</style>
