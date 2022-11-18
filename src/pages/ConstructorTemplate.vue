<template>
  <div class="row">
    <div class="col-12">
      <HeaderOptions />
      <q-separator />
      <div>
        <q-scroll-area
          :thumb-style="thumbStyle"
          visible
          @scroll="ScrollPositionEffect"
          style="height: calc(100vh - 112px); width: 100%"
          class="bg-grey-3 relative-position"
        >
          <div
            class="bg-grey-3"
            :style="{ 'min-height': '890px', 'min-width': '1325px' }"
          >
            <SvgTemplate />
            <div class="row no-wrap fit q-pa-lg">
              <div
                class="flex no-wrap"
                v-for="column in main.SelectRoute.columns"
                :key="column.id"
              >
                <div class="">
                  <ColumnItem :columns="column" />
                </div>
                <div class="q-px-xl"></div>
              </div>
              <div style="width: 370px">
                <q-btn
                  no-wrap
                  rounded
                  class="full-width"
                  flat
                  color="primary"
                  :disable="true"
                  label="Добавить сообщение"
                  @click="AddMessageInLine"
                />
              </div>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { computed } from "vue";
import {
  /*useSelectStore,*/
  useDataStore,
  useStatesStore,
  useSvgStore,
} from "../stores/index";

import HeaderOptions from "../components/HeaderOptions.vue";
import ColumnItem from "../components/ColumnItem.vue";

import SvgTemplate from "../components/Svg/SvgTemplate.vue";

import { ScrollCustomEvent } from "../types";

// const select = useSelectStore();
const main = useDataStore();
const { ChangeScrollEffect } = useSvgStore();
const { ChangeVisibilityDialogs } = useStatesStore();

const thumbStyle = {
  right: "4px",
  height: "6px",
  bottom: "4px",
  padding: "2px",
  "border-radius": "5px",
  "background-color": "rgb(7, 34, 49)",
  width: "6px",
};

const AddMessageInLine = () => {
  main.ChangeIsColumn(true);
  ChangeVisibilityDialogs(true, "add_message");
};

function ScrollPositionEffect(e: ScrollCustomEvent) {
  const { horizontalPosition, verticalPosition } = e;
  ChangeScrollEffect({ horizontal: horizontalPosition, vertical: verticalPosition });
}
</script>
<style lang="scss">
.overflow-scroll-x {
  overflow-x: scroll;
  color: rgb(7, 34, 49);
}
</style>
