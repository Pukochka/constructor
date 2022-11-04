<template>
  <q-dialog v-model="store.dialogs.set_route" position="top" persistent>
    <q-card class="q-pa-md" style="width: 50%">
      <div class="flex justify-between items-center">
        <div class="text-h5">Путь кнопки</div>
        <q-btn dense unelevated round flat color="primary" icon="close" v-close-popup />
      </div>
      <div class="q-py-sm">
        <div class="q-py-sm">Выбор пути</div>
        <div class="row items-stretch">
          <div class="rounded-borders custom-outline col">
            <q-input
              v-if="search_state"
              outlined
              autofocus
              v-model="text.value"
              label="Найти путь или категорию"
              color="primary"
            />
            <q-item
              v-else
              @click="route_state = !route_state"
              clickable
              class="text-center"
            >
              <q-item-section class="ellipsis">{{ main.select.text }}</q-item-section>
            </q-item>
          </div>

          <q-item
            @click="search_state = !search_state"
            clickable
            class="text-center rounded-borders custom-outline"
          >
            <div class="flex justify-center items-center">
              <q-icon name="search" size="26px" />
            </div>
          </q-item>
        </div>
        <div class="">
          <SearchMenu v-model="search_state" />
        </div>
        <div class="">
          <RouteMenu v-model="route_state" @select="SelectItem" />
        </div>
        <div class="" v-if="main_current.data && !main.danger">
          <div class="q-py-sm">Выброр категории</div>
          <q-item clickable class="text-center rounded-borders custom-outline">
            <q-item-section>{{
              main.current.select["text"] ?? main.current.select["title"]
            }}</q-item-section>
          </q-item>
          <DefinedMenu :current="main_current" @select="CurrentSelectItem" />
        </div>
      </div>
      <div class="row q-gutter-sm justify-end">
        <q-btn unelevated rounded flat label="Отмена" color="primary" v-close-popup />
        <q-btn
          unelevated
          rounded
          label="Сохранить"
          color="primary"
          v-close-popup
          @click="SaveConnection"
        />
      </div>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { ref, watch, computed, nextTick } from "vue";
import { useDialogsStore } from "../../stores/index";
import { TextInput } from "../../stores/MainStore/model";
import { Routes } from "../../data/Routes";
import { RoutesSelect, RoutesOptionsStatic, RoutesOptionsEdit } from "../../types/types";
import { WatchParseRoute, ParseRoute } from "../../helpers/parser.js";

import DefinedMenu from "./SetRouteMenus/DefinedMenu.vue";
import SearchMenu from "./SetRouteMenus/SearchMenu.vue";
import RouteMenu from "./SetRouteMenus/RoutesMenu.vue";

const store = useDialogsStore();

const search_state = ref<boolean>(false);
const route_state = ref<boolean>(false);

const text = ref<TextInput>({
  value: "",
  required() {
    return this.value.length < this.max && this.value.length > this.min;
  },
  min: 1,
  max: 100,
});

const main = ref<RoutesSelect>({
  select: Routes[0],
  current: {
    data: null,
    select: null,
  },
  clckAction: false,
  parsed_arr: [],
  end_route: "",
  danger: false,
});

const main_current = computed(() => main.value.current);

function SelectItem(item: RoutesSelect) {
  main.value = ParseRoute(main.value, item);
  nextTick((main.value = WatchParseRoute(main.value, item)));
}

function CurrentSelectItem(item: RoutesOptionsStatic | RoutesOptionsEdit) {
  main.value.current.select = item;
  if (main.value.select.identifier) {
    main.value.end_route =
      main.value.select.route +
      main.value.select.identifier +
      main.value.current.select["id"];
  } else if (main.value.select.type == "category") {
    main.value.end_route = main.value.current.select["route"];
  }
}

watch(main.value.select, (item) => (main.value = WatchParseRoute(main.value, item)));

const SaveConnection = () => {
  console.log(1);
};
</script>
