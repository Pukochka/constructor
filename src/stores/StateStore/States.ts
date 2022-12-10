import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { StatesStore, DialogNames } from './model';

export const useStatesStore = defineStore({
  id: 'StatesStore',
  state: () =>
    ref({
      drag: false,
      dialogs: {
        add_route: false,
        add_route_with_column: false,
        add_button: false,
        add_message: false,
        settings_buttons: false,
        change_type: false,
        edit_button: false,
        edit_route: false,
        edit_message: false,
        set_route: false,
        set_connection: false,
        test_constructor: false,
        route_without_column: false,
        sure_reset: false,
        edit_feed_back: false,
        edit_image: false,
      },
    } as StatesStore),
  getters: {
    Dialogs: (state) => state.dialogs,
    is_dragging: (state) => state.drag,
  },
  actions: {
    ChangeVisibilityDialogs(value: boolean, section: DialogNames) {
      this.dialogs[section] = value;
    },
    ChangeDrag(value: boolean) {
      this.drag = value;
    },
  },
});
