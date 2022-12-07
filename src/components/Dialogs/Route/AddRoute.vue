<template>
  <q-dialog
    v-model="state.Dialogs.add_route"
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
        <TypeAction :condition="false" :parse="{}" @watch_end_route="SaveEndRoute" />
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
          :disable="!is_add"
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
import { ref, onUpdated, computed } from "vue";
import { useStatesStore, useDataStore } from "../../../stores";
import { TextInput } from "../../../types";
import { GetRoutes } from "../../../api";
import TypeAction from "../ButtonTypes/TypeAction.vue";

const state = useStatesStore();
const main = useDataStore();

const loading = ref<boolean>(false);

const text = ref<TextInput>({
  value: "",
  max: 100,
  min: 1,
  required() {
    return this.max > this.value.length && this.min < this.value.length;
  },
});

const end_route = ref({
  value: "",
  required() {
    return false;
  },
});

const EnterDown = (evt: KeyboardEvent) => {
  if (evt.key === "Enter" && is_add.value) AddRoute();
};

const is_add = computed(() => text.value.required() && !end_route.value.required());

function SaveEndRoute(route) {
  end_route.value = route;
}

const AddRoute = () => {
  loading.value = true;
  GetRoutes("create", {
    message: text.value.value,
    route: end_route.value.value,
  }).then(() => {
    GetRoutes("index").then((response) => {
      main.SetRoutes(response.data);
      loading.value = false;
      state.ChangeVisibilityDialogs(false, "add_route");
    });
  });
};

onUpdated(() => {
  text.value.value = "";
});
</script>
