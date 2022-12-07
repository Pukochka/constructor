<template>
  <!-- <div class="rounded-borders custom-outline fit">
    <div class="q-pl-md q-pr-sm q-pt-sm flex items-center justify-between">
      <div class="flex items-center">
        <q-icon name="image" />
        <div class="q-pl-sm">Изображение</div>
      </div>
      <q-btn
        @click="EditBlock"
        size="11px"
        color="primary"
        flat
        round
        dense
        icon="edit_note"
      >
        <q-tooltip anchor="top middle" self="bottom middle">
          Редактировать блок
        </q-tooltip>
      </q-btn>
    </div>
    <div class="full-width relative-position" style="height: 200px">
      <div
        class="image-type fit"
        :style="{ 'background-image': `url(${block.options})` }"
      ></div>
    </div>
  </div> -->
  <div class="col-12 q-pb-sm">
    <q-btn
      :href="message.link"
      color="primary"
      flat
      rounded
      label="Изменить изображение"
      class="fit"
    />
  </div>
  <div class="col-12 rounded-borders custom-outline">
    <div class="q-pl-md q-pr-sm q-pt-sm flex items-center justify-between">
      <div class="flex items-center">
        <q-icon name="image" />
        <div class="q-ml-sm">Текст с изображением</div>
      </div>
      <q-btn
        size="11px"
        color="primary"
        flat
        round
        dense
        icon="edit_note"
        @click="EditTextMessage"
      >
        <q-tooltip anchor="top middle" self="bottom middle">
          Редактировать текст
        </q-tooltip>
      </q-btn>
    </div>
    <div class="q-pa-md"><div class="ellipsis" v-html="message.text.content"></div></div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import { MessageInstance } from "../../../types";
import { useStatesStore, useSelectStore } from "../../../stores";

const props = defineProps({
  message: Object as PropType<MessageInstance>,
});

const state = useStatesStore();
const select = useSelectStore();

const EditTextMessage = () => {
  select.SelectState(props.message, "message");
  state.ChangeVisibilityDialogs(true, "edit_message");
};
</script>
