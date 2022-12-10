<template>
  <q-dialog v-model="state.Dialogs.edit_feed_back" position="top" persistent>
    <q-card style="width: 50%" class="q-pa-md">
      <div class="row justify-between items-center">
        <div class="text-h5">Редактирование обратной связи</div>
        <q-btn color="primary" flat round icon="close" v-close-popup />
      </div>
      <div class="q-my-md">
        <div class="text-center text-grey q-py-sm">Вопросов нет</div>
        <div class="row">
          <q-btn class="col-12" rounded flat label="добавить вопрос" color="primary" />
        </div>
      </div>
      <div class="row q-gutter-sm justify-end">
        <q-btn
          class="q-px-md"
          dense
          rounded
          flat
          label="Закрыть"
          color="primary"
          v-close-popup
        />
        <q-btn
          class="q-px-md"
          dense
          unelevated
          rounded
          label="изменить"
          color="primary"
          v-close-popup
        />
      </div>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { useStatesStore } from "../../../stores";

const state = useStatesStore();
</script>
