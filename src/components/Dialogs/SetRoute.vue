<template>
  <q-dialog v-model="store.dialogs.set_route" position="top" persistent>
    <q-card class="q-pa-md" style="width: 50%">
      <div class="flex justify-between items-center">
        <div class="text-h5">Путь кнопки</div>
        <q-btn dense round flat color="primary" icon="close" v-close-popup />
      </div>
      <div class="q-py-sm">
        <div class="q-py-sm">Выбор действия кнопки</div>
        <div class="row q-col-gutter-sm">
          <div class="col-4 flex-grow" v-for="(item, index) in button_types" :key="index">
            <q-btn
              @click="
                select_button_type = item.type;
                route = false;
              "
              :color="select_button_type !== item.type ? 'white' : 'primary'"
              :text-color="select_button_type !== item.type ? 'primary' : 'white'"
              class="fit shadow-1"
              dense
              rounded
              unelevated
              no-wrap
              no-caps
              :label="item.text"
            />
          </div>
        </div>
        <div class="">
          <Link
            v-if="select_button_type === 0"
            @watch_end_route="SaveEndRoute"
            :route="route"
          />
          <Action
            v-if="select_button_type === 1"
            @watch_end_route="SaveEndRoute"
            :route="route"
          />
          <Share
            v-if="select_button_type === 2"
            @watch_end_route="SaveEndRoute"
            :route="route"
          />
          <ChooseText
            v-if="select_button_type === 3"
            @watch_end_route="SaveEndRoute"
            :route="route"
          />
          <Web v-if="select_button_type === 4" @watch_end_route="SaveEndRoute" />
        </div>
      </div>
      <div class="row q-gutter-sm justify-end">
        <q-btn
          class="q-px-md"
          dense
          unelevated
          rounded
          flat
          label="Отмена"
          color="primary"
          v-close-popup
        />
        <q-btn
          :disable="end_route.required()"
          unelevated
          class="q-px-md"
          dense
          rounded
          label="Сохранить"
          color="primary"
          :loading="loading"
          @click="SaveConnection"
        />
      </div>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { ref, onBeforeUpdate } from "vue";
import { useStatesStore, useSelectStore, useDataStore } from "../../stores";

import Action from "./ButtonTypes/TypeAction.vue";
import ChooseText from "./ButtonTypes/ChooseText.vue";
import Link from "./ButtonTypes/TypeLink.vue";
import Share from "./ButtonTypes/TypeShare.vue";
import Web from "./ButtonTypes/TypeWeb.vue";

import { GetInlineMenu } from "../../api";
const store = useStatesStore();
const select = useSelectStore();
const { UpdateInlineMenu } = useDataStore();

const button_types = ref([
  {
    text: "Ссылка",
    type: 0,
  },
  {
    text: "Действие",
    type: 1,
  },
  {
    text: "Поделиться",
    type: 2,
  },
  {
    text: "Выбрать текст",
    type: 3,
  },
  {
    text: "Web",
    type: 4,
  },
]);

const select_button_type = ref<number>(0);
const route = ref<boolean>(false);
const loading = ref<boolean>(false);

const end_route = ref({
  value: "",
  required() {
    return false;
  },
});

function SaveEndRoute(route) {
  end_route.value = route;
}

const SaveConnection = () => {
  loading.value = true;
  if (!end_route.value.required()) {
    GetInlineMenu("update-data-and-type", {
      id: select.SelectedButton.id,
      text: select.SelectedButton.data.text,
      action: end_route.value.value,
      type: select_button_type.value,
    }).then((response) => {
      if (JSON.parse(response.data).result) {
        loading.value = false;
        UpdateInlineMenu(select.SelectedMessage.id, JSON.parse(response.data).data[0]);
        store.ChangeVisibilityDialogs(false, "set_route");
      } else {
        console.warn("eeerrr");
      }
    });
  }
};
onBeforeUpdate(() => {
  if (store.Dialogs.set_route && select.SelectedButton.type !== 6) {
    select_button_type.value = select.SelectedButton.type;
    route.value = true;
  } else {
    select_button_type.value = 0;
    route.value = false;
  }
});
</script>
