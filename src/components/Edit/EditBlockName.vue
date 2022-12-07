<template>
  <div
    @mouseenter="animate_edit = true"
    @mouseleave="animate_edit = false"
    :class="{ 'custom-outline': animate_edit }"
    class="rounded-borders q-px-sm flex items-center cursor-pointer text-bold mw"
    :style="{ 'background-color': is_coloring }"
  >
    <q-tooltip anchor="top middle" self="bottom middle">
      Редактировать название блока
    </q-tooltip>
    <div class="" v-if="edit_state">
      <input class="custom-input" type="text" v-model="edit" />
    </div>
    <span
      class="flex items-center ellipsis no-wrap"
      v-else
      @click="edit_state = !edit_state"
    >
      <div class="ellipsis">{{ message.title }}</div>

      <q-icon class="q-ml-sm" v-if="animate_edit" name="edit" size="18px"> </q-icon>
    </span>
  </div>
</template>
<script setup lang="ts">
import { defineProps, PropType, ref, watch, onMounted, computed } from "vue";
import { MessageInstance } from "../../types";
import { useDataStore } from "../../stores";
import { GetMessage } from "../../api";
const props = defineProps({
  message: Object as PropType<MessageInstance>,
});

const main = useDataStore();

const animate_edit = ref<boolean>(false);
const edit_state = ref<boolean>(false);
const edit = ref<string>("");
const loading = ref<boolean>(false);

const is_coloring = computed(() => {
  if (props.message.color) {
    return "#" + props.message.color.color;
  } else {
    return "transparent";
  }
});

const HideEdit = () => {
  loading.value = true;
  if (!animate_edit.value) {
    document.removeEventListener("click", HideEdit, false);
    edit_state.value = false;
    try {
      GetMessage("update-title", {
        message_id: props.message.id,
        title: edit.value,
      }).then((response) => {
        main.SetSelectRoute(response.data);
        loading.value = false;
      });
    } catch (e) {}
  }
};

function EnterDown(e: KeyboardEvent) {
  if (e.key === "Enter") HideEdit();
}

onMounted(() => {
  edit.value = props.message.title;
});

watch(loading, (val) => {
  if (!val) {
    document.removeEventListener("click", HideEdit, false);
    document.removeEventListener("keydown", EnterDown, false);
  }
});

watch(edit_state, (val) => {
  if (val) document.addEventListener("click", HideEdit, false);
  if (val) document.addEventListener("keydown", EnterDown, false);
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
