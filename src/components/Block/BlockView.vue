<template>
  <div
    ref="block_element"
    class="shadow-1 rounded-borders q-mb-md bg-white relative-position"
    style="max-width: 370px; min-width: 370px"
    :id="`block_${block.id}`"
  >
    <transition name="fade">
      <div
        @click="Connect"
        v-if="useCursor && select.SelectedBlock.id !== block.id"
        class="fit absolute custom-grey flex flex-center shadow-1"
        style="border-radius: inherit; z-index: 8"
      >
        <div class="text-h5 text-white text-center">
          Наведите на блок и нажмите на него для связи
        </div>
      </div>
    </transition>
    <div
      class="q-pa-sm q-px-md flex justify-between"
      :class="{ 'active-blur': useCursor && select.SelectedBlock.id !== block.id }"
    >
      <EditBlockName :block="block" />
      <div class="">
        <q-btn
          color="primary"
          flat
          round
          dense
          size="11px"
          icon="more_vert"
          @click="SelectState(block, 'block')"
        >
          <BlockMenu :block="block" />
          <q-tooltip anchor="top middle" self="bottom middle">
            Настройки блока
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <div
      class="q-px-md q-pb-sm"
      :class="{ 'active-blur': useCursor && select.SelectedBlock.id !== block.id }"
    >
      <div class="q-my-sm">
        <TextBlock :block="block" v-if="block.type === 0" />
        <ImageBlock :block="block" v-if="block.type === 1" />
      </div>

      <CommandButtons
        :block="block"
        :class="{ 'active-blur': useCursor && select.SelectedBlock.id !== block.id }"
      />

      <div
        class="row q-mt-sm"
        :class="{ 'active-blur': useCursor && select.SelectedBlock.id !== block.id }"
      >
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
import { defineProps, PropType, computed, ref, onUpdated } from "vue";
import { Block } from "../../types";

import BlockMenu from "./BlockMenu.vue";
import TextBlock from "./BlockTypes/TextBlock.vue";
import ImageBlock from "./BlockTypes/ImageBlock.vue";
import CommandButtons from "./BlockButtons/AllButtons.vue";
import EditBlockName from "../Edit/EditBlockName.vue";

import { useStatesStore, useSelectStore, useSvgStore, useMainStore } from "../../stores";
import { useBeizerCurvature, usePolygonPoints } from "src/helpers";

const props = defineProps({
  block: Object as PropType<Block>,
});

const block_element = ref<Element>();

const select = useSelectStore();
const store = useSvgStore();
const main = useMainStore();
const { ChangeVisibilityDialogs } = useStatesStore();
const { SelectState } = useSelectStore();
const { EndCursorFollowing, UpdateButtons } = useSvgStore();

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

const is_reverse = computed(
  () =>
    main.all_commands
      .find((item) => item.id === select.SelectedCommand.id)
      .columns.find((item) => item.id === select.SelectedBlock.column_id)
      .blocks.find((item) => item.id === select.SelectedBlock.id)
      .buttons.find((item) => item.id === select.SelectedButton.id).connection.reverse
);

const AddButton = () => {
  SelectState(props.block, "block");
  ChangeVisibilityDialogs(true, "add_button");
};

// const ConnectWithBlock = (id:number) =>{
//   return
// }

const Connect = () => {
  main.all_commands
    .find((item) => item.id === select.SelectedCommand.id)
    .columns.find((item) => item.id === props.block.column_id)
    .blocks.find((item) => item.id === props.block.id)
    .connected.push(select.SelectedButton.id);

  main.all_commands
    .find((item) => item.id === select.SelectedCommand.id)
    .columns.find((item) => item.id === select.SelectedBlock.column_id)
    .blocks.find((item) => item.id === select.SelectedBlock.id)
    .buttons.find(
      (item) => item.id === select.SelectedButton.id
    ).element = main.all_commands
    .find((item) => item.id === select.SelectedCommand.id)
    .columns.find((item) => item.id === props.block.column_id)
    .blocks.find((item) => item.id === props.block.id)
    .connected.indexOf(select.SelectedButton.id);

  main.all_commands
    .find((item) => item.id === select.SelectedCommand.id)
    .columns.find((item) => item.id === select.SelectedBlock.column_id)
    .blocks.find((item) => item.id === select.SelectedBlock.id)
    .buttons.find((item) => item.id === select.SelectedButton.id).connection.type = 5;

  main.all_commands
    .find((item) => item.id === select.SelectedCommand.id)
    .columns.find((item) => item.id === select.SelectedBlock.column_id)
    .blocks.find((item) => item.id === select.SelectedBlock.id)
    .buttons.find(
      (item) => item.id === select.SelectedButton.id
    ).connection.to = `system/free?id=${props.block.id}`;

  main.all_commands
    .find((item) => item.id === select.SelectedCommand.id)
    .columns.find((item) => item.id === select.SelectedBlock.column_id)
    .blocks.find((item) => item.id === select.SelectedBlock.id)
    .buttons.find((item) => item.id === select.SelectedButton.id).connection.toRoute = {
    block_id: props.block.id,
    column_id: props.block.column_id,
  };

  const { x, y, width } = block_element.value.getBoundingClientRect();

  const count = props.block.connected.indexOf(select.SelectedButton.id);

  let dpi_x = x - store.gett.parent.x - 13 + store.gett.scroll_effect.horizontal;
  const dpi_y = y - store.gett.parent.y + 20 * count + store.gett.scroll_effect.vertical;

  if (is_reverse.value && dpi_x > start_x.value - 86) {
    dpi_x = x - store.gett.parent.x - 13 + store.gett.scroll_effect.horizontal;
  } else if (!is_reverse.value && dpi_x < start_x.value + 86) {
    dpi_x =
      x - store.gett.parent.x - 13 + store.gett.scroll_effect.horizontal + width + 25;
  } else if (!is_reverse.value && dpi_x > start_x.value + 86) {
    dpi_x = x - store.gett.parent.x - 13 + store.gett.scroll_effect.horizontal;
  } else if (is_reverse.value && dpi_x < start_x.value - 86) {
    dpi_x =
      x - store.gett.parent.x - 13 + store.gett.scroll_effect.horizontal + width + 25;
  }
  // if (dpi_y > height) {
  //   console.log(1);
  //   console.log(props.block.id);
  //   document.getElementById(`block_${props.block.id}`).style.height = `${height + 10}px`;
  // }

  const current_coords = {
    start_x: start_x.value,
    start_y: start_y.value,
    end_x: dpi_x,
    end_y: dpi_y,
    path: useBeizerCurvature(
      start_x.value,
      start_y.value,
      dpi_x,
      dpi_y,
      is_reverse.value
    ),
    polygon: usePolygonPoints(dpi_x, dpi_y, start_x.value, is_reverse.value),
  };

  EndCursorFollowing(current_coords);
};
onUpdated(() => UpdateButtons());
</script>
<style lang="scss">
.opacity-1 {
  opacity: 0.7;
}
.active-blur {
  filter: blur(2px);
}
.custom-grey {
  background: rgba(81, 80, 80, 0.75);
}
</style>
