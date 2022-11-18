<template>
  <div class="q-py-lg flex items-center justify-between" v-if="!no_header">
    <div class="flex items-center">
      <q-icon name="image" size="26px" />
      <div class="q-pl-sm text-h6">Изображение</div>
    </div>
    <q-btn
      color="primary"
      dense
      flat
      round
      icon="close"
      @click="ChangeVisibilityDialogs(false, dialog_name)"
    />
  </div>
  <div class="full-width q-pa-sm">
    <div class="column">
      <q-btn
        v-if="!is_visible_image"
        color="primary"
        flat
        label="Выбрать файл"
        class="col-12 all-pointer-events relative-position"
        unelevated
      >
        <input
          class="cursor-pointer"
          id="uploader"
          type="file"
          name="file"
          @change="ReadFile"
        />
      </q-btn>
      <div class="q-my-sm">
        <div class="text-caption q-my-sm" v-if="!is_visible_image">
          <div class="">Допускаются файлы: .jpg, .png и .gif</div>
          <div class="">Размер файла не должен превышать 10 Мб</div>
        </div>
        <div
          class="full-width rounded-borders custom-outline relative-position"
          style="height: 200px"
          v-else
        >
          <q-btn
            class="image-type-button"
            color="primary"
            flat
            round
            icon="close"
            @click="DeleteImage"
          />
          <div
            class="image-type fit"
            :style="{ 'background-image': `url(${main.uploader.value})` }"
          ></div>
        </div>
      </div>
      <q-btn
        v-if="main.uploader.value"
        color="primary"
        flat
        label="Удалить изображение"
        @click="DeleteImage"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onUnmounted, defineProps, PropType, onMounted, computed } from "vue";
import { useStatesStore, useDataStore, useSelectStore } from "../../../stores";
import { DialogNames } from "../../../types";

defineProps({
  dialog_name: String as PropType<DialogNames>,
  no_header: Boolean,
});

const main = useDataStore();
const store = useStatesStore();
const select = useSelectStore();
const { ChangeVisibilityDialogs } = useStatesStore();

const is_visible_image = computed(() => main.uploader.value);

const ReadFile = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = function () {
    main.uploader = {
      name: file.name,
      value: `${reader.result}`,
      required() {
        return this.value;
      },
    };
  };
};

const DeleteImage = () => {
  main.uploader = {
    value: null,
    name: null,
    required() {
      return this.value;
    },
  };
};

onMounted(() => {
  if (store.Dialogs.edit_block) main.uploader.value = select.SelectedBlock.options;
});

onUnmounted(() => {
  main.uploader = {
    value: null,
    name: null,
    required() {
      return this.value;
    },
  };
});
</script>
<style lang="scss">
#uploader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 100;
}
</style>
