<template>
  <div
    ref="block_element"
    class="shadow-1 rounded-borders q-mb-xl bg-white relative-position"
    style="max-width: 370px; min-width: 370px"
  >
    <div
      @mouseenter="EnterConnect"
      @mouseleave="LeaveConnect"
      @click="Connect"
      v-if="useCursor && select.SelectedBlock.id !== block.id"
      class="fit absolute bg-black flex flex-center shadow-1 opacity-1"
      style="border-radius: inherit; z-index: 8"
    >
      <div class="text-h6 text-white text-center q-pa-xl">
        Наведите на блок и нажмите на него для связи
      </div>
    </div>

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
      <div class="q-my-sm" @click="EditBlock">
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
</template>
<script setup lang="ts">
import { defineProps, PropType, computed, ref } from "vue";
import { Block } from "../../types";

import BlockMenu from "./BlockMenu.vue";
import TextBlock from "./BlockTypes/TextBlock.vue";
import ImageBlock from "./BlockTypes/ImageBlock.vue";
import CommandButtons from "./BlockButtons/AllButtons.vue";
import EditBlockName from "../Edit/EditBlockName.vue";

import { useDialogsStore, useSelectStore, useSvgStore, useMainStore } from "../../stores";
import { useBeizerCurvature, usePolygonPoints } from "src/helpers";

const props = defineProps({
  block: Object as PropType<Block>,
});

const block_element = ref<Element>();

const { ChangeVisibilityDialogs } = useDialogsStore();
const { SelectState } = useSelectStore();
const select = useSelectStore();
const store = useSvgStore();
const main = useMainStore();
const { EndCursorFollowing } = useSvgStore();

const useCursor = computed(() => store.svg.cursor_path);

const start_x = computed(
  () =>
    main.all_commands
      .find((item) => item.id === select.SelectedCommand.id)
      .columns.find((item) => item.id === select.SelectedBlock.column_id)
      .blocks.find((item) => item.id === select.SelectedBlock.id)
      .buttons.find((item) => item.id === select.SelectedButton.id).connection.coords
      .start_x
);
const start_y = computed(
  () =>
    main.all_commands
      .find((item) => item.id === select.SelectedCommand.id)
      .columns.find((item) => item.id === select.SelectedBlock.column_id)
      .blocks.find((item) => item.id === select.SelectedBlock.id)
      .buttons.find((item) => item.id === select.SelectedButton.id).connection.coords
      .start_y
);

const AddButton = () => {
  SelectState(props.block, "block");
  ChangeVisibilityDialogs(true, "add_button");
};

const EditBlock = () => {
  SelectState(props.block, "block");
  ChangeVisibilityDialogs(true, "edit_block");
};

const EnterConnect = () => {
  console.log("ok");
};

const LeaveConnect = () => {
  console.log("disable");
};

const Connect = () => {
  main.all_commands
    .find((item) => item.id === select.SelectedCommand.id)
    .columns.find((item) => item.id === props.block.column_id)
    .blocks.find((item) => item.id === props.block.id).connection_count++;
  const { x, y, width } = block_element.value.getBoundingClientRect();

  const count = props.block.connection_count;
  let dpi_x = x - store.gett.parent.x - 13 + store.gett.scroll_effect.horizontal;
  const dpi_y = y - store.gett.parent.y + 20 * count + store.gett.scroll_effect.vertical;

  if (dpi_x < start_x.value) {
    dpi_x =
      x - store.gett.parent.x - 13 + store.gett.scroll_effect.horizontal + width + 25;
  }

  const current_coords = {
    start_x: start_x.value,
    start_y: start_y.value,
    path: useBeizerCurvature(start_x.value, start_y.value, dpi_x, dpi_y),
    polygon: usePolygonPoints(dpi_x, dpi_y, start_x.value),
  };

  EndCursorFollowing(current_coords);
};
</script>
<style lang="scss">
.opacity-1 {
  opacity: 0.6;
}
</style>
