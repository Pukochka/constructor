<template>
  <div
    ref="block_element"
    class="shadow-1 rounded-borders q-mb-md bg-white relative-position"
    style="max-width: 370px; min-width: 370px"
    :id="`block_${message.id}`"
  >
    <transition name="fade">
      <div
        v-if="useCursor && select.SelectedMessage.id !== message.id"
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
      :class="{ 'active-blur': useCursor && select.SelectedMessage.id !== message.id }"
    >
      <EditBlockName :message="message" />
      <div class="">
        <q-btn
          color="primary"
          flat
          round
          dense
          size="11px"
          icon="more_vert"
          @click="SelectState(message, 'message')"
        >
          <MessageMenu :message="message" />
          <q-tooltip anchor="top middle" self="bottom middle">
            Настройки блока
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <div
      class="q-px-md q-pb-sm"
      :class="{ 'active-blur': useCursor && select.SelectedMessage.id !== message.id }"
    >
      <div class="q-mt-sm" @click="SelectState(message, 'message')">
        <TextMessage :message="message" v-if="message.type.id === 0" />
        <ImageMessage :message="message" v-if="message.type.id === 1" />
        <FeedBackMessage :message="message" v-if="message.type.id === 2" />
        <FileMessage :message="message" v-if="message.type.id === 3" />
        <VideoMessage :message="message" v-if="message.type.id === 4" />
      </div>

      <InlineMenu
        :message="message"
        :class="{ 'active-blur': useCursor && select.SelectedMessage.id !== message.id }"
      />

      <div
        class="row q-mt-sm"
        :class="{ 'active-blur': useCursor && select.SelectedMessage.id !== message.id }"
      >
        <q-btn
          v-if="!message.inline_menu"
          color="primary"
          flat
          rounded
          label="Добавить инлайн меню"
          class="col-12"
          :loading="state.Loadings.message['add-inline-menu']"
          @click="AddInlineMenu"
        />
        <q-btn
          v-else
          color="primary"
          flat
          rounded
          label="Настройки кнопок"
          class="col-12"
          @click="EditButtons"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, PropType, computed, ref /*, onUpdated */ } from "vue";
import { MessageInstance } from "../../types";

import MessageMenu from "./MessageMenu.vue";
import TextMessage from "./MessageTypes/TextMessage.vue";
import ImageMessage from "./MessageTypes/ImageMessage.vue";
import FeedBackMessage from "./MessageTypes/FeedBackMessage.vue";
import FileMessage from "./MessageTypes/FileMessage.vue";
import VideoMessage from "./MessageTypes/VideoMessage.vue";
import InlineMenu from "./MessageButtons/InlineMenu.vue";
import EditBlockName from "../Edit/EditBlockName.vue";

import { GetMessage } from "../../api";

import { useStatesStore, useSelectStore, useSvgStore, useDataStore } from "../../stores";
// import { useBeizerCurvature, usePolygonPoints } from "src/helpers";

const props = defineProps({
  message: Object as PropType<MessageInstance>,
});

const block_element = ref<Element>();

const select = useSelectStore();
const store = useSvgStore();
const state = useStatesStore();
const { AddInlineMenuInMessage } = useDataStore();
const { ChangeVisibilityDialogs, ChangeLoadingMessage } = useStatesStore();
const { SelectState } = useSelectStore();
// const { EndCursorFollowing, UpdateButtons } = useSvgStore();

const useCursor = computed(() => store.svg.cursor_path);

const AddInlineMenu = () => {
  GetMessage("add-inline-menu", { message_id: props.message.id }).then((response) => {
    if (response.data.result) {
      ChangeLoadingMessage(false, "add-inline-menu");
      AddInlineMenuInMessage(props.message.id, response.data.data);
    } else {
      console.warn("eeerrrr");
    }
  });
};

const EditButtons = () => {
  SelectState(props.message, "message");
  ChangeVisibilityDialogs(true, "settings_buttons");
};
// const start_x = computed(
//   () => store.all_buttons.find((item) => item.id === store.gett.moving_line).start_x
// );
// const start_y = computed(
//   () => store.all_buttons.find((item) => item.id === store.gett.moving_line).start_y
// );
// const is_reverse = computed(
//   () =>
//     main.all_commands
//       .find((item) => item.id === select.SelectedCommand.id)
//       .columns.find((item) => item.id === select.SelectedBlock.column_id)
//       .blocks.find((item) => item.id === select.SelectedBlock.id)
//       .buttons.find((item) => item.id === select.SelectedButton.id).connection.reverse
// );

