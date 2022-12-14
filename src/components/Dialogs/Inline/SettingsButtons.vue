<template>
  <q-dialog full-width v-model="state.Dialogs.settings_buttons" position="top" persistent>
    <q-card class="q-pa-md">
      <div class="row justify-between items-center">
        <div class="q-pb-sm text-h5">Изменение кнопок</div>
        <q-btn
          dense
          flat
          round
          color="primary"
          text-color="primary"
          icon="close"
          v-close-popup
        />
      </div>
      <div class="q-py-sm column q-gutter-y-sm">
        <div class="text-h6 text-center text-grey" v-if="!lines.length">
          Кнопок пока что нет
        </div>
        <div class="" v-for="line in lines" :key="line.id">
          <div class="row q-gutter-sm">
            <q-btn
              :dense="is_sm_screen"
              flat
              color="primary"
              text-color="primary"
              icon="delete"
              :loading="loading && loading_line === line.id"
              @click="DeleteLine(line.id)"
            >
              <q-tooltip anchor="top middle" self="bottom middle"
                >Удалить линию
              </q-tooltip>
            </q-btn>
            <q-item
              @click="EditButton(button)"
              clickable
              class="col custom-outline rounded-borders text-primary"
              v-for="button in line.buttons"
              :key="button.id"
            >
              <q-tooltip anchor="top middle" self="bottom middle"
                >Нажмите, чтобы изменить текст кнопки
              </q-tooltip>
              <q-item-section class="text-center">
                <div class="no-wrap ellipsis text-grey-9">
                  {{ button.data.text }}
                </div>
              </q-item-section>
            </q-item>
            <q-btn
              :dense="is_sm_screen"
              flat
              color="primary"
              text-color="primary"
              icon="add"
              @click="AddButtonInLine(line)"
            >
              <q-tooltip anchor="top middle" self="bottom middle"
                >Добавить кнопку
              </q-tooltip>
            </q-btn>
          </div>
        </div>
      </div>
      <div class="row q-gutter-sm justify-end q-pt-sm">
        <q-btn
          class="col-12 col-md-4"
          dense
          rounded
          unelevated
          label="Добавить кнопку в новую линию"
          color="primary"
          @click="AddButtonWithLine"
        />
        <q-btn
          class="q-px-md"
          dense
          rounded
          flat
          label="Удалить инлайн меню"
          color="red"
          :loading="delete_menu_loading"
          @click="DeleteMenu"
        />
        <q-btn
          class="q-px-md"
          dense
          rounded
          flat
          label="Закрыть"
          color="primary"
          v-close-popup
        />
      </div>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import {
  useStatesStore,
  useSelectStore,
  useDataStore,
  useErrorStore,
} from "../../../stores";
import { useQuasar } from "quasar";

import { GetInlineMenu, GetMessage } from "../../../api";
import { InlineMenuLineInstance, InlineMenuButtonInstance } from "../../../types";

const state = useStatesStore();
const select = useSelectStore();
const main = useDataStore();
const error = useErrorStore();
const $q = useQuasar();

const is_sm_screen = computed(() => !$q.screen.lt.sm);
const loading = ref<boolean>(false);
const delete_menu_loading = ref<boolean>(false);
const loading_line = ref<number>(-1);

const lines = computed(() => select.SelectedMessage.inline_menu.lines);

const DeleteLine = (line_id: number) => {
  loading.value = true;
  loading_line.value = line_id;
  GetInlineMenu("delete-line", { line_id: line_id }).then((response) => {
    if (JSON.parse(response.data).result) {
      loading.value = false;
      main.UpdateInlineMenu(select.SelectedMessage.id, JSON.parse(response.data).data[0]);
    } else {
      error.handleErrorRes(response.data?.message);
    }
  });
};

const DeleteMenu = () => {
  delete_menu_loading.value = true;
  GetMessage("delete-inline-menu", { message_id: select.SelectedMessage.id }).then(
    (response) => {
      delete_menu_loading.value = false;
      main.SetSelectRoute(response.data);
      state.ChangeVisibilityDialogs(false, "settings_buttons");
    }
  );
};

const EditButton = (button: InlineMenuButtonInstance) => {
  select.SelectState(button, "button");
  state.ChangeVisibilityDialogs(true, "edit_button");
};

const AddButtonWithLine = () => {
  main.ChangeIsLine(false);
  state.ChangeVisibilityDialogs(true, "add_button");
};

const AddButtonInLine = (line: InlineMenuLineInstance) => {
  select.SelectState(line, "line");
  main.ChangeIsLine(true);
  state.ChangeVisibilityDialogs(true, "add_button");
};
</script>
