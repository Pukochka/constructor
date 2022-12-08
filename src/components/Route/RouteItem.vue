<template>
  <q-item
    class="custom-outline rounded-borders bg-white column route-item column justify-between q-py-sm"
  >
    <div class="">
      <div class="flex fit no-wrap justify-between items-center q-pb-xs">
        <div class="text-h6 text-bold ellipsis">
          {{ route.label }}
        </div>
        <q-btn color="primary" flat round dense size="11px" icon="more_vert">
          <q-menu v-model="menu_state">
            <q-list dense class="q-py-xs">
              <q-item class="text-primary" clickable v-close-popup @click="EditTextRoute">
                <div class="flex items-center no-wrap">
                  <q-icon name="edit" />
                  <div class="q-pl-sm">Изменить название</div>
                </div>
              </q-item>
              <q-item class="text-red relative-position" clickable @click="DeleteRoute">
                <div class="absolute-center" v-if="delete_loading">
                  <q-spinner color="red" size="1em" />
                </div>
                <div
                  class="flex items-center no-wrap"
                  :style="{
                    visibility: delete_loading ? 'hidden' : 'visible',
                  }"
                >
                  <q-icon name="delete" />
                  <div class="q-pl-sm">Удалить</div>
                </div>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>

      <q-separator />
      <div class="text-caption text-grey">{{ route_hint }}</div>
    </div>

    <div class="row justify-end q-gutter-sm q-pt-md">
      <q-btn
        dense
        rounded
        unelevated
        color="primary"
        label="Редактировать"
        class="q-px-md"
        :loading="loading"
        @click="EditRoute"
      />
    </div>
  </q-item>
</template>
<script lang="ts" setup>
import { PropType, defineProps, ref, computed } from "vue";
import { RouteInstance } from "../../types";
import { GetRoutes } from "../../api";
import { useDataStore, useStatesStore, useSelectStore } from "../../stores";

const props = defineProps({
  route: Object as PropType<RouteInstance>,
});
const state = useStatesStore();
const main = useDataStore();
const select = useSelectStore();

const menu_state = ref<boolean>(false);
const loading = ref<boolean>(false);
const delete_loading = ref<boolean>(false);

const route_hint = computed(() => {
  if (props.route.is_column) return "Свободный маршрут";
  else if (props.route.is_menu) return "Маршрут с действием (привязан к меню)";
  else return "Маршрут с действием";
});

const EditRoute = () => {
  loading.value = true;
  select.SelectState(props.route, "route");
  GetRoutes("view", { route_id: props.route.id }).then((response) => {
    console.log(response.data.data);
    loading.value = false;
    if (response.data.data.is_column) {
      main.SetSelectRoute(response.data);
      main.ChangeTemplate("constructor");
      setTimeout(() => main.ChangeTemplate("constructor"), 300);
    } else {
      state.ChangeVisibilityDialogs(true, "route_without_column");
    }
  });
};

const EditTextRoute = () => {
  select.SelectState(props.route, "route");
  state.ChangeVisibilityDialogs(true, "edit_route");
};

const DeleteRoute = () => {
  delete_loading.value = true;
  GetRoutes("delete", { route_id: props.route.id }).then((response) => {
    main.SetRoutes(response.data);
    menu_state.value = false;
    delete_loading.value = false;
  });
};
</script>
<style lang="scss">
.route-item {
  transition: 0.2s ease box-shadow !important;
  &:hover {
    box-shadow: 0 3px 5px -1px #0003, 0 5px 8px #00000024, 0 1px 14px #0000001f;
  }
}
</style>
