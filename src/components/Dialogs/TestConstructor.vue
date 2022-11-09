<template>
  <q-dialog
    transition-hide="slide-down"
    transition-show="slide-up"
    v-model="store.Dialogs.test_constructor"
    full-height
    full-width
    persistent
  >
    <q-card class="flex flex-center">
      <q-btn flat label="OK" color="primary" v-close-popup />
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { useStatesStore } from "../../stores";

const store = useStatesStore();
</script>
