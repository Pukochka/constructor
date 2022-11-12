<template>
  <div class="">
    <BlockView v-for="block in columns.blocks" :key="block.id" :block="block" />
    <div class="row">
      <q-btn
        rounded
        flat
        color="primary"
        label="Добавить блок"
        class="col-12"
        @click="AddBlockInColumn(columns)"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, PropType, onUpdated } from "vue";
import BlockView from "../components/Block/BlockView.vue";
import { Column } from "../types";
import { useSelectStore, useStatesStore, useSvgStore } from "../stores";

defineProps({
  columns: Object as PropType<Column>,
});

const select = useSelectStore();
const { UpdateButtons } = useSvgStore();
const { ChangeVisibilityDialogs } = useStatesStore();

const AddBlockInColumn = (item: Column) => {
  select.SelectState(item, "column");
  ChangeVisibilityDialogs(true, "add_block");
};

onUpdated(() => UpdateButtons());
</script>
