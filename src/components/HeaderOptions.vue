<template>
  <div class="row justify-between items-center q-pa-sm">
    <div class="flex">
      <q-select
        style="width: 150px"
        rounded
        dense
        outlined
        v-model="select_state"
        :options="main.Commands"
      />
      <q-btn
        rounded
        class="q-ml-sm"
        outline
        color="primary"
        no-caps
        icon="add"
        label="Добавить команду"
        @click="ChangeVisibilityDialogs(true, 'add_command')"
      />
    </div>
    <div class="row q-gutter-sm">
      <div class="rounded-borders custom-outline">
        <q-btn color="primary" dense flat icon="fullscreen" />
      </div>
      <div class="rounded-borders custom-outline">
        <q-btn color="primary" dense flat icon="add" />
        <q-btn color="primary" dense flat icon="remove" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import type { Command } from "../types/types";
import { useSelectStore, useMainStore, useDialogsStore } from "../stores/index";

const select = useSelectStore();
const main = useMainStore();
const { ChangeVisibilityDialogs } = useDialogsStore();

const select_state = ref<Command>(main.Commands[0]);

watch(select_state, () => select.SelectState(select_state.value, "command"));
</script>
<style lang="scss"></style>
