<template>
  <div>
    <MessageItem
      v-for="(message, index) in columns.messages"
      :key="message.id"
      :message="message"
      :index="index"
    />
    <div class="row">
      <q-btn
        rounded
        flat
        color="primary"
        label="Добавить сообщение"
        class="col-12"
        @click="AddMessageInColumn"
      />
    </div>
    <DragHelperHorizontal :column_id="columns.id" :sort="columns.messages.length" />
  </div>
</template>
<script lang="ts" setup>
import { defineProps, PropType, onUpdated } from "vue";

import { ColumnInstance } from "../types";
import { useSelectStore, useStatesStore, useDataStore } from "../stores";

import MessageItem from "./Message/MessageItem.vue";
import DragHelperHorizontal from "./Dragging/DragHelperHorizontal.vue";
import { useUpdateLines } from "../helpers";

const props = defineProps({
  columns: Object as PropType<ColumnInstance>,
});
const select = useSelectStore();
const state = useStatesStore();
const main = useDataStore();

const AddMessageInColumn = () => {
  select.SelectState(props.columns, "column");
  main.ChangeIsColumn(false);
  state.ChangeVisibilityDialogs(true, "add_message");
};
onUpdated(() => useUpdateLines(false));
</script>
