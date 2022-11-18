<template>
  <q-dialog v-model="store.Dialogs.edit_button" position="top" persistent>
    <q-card style="width: 50%" class="q-pa-md">
      <div class="flex justify-between items-center">
        <div class="text-h5">Изменение текста кнопки</div>
        <q-btn dense flat round icon="close" color="primary" v-close-popup />
      </div>
      <div class="q-py-sm">
        <q-input
          autofocus
          outlined
          v-model="text.value"
          label="Текст кнопки"
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
          :loading="loading"
        />
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref, onUpdated } from "vue";
import { useStatesStore, useSelectStore, useDataStore } from "../../../stores";
import { TextInput } from "../../../types";

import { GetInlineMenu } from "../../../api";

const store = useStatesStore();
const select = useSelectStore();
const { UpdateInlineMenu } = useDataStore();

const loading = ref<boolean>(false);

const text = ref<TextInput>({
  value: "",
  max: 100,
  min: 1,
  required() {
    return this.max > this.value.length && this.min < this.value.length;
  },
});

onUpdated(() => {
  text.value.value = select.SelectedButton.data.text;
});

const EditButton = () => {
  loading.value = true;
  GetInlineMenu("update-button-text", {
    text: text.value.value,
    id: select.SelectedButton.id,
  }).then((response) => {
    if (JSON.parse(response.data).result) {
      loading.value = false;
      UpdateInlineMenu(select.SelectedMessage.id, JSON.parse(response.data).data[0]);
      store.ChangeVisibilityDialogs(false, "edit_button");
    } else {
      console.warn("eeerrr");
    }
  });
};
</script>
