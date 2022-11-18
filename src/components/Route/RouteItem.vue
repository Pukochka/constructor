<template>
  <q-item class="shadow-1 rounded-borders bg-white column route-item">
    <div class="q-py-sm">
      <div class="flex fit no-wrap justify-between items-center q-pb-sm">
        <div class="text-h5 text-bold ellipsis">
          {{ route.label }}
        </div>
        <q-btn color="primary" flat round dense size="11px" icon="more_vert">
          <q-menu v-model="menu_state">
            <q-list dense class="q-py-xs">
              <q-item class="text-primary" clickable v-close-popup @click="EditMessage">
                <div class="flex items-center no-wrap">
                  <q-icon name="edit" />
                  <div class="q-pl-sm">Изменить название</div>
                </div>
              </q-item>
              <q-item class="text-red relative-position" clickable @click="DeleteRoute">
                <div class="absolute-center" v-if="state.Loadings.route.delete">
                  <q-spinner color="red" size="1em" />
                </div>
                <div
                  class="flex items-center no-wrap"
                  :style="{
                    visibility: state.Loadings.route.delete ? 'hidden' : 'visible',
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
      <div class="row justify-end q-gutter-sm q-pt-md">
        <q-btn
          dense
          rounded
          unelevated
          color="primary"
          label="Редактировать"
          class="q-px-md"
          :loading="state.Loadings.route.view && route.id === route_state"
          @click="ToConstructor"
        />
      </div>
    </div>
  </q-item>
</template>
<script lang="ts" setup>
import { PropType, defineProps, ref } from "vue";
import { RouteInstance } from "../../types";
import { GetRoutes } from "../../api";
import { useDataStore, useStatesStore, useSelectStore } from "../../stores";

const props = defineProps({
  route: Object as PropType<RouteInstance>,
});
const state = useStatesStore();
const { SetRoutes, ChangeTemplate, SetSelectRoute } = useDataStore();
const { SelectState } = useSelectStore();
const { ChangeVisibilityDialogs } = useStatesStore();

const menu_state = ref<boolean>(false);
const route_state = ref<number>(-1);

const ToConstructor = () => {
  route_state.value = props.route.id;
  GetRoutes("view", { route_id: props.route.id }).then((response) => {
    ChangeTemplate("constructor");
    SetSelectRoute(response.data, "view");
  });
};

const EditMessage = () => {
  SelectState(props.route, "route");
  ChangeVisibilityDialogs(true, "edit_route");
};

const DeleteRoute = () => {
  GetRoutes("delete", { route_id: props.route.id }).then((response) => {
    SetRoutes(response.data, "delete");
    menu_state.value = false;
  });
};
</script>
<style lang="scss">
.route-item {
  transition: 0.2s ease box-shadow;
  &:hover {
    box-shadow: 0 3px 5px -1px #0003, 0 5px 8px #00000024, 0 1px 14px #0000001f;
  }
}
</style>
