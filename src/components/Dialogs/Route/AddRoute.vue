<template>
  <q-dialog v-model="store.Dialogs.add_route" position="top" persistent>
    <q-card style="width: 50%" class="q-pa-md">
      <div class="q-py-sm">
        <div class="row justify-between items-center">
          <div class="text-h5">Добавление нового маршрута</div>
          <q-btn color="primary" flat round icon="close" dense v-close-popup />
        </div>

        <div class="text-caption text-grey">Название не должно повторяться</div>
        <q-input
          autofocus
          outlined
          v-model="text.value"
          label="Название нового маршрута"
          :rules="[() => text.required() || 'Введено неверное количество символов']"
        />
        <div class="text-h5 q-py-sm">Тип первого сообщения</div>
        <q-list class="text-subtitle1 q-my-sm" separator>
          <q-item
            clickable
            v-ripple
            class="items-center rounded-borders"
            :class="{ 'bg-primary text-white': select_type.id == item.id }"
            @click="select_type = item"
            v-for="item in main.AllTypes"
            :key="item.id"
          >
            <div class="q-pl-sm">{{ item.title }}</div>
          </q-item>
        </q-list>
      </div>

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
          :disable="!text.required()"
          rounded
          label="Добавить"
          color="primary"
          v-close-popup
          @click="CreateRoute"
        />
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref, onUpdated } from "vue";
import { useStatesStore, useDataStore } from "../../../stores";
import { TextInput, MessageTypes } from "../../../types";
import { GetRoutes } from "../../../api";

const store = useStatesStore();
const main = useDataStore();
const { SetRoutes } = useDataStore();

const select_type = ref<MessageTypes>({
  id: 0,
  title: "",
});

const text = ref<TextInput>({
  value: "",
  max: 100,
  min: 1,
  required() {
    return this.max > this.value.length && this.min < this.value.length;
  },
});

const CreateRoute = () => {
  GetRoutes("create-with-column", {
    message: text.value.value,
    message_type: select_type.value.id,
  }).then(() => {
    GetRoutes("index").then((response) => {
      SetRoutes(response.data, "index");
    });
  });
};

onUpdated(() => {
  text.value.value = "";
});
</script>
