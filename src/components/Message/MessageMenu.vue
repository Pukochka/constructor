<template>
  <q-menu
    class="non-selectable"
    anchor="bottom right"
    self="top middle"
    v-model="menu_state"
  >
    <q-list dense class="q-py-xs">
      <q-item
        clickable
        v-close-popup
        class="items-center text-primary"
        @click="ChangeType"
      >
        <q-icon name="edit" />
        <q-item-section class="q-ml-sm">Изменить тип</q-item-section>
      </q-item>
      <q-item
        v-if="!message.active"
        clickable
        class="items-center text-primary relative-position"
        @click="SetStart"
      >
        <div class="absolute-center" v-if="set_start_loading">
          <q-spinner color="primary" size="1em" />
        </div>
        <div
          class="flex items-center no-wrap"
          :style="{
            visibility: set_start_loading ? 'hidden' : 'visible',
          }"
        >
          <q-icon name="looks_one" />
          <q-item-section class="q-ml-sm">Сделать стартовым</q-item-section>
        </div>
      </q-item>
      <q-item
        clickable
        v-close-popup
        class="items-center text-primary"
        @click="edit_color_state = !edit_color_state"
      >
        <q-icon name="style" />
        <q-item-section class="q-ml-sm">Изменить цвет</q-item-section>
      </q-item>

      <!-- <q-item clickable v-close-popup class="items-center">
        <q-icon name="content_copy" />
        <q-item-section class="q-ml-sm">Копировать</q-item-section>
      </q-item> -->
      <q-item
        clickable
        class="text-red-4 items-center relative-position"
        @click="DeleteMessage"
      >
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
          <q-item-section class="q-ml-sm">Удалить сообщение</q-item-section>
        </div>
      </q-item>
    </q-list>
  </q-menu>
  <EditColor v-model="edit_color_state" />
</template>
<script lang="ts" setup>
import { ref, PropType, defineProps } from "vue";
import {
  useDataStore,
  useStatesStore,
  useSelectStore,
  useVectorStore,
} from "../../stores";
import { MessageInstance } from "../../types";
import EditColor from "../Edit/EditColor.vue";

import { GetMessage, GetRoutes } from "../../api";
import { useQuasar } from "quasar";

const props = defineProps({
  message: Object as PropType<MessageInstance>,
});

const main = useDataStore();
const state = useStatesStore();
const select = useSelectStore();
const vector = useVectorStore();
const $q = useQuasar();

const delete_loading = ref<boolean>(false);
const set_start_loading = ref<boolean>(false);

const edit_color_state = ref<boolean>(false);
const menu_state = ref<boolean>(false);

const SetStart = () => {
  set_start_loading.value = true;
  GetRoutes("set-active", {
    message_id: props.message.id,
    route_id: main.SelectRoute.id,
  }).then((response) => {
    set_start_loading.value = false;
    main.SetSelectRoute(response.data);
    menu_state.value = false;
  });
};

const ChangeType = () => {
  select.SelectState(props.message, "message");
  state.ChangeVisibilityDialogs(true, "change_type");
};

const DeleteMessage = () => {
  if (props.message.active) {
    $q.notify({
      message: "Стартовое сообщение нельзя удалить",
      color: "red",
      position: "bottom-right",
    });
  } else {
    delete_loading.value = true;
    GetMessage("delete", { message_id: props.message.id }).then((response) => {
      vector.UnMountedButtonsMessageDeleted(props.message.id, response);
    });
  }
};
</script>
