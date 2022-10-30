<template>
  <div
    class="custom-outline rounded-borders q-mb-xl"
    style="max-width: 370px; min-width: 370px"
  >
    <div class="q-pa-sm q-px-md flex justify-between">
      <EditBlockName :block="block" />

      <div class="">
        <q-btn
          color="primary"
          flat
          round
          dense
          icon="more_vert"
          @click="SelectState(block, 'block')"
        >
          <BlockMenu />
          <q-tooltip anchor="top middle" self="bottom middle">
            Настройки экрана
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <div class="q-px-md q-pb-md">
      <div class="q-py-sm">
        <TextBlock :block="block" v-if="block.type === 0" />
        <ImageBlock :block="block" v-if="block.type === 1" />
      </div>

      <CommandButtons :block="block" />

      <div class="row q-mt-sm">
        <q-btn
          color="primary"
          flat
          rounded
          label="Добавить кнопку"
          class="col-12"
          @click="AddButton"
        />
      </div>
    </div>
  </div>
  <!-- <div class="row q-mt-sm q-mb-xl">
    <q-btn
      rounded
      flat
      color="primary"
      label="Добавить экран"
      class="col-12"
      @click="ChangeVisibilityDialogs(true, 'add_block')"
    />
  </div> -->
</template>
<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { Block } from "../../types/types";

import BlockMenu from "./BlockMenu.vue";
import TextBlock from "./BlockTypes/TextBlock.vue";
import ImageBlock from "./BlockTypes/ImageBlock.vue";
import CommandButtons from "./BlockButtons/AllButtons.vue";
import EditBlockName from "../Edit/EditBlockName.vue";

import { useDialogsStore, useSelectStore } from "../../stores/index";

const { ChangeVisibilityDialogs } = useDialogsStore();
const { SelectState } = useSelectStore();

const AddButton = () => {
  SelectState(props.block, "block");
  ChangeVisibilityDialogs(true, "add_button");
};

const props = defineProps({
  block: Object as PropType<Block>,
});
</script>
<style lang="scss"></style>
