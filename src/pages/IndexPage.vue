<template>
  <q-page class="row">
    <div class="col-12 q-pl-xl">
      <HeaderOptions />
      <div>
        <q-scroll-area
          :thumb-style="thumbStyle"
          visible
          style="height: calc(100vh - 56px); width: 100%"
          class="row relative-position rounded-borders bg-grey-3 shadow-1"
        >
          <SvgTemplate />
          <div class="row no-wrap q-pa-md q-col-gutter-xl">
            <div class="column" v-for="(item, index) in filtered_commands" :key="index">
              <BlockView v-for="block in item.blocks" :key="block.id" :block="block" />
              <div class="row q-mt-sm q-mb-xl">
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
            <div class="" style="width: 370px">
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
        </q-scroll-area>
      </div>
    </div>
    <AddCommand />
    <AddBlock />
    <AddButton />
    <EditButton />
    <SetRoute />
  </q-page>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSelectStore, useMainStore, useDialogsStore } from "../stores/index";

import HeaderOptions from "../components/HeaderOptions.vue";
import BlockView from "../components/Block/BlockView.vue";
import AddCommand from "../components/Dialogs/AddBlock.vue";
import AddBlock from "../components/Dialogs/AddCommand.vue";
import AddButton from "../components/Dialogs/AddButton.vue";
import EditButton from "../components/Dialogs/EditButton.vue";
import SetRoute from "../components/Dialogs/SetRoute.vue";
import SvgTemplate from "../components/Svg/SvgTemplate.vue";

import { Column } from "../types/types";

const select = useSelectStore();
const main = useMainStore();
const { ChangeVisibilityDialogs } = useDialogsStore();

const thumbStyle = {
  right: "4px",
  height: "5px",
  bottom: "4px",
  padding: "2px",
  "border-radius": "5px",
  "background-color": "rgb(84, 72, 72)",
  width: "5px",
  "z-index": 100,
};

const filtered_commands = computed(
  () => main.all_commands.find((item) => item.id === select.SelectedCommand.id).columns
);

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
  color: rgb(84, 72, 72);
}
</style>
