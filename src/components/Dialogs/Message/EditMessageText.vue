<template>
  <q-dialog v-model="store.Dialogs.edit_message" position="top" persistet>
    <q-card style="width: 50%" class="q-pa-md">
      <div class="flex justify-between items-center">
        <div class="text-h5">Изменение текста сообщения</div>
        <q-btn dense flat round icon="close" color="primary" v-close-popup />
      </div>
      <div class="q-py-sm">
        <q-input
          counter
          :maxlength="max_value"
          autogrow
          autofocus
          outlined
          v-model="text.value"
          label="Название кнопки"
          :rules="[() => text.required() || 'Введено неверное количество символов']"
        />
      </div>
      <div class="row q-gutter-sm justify-end">
        <q-btn
          unelevated
          class="q-px-md"
          dense
          rounded
          flat
          label="Отмена"
          color="primary"
          v-close-popup
        />
        <q-btn
          unelevated
          class="q-px-md"
          dense
          rounded
          label="Сохранить"
          color="primary"
          :loading="loading"
          :disable="!text.required()"
          @click="SaveBlock"
        />
      </div>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { ref, onUpdated } from "vue";
import {
  useStatesStore,
  useSelectStore,
  useDataStore,
  useErrorStore,
} from "../../../stores";
import { GetMessage, GetRoutes } from "../../../api";
import { TextInput } from "../../../types";

const store = useStatesStore();
const select = useSelectStore();
const main = useDataStore();
const error = useErrorStore();

const loading = ref<boolean>(false);
const max_value = ref<number>(1024);

const text = ref<TextInput>({
  value: "",
  max: max_value.value,
  min: 1,
  required() {
    return max_value.value > this.value.length && this.min < this.value.length;
  },
});

const SaveBlock = () => {
  loading.value = true;
  GetMessage("update-text", {
    message_id: select.SelectedMessage.id,
    text: text.value.value,
  }).then((res) => {
    if (!res.data.result) error.handleErrorRes(res.data.message);
    GetRoutes("view", { route_id: main.SELECT_ROUTE.id }).then((res) => {
      loading.value = false;
      main.SetSelectRoute(res.data);
      store.ChangeVisibilityDialogs(false, "edit_message");
    });
  });
};

onUpdated(() => {
  text.value.value = select.SelectedMessage.text.content;
  max_value.value = select.SelectedMessage.text.length;
});
</script>
