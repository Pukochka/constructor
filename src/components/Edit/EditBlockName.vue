<template>
  <div
    @mouseenter="animate_edit = true"
    @mouseleave="animate_edit = false"
    class="rounded-borders q-px-sm flex items-center cursor-pointer text-bold mw"
    :style="{ 'background-color': block.block_options.color }"
  >
    <div class="" v-if="edit_state">
      <input class="custom-input" type="text" v-model="edit" />
    </div>
    <span
      class="flex items-center ellipsis no-wrap"
      v-else
      @click="edit_state = !edit_state"
    >
      <q-icon name="drag_indicator" />

      <div class="ellipsis">{{ block.block_options.name }}</div>
      <q-tooltip anchor="top middle" self="bottom middle">
        Редактировать название экрана
      </q-tooltip>
      <q-icon class="q-ml-sm" v-if="animate_edit" name="edit" size="18px"> </q-icon>
    </span>
  </div>
</template>
<script setup lang="ts">
import { defineProps, PropType, ref, watch, onMounted, onUnmounted } from "vue";
import { Block } from "../../types";
import { useMainStore, useSelectStore } from "../../stores";

const props = defineProps({
  block: Object as PropType<Block>,
});

const main = useMainStore();
const select = useSelectStore();

const animate_edit = ref<boolean>(false);
const edit_state = ref<boolean>(false);
const edit = ref<string>("");

const HideEdit = () => {
  if (!animate_edit.value) {
    document.removeEventListener("click", () => HideEdit(), false);
    edit_state.value = false;
    try {
      main.all_commands
        .find((item) => item.id === select.SelectedCommand.id)
        .columns.find((item) => item.id === props.block.column_id)
        .blocks.find((item) => item.id === props.block.id).block_options.name =
        edit.value;
    } catch (e) {}
  }
};

onMounted(() => {
  edit.value = props.block.block_options.name;
});

onUnmounted(() => {
  document.removeEventListener("click", () => HideEdit(), false);
});

watch(edit_state, (val) => {
  if (val) document.addEventListener("click", () => HideEdit(), false);
});
</script>
<style lang="scss">
.custom-input {
  background: transparent;
  border: none;
  outline: none;
  width: 250px;
}
.mw {
  max-width: 90%;
}
</style>
