<template>
  <div>
    <div class="bg-grey-3 q-pa-md relative-position" style="height: calc(100vh - 60px)">
      <div class="absolute-center" v-if="state.Loadings.route.index">
        <q-spinner color="primary" size="5em" />
      </div>

      <div class="row items-center">
        <q-icon name="route" size="26px" color="primary" />

        <div class="q-pl-md text-h5 text-bold">Мои маршруты</div>
      </div>
      <q-separator class="q-my-sm" />
      <div class="row justify-between q-mt-sm">
        <q-btn
          flat
          rounded
          icon-right="add"
          color="primary"
          label="Добавить маршрут"
          @click="ChangeVisibilityDialogs(true, 'add_route')"
        />
        <div class="row q-gutter-sm">
          <q-btn
            @click="is_rows = false"
            :outline="!is_rows"
            :flat="is_rows"
            dense
            icon="list"
            color="primary"
            text-color="primary"
          />
          <q-btn
            @click="is_rows = true"
            :outline="is_rows"
            :flat="!is_rows"
            dense
            icon="calendar_view_month"
            color="primary"
            text-color="primary"
          />
        </div>
      </div>

      <div
        class="text-center text-h6 text-bold"
        v-if="has_routes && !state.Loadings.route.index"
      >
        Пока что маршрутов нет. Добавьте их!
      </div>
      <div class="row q-col-gutter-md q-pt-md" v-else>
        <div
          class="col-12"
          :class="{ 'col-sm-6 col-md-4': is_rows }"
          v-for="(route, index) in main.AllRoutes"
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

const main = useDataStore();
const state = useStatesStore();
const { ChangeVisibilityDialogs } = useStatesStore();
const { SetRoutes } = useDataStore();

const has_routes = computed(() => !main.AllRoutes.length);

const is_rows = ref<boolean>(false);

onMounted(() => {
  if (has_routes.value)
    GetRoutes("index").then((response) => SetRoutes(response.data, "index"));
});
</script>
