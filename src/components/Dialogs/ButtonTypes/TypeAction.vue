<template>
  <div class="q-py-sm q-pt-md">Выбор пути</div>
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
    <RouteMenu v-model="route_state" @select="SelectItem" :select_item="main.select" />
  </div>
  <div class="q-pt-sm text-caption text-red" v-if="main.danger">
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
</template>
<script lang="ts" setup>
import { ref, watch, computed, nextTick, onMounted, defineEmits, defineProps } from "vue";
import { useStatesStore, useSelectStore } from "../../../stores";
import {
  RoutesSelect,
  RoutesOptionsStatic,
  RoutesOptionsEdit,
  TextInput,
} from "../../../types";
import { WatchParseRoute, ParseRoute } from "../../../helpers/parser.js";

import DefinedMenu from "../ActionMenus/DefinedMenu.vue";
import SearchMenu from "../ActionMenus/SearchMenu.vue";
import RouteMenu from "../ActionMenus/RoutesMenu.vue";

const store = useStatesStore();
const select = useSelectStore();

const search_state = ref<boolean>(false);
const route_state = ref<boolean>(false);

const props = defineProps({ route: Boolean });

const text = ref<TextInput>({
  value: "",
  required() {
    return this.value.length < this.max && this.value.length > this.min;
  },
  min: 1,
  max: 100,
});

const main = ref<RoutesSelect>({
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
  end_route: null,
  danger: false,
});

const emit = defineEmits<{
  (e: "watch_end_route", value): void;
}>();

const main_current = computed(() => main.value.current);
const main_current_select = computed(() => main.value.current.select);
const main_end_route = computed(() => main.value.end_route);

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
watch(main_end_route, (val) =>
  emit("watch_end_route", {
    value: val,
    required() {
      return main.value.danger || !this.value.length;
    },
  })
);

onMounted(() => {
  if (props.route && store.Dialogs.set_route && select.SelectedButton.type !== 6) {
    const parser_sintax = {
      route: select.SelectedButton.data.action,
      text: select.SelectedButton.data.text,
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
