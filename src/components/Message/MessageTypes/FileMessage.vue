<template>
  <div class="col-12 q-pb-sm">
    <q-btn
      :href="message.link"
      color="primary"
      flat
      rounded
      label="Изменить файл"
      class="fit"
    />
  </div>
  <div class="col-12 rounded-borders custom-outline">
    <div class="q-pl-md q-pr-sm q-pt-sm flex items-center justify-between">
      <div class="flex items-center">
        <q-icon name="description" />
        <div class="q-ml-sm">Текст с файлом</div>
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
