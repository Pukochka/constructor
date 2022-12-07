<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-white text-black shadow-1" :class="{ 'bg-blue-1': breakpoint }">
      <div class="row justify-between items-center">
        <q-btn
          class="q-ml-md q-my-xs"
          flat
          icon="menu"
          text-color="primary"
          v-if="breakpoint"
          @click="drawer = !drawer"
        />

        <div
          class="q-px-lg"
          :class="{ 'absolute-center': breakpoint, 'bg-blue-1': !breakpoint }"
        >
          <q-avatar size="50px" square>
            <!-- <img src="/img/logo/mini_main.png" alt="bott_logo" /> -->
          </q-avatar>
        </div>
        <div class="row q-gutter-sm items-center q-mr-md">
          <q-btn-dropdown
            v-if="breakpoint"
            unelevated
            color="transparent"
            text-color="primary"
            no-caps
            no-icon-animation
            dropdown-icon="more_vert"
          >
            <ServiseLinks />
            <SupportLinks />
          </q-btn-dropdown>
          <q-btn-dropdown
            v-if="!breakpoint"
            unelevated
            dense
            color="transparent"
            text-color="primary"
            no-caps
            label="Сервисы"
          >
            <ServiseLinks />
          </q-btn-dropdown>
          <q-btn-dropdown
            v-if="!breakpoint"
            dense
            unelevated
            color="transparent"
            text-color="primary"
            no-caps
            label="Помощь"
          >
            <SupportLinks />
          </q-btn-dropdown>
        </div>
      </div>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      mini-to-overlay
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="270"
      :breakpoint="600"
      :behavior="breakpoint ? 'mobile' : 'desktop'"
      bordered
      side="left"
      class="bg-grey-1"
    >
      <q-scroll-area class="fit">
        <q-list padding class="column q-gutter-sm">
          <q-item
            v-ripple
            clickable
            class="text-primary"
            v-for="(item, index) in BotLinks"
            :key="index"
            :href="item.link"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>

            <q-item-section> {{ item.title }}</q-item-section>
          </q-item>
          <q-separator />
          <q-item
            v-ripple
            clickable
            class="text-primary"
            v-for="(item, index) in MainLinks"
            :key="index"
            :href="item.link"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>

            <q-item-section> {{ item.title }}</q-item-section>
          </q-item>
          <q-item
            v-ripple
            clickable
            class="text-primary"
            @click="state.ChangeVisibilityDialogs(true, 'sure_reset')"
          >
            <q-item-section avatar>
              <q-icon name="restart_alt" />
            </q-item-section>

            <q-item-section>Сбросить все маршруты</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <IndexTemplate />
    </q-page-container>
  </q-layout>
  <AddMessage />
  <AddRouteWithColumn />
  <AddRoute />
  <AddButton />
  <EditButton />
  <SetRoute />
  <EditRoute />
  <TestConstructor />
  <EditMessageText />
  <SettingsButtons />
  <ChangeType />
  <RouteSettings />
  <SureResetRoutes />
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import IndexTemplate from "../templates/IndexTemplate.vue";
import ServiseLinks from "./ServiseLinks.vue";
import SupportLinks from "./SupportLinks.vue";
import BotLinks from "./links/BotLinks";
import MainLinks from "./links/MainLinks";

import { useQuasar } from "quasar";
import { useStatesStore } from "../stores";

import AddMessage from "../components/Dialogs/Message/AddMessage.vue";
import AddRouteWithColumn from "../components/Dialogs/Route/AddRouteWithColumn.vue";
import AddRoute from "../components/Dialogs/Route/AddRoute.vue";
import AddButton from "../components/Dialogs/Inline/AddButton.vue";
import EditButton from "../components/Dialogs/Inline/EditButton.vue";
import EditMessageText from "../components/Dialogs/Message/EditMessageText.vue";
import TestConstructor from "../components/Dialogs/TestConstructor.vue";
import EditRoute from "../components/Dialogs/Route/EditRoute.vue";
import SetRoute from "../components/Dialogs/SetRoute.vue";
import ChangeType from "../components/Dialogs/ChangeType.vue";
import SettingsButtons from "../components/Dialogs/Inline/SettingsButtons.vue";
import RouteSettings from "../components/Dialogs/RouteWithoutColumn/RouteSettings.vue";
import SureResetRoutes from "../components/Dialogs/Sure/SureResetRoutes.vue";

const $q = useQuasar();
const state = useStatesStore();

const drawer = ref<boolean>(false);
const miniState = ref<boolean>(true);
const breakpoint = computed(() => $q.screen.lt.sm);
</script>