// const AddButton = () => {
//   SelectState(props.block, "block");
//   ChangeVisibilityDialogs(true, "add_button");
// };

// const Connect = () => {
//   main.all_commands
//     .find((item) => item.id === select.SelectedCommand.id)
//     .columns.find((item) => item.id === props.block.column_id)
//     .blocks.find((item) => item.id === props.block.id)
//     .connected.push(select.SelectedButton.id);

//   store.svg.collections.find(
//     (item) => item.id === select.SelectedButton.id
//   ).position = main.all_commands
//     .find((item) => item.id === select.SelectedCommand.id)
//     .columns.find((item) => item.id === props.block.column_id)
//     .blocks.find((item) => item.id === props.block.id)
//     .connected.indexOf(select.SelectedButton.id);

//   main.all_commands
//     .find((item) => item.id === select.SelectedCommand.id)
//     .columns.find((item) => item.id === select.SelectedBlock.column_id)
//     .blocks.find((item) => item.id === select.SelectedBlock.id)
//     .buttons.find((item) => item.id === select.SelectedButton.id).type = 5;

//   main.all_commands
//     .find((item) => item.id === select.SelectedCommand.id)
//     .columns.find((item) => item.id === select.SelectedBlock.column_id)
//     .blocks.find((item) => item.id === select.SelectedBlock.id)
//     .buttons.find(
//       (item) => item.id === select.SelectedButton.id
//     ).connection.route = `system/free?id=${props.block.id}`;

//   main.all_commands
//     .find((item) => item.id === select.SelectedCommand.id)
//     .columns.find((item) => item.id === select.SelectedBlock.column_id)
//     .blocks.find((item) => item.id === select.SelectedBlock.id)
//     .buttons.find(
//       (item) => item.id === select.SelectedButton.id
//     ).connection.connected_with = {
//     block_id: props.block.id,
//     column_id: props.block.column_id,
//   };

//   const { x, y, width } = block_element.value.getBoundingClientRect();

//   const count = props.block.connected.indexOf(select.SelectedButton.id);

//   let dpi_x = x - store.gett.parent.x - 13 + store.gett.scroll_effect.horizontal;
//   const dpi_y = y - store.gett.parent.y + 20 * count + store.gett.scroll_effect.vertical;

//   if (is_reverse.value && dpi_x > start_x.value - 86) {
//     dpi_x = x - store.gett.parent.x - 13 + store.gett.scroll_effect.horizontal;
//   } else if (!is_reverse.value && dpi_x < start_x.value + 86) {
//     dpi_x =
//       x - store.gett.parent.x - 13 + store.gett.scroll_effect.horizontal + width + 25;
//   } else if (!is_reverse.value && dpi_x > start_x.value + 86) {
//     dpi_x = x - store.gett.parent.x - 13 + store.gett.scroll_effect.horizontal;
//   } else if (is_reverse.value && dpi_x < start_x.value - 86) {
//     dpi_x =
//       x - store.gett.parent.x - 13 + store.gett.scroll_effect.horizontal + width + 25;
//   }
//   // if (dpi_y > height) {
//   //   console.log(1);
//   //   console.log(props.block.id);
//   //   document.getElementById(`block_${props.block.id}`).style.height = `${height + 10}px`;
//   // }

//   const current_coords = {
//     id: store.gett.moving_line,
//     block_id: props.block.id,
//     column_id: props.block.column_id,
//     position: count,
//     start_x: start_x.value,
//     start_y: start_y.value,
//     end_x: dpi_x,
//     end_y: dpi_y,
//     path: useBeizerCurvature(
//       start_x.value,
//       start_y.value,
//       dpi_x,
//       dpi_y,
//       is_reverse.value
//     ),
//     polygon: usePolygonPoints(dpi_x, dpi_y, start_x.value, is_reverse.value),
//   };

//   EndCursorFollowing(current_coords);
// };
// onUpdated(() => {
//   UpdateButtons();
// });
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
