<template>
  <q-dialog
    v-model="state.Dialogs.edit_route"
    position="top"
    persistent
    @keydown="EnterDown"
  >
    <q-card style="width: 50%" class="q-pa-md">
      <div class="q-pb-sm">
        <div class="row justify-between items-center">
          <div class="q-pb-sm text-h5">Изменение маршрута</div>
          <q-btn color="primary" flat round icon="close" dense v-close-popup />
        </div>

        <div class="text-caption text-grey">Название не должно повторяться</div>
        <q-input
          autofocus
          outlined
          v-model="text.value"
          label="Название маршрута"
          :rules="[() => text.required() || 'Введено неверное количество символов']"
        />
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
          label="Сохранить"
          color="primary"
          :loading="loading"
          @click="EditRoute"
        />
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref, onUpdated } from "vue";
import {
  useStatesStore,
  useDataStore,
  useSelectStore,
  useErrorStore,
} from "../../../stores";
import { TextInput } from "../../../types";
import { GetRoutes } from "../../../api";

const state = useStatesStore();
const select = useSelectStore();
const main = useDataStore();
const error = useErrorStore();

const loading = ref<boolean>(false);

const text = ref<TextInput>({
  value: "",
  max: 100,
  min: 1,
  required() {
    return this.max > this.value.length && this.min < this.value.length;
  },
});

const EnterDown = (evt: KeyboardEvent) => {
  if (evt.key === "Enter" && text.value.required()) EditRoute();
};

const EditRoute = () => {
  loading.value = true;
  GetRoutes("update-message", {
    message: text.value.value,
    route_id: select.SelectedRoute.id,
  }).then((res) => {
    console.log(res);
    if (!res.data.result) error.handleErrorRes(res.data.message);
    GetRoutes("index").then((response) => {
      loading.value = false;
      state.ChangeVisibilityDialogs(false, "edit_route");
      main.SetRoutes(response.data);
    });
  });
};

onUpdated(() => {
  if (select.SelectedRoute.label) {
    text.value.value = select.SelectedRoute.label;
  }
});
</script>
