<template>
  <q-dialog v-model="error.error_res.value" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h5">Походу что-то пошло не так...</div>
        <div class="q-py-sm">Ошибка : {{ error.error_message }}</div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Закрыть" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { useErrorStore } from "../../../stores";

const error = useErrorStore();
</script>
