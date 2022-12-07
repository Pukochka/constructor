<template>
  <div>
    <div class="bg-white q-pa-md relative-position" style="height: calc(100vh - 60px)">
      <div class="q-pt-md">
        <div class="row items-center">
          <q-icon name="apps" size="26px" color="primary" />

          <div class="q-pl-md text-h5">Мои сценарии</div>
        </div>

        <div class="row q-gutter-xs q-my-xs">
          <q-btn
            flat
            no-caps
            padding="2px 4px"
            color="primary"
            label="Премиум настройки"
            :href="`/lk/common/main/redirect?bot_id=${CONFIG.BOT.id}`"
          />
        </div>
      </div>
      <q-separator />
      <div class="row justify-between q-col-gutter-sm q-my-xs q-mb-sm">
        <div class="row q-gutter-md items-center">
          <div class="row items-center no-wrap">
            <q-input dense outlined v-model="text.value" label="Поиск по названию">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <div class="q-ml-md row no-wrap items-center q-gutter-sm">
              <q-btn
                dense
                :flat="filter === true || filter === false"
                text-color="primary"
                icon="apps"
                @click="filter = null"
              >
                <q-tooltip anchor="top middle" self="bottom middle"
                  >Все маршруты</q-tooltip
                >
              </q-btn>
              <q-btn
                dense
                :flat="filter === true || filter === null"
                text-color="primary"
                icon="view_week"
                @click="filter = false"
              >
                <q-tooltip anchor="top middle" self="bottom middle"
                  >Свободные маршруты</q-tooltip
                >
              </q-btn>
              <q-btn
                dense
                :flat="filter === false || filter === null"
                text-color="primary"
                icon="route"
                @click="filter = true"
              >
                <q-tooltip anchor="top middle" self="bottom middle"
                  >Маршруты с действиями</q-tooltip
                >
              </q-btn>
            </div>
          </div>

          <div class="row no-wrap">
            <q-btn
              unelevated
              text-color="white"
              color="primary"
              label="Добавить свободный маршрут"
              @click="state.ChangeVisibilityDialogs(true, 'add_route_with_column')"
            />
            <q-btn
              class="q-ml-sm"
              unelevated
              text-color="white"
              color="primary"
              label="Добавить маршрут с действием"
              @click="state.ChangeVisibilityDialogs(true, 'add_route')"
            />
            <q-btn
              dense
              class="q-ml-sm"
              unelevated
              text-color="white"
              color="primary"
              icon="more_vert"
            >
              <q-tooltip anchor="top middle" self="bottom middle"
                >Дополнительные возможности</q-tooltip
              >
              <q-menu anchor="bottom right" self="top middle">
                <q-list style="min-width: 100px" padding>
                  <q-item
                    clickable
                    v-close-popup
                    :href="`/lk/common/premium/route/generate-commands?bot_id=${CONFIG.BOT.id}`"
                  >
                    <q-item-section>Сгенерировать команды для @botFather</q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    class="text-red"
                    @click="state.ChangeVisibilityDialogs(true, 'sure_reset')"
                  >
                    <q-item-section>Сбросить все маршруты</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </div>

      <div class="q-pa-lg text-h6 text-center text-bold text-grey" v-if="has_routes">
        К сожалению маршрутов не нашлось...
      </div>
      <div class="row q-col-gutter-lg q-pt-md q-py-sm" v-else>
        <div
          class="col-12"
          :class="{ 'col-sm-6 col-md-3': is_rows }"
          v-for="(route, index) in filtered"
          :key="index"
        >
          <RouteItem :route="route" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, computed, ref } from "vue";
import { GetRoutes } from "../api";
import { useDataStore, useStatesStore } from "../stores";
import RouteItem from "../components/Route/RouteItem.vue";
// import { useQuasar } from "quasar";
import CONFIG from "../../botconfig";
import { TextInput } from "../types";

const main = useDataStore();
const state = useStatesStore();
// const $q = useQuasar();

const has_routes = computed(() => !filtered.value.length);
// const breakpoint = computed(() => $q.screen.lt.sm);
const is_rows = ref<boolean>(true);

const text = ref<TextInput>({
  value: "",
  max: 100,
  min: 1,
  required() {
    return this.max > this.value.length && this.min < this.value.length;
  },
});

const filter = ref<boolean>(null);

const filtered = computed(() =>
  main.AllRoutes.filter(
    (item) =>
      item.label.toLowerCase().includes(text.value.value.toLowerCase()) &&
      item.is_column !== filter.value
  )
);

onMounted(() => {
  if (!window.location.search.includes("route_id")) {
    main.ChangeLoading(true);
    GetRoutes("index").then((response) => {
      console.log(response);
      main.SetRoutes(response.data);
      main.ChangeLoading(false);
    });
  } else {
    main.ChangeLoading(true);
    let id: number;
    for (const [key, value] of Array.from(new URLSearchParams(window.location.search))) {
      if (key == "route_id") id = Number(value);
    }
    GetRoutes("view", { route_id: id }).then((response) => {
      if (response.data.result) {
        main.SetSelectRoute(response.data);
        main.ChangeTemplate("constructor");
        setTimeout(() => main.ChangeLoading(false), 300);
      }
    });
  }
});
</script>
