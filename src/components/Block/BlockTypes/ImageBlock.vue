<template>
  <!-- <q-item clickable class="q-pa-none"> -->
  <div class="rounded-borders custom-outline fit">
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
    <!-- <q-separator /> -->
    <div class="full-width relative-position" style="height: 200px">
      <div
        class="image-type fit"
        :style="{ 'background-image': `url(${block.options})` }"
      ></div>
    </div>
  </div>
  <!-- </q-item> -->
</template>
<script lang="ts" setup>
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
