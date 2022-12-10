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
    <q-btn
      flat
      class="q-ml-sm"
      padding="2px 4px"
      text-color="primary"
      icon="chat_bubble"
      label="Тестировать"
      :loading="loading"
      @click="ToTest"
    />
    <q-btn
      flat
      class="q-ml-sm"
      padding="2px 4px"
      text-color="primary"
      label="Обратная связь"
      @click="state.ChangeVisibilityDialogs(true, 'edit_feed_back')"
    />
    <q-btn
      flat
      class="q-ml-sm"
      padding="2px 4px"
      text-color="primary"
      label="Изображение"
      @click="state.ChangeVisibilityDialogs(true, 'edit_image')"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useDataStore, useStatesStore, useTestStore, useVectorStore } from "../stores";
import CONFIG from "../../botconfig";
import { useUpdateLines } from "../helpers";

const main = useDataStore();
const vector = useVectorStore();
const state = useStatesStore();
const test = useTestStore();

const loading = ref<boolean>(false);

const BackToSelect = () => {
  let id: number;
  for (const [key, value] of Array.from(new URLSearchParams(window.location.search))) {
    if (key == "bot_id") id = Number(value);
  }
  window.history.replaceState(null, document.title, `route?bot_id=${id}`);
  main.ChangeTemplate("select");
  vector.buttons = [];
};

const ToTest = () => {
  loading.value = true;
  test.FirstMessage();
  test.ConnectedMessages();
  setTimeout(() => {
    loading.value = false;
    state.ChangeVisibilityDialogs(true, "test_constructor");
  }, 500);
};
</script>
<style lang="scss">
.mw-300 {
  max-width: 300px !important;
}
</style>
