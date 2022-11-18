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
        class="col rounded-borders custom-outline q-pa-md cursor-pointer"
        :style="{ 'background-color': '#' + item.color }"
      ></div>
    </div>
    <div
      class="rounded-borders custom-outline q-pa-xs q-mx-sm q-mb-sm cursor-pointer text-center"
    >
      Без заливки
    </div>
  </q-menu>
</template>
<script setup lang="ts">
import { useDataStore /*, useSelectStore */ } from "../../stores";

const main = useDataStore();
// const select = useSelectStore();

// const EditColor = (color: string) => {
//   main.all_commands
//     .find((item) => item.id === select.SelectedCommand.id)
//     .columns.find((item) => item.id === select.SelectedBlock.column_id)
//     .blocks.find(
//       (item) => item.id === select.SelectedBlock.id
//     ).block_options.color = color;
// };
</script>
<style lang="scss">
.mw-370 {
  width: 370px !important;
}
</style>
