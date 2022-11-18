<template>
  <q-btn
    color="primary"
    dense
    flat
    icon="more_vert"
    size="10px"
    round
    class="q-mx-xs"
    @click="SelectState(message, 'message')"
  >
    <q-tooltip anchor="top middle" self="bottom middle">Настройки кнопки</q-tooltip>
    <q-menu anchor="bottom right" self="top middle">
      <q-list dense class="q-py-xs">
        <q-item class="text-primary items-center" clickable v-close-popup @click="Edit">
          <q-icon name="edit" />
          <q-item-section class="q-ml-sm">Изменить</q-item-section>
        </q-item>
        <!-- <q-item clickable v-close-popup>
          <q-item-section>Указать путь</q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section>Сделать ссылкой</q-item-section>
        </q-item> -->
        <q-item class="text-red-4 items-center" clickable @click="DeleteButton">
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
            <q-item-section class="q-ml-sm">Удалить кнопку</q-item-section>
          </div>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
<script lang="ts" setup>
import { defineProps, PropType, ref } from "vue";
import { InlineMenuButtonInstance, MessageInstance } from "../../../types";
import {
  useSelectStore,
  useStatesStore,
  useDataStore,
  // useSvgStore,
} from "../../../stores";

import { GetInlineMenu } from "../../../api";

const props = defineProps({
  button: Object as PropType<InlineMenuButtonInstance>,
  message: Object as PropType<MessageInstance>,
});

const delete_loading = ref<boolean>(false);

// const { DeleteConnectionAndUpdateLine } = useSvgStore();
const { ChangeVisibilityDialogs } = useStatesStore();
const { SelectState } = useSelectStore();
const select = useSelectStore();
const { UpdateInlineMenu } = useDataStore();

const DeleteButton = () => {
  delete_loading.value = true;
  // if (props.button.type === 5) {
  //   DeleteConnectionAndUpdateLine(props.button, props.message);
  // }
  GetInlineMenu("delete-button", { id: props.button.id }).then((response) => {
    if (JSON.parse(response.data).result) {
      UpdateInlineMenu(select.SelectedMessage.id, JSON.parse(response.data).data[0]);
    } else {
      console.warn("eeerrr");
    }
  });
};

const Edit = () => {
  SelectState(props.button, "button");
  ChangeVisibilityDialogs(true, "edit_button");
};
</script>
