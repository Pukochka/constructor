<template>
  <q-dialog
    v-model="state.Dialogs.add_route_with_column"
    position="top"
    persistent
    @keydown="EnterDown"
  >
    <q-card style="width: 50%" class="q-pa-md">
      <div class="q-pb-sm">
        <div class="row justify-between items-center">
          <div class="text-h5">Добавление нового маршрута</div>
          <q-btn color="primary" flat round icon="close" dense v-close-popup />
        </div>

        <div class="text-caption text-grey">Название не должно повторяться</div>
        <q-input
          autofocus
          outlined
          v-model="text.value"
          label="Название нового маршрута"
          :rules="[() => text.required() || 'Введено неверное количество символов']"
        />
        <div class="text-h5 q-py-sm">Тип первого сообщения</div>
        <div class="row q-col-gutter-sm">
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
      </div>

      <div class="row q-gutter-sm justify-end">
        <q-btn
          class="q-px-md"
          dense
          rounded
          flat
          label="Отмена"
          color="primary"
          v-close-popup
        />
        <q-btn
          class="q-px-md"
          dense
          unelevated
          :disable="!text.required()"
          rounded
          label="Добавить"
          color="primary"
          :loading="loading"
          @click="AddRoute"
        />
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref, onUpdated } from "vue";
import { useStatesStore, useDataStore, useErrorStore } from "../../../stores";
import { TextInput, MessageTypes } from "../../../types";
import { GetRoutes } from "../../../api";

const state = useStatesStore();
const main = useDataStore();
const error = useErrorStore();

const loading = ref<boolean>(false);

const select_type = ref<MessageTypes>({
  id: 0,
  title: "",
});

const icons = ["text_fields", "image", "forum", "description", "movie", "gif_box"]; // ПЕРЕДЕЛАТЬ

const text = ref<TextInput>({
  value: "",
  max: 100,
  min: 1,
  required() {
    return this.max > this.value.length && this.min < this.value.length;
  },
});

const EnterDown = (evt: KeyboardEvent) => {
  if (evt.key === "Enter" && text.value.required()) AddRoute();
};

const AddRoute = () => {
  loading.value = true;
  GetRoutes("create-with-column", {
    message: text.value.value,
    message_type: select_type.value.id,
  }).then((res) => {
    if (!res.data.result) error.handleErrorRes(res.data.message);
    GetRoutes("index").then((response) => {
      main.SetRoutes(response.data);
      loading.value = false;
      state.ChangeVisibilityDialogs(false, "add_route_with_column");
    });
  });
};

onUpdated(() => {
  text.value.value = "";
  select_type.value.id = 0;
});
</script>
