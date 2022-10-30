import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { DialogsStore, DialogNames } from './model';

export const useDialogsStore = defineStore({
  id: 'DialogsStore',
  state: () =>
    ref({
      dialogs: {
        add_scenary: false,
        add_command: false,
        add_button: false,
        add_block: false,
        edit_button: false,
        set_route: false,
        set_connection: false,
      },
    } as DialogsStore),
  getters: {
    Dialogs: (state) => state.dialogs,
  },
  actions: {
    ChangeVisibilityDialogs(value: boolean, section: DialogNames) {
      this.dialogs[section] = value;
    },
  },
});
