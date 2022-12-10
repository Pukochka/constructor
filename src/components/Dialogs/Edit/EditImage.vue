<template>
  <q-dialog v-model="state.Dialogs.edit_image" position="top" persistent>
    <q-card style="width: 50%" class="q-pa-md">
      <div class="flex items-center justify-between" v-if="!no_header">
        <div class="flex items-center">
          <q-icon name="image" size="26px" />
          <div class="q-pl-sm text-h5">Изображение</div>
        </div>
        <q-btn color="primary" flat round icon="close" v-close-popup />
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
            rounded
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
              class="relative-position full-width rounded-borders custom-outline overflow-hidden"
              style="height: 200px"
              v-else
            >
              <div
                class="absolute-center image-type-blur fit"
                :style="{ 'background-image': `url(${main.uploader.value})` }"
              ></div>
              <div class="op-grey absolute-center fit"></div>
              <div class="absolute-center fit">
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
      <div class="row q-gutter-sm justify-end">
        <q-btn
          class="q-px-md"
          dense
          rounded
          flat
          label="Отмена"
          color="primary"
          v-close-popup
        />
        <q-btn
          class="q-px-md"
          dense
          unelevated
          rounded
          label="изменить"
          color="primary"
          v-close-popup
        />
      </div>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { onUnmounted, defineProps, PropType, computed } from "vue";
import { useStatesStore, useDataStore } from "../../../stores";
import { DialogNames } from "../../../types";

defineProps({
  dialog_name: String as PropType<DialogNames>,
  no_header: Boolean,
});

const main = useDataStore();
const state = useStatesStore();

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

// onMounted(() => {
//   if (store.Dialogs.edit_block) main.uploader.value = select.SelectedBlock.options;
// });

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
.op-grey {
  background: rgba(111, 109, 109, 0.388);
}
.image-type-blur {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(8px);
}
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
