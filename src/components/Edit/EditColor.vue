<template>
  <q-menu
    fit
    class="mw-370"
    style="max-width: 370px"
    anchor="bottom left"
    self="top end"
    :offset="[-42, 5]"
  >
    <div class="row q-gutter-sm q-pa-sm">
      <div
        clickable
        v-for="(item, index) in main.AllColors"
        :key="index"
        class="col rounded-borders custom-outline q-pa-md cursor-pointer relative-position"
        :style="{ 'background-color': '#' + item.color }"
        @click="SetColor(item)"
      >
        <div class="absolute-center" v-if="set_color_id === item.id && set_color_loading">
          <q-spinner color="white" size="2em" />
        </div>
      </div>
    </div>
    <div
      @click="SetColor(null)"
      class="rounded-borders custom-outline q-pa-xs q-mx-sm q-mb-sm cursor-pointer text-center relative-position"
    >
      <div class="absolute-left" v-if="!set_color_id && set_color_loading">
        <q-spinner color="primary" size="2em" />
      </div>
      Без заливки
    </div>
  </q-menu>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useDataStore, useSelectStore } from "../../stores";
import { GetMessage } from "../../api";
import { ColorsInstance } from "src/types";

const main = useDataStore();
const select = useSelectStore();

const set_color_loading = ref<boolean>(false);
const set_color_id = ref<number>(-1);
const SetColor = (color: ColorsInstance) => {
  set_color_loading.value = true;
  if (color) {
    set_color_id.value = color.id;
  } else {
    set_color_id.value = null;
  }

  GetMessage("set-color", {
    message_id: select.SelectedMessage.id,
    color_id: set_color_id.value,
  }).then((response) => {
    set_color_loading.value = false;
    main.SetSelectRoute(response.data);
  });
};
</script>
<style lang="scss">
.mw-370 {
  width: 370px !important;
}
</style>
