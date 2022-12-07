<template>
  <q-tab-panels v-model="main.MainTemplate" animated id="container">
    <q-tab-panel name="select" class="q-pa-none">
      <SelectTemplate />
    </q-tab-panel>
    <q-tab-panel name="constructor" class="q-pa-none">
      <ConstructorTemplate />
    </q-tab-panel>
  </q-tab-panels>
  <transition name="fade">
    <div class="fit absolute-center bg-white flex flex-center" v-if="main.InitLoading">
      <q-spinner color="primary" size="5em" />
    </div>
  </transition>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { useDataStore } from "../stores";

import { GetMessage } from "../api";

import ConstructorTemplate from "./ConstructorTemplate.vue";
import SelectTemplate from "./SelectTemplate.vue";

const main = useDataStore();

const CreateCurrentMass = (mass) => {
  let current = [];
  for (const [key, value] of mass) {
    current.push({ id: Number(key), title: value });
  }
  return current;
};

onMounted(() => {
  GetMessage("colors").then((res) => {
    main.SetColors(res.data);
  });
  GetMessage("types").then((res) => {
    main.SetTypes(CreateCurrentMass(Object.entries(res.data.data)));
  });
});
</script>
