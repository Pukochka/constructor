<template>
  <div class="row relative-position">
    <div class="col-12">
      <HeaderOptions />
      <q-separator />
      <div>
        <q-scroll-area
          :thumb-style="thumbStyle"
          visible
          @scroll="ScrollPositionEffect"
          style="height: calc(100vh - 101px); width: 100%"
          class="bg-grey-2 relative-position"
          id="drag-copy-element"
        >
          <div
            id="container"
            class="bg-grey-2"
            :style="{
              'min-height': '890px',
              'min-width': '1325px',
              transform: `scale(${vector.Scale})`,
              'transform-origin': 'left top',
            }"
          >
            <VectorTemplate v-show="!is_dragging" />
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
import { computed, onMounted, watch } from "vue";
import { useDataStore, useStatesStore, useVectorStore } from "../stores";
import { useUpdateLines } from "../helpers";

import HeaderOptions from "../components/HeaderOptions.vue";
import ColumnItem from "../components/ColumnItem.vue";

import VectorTemplate from "./VectorTemplate.vue";

const main = useDataStore();
const state = useStatesStore();
const vector = useVectorStore();

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
  state.ChangeVisibilityDialogs(true, "add_message");
};

function ScrollPositionEffect(e) {
  const { horizontalPosition, verticalPosition } = e;

  vector.ChangeScrollEffect({
    horizontal: horizontalPosition,
    vertical: verticalPosition,
  });
}

const is_dragging = computed(() => state.is_dragging);

watch(is_dragging, (val) => {
  if (!val) setTimeout(() => useUpdateLines(false), 180);
});

onMounted(() => {
  setTimeout(() => useUpdateLines(true), 310);
});
</script>
<style lang="scss">
.connectons-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: block;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  overflow: visible;
}
.custom-grey {
  background: rgba(81, 80, 80, 0.75);
}
</style>
