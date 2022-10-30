<template>
  <q-tab-panels v-model="store.SelectedReplics" animated>
    <q-tab-panel name="all" class="q-pa-none">
      <div class="q-pl-md q-py-lg flex items-center justify-between">
        <div class="flex items-center text-h6">
          <q-icon name="smart_toy" />

          <div class="q-ml-sm">Реплика бота</div>
        </div>
        <q-btn
          color="primary"
          flat
          round
          icon="close"
          dense
          @click="ChangeVisibilityDialogs(false, 'add_block')"
        />
      </div>
      <q-list class="text-subtitle1" separator>
        <q-item
          clickable
          v-ripple
          class="items-center rounded-borders"
          @click="SelectType(0)"
        >
          <q-icon name="text_fields" />
          <div class="q-pl-sm">Текст</div>
        </q-item>
        <q-item
          clickable
          v-ripple
          class="items-center rounded-borders"
          @click="SelectType(1)"
        >
          <q-icon name="image" />
          <div class="q-pl-sm">Изображение</div>
        </q-item>
      </q-list>
    </q-tab-panel>
    <q-tab-panel name="text" class="q-pa-none">
      <Text />
    </q-tab-panel>
    <q-tab-panel name="image" class="q-pa-none">
      <Image />
    </q-tab-panel>
  </q-tab-panels>
</template>
<script setup lang="ts">
import { useSelectStore, useDialogsStore, useMainStore } from "../../stores/index";

import Image from "./BotReplics/ImageReplic.vue";
import Text from "./BotReplics/TextReplic.vue";

const { SelectBlockType } = useMainStore();
const { ChangeVisibilityDialogs } = useDialogsStore();
const { ChangeReplics } = useSelectStore();
const store = useSelectStore();

const SelectType = (type: number) => {
  SelectBlockType(type);
  ChangeReplics(type ? "image" : "text");
};
</script>
<style lang="scss"></style>
