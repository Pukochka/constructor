<template>
  <q-dialog v-model="store.Dialogs.add_button" position="top" persistent>
    <q-card style="width: 50%" class="q-pa-md">
      <div class="flex justify-between items-center">
        <div class="text-h5">Добавление кнопки</div>
        <q-btn dense flat round icon="close" color="primary" v-close-popup />
      </div>
      <div class="q-py-sm">
        <q-input
          autofocus
          outlined
          v-model="text.value"
          label="Название кнопки"
          :rules="[() => text.required() || 'Введено неверное количество символов']"
        />
      </div>
      <div class="flex justify-end">
        <q-btn rounded flat label="Отмена" color="primary" v-close-popup />
        <q-btn
          :disable="!text.required()"
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
import { TextInput } from "../../stores/MainStore/model";

const main = useMainStore();
const store = useDialogsStore();
const select = useSelectStore();

const text = ref<TextInput>({
  value: "",
  max: 100,
  min: 1,
  required() {
    return this.max > this.value.length && this.min < this.value.length;
  },
});

const AddButton = () => {
  const newButton = {
    type: 0,
    label: text.value.value,
    id: Date.now(),
    connection: {
      to: null,
      type: 0,
      info: null,
    },
  };
  main.all_commands
    .find((item) => item.id === select.SelectedCommand.id)
    .columns.find((item) => item.id === select.SelectedBlock.column_id)
    .blocks.find((item) => item.id === select.SelectedBlock.id)
    .buttons.push(newButton);
  text.value.value = "";
};
</script>
