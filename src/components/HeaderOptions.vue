<template>
  <div class="row justify-between items-center q-pa-sm" style="height: 50px">
    <div class="flex">
      <!-- <q-select
        style="width: 150px"
        rounded
        dense
        outlined
        v-model="select_state"
        :options="main.Commands"
      /> -->
      <q-btn
        color="primary"
        dense
        class="q-px-md"
        text-color="primary"
        :label="select_state.label"
        :icon="menu_state ? 'keyboard_arrow_down' : 'chevron_right'"
        unelevated
        flat
        rounded
      >
        <q-menu fit v-model="menu_state">
          <q-list class="q-py-xs">
            <q-item
              @click="select_state = item"
              clickable
              v-close-popup
              class="text-primary text-bold"
              :class="{ 'bg-primary text-white': select_state.label === item.label }"
              v-for="(item, index) in main.Commands"
              :key="index"
            >
              <q-item-section>{{ item.label }}</q-item-section>
            </q-item>
            <q-item
              @click="ChangeVisibilityDialogs(true, 'add_command')"
              clickable
              v-close-popup
              class="flex items-center text-secondary rotate-animation"
            >
              <div class="rotate-animation-item">
                <q-icon size="24px" name="add" />
              </div>

              <q-item-section class="q-pl-sm">Добавить команду</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
    <div class="row q-gutter-sm">
      <!-- <div class="rounded-borders custom-outline">
        <q-btn color="primary" dense flat icon="image" @click="CreateColumn" />
        <q-btn
          color="primary"
          dense
          flat
          icon="fullscreen"
          @click="GetItems"
          :loading="store.Loadings.route.index"
        />
        <q-btn color="primary" dense flat icon="check" @click="Get" />
        <q-btn color="primary" dense flat icon="delete" @click="Delete" />
      </div> -->
      <!-- <q-btn color="white" text-color="black" label="Standard" @click="Show" /> -->

      <q-btn
        dense
        flat
        color="primary"
        text-color="primary"
        icon="mode_comment"
        label="Тестировать"
        class="q-px-md"
        rounded
        @click="ChangeVisibilityDialogs(true, 'test_constructor')"
      />

      <div class="rounded-borders custom-outline">
        <q-btn color="primary" dense flat icon="add" @click="main.AddScale" />
        <q-btn color="primary" dense flat icon="remove" @click="main.RemoveScale" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import type { Command } from "../types";
// import { GetRoutes } from "../api";
import { useSelectStore, useMainStore, useStatesStore } from "../stores";

const select = useSelectStore();
const main = useMainStore();
const { ChangeVisibilityDialogs } = useStatesStore();
// const store = useStatesStore();

const select_state = ref<Command>(main.Commands[0]);
const menu_state = ref<boolean>(false);

watch(select_state, () => select.SelectState(select_state.value, "command"));

// const Show = () => {
//   console.log(main.all_commands);
// };

// const GetItems = () => {
//   GetRoutes("index").then((response) => {
//     console.log(response);
//   });
// };

// const Get = () => {
//   GetRoutes("view", { route_id: 1058682 }).then((response) => {
//     console.log(response);
//   });
// };

// const Delete = () => {
//   GetRoutes("delete", { route_id: 148523 }).then((response) => {
//     console.log(response);
//   });
// };
// const CreateColumn = () => {
//   GetRoutes("create", {
//     route: "index",
//     message: "пе",
//   }).then((response) => {
//     console.log(response.data);
//   });
// };
</script>
<style lang="scss">
.rotate-animation-item {
  transition: 0.3s transform ease;
}
.rotate-animation:hover .rotate-animation-item {
  transform: rotate(180deg);
}
</style>
