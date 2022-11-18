<template>
  <!-- <q-tab-panels v-model="store.SelectedReplics" animated>
    <q-tab-panel name="all" class="q-pa-none">
      <div class="q-pl-md q-py-lg flex items-center justify-between">
        <div class="flex items-center text-h5">
          <div class="">Реплика бота</div>
        </div>
        <q-btn
          color="primary"
          flat
          round
          icon="close"
          dense
          @click="ChangeVisibilityDialogs(false, 'add_block')"
        />
      </div>
      <q-list class="text-subtitle1" separator>
        <q-item
          clickable
          v-ripple
          class="items-center rounded-borders"
          @click="SelectType(0)"
        >
          <q-icon name="text_fields" />
          <div class="q-pl-sm">Текст</div>
        </q-item>
        <q-item
          clickable
          v-ripple
          class="items-center rounded-borders"
          @click="SelectType(1)"
        >
          <q-icon name="image" />
          <div class="q-pl-sm">Изображение</div>
        </q-item>
      </q-list>
    </q-tab-panel>
    <q-tab-panel name="text" class="q-pa-none">
      <TextReplic dialog_name="add_block" />
    </q-tab-panel>
    <q-tab-panel name="image" class="q-pa-none">
      <ImageReplic dialog_name="add_block" />
    </q-tab-panel>
  </q-tab-panels> -->
  <div class="q-pl-md q-py-lg flex items-center justify-between">
    <div class="flex items-center text-h5">
      <div class="">Выберите тип сообщения</div>
    </div>
    <q-btn color="primary" flat round icon="close" dense v-close-popup />
  </div>
  <q-list class="text-subtitle1 q-mb-sm" separator>
    <q-item
      clickable
      v-ripple
      class="items-center rounded-borders"
      :class="{ 'bg-primary text-white': select_type.id == item.id }"
      @click="select_type = item"
      v-for="item in main.AllTypes"
      :key="item.id"
    >
      <div class="q-pl-sm">{{ item.title }}</div>
    </q-item>
  </q-list>
  <div class="q-pt-md row q-gutter-x-sm justify-end">
    <q-btn
      class="q-px-md"
      flat
      dense
      rounded
      label="Отмена"
      color="primary"
      v-close-popup
    />
    <q-btn
      class="q-px-md"
      dense
      unelevated
      rounded
      label="Добавить"
      color="primary"
      @click="AddMessage"
      :loading="state.Loadings.column['add-message-in-column']"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { MessageTypes } from "../../types";
import { useSelectStore, useStatesStore, useDataStore } from "../../stores";

import { GetColumns } from "../../api";

// import TextReplic from "./BotReplics/TextReplic.vue";
// import ImageReplic from "./BotReplics/ImageReplic.vue";
const main = useDataStore();
const state = useStatesStore();
const select = useSelectStore();

const { ChangeVisibilityDialogs } = useStatesStore();

// const store = useSelectStore();

const select_type = ref<MessageTypes>({
  id: 0,
  title: "",
});

const AddMessage = () => {
  if (!main.IsColumn) {
    GetColumns("add-message-in-column", {
      route_id: main.SELECT_ROUTE.id,
      column_id: select.SelectedColumn.id,
      message_type: select_type.value.id,
    }).then((res) => {
      main.ChangeSelectRoute(res.data, "add-message-in-column");
      ChangeVisibilityDialogs(false, "add_message");
    });
  }
  // else{
  //   GetColumns("add-message-with-column", { route_id: 0, message_type: 0 });
  // }
};
</script>
<style lang="scss"></style>
