<template>
  <div class="q-pt-lg">
    <div class="q-pb-lg flex items-center justify-between" v-if="!no_header">
      <div class="flex items-center text-h6">
        <q-icon name="text_fields" />
        <div class="q-ml-sm">Текст</div>
      </div>
      <q-btn
        color="primary"
        flat
        round
        icon="close"
        dense
        @click="ChangeVisibilityDialogs(false, dialog_name)"
      />
    </div>
    <q-input
      autofocus
      class="q-my-xs"
      outlined
      v-model="main.input.value"
      :rules="[() => main.input.required() || 'Введено неверное количество символов']"
      :maxlength="main.input.max"
      label="Реплика бота"
    />
  </div>
</template>
<script setup lang="ts">
import { onUnmounted, defineProps, PropType, onMounted } from "vue";
import { useMainStore, useDialogsStore, useSelectStore } from "../../../stores";
import { DialogNames } from "../../../types";

defineProps({
  dialog_name: String as PropType<DialogNames>,
  no_header: Boolean,
});

const main = useMainStore();
const store = useDialogsStore();
const select = useSelectStore();
const { ChangeVisibilityDialogs } = useDialogsStore();

onMounted(() => {
  if (store.Dialogs.edit_block) main.input.value = select.SelectedBlock.options;
});

onUnmounted(() => {
  main.input.value = "";
});
</script>
<style lang="scss"></style>
