<template>
  <!-- <q-item
    clickable
    v-ripple="false"
    class="rounded-borders custom-outline non-selectable"
  > -->
  <div class="col-12 rounded-borders custom-outline">
    <div class="q-pl-md q-pr-sm q-pt-sm flex items-center justify-between">
      <div class="flex items-center">
        <q-icon name="text_fields" />
        <div class="q-ml-sm">Текст</div>
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
    <div class="q-pa-md ellipsis">{{ block.options }}</div>
  </div>
  <!-- </q-item> -->
</template>
<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { Block } from "../../../types";
import { useStatesStore, useSelectStore } from "../../../stores";

const props = defineProps({
  block: Object as PropType<Block>,
});

const { ChangeVisibilityDialogs } = useStatesStore();
const { SelectState } = useSelectStore();

const EditBlock = () => {
  SelectState(props.block, "block");
  ChangeVisibilityDialogs(true, "edit_block");
};
</script>
