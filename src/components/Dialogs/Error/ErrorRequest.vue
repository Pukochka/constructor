<template>
  <q-dialog v-model="error.error_req.value" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h5">По ходу что-то пошло не так...</div>
        <div class="q-py-sm">
          Проблемы с интеренет соединением. Попробуйте перезагрузить страницу.
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          unelevated
          label="Перезагрузить"
          color="primary"
          v-close-popup
          @click="reload"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { useErrorStore } from "../../../stores";

const error = useErrorStore();

const reload = () => location.reload();
</script>
