<template>
  <div class="">
    <BlockView v-for="message in columns.messages" :key="message.id" :message="message" />
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
  </div>
</template>
<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import BlockView from "./Block/MessageItem.vue";
import { ColumnInstance } from "../types";
import { useSelectStore, useStatesStore, useDataStore } from "../stores";

const props = defineProps({
  columns: Object as PropType<ColumnInstance>,
});
// @click="AddBlockInColumn(columns)"
const { SelectState } = useSelectStore();
// const { UpdateButtons } = useSvgStore();
const { ChangeVisibilityDialogs } = useStatesStore();
const main = useDataStore();

const AddMessageInColumn = () => {
  SelectState(props.columns, "column");
  main.ChangeIsColumn(false);
  ChangeVisibilityDialogs(true, "add_message");
};
// const AddBlockInColumn = (item: ColumnInstance) => {
//   select.SelectState(item, "column");
//   ChangeVisibilityDialogs(true, "add_block");
// };

// onUpdated(() => UpdateButtons());
</script>
