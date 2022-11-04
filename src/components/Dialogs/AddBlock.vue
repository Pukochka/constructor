<template>
  <q-dialog v-model="store.Dialogs.add_block" position="top" persistent>
    <q-card class="q-px-md q-pb-md" style="width: 50%">
      <BotReplicsView />

      <!-- <BotButtonsView v-if="not_all_replics" /> -->

      <div class="q-pt-md row q-gutter-x-sm justify-end">
        <q-btn
          v-if="not_all_replics"
          class="q-px-md"
          outline
          dense
          rounded
          label="Назад"
          color="primary"
          @click="ChangeReplics('all')"
        />
        <q-btn
          class="q-px-md"
          outline
          dense
          rounded
          label="Отмена"
          color="primary"
          v-close-popup
        />
        <q-btn
          class="q-px-md"
          dense
          rounded
          :disable="!main.GetBlockConfig.required()"
          label="Сохранить"
          color="primary"
          @click="AddBlock"
        />
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { onBeforeUpdate, computed } from "vue";
import { useDialogsStore, useSelectStore, useMainStore } from "../../stores/index";
import { RndColor } from "../../data/Colors";

import BotReplicsView from "../Replics/BotReplicsView.vue";
// import BotButtonsView from "../Buttons/BotButtonsView.vue";

import { Block, Column } from "../../types/types";

const main = useMainStore();
const store = useDialogsStore();
const select = useSelectStore();
const { ChangeVisibilityDialogs } = useDialogsStore();
const { ChangeReplics } = useSelectStore();

const not_all_replics = computed(() => select.SelectedReplics != "all");

const AddBlock = () => {
  if (select.SelectedColumn.id !== -1) {
    const newBlock: Block = {
      buttons: [],
      options: main.GetBlockConfig.value,
      block_options: {
        color: RndColor(),
        name: "Название",
      },
      id: Date.now(),
      column_id: select.SelectedColumn.id,
      type: main.GetBlockConfig.type,
    };
    main.all_commands
      .find((item) => item.id === select.SelectedCommand.id)
      .columns.find((item) => item.id === select.SelectedColumn.id)
      .blocks.push(newBlock);
  } else {
    const newColumn: Column = {
      id: Date.now(),
      command_id: select.SelectedCommand.id,
      blocks: [
        {
          buttons: [],
          options: main.GetBlockConfig.value,
          block_options: {
            color: RndColor(),
            name: "Название",
          },
          id: Date.now(),
          column_id: Date.now(),
          type: main.GetBlockConfig.type,
        },
      ],
    };
    main.all_commands
      .find((item) => item.id === select.SelectedCommand.id)
      .columns.push(newColumn);
  }

  ChangeVisibilityDialogs(false, "add_block");
};

onBeforeUpdate(() => {
  ChangeReplics("all");
});
</script>
<style lang="scss"></style>
