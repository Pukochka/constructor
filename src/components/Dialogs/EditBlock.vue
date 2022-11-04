<template>
  <q-dialog v-model="store.Dialogs.edit_block" position="top" persistent>
    <q-card style="width: 50%" class="q-pa-md">
      <div class="flex justify-between items-center">
        <div class="text-h5">Изменение блока</div>
        <q-btn dense flat round icon="close" color="primary" v-close-popup />
      </div>
      <div class="q-py-sm">
        <TextReplic v-if="select_type === 0" no_header />
        <ImageReplic v-if="select_type === 1" no_header />
        <q-btn flat class="full-width" dense label="Изменить тип блока" color="primary">
          <q-menu fit>
            <q-list>
              <q-item
                v-for="(item, index) in FilteredTypes"
                :key="index"
                @click="ChangeType(item.type)"
                clickable
                v-close-popup
                class="text-primary"
              >
                <q-item-section avatar><q-icon :name="item.icon" /> </q-item-section>
                <q-item-section>{{ item.label }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
      <div class="row q-gutter-sm justify-end">
        <q-btn rounded flat label="Отмена" color="primary" v-close-popup />
        <q-btn
          rounded
          label="Сохранить"
          color="primary"
          v-close-popup
          :disable="!block.required()"
          @click="SaveBlock"
        />
      </div>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { ref, computed, onUpdated, nextTick } from "vue";
import { useDialogsStore, useSelectStore, useMainStore } from "../../stores/index";

import TextReplic from "../Replics/BotReplics/TextReplic.vue";
import ImageReplic from "../Replics/BotReplics/ImageReplic.vue";

const store = useDialogsStore();
const select = useSelectStore();
const main = useMainStore();

const types = ref([
  {
    label: "Текст",
    icon: "text_fields",
    type: 0,
  },
  {
    label: "Изображение",
    icon: "image",
    type: 1,
  },
]);
const block = computed(() => {
  const c = ref();
  if (select_type.value === 0) c.value = main.input;
  if (select_type.value === 1) c.value = main.uploader;
  return c.value;
});

const select_type = ref<number>(0);

const FilteredTypes = computed(() =>
  types.value.filter((item) => item.type !== select_type.value)
);

const ChangeType = (type: number) => {
  select_type.value = type;
  nextTick(() => (main.input.value = ""));
  nextTick(() => (main.uploader.value = null));
};

const SaveBlock = () => {
  main.all_commands
    .find((item) => item.id === select.SelectedCommand.id)
    .columns.find((item) => item.id === select.SelectedBlock.column_id)
    .blocks.find((item) => item.id === select.SelectedBlock.id).type = select_type.value;
  main.all_commands
    .find((item) => item.id === select.SelectedCommand.id)
    .columns.find((item) => item.id === select.SelectedBlock.column_id)
    .blocks.find((item) => item.id === select.SelectedBlock.id).options =
    block.value.value;
};

onUpdated(() => {
  select_type.value = select.SelectedBlock.type;
});
</script>
