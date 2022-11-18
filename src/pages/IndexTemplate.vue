<template>
  <div
    style="
      padding-left: 80px;
      padding-top: 60px;
      background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
    "
  >
    <q-tab-panels v-model="main.MainTemplate" animated>
      <q-tab-panel name="select" class="q-pa-none">
        <SelectTemplate />
      </q-tab-panel>
      <q-tab-panel name="constructor" class="q-pa-none">
        <ConstructorTemplate />
      </q-tab-panel>
    </q-tab-panels>
  </div>

  <AddMessage />
  <AddRoute />
  <AddButton />
  <EditButton />
  <SetRoute />
  <EditRoute />
  <TestConstructor />
  <EditMessageText />
  <SettingsButtons />
  <ChangeType />
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { useDataStore } from "../stores";
import ConstructorTemplate from "./ConstructorTemplate.vue";
import SelectTemplate from "./SelectTemplate.vue";

import AddMessage from "../components/Dialogs/Message/AddMessage.vue";
import AddRoute from "../components/Dialogs/Route/AddRoute.vue";
import AddButton from "../components/Dialogs/Inline/AddButton.vue";
import EditButton from "../components/Dialogs/Inline/EditButton.vue";
import EditMessageText from "../components/Dialogs/Message/EditMessageText.vue";
import TestConstructor from "../components/Dialogs/TestConstructor.vue";
import EditRoute from "../components/Dialogs/Route/EditRoute.vue";
import SetRoute from "../components/Dialogs/SetRoute.vue";
import ChangeType from "../components/Dialogs/ChangeType.vue";
import SettingsButtons from "../components/Dialogs/Inline/SettingsButtons.vue";
import { GetMessage } from "../api";

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
    main.SetColors(res.data, "colors");
  });
  GetMessage("types").then((res) => {
    main.SetTypes(CreateCurrentMass(Object.entries(res.data.data)), "types");
  });
});
</script>
