<template>
  <q-page class="row">
    <div class="col-12 q-pl-xl">
      <HeaderOptions />
      <q-separator />
      <div>
        <q-scroll-area
          :thumb-style="thumbStyle"
          visible
          @scroll="ScrollPositionEffect"
          style="height: calc(100vh - 52px); width: 100%"
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
                v-for="(item, index) in filtered_commands"
                :key="index"
              >
                <div class="">
                  <BlockView
                    v-for="block in item.blocks"
                    :key="block.id"
                    :block="block"
                  />
                  <div class="row">
                    <q-btn
                      rounded
                      flat
                      color="primary"
                      label="Добавить экран"
                      class="col-12"
                      @click="AddBlockInColumn(item)"
                    />
                  </div>
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
                  label="Добавить экран"
                  @click="AddBlockWithLine"
                />
              </div>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </div>
    <AddCommand />
    <AddBlock />
    <AddButton />
    <EditButton />
    <SetRoute />
    <EditBlock />
    <TestConstructor />
  </q-page>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  useSelectStore,
  useMainStore,
  useStatesStore,
  useSvgStore,
} from "../stores/index";

import HeaderOptions from "../components/HeaderOptions.vue";
import BlockView from "../components/Block/BlockView.vue";
import AddCommand from "../components/Dialogs/AddBlock.vue";
import AddBlock from "../components/Dialogs/AddCommand.vue";
import AddButton from "../components/Dialogs/AddButton.vue";
import EditButton from "../components/Dialogs/EditButton.vue";
import EditBlock from "../components/Dialogs/EditBlock.vue";
import TestConstructor from "../components/Dialogs/TestConstructor.vue";
import SetRoute from "../components/Dialogs/SetRoute.vue";
import SvgTemplate from "../components/Svg/SvgTemplate.vue";

import { Column, ScrollCustomEvent } from "../types";

const select = useSelectStore();
const main = useMainStore();
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

const filtered_commands = computed(
  () => main.all_commands.find((item) => item.id === select.SelectedCommand.id).columns
);

function ScrollPositionEffect(e: ScrollCustomEvent) {
  const { horizontalPosition, verticalPosition } = e;
  ChangeScrollEffect({ horizontal: horizontalPosition, vertical: verticalPosition });
}

const AddBlockInColumn = (item: Column) => {
  select.SelectState(item, "column");
  ChangeVisibilityDialogs(true, "add_block");
};

const AddBlockWithLine = () => {
  select.SelectState({ id: -1, blocks: [], command_id: -1 }, "column");
  ChangeVisibilityDialogs(true, "add_block");
};
</script>
<style lang="scss">
.overflow-scroll-x {
  overflow-x: scroll;
  color: rgb(7, 34, 49);
}
</style>
