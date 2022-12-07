<template>
  <q-dialog
    v-model="state.Dialogs.add_message"
    position="top"
    persistent
    @keydown="EnterDown"
  >
    <q-card class="q-px-md q-pb-md" style="width: 50%">
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
          :loading="loading_add"
        />
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref, onUpdated } from "vue";
import { MessageTypes } from "../../../types";
import { useSelectStore, useStatesStore, useDataStore } from "../../../stores";

import { GetColumns } from "../../../api";

const main = useDataStore();
const state = useStatesStore();
const select = useSelectStore();

const loading_add = ref<boolean>(false);

const EnterDown = (evt: KeyboardEvent) => {
  if (evt.key === "Enter") AddMessage();
};

const select_type = ref<MessageTypes>({
  id: 0,
  title: "",
});

const AddMessage = () => {
  loading_add.value = true;
  if (!main.IsColumn) {
    GetColumns("add-message-in-column", {
      route_id: main.SELECT_ROUTE.id,
      column_id: select.SelectedColumn.id,
      message_type: select_type.value.id,
    }).then((res) => {
      loading_add.value = false;
      main.SetSelectRoute(res.data);
      state.ChangeVisibilityDialogs(false, "add_message");
    });
  } else {
    GetColumns("create", {
      route_id: main.SELECT_ROUTE.id,
      type: select_type.value.id,
    }).then((res) => {
      loading_add.value = false;
      main.SetSelectRoute(res.data);
      state.ChangeVisibilityDialogs(false, "add_message");
    });
  }
};

onUpdated(() => (select_type.value.id = 0));
</script>
<style lang="scss"></style>
