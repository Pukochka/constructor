<template>
  <q-dialog
    v-model="state.Dialogs.route_without_column"
    position="top"
    persistent
    @keydown="EnterDown"
  >
    <q-card style="width: 50%" class="q-pa-md">
      <div class="flex justify-between items-center">
        <div class="text-h5">Изменение действия маршрута</div>
        <q-btn dense flat round icon="close" color="primary" v-close-popup />
      </div>
      <TypeAction :condition="condition" :parse="parse" @watch_end_route="SaveEndRoute" />
      <div class="row q-gutter-sm justify-end q-mt-sm">
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
          unelevated
          rounded
          class="q-px-md"
          dense
          :loading="loading"
          :disable="is_add"
          label="Сохранить"
          color="primary"
          @click="EditRoute"
        />
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { GetRoutes } from "../../../api";
import { ref, computed, onBeforeUpdate } from "vue";
import { useDataStore, useSelectStore, useStatesStore } from "../../../stores";
import TypeAction from "../ButtonTypes/TypeAction.vue";

const select = useSelectStore();
const state = useStatesStore();
const main = useDataStore();

const end_route = ref({
  value: "",
  required() {
    return false;
  },
});

const is_add = computed(() => end_route.value.required());

const EnterDown = (evt: KeyboardEvent) => {
  if (evt.key === "Enter" && !is_add.value) EditRoute();
};

function SaveEndRoute(route) {
  end_route.value = route;
}

const condition = computed(
  () => is_add_route.value && state.Dialogs.route_without_column
);

const parse = computed(() => {
  return {
    route: select.SelectedRoute?.route,
    text: select.SelectedRoute?.label,
  };
});

const is_add_route = ref<boolean>(false);
const loading = ref<boolean>(false);

const EditRoute = () => {
  loading.value = true;
  GetRoutes("update-route", {
    route: end_route.value.value,
    route_id: select.SelectedRoute.id,
  }).then(() => {
    GetRoutes("index").then((response) => {
      loading.value = false;
      main.SetRoutes(response.data);
      state.ChangeVisibilityDialogs(false, "route_without_column");
    });
  });
};

onBeforeUpdate(() => {
  if (select.SelectedRoute) is_add_route.value = true;
  else is_add_route.value = false;
});
</script>
