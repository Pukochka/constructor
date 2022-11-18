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
      <div class="row q-gutter-sm justify-end">
        <q-btn
          class="q-px-md"
          dense
          rounded
          flat
          label="Отмена"
          color="primary"
          v-close-popup
        />
        <q-btn
          unelevated
          :disable="!text.required()"
          rounded
          class="q-px-md"
          dense
          label="Добавить"
          color="primary"
          :loading="loading"
          @click="AddButton"
        />
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useStatesStore, useSelectStore, useDataStore } from "../../../stores";
import { TextInput } from "../../../types";

import { GetInlineMenu } from "../../../api";

const store = useStatesStore();
const select = useSelectStore();
const main = useDataStore();

const loading = ref<boolean>(false);

const text = ref<TextInput>({
  value: "",
  max: 100,
  min: 1,
  required() {
    return this.max > this.value.length && this.min < this.value.length;
  },
});

const AddButton = () => {
  loading.value = true;
  if (main.IsLine) {
    GetInlineMenu("add-button-in-line", {
      menu_id: select.SelectedMessage.inline_menu.id,
      text: text.value.value,
      type: 6,
      action: "free",
      line_id: select.SelectedLine.id,
    }).then((response) => {
      if (JSON.parse(response.data).result) {
        loading.value = false;
        main.UpdateInlineMenu(
          select.SelectedMessage.id,
          JSON.parse(response.data).data[0]
        );
      } else {
        console.warn("eeerrr");
      }
      store.ChangeVisibilityDialogs(false, "add_button");
      text.value.value = "";
    });
  } else {
    GetInlineMenu("add-button-with-line", {
      menu_id: select.SelectedMessage.inline_menu.id,
      text: text.value.value,
      type: 6,
      action: "free",
    }).then((response) => {
      if (JSON.parse(response.data).result) {
        loading.value = false;
        main.UpdateInlineMenu(
          select.SelectedMessage.id,
          JSON.parse(response.data).data[0]
        );
      } else {
        console.warn("eeerrr");
      }
      store.ChangeVisibilityDialogs(false, "add_button");
      text.value.value = "";
    });
  }
};
</script>
