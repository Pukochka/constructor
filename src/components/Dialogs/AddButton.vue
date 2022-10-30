<template>
  <q-dialog v-model="store.Dialogs.add_button" position="top" persistent>
    <q-card style="width: 50%" class="q-pa-md">
      <q-input outlined v-model="text" label="Название кнопки" />
      <div class="flex justify-end q-pt-sm">
        <q-btn rounded flat label="Отмена" color="primary" v-close-popup />
        <q-btn
          rounded
          label="Добавить"
          color="primary"
          v-close-popup
          @click="AddButton"
        />
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useDialogsStore, useSelectStore, useMainStore } from "../../stores/index";
const main = useMainStore();
const store = useDialogsStore();
const select = useSelectStore();
const text = ref<string>("");

const AddButton = () => {
  const newButton = {
    type: 0,
    label: text.value,
    id: Date.now(),
    connection: null,
  };
  main.all_commands
    .find((item) => item.id === select.SelectedCommand.id)
    .columns.find((item) => item.id === select.SelectedBlock.column_id)
    .blocks.find((item) => item.id === select.SelectedBlock.id)
    .buttons.push(newButton);
  text.value = "";
};
</script>
