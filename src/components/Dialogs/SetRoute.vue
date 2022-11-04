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
              @click="
                route_state = !route_state;
                main.clckAction = true;
              "
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
          <SearchMenu v-model="search_state" @select="SelectItem" :text="text" />
        </div>
        <div class="">
          <RouteMenu
            v-model="route_state"
            @select="SelectItem"
            :select_item="main.select"
          />
        </div>
        <div
          class="text-center q-pt-sm text-caption text-red text-bold"
          v-if="main.danger"
        >
          Для того чтобы добавить товар или категорию, создайте товар или категорию.
        </div>
        <div class="" v-if="main_current.data && !main.danger">
          <div class="q-py-sm">Выброр категории</div>
          <q-item clickable class="text-center rounded-borders custom-outline">
            <q-item-section>{{
              main.current.select["text"] ?? main.current.select["title"]
            }}</q-item-section>
          </q-item>
          <DefinedMenu
            :current="main_current"
            @select="CurrentSelectItem"
            :select_item="main.current.select"
          />
        </div>
      </div>
      <div class="row q-gutter-sm justify-end">
        <q-btn unelevated rounded flat label="Отмена" color="primary" v-close-popup />
        <q-btn
          :disable="main.danger || !main_end_route"
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
import { ref, watch, computed, nextTick, onUpdated } from "vue";
import { useDialogsStore, useSelectStore, useMainStore } from "../../stores/index";
import { TextInput } from "../../stores/MainStore/model";
import { Routes } from "../../data/Routes";
import { RoutesSelect, RoutesOptionsStatic, RoutesOptionsEdit } from "../../types/types";
import { WatchParseRoute, ParseRoute } from "../../helpers/parser.js";

import DefinedMenu from "./SetRouteMenus/DefinedMenu.vue";
import SearchMenu from "./SetRouteMenus/SearchMenu.vue";
import RouteMenu from "./SetRouteMenus/RoutesMenu.vue";

const store = useDialogsStore();
const select = useSelectStore();
const main_store = useMainStore();

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
  end_route: null,
  danger: false,
});

const main_current = computed(() => main.value.current);
const main_current_select = computed(() => main.value.current.select);
const main_end_route = computed(() => {
  if (main.value.end_route) return true;
  else return false;
});

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

watch(
  main.value.select,
  () => (main.value = WatchParseRoute(main.value, main.value.select))
);

watch(main_current_select, (val) => CurrentSelectItem(val));

const SaveConnection = () => {
  main_store.all_commands
    .find((item) => item.id === select.SelectedCommand.id)
    .columns.find((item) => item.id === select.SelectedBlock.column_id)
    .blocks.find((item) => item.id === select.SelectedBlock.id)
    .buttons.find((item) => item.id === select.SelectedButton.id).connection.to =
    main.value.end_route;
};

onUpdated(() => {
  if (select.SelectedButton.connection.to && store.Dialogs.set_route) {
    const parser_sintax = {
      route: select.SelectedButton.connection.to,
      text: select.SelectedButton.label,
    };
    main.value = ParseRoute(main.value, parser_sintax);
    nextTick((main.value = WatchParseRoute(main.value, parser_sintax)));
  } else {
    route_state.value = false;
    search_state.value = false;
    main.value = {
      select: {
        text: "Выберите путь",
        type_value: -1,
        route: null,
      },
      current: {
        data: null,
        select: null,
      },
      clckAction: false,
      parsed_arr: [],
      end_route: "",
      danger: false,
    };
  }
});
</script>
