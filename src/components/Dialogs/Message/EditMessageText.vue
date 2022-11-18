<template>
  <q-dialog v-model="store.Dialogs.edit_message" position="top" persistent>
    <q-card style="width: 50%" class="q-pa-md">
      <div class="flex justify-between items-center">
        <div class="text-h5">Изменение текста сообщения</div>
        <q-btn dense flat round icon="close" color="primary" v-close-popup />
      </div>
      <!-- <div class="q-py-sm">
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
      </div> -->
      <div class="q-py-sm">
        <q-input
          autofocus
          outlined
          v-model="text.value"
          label="Название кнопки"
          :rules="[() => text.required() || 'Введено неверное количество символов']"
        />
      </div>
      <div class="row q-gutter-sm justify-end">
        <q-btn
          unelevated
          class="q-px-md"
          dense
          rounded
          flat
          label="Отмена"
          color="primary"
          v-close-popup
        />
        <q-btn
          unelevated
          class="q-px-md"
          dense
          rounded
          label="Сохранить"
          color="primary"
          :loading="loading"
          :disable="!text.required()"
          @click="SaveBlock"
        />
      </div>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { ref, onUpdated /*, computed , nextTick */ } from "vue";
import { useStatesStore, useSelectStore, useDataStore } from "../../../stores";
import { GetMessage, GetRoutes } from "../../../api";
import { TextInput } from "../../../types";
// import TextReplic from "../../Replics/BotReplics/TextReplic.vue";
// import ImageReplic from "../../Replics/BotReplics/ImageReplic.vue";

const store = useStatesStore();
const select = useSelectStore();
const main = useDataStore();

const loading = ref<boolean>(false);

const text = ref<TextInput>({
  value: "",
  max: 100,
  min: 1,
  required() {
    return this.max > this.value.length && this.min < this.value.length;
  },
});

const SaveBlock = () => {
  loading.value = true;
  GetMessage("update-text", {
    message_id: select.SelectedMessage.id,
    text: text.value.value,
  }).then(() => {
    GetRoutes("view", { route_id: main.SELECT_ROUTE.id }).then((res) => {
      loading.value = false;
      main.SetSelectRoute(res.data, "view");
      store.ChangeVisibilityDialogs(false, "edit_message");
    });
  });
};

// const types = ref([
//   {
//     label: "Текст",
//     icon: "text_fields",
//     type: 0,
//   },
//   {
//     label: "Изображение",
//     icon: "image",
//     type: 1,
//   },
// ]);
// const block = computed(() => {
//   const c = ref();
//   if (select_type.value === 0) c.value = main.input;
//   if (select_type.value === 1) c.value = main.uploader;
//   return c.value;
// });

// const select_type = ref<number>(0);

// const FilteredTypes = computed(() =>
//   types.value.filter((item) => item.type !== select_type.value)
// );

// const ChangeType = (type: number) => {
//   select_type.value = type;
//   nextTick(() => (main.input.value = ""));
//   nextTick(() => (main.uploader.value = null));
// };

onUpdated(() => {
  text.value.value = select.SelectedMessage.text.content;
});
</script>
