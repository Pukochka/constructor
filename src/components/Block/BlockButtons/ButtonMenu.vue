<template>
  <q-btn
    color="primary"
    dense
    flat
    icon="more_vert"
    size="10px"
    round
    @click="SelectState(block, 'block')"
  >
    <q-tooltip anchor="top middle" self="bottom middle">Настройки кнопки</q-tooltip>
    <q-menu>
      <q-list dense style="min-width: 100px">
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
        <q-item
          class="text-red-4 items-center"
          clickable
          v-close-popup
          @click="DeleteButton"
        >
          <q-icon name="delete" />
          <q-item-section class="q-ml-sm">Удалить кнопку</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import { Button, Block } from "../../../types";
import { useMainStore, useSelectStore, useDialogsStore } from "../../../stores";

const props = defineProps({
  button: Object as PropType<Button>,
  block: Object as PropType<Block>,
});

const main = useMainStore();
const select = useSelectStore();
const { ChangeVisibilityDialogs } = useDialogsStore();
const { SelectState } = useSelectStore();

const DeleteButton = () => {
  main.all_commands
    .find((item) => item.id === select.SelectedCommand.id)
    .columns.find((item) => item.id === props.block.column_id)
    .blocks.find((item) => item.id === props.block.id).buttons = main.all_commands
    .find((item) => item.id === select.SelectedCommand.id)
    .columns.find((item) => item.id === props.block.column_id)
    .blocks.find((item) => item.id === props.block.id)
    .buttons.filter((item) => item.id !== props.button.id);
};

const Edit = () => {
  SelectState(props.button, "button");
  ChangeVisibilityDialogs(true, "edit_button");
};
</script>
