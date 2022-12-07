<template>
  <DragHelperHorizontal
    :column_id="message.column_id"
    :sort="index"
    v-if="drag_id !== message.id"
  />
  <div
    :id="`message_${message.id}`"
    class="shadow-1 rounded-borders q-mb-md bg-white relative-position"
    style="max-width: 370px; min-width: 370px"
  >
    <div class="absolute-top-left q-pt-sm cursor-move" @mousedown="DragStart">
      <q-icon color="grey" name="drag_indicator" size="18px">
        <q-tooltip anchor="top middle" self="bottom middle">
          Зажмите, для перемещения
        </q-tooltip>
      </q-icon>
    </div>
    <teleport to="#drag-copy-element" v-if="is_dragging && drag_id === message.id">
      <div
        class="shadow-3 rounded-borders q-pa-md bg-white"
        :style="{
          width: '200px',
          top: drag_coords.top + 'px',
          left: drag_coords.left + 'px',
          position: 'absolute',
        }"
      >
        <EditBlockName :message="message" />
        <div class="q-mt-sm ellipsis">{{ message.text.content }}</div>
      </div>
    </teleport>
    <div class="absolute-top-left" id="edit_title"></div>
    <q-badge class="q-pa-sm" v-if="message.active" floating rounded>
      <q-tooltip
        transition-show="scale"
        transition-hide="scale"
        class="bg-primary"
        anchor="center middle"
        self="bottom middle"
      >
        Стартовое сообщение
      </q-tooltip>
      <q-popup-proxy>
        <q-banner> Это первое сообщение, которое бот пришлет пользователю. </q-banner>
      </q-popup-proxy>
    </q-badge>
    <transition name="fade">
      <div
        @click="ConnectLine"
        v-if="vector.is_active && select.SelectedMessage.id !== message.id"
        class="fit absolute custom-grey flex flex-center shadow-1"
        style="border-radius: inherit; z-index: 8"
      >
        <q-tooltip class="bg-red text-subtitle1" anchor="top middle" self="top middle">
          Нажмите для связи
        </q-tooltip>
        <div class="text-h5 text-white text-center">
          Наведите на блок и нажмите на него для связи
        </div>
      </div>
    </transition>
    <div
      class="q-pa-sm q-px-md flex justify-between"
      :class="{
        'active-blur': vector.is_active && select.SelectedMessage.id !== message.id,
      }"
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
          @click="select.SelectState(message, 'message')"
        >
          <MessageMenu :message="message" />
          <q-tooltip anchor="top middle" self="bottom middle">
            Настройки сообщения
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <div
      class="q-px-md q-pb-sm"
      :class="{
        'active-blur': vector.is_active && select.SelectedMessage.id !== message.id,
      }"
    >
      <div class="q-mt-sm" @click="select.SelectState(message, 'message')">
        <TextMessage :message="message" v-if="message.type.id === 0" />
        <ImageMessage :message="message" v-if="message.type.id === 1" />
        <FeedBackMessage :message="message" v-if="message.type.id === 2" />
        <FileMessage :message="message" v-if="message.type.id === 3" />
        <VideoMessage :message="message" v-if="message.type.id === 4" />
        <GifMessage :message="message" v-if="message.type.id === 5" />
      </div>

      <InlineMenu
        :message="message"
        :class="{
          'active-blur': vector.is_active && select.SelectedMessage.id !== message.id,
        }"
      />

      <div
        class="row q-mt-sm"
        :class="{
          'active-blur': vector.is_active && select.SelectedMessage.id !== message.id,
        }"
      >
        <q-btn
          v-if="!message.inline_menu"
          color="primary"
          flat
          rounded
          label="Добавить кнопки"
          class="col-12"
          :loading="loading_add_inline"
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
import { defineProps, PropType, ref, onUpdated, computed } from "vue";
import { MessageInstance } from "../../types";

import TextMessage from "./MessageTypes/TextMessage.vue";
import ImageMessage from "./MessageTypes/ImageMessage.vue";
import FeedBackMessage from "./MessageTypes/FeedBackMessage.vue";
import FileMessage from "./MessageTypes/FileMessage.vue";
import VideoMessage from "./MessageTypes/VideoMessage.vue";
import GifMessage from "./MessageTypes/GifMessage.vue";

import MessageMenu from "./MessageMenu.vue";
import InlineMenu from "./MessageButtons/InlineMenu.vue";
import EditBlockName from "../Edit/EditBlockName.vue";
import DragHelperHorizontal from "../Dragging/DragHelperHorizontal.vue";

import { GetMessage, GetInlineMenu } from "../../api";
import { useUpdateLines, useDragging } from "../../helpers";

import {
  useStatesStore,
  useSelectStore,
  useVectorStore,
  useDataStore,
} from "../../stores";

const props = defineProps({
  message: Object as PropType<MessageInstance>,
  index: Number,
});

const select = useSelectStore();
const main = useDataStore();
const state = useStatesStore();
const vector = useVectorStore();

const loading_add_inline = ref<boolean>(false);
const drag_id = ref<number>(-1);
const drag_coords = ref({ top: 0, left: 0 });

const is_dragging = computed(() => state.is_dragging);

const ConnectLine = () => {
  vector.EndFollowing(props.message.id);
  GetInlineMenu("update-data-and-type", {
    id: select.SelectedButton.id,
    text: select.SelectedButton.data.text,
    action: props.message.id,
    type: 5,
  }).then((response) => {
    main.SetSelectRoute(JSON.parse(response.data));
  });
};

const AddInlineMenu = () => {
  loading_add_inline.value = true;
  GetMessage("add-inline-menu", { message_id: props.message.id }).then((response) => {
    loading_add_inline.value = false;
    main.SetSelectRoute(response.data);
  });
};

const EditButtons = () => {
  select.SelectState(props.message, "message");
  state.ChangeVisibilityDialogs(true, "settings_buttons");
};

const DragStart = () => {
  document.addEventListener("mousemove", DragMove, false);
  document.addEventListener("mouseup", DragEnd, false);
  select.SelectState(props.message, "message");
  state.ChangeDrag(true);
  drag_id.value = props.message.id;
};

const DragMove = (evt: MouseEvent) => {
  drag_coords.value = useDragging(evt.y, evt.x);
};

const DragEnd = () => {
  document.removeEventListener("mouseup", DragEnd, false);
  document.removeEventListener("mousemove", DragMove, false);
  state.ChangeDrag(false);
  drag_id.value = -1;
};

onUpdated(() => {
  useUpdateLines(false);
});
</script>
<style lang="scss">
.active-blur {
  filter: blur(2px);
}
.custom-grey {
  background: rgba(81, 80, 80, 0.75);
}
.cursor-move {
  cursor: move;
}
</style>
