<template>
  <q-menu class="non-selectable" anchor="bottom right" self="top middle">
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
  useSelectStore /*, useSvgStore*/,
} from "../../stores";
import { MessageInstance } from "../../types";
import EditColor from "../Edit/EditColor.vue";

import { GetMessage, GetRoutes } from "../../api";
const main = useDataStore();
// const state = useStatesStore();
const { ChangeVisibilityDialogs } = useStatesStore();
const { SelectState } = useSelectStore();
// const { DeleteBlockAndConnected } = useSvgStore();

const delete_loading = ref<boolean>(false);

const edit_color_state = ref<boolean>(false);
const props = defineProps({
  message: Object as PropType<MessageInstance>,
});
// const DeleteBlock = () => {
//   if (props.block.connected.length) {
//     DeleteBlockAndConnected(props.block);
//   }
//   main.all_commands
//     .find((item) => item.id === select.SelectedCommand.id)
//     .columns.find((item) => item.id === props.block.column_id).blocks = main.all_commands
//     .find((item) => item.id === select.SelectedCommand.id)
//     .columns.find((item) => item.id === props.block.column_id)
//     .blocks.filter((item) => item.id !== props.block.id);
// };

const ChangeType = () => {
  SelectState(props.message, "message");
  ChangeVisibilityDialogs(true, "change_type");
};

const DeleteMessage = () => {
  delete_loading.value = true;
  GetMessage("delete", { message_id: props.message.id }).then(() => {
    GetRoutes("view", { route_id: main.SELECT_ROUTE.id }).then((res) => {
      delete_loading.value = false;
      main.SetSelectRoute(res.data, "view");
    });
  });
};
</script>
