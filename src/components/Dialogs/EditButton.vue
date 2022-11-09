<template>
  <q-dialog v-model="store.Dialogs.edit_button" position="top" persistent>
    <q-card style="width: 50%" class="q-pa-md">
      <div class="flex justify-between items-center">
        <div class="text-h5">Изменение кнопки</div>
        <q-btn dense flat round icon="close" color="primary" v-close-popup />
      </div>
      <div class="q-py-sm">
        <q-input
          autofocus
          outlined
          v-model="text.value"
          label="Изменение текта кнопки"
          :rules="[() => text.required() || 'Введено неверное количество символов']"
        />
      </div>
      <div class="row q-gutter-sm justify-end">
        <q-btn
          unelevated
          class="q-px-md"
          dense
          rounded
          flat
          color="primary"
          label="Отмена"
          v-close-popup
        />
        <q-btn
          unelevated
          class="q-px-md"
          dense
          rounded
          :disable="!text.required()"
          color="primary"
          label="Сохранить"
          @click="EditButton"
          v-close-popup
        />
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref, onUpdated } from "vue";
import { useStatesStore, useSelectStore, useMainStore } from "../../stores";
import { TextInput } from "../../types";

const store = useStatesStore();
const select = useSelectStore();
const main = useMainStore();

const text = ref<TextInput>({
  value: "",
  max: 100,
  min: 1,
  required() {
    return this.max > this.value.length && this.min < this.value.length;
  },
});

onUpdated(() => {
  text.value.value = select.SelectedButton.label;
});

const EditButton = () => {
  main.all_commands
    .find((item) => item.id === select.SelectedCommand.id)
    .columns.find((item) => item.id === select.SelectedBlock.column_id)
    .blocks.find((item) => item.id === select.SelectedBlock.id)
    .buttons.find((item) => item.id === select.SelectedButton.id).label =
    text.value.value;
};
</script>
