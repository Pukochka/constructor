<template>
  <q-menu class="non-selectable" anchor="bottom right" self="top right">
    <q-list dense style="min-width: 100px">
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
        v-close-popup
        class="text-red-4 items-center"
        @click="DeleteBlock"
      >
        <q-icon name="delete" />
        <q-item-section class="q-ml-sm">Удалить экран</q-item-section>
      </q-item>
    </q-list>
  </q-menu>
  <EditColor v-model="edit_color_state" />
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useMainStore, useSelectStore } from "../../stores";

import EditColor from "../Edit/EditColor.vue";

const main = useMainStore();
const select = useSelectStore();

const edit_color_state = ref<boolean>(false);

const DeleteBlock = () => {
  main.all_commands
    .find((item) => item.id === select.SelectedCommand.id)
    .columns.find(
      (item) => item.id === select.SelectedBlock.column_id
    ).blocks = main.all_commands
    .find((item) => item.id === select.SelectedCommand.id)
    .columns.find((item) => item.id === select.SelectedBlock.column_id)
    .blocks.filter((item) => item.id !== select.SelectedBlock.id);
};
</script>
