<template>
  <q-dialog v-model="store.Dialogs.edit_route" position="top" persistent>
    <q-card style="width: 50%" class="q-pa-md">
      <div class="q-py-sm">
        <div class="q-pb-sm text-h5">Изменение маршрута</div>
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
          v-close-popup
          @click="CreateRoute"
        />
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref, onUpdated } from "vue";
import { useStatesStore, useDataStore, useSelectStore } from "../../../stores";
import { TextInput } from "../../../types";
import { GetRoutes } from "../../../api";

const store = useStatesStore();
const select = useSelectStore();
const { SetRoutes } = useDataStore();

const text = ref<TextInput>({
  value: "",
  max: 100,
  min: 1,
  required() {
    return this.max > this.value.length && this.min < this.value.length;
  },
});

const CreateRoute = () => {
  GetRoutes("update-message", {
    message: text.value.value,
    route_id: select.SelectedRoute.id,
  }).then(() => {
    GetRoutes("index").then((response) => {
      SetRoutes(response.data, "index");
    });
  });
};

onUpdated(() => {
  if (select.SelectedRoute.label) {
    text.value.value = select.SelectedRoute.label;
  }
});
</script>
