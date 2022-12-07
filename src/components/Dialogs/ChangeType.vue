<template>
  <q-dialog
    v-model="state.Dialogs.change_type"
    position="top"
    persistent
    @keydown="EnterDown"
  >
    <q-card style="width: 50%" class="q-pa-md">
      <div class="q-py-sm row justify-between items-center">
        <div class="text-h5">Изменение типа сообщения</div>
        <q-btn
          flat
          round
          dense
          color="primary"
          text-color="primary"
          icon="close"
          v-close-popup
        />
      </div>
      <q-list class="text-subtitle1 q-mb-sm" separator>
        <q-item
          clickable
          v-ripple
          class="items-center rounded-borders"
          :class="{ 'bg-primary text-white': select_type.id === item.id }"
          @click="select_type = item"
          v-for="item in main.AllTypes"
          :key="item.id"
        >
          <div class="q-pl-sm">{{ item.title }}</div>
        </q-item>
      </q-list>
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
          unelevated
          rounded
          :loading="loading"
          label="Сохранить"
          color="primary"
          @click="ChangeType"
        />
      </div>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { ref, onUpdated } from "vue";
import { useStatesStore, useDataStore, useSelectStore } from "../../stores";
import { MessageTypes } from "../../types";

import { GetMessage } from "../../api";

const state = useStatesStore();
const main = useDataStore();
const select = useSelectStore();

const loading = ref<boolean>(false);

const select_type = ref<MessageTypes>({
  id: 0,
  title: "",
});

const EnterDown = (evt: KeyboardEvent) => {
  if (evt.key === "Enter") ChangeType();
};

const ChangeType = () => {
  loading.value = true;
  GetMessage("update-type", {
    message_id: select.SelectedMessage.id,
    type: select_type.value.id,
  }).then((response) => {
    loading.value = false;
    state.ChangeVisibilityDialogs(false, "change_type");
    main.SetSelectRoute(response.data);
  });
};

onUpdated(() => {
  select_type.value = select.SelectedMessage.type;
});
</script>
