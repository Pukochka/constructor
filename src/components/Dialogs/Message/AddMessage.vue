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
      <div class="row q-col-gutter-sm q-my-md">
        <div class="col-6 col-sm-4" v-for="item in main.AllTypes" :key="item.id">
          <q-item
            clickable
            v-ripple
            class="column items-center justify-center text-center rounded-borders no-padding"
            :class="{ 'bg-primary text-white': select_type.id == item.id }"
            style="height: 70px"
            @click="select_type = Object.assign({}, item)"
          >
            <q-icon :name="icons[item.id]" size="20px" />
            <div class="">{{ item.title }}</div>
          </q-item>
        </div>
      </div>
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

const icons = ["text_fields", "image", "forum", "description", "movie", "gif_box"]; // ПЕРЕДЕЛАТЬ

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
