<template>
  <q-dialog v-model="store.Dialogs.add_command" position="top" persistent>
    <q-card style="width: 50%" class="q-pa-md">
      <div class="q-py-sm">
        <div class="q-pb-sm text-h5">Добавление новой команды</div>
        <div class="text-caption text-grey">Название не должно повторяться</div>
        <q-input
          autofocus
          outlined
          v-model="text.value"
          label="Название новой команды"
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
          class="q-px-md"
          dense
          :disable="!text.required()"
          rounded
          label="Добавить"
          color="primary"
          v-close-popup
        />
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useStatesStore } from "../../stores";
import { TextInput } from "../../types";
const store = useStatesStore();

const text = ref<TextInput>({
  value: "",
  max: 100,
  min: 1,
  required() {
    return this.max > this.value.length && this.min < this.value.length;
  },
});
</script>
