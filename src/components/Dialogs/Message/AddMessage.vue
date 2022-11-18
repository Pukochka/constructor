<template>
  <q-dialog v-model="store.Dialogs.add_message" position="top" persistent>
    <q-card class="q-px-md q-pb-md" style="width: 50%">
      <BotReplicsView />

      <!-- <BotButtonsView v-if="not_all_replics" /> -->

      <!-- <div class="q-pt-md row q-gutter-x-sm justify-end">
        <q-btn
          v-if="not_all_replics"
          class="q-px-md"
          flat
          dense
          rounded
          label="Назад"
          color="primary"
          @click="ChangeReplics('all')"
        />
        <q-btn
          class="q-px-md"
          flat
          dense
          rounded
          label="Отмена"
          color="primary"
          v-close-popup
        />
        <q-btn
          class="q-px-md"
          dense
          unelevated
          rounded
          :disable="!main.GetBlockConfig.required()"
          label="Добавить"
          color="primary"
        />
      </div> -->
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
// import { onBeforeUpdate} from "vue";
import { useStatesStore } from "../../../stores";

import BotReplicsView from "../../Replics/BotReplicsView.vue";

// const main = useDataStore();
const store = useStatesStore();
// const { ChangeVisibilityDialogs } = useStatesStore();

// const not_all_replics = computed(() => select.SelectedReplics != "all");

// onBeforeUpdate(() => {
//   ChangeReplics("all");
// });
</script>
<style lang="scss"></style>
