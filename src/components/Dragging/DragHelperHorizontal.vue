<template>
  <transition name="fade">
    <div class="q-py-sm" @mouseup="Enter" v-if="is_dragging">
      <q-tooltip anchor="top middle" self="top middle" class="bg-red text-subtitle2">
        Отпустите чтобы переместить
      </q-tooltip>
      <div class="drag-helper z-max rounded-borders"></div>
    </div>
  </transition>
</template>
<script lang="ts" setup>
import { defineProps, computed } from "vue";
import { useStatesStore, useSelectStore, useDataStore } from "../../stores";
import { GetColumns } from "../../api";
import { useUpdateLines } from "../../helpers";

const props = defineProps({
  sort: Number,
  column_id: Number,
});
const state = useStatesStore();
const select = useSelectStore();
const main = useDataStore();

const is_dragging = computed(() => state.is_dragging);

const Enter = () => {
  GetColumns("change-sort-and-column", {
    route_id: main.SELECT_ROUTE.id,
    message_id: select.SelectedMessage.id,
    column_id: props.column_id,
    sort: props.sort,
  }).then((response) => {
    main.SetSelectRoute(response.data);
    setTimeout(() => useUpdateLines(false), 50);
  });
};
</script>
<style lang="scss">
.drag-helper {
  background: rgb(255, 204, 0);
  width: 100%;
  height: 4px;
}
</style>
