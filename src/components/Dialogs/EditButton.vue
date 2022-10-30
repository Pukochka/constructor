<template>
  <q-dialog v-model="store.Dialogs.edit_button" position="top" persistent>
    <q-card style="width: 50%" class="q-pa-md">
      <q-input outlined v-model="text" label="Изменение текта кнопки" />
      <div class="flex justify-end q-mt-sm">
        <q-btn
          class="q-mr-sm"
          rounded
          outline
          color="primary"
          label="Отмена"
          v-close-popup
        />
        <q-btn
          rounded
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
import { useDialogsStore, useSelectStore, useMainStore } from "../../stores/index";
const store = useDialogsStore();
const select = useSelectStore();
const main = useMainStore();
const text = ref<string>("");
onUpdated(() => {
  text.value = select.SelectedButton.label;
});

const EditButton = () => {
  main.all_commands
    .find((item) => item.id === select.SelectedCommand.id)
    .columns.find((item) => item.id === select.SelectedBlock.column_id)
    .blocks.find((item) => item.id === select.SelectedBlock.id)
    .buttons.find((item) => item.id === select.SelectedButton.id).label = text.value;
};
</script>
