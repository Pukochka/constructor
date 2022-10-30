<template>
  <div class="q-pt-lg">
    <div class="q-pb-lg flex items-center justify-between">
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
        @click="ChangeVisibilityDialogs(false, 'add_block')"
      />
    </div>
    <q-input
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
import { onUnmounted } from "vue";
import { useMainStore, useDialogsStore } from "../../../stores/index";

const main = useMainStore();
const { ChangeVisibilityDialogs } = useDialogsStore();

onUnmounted(() => {
  main.input.value = "";
});
</script>
<style lang="scss"></style>
