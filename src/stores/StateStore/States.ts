import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { StatesStore, DialogNames } from './model';
import { InlineMethods } from './../../api/Inline';
import { RouteMethods } from './../../api/Route';
import { ColumnMethods } from './../../api/Column';
import { MessageMethods } from './../../api/Message';

export const useStatesStore = defineStore({
  id: 'StatesStore',
  state: () =>
    ref({
      dialogs: {
        add_route: false,
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
      },
      loadings: {
        message: {
          index: false,
          get: false,
          colors: false,
          types: false,
          'update-text': false,
          'update-title': false,
          'add-inline-menu': false,
          'delete-inline-menu': false,
          duplicate: false,
          'update-type': false,
          delete: false,
        },
        route: {
          index: false,
          view: false,
          'update-message': false,
          'update-route': false,
          delete: false,
          create: false,
          'create-with-column': false,
        },
        column: {
          'add-message-in-column': false,
          delete: false,
          create: false,
        },
        inline: {
          'delete-button': false,
          'delete-line': false,
          'change-sort-and-line': false,
          'update-data-and-type': false,
          'add-button-in-line': false,
          'add-button-with-line': false,
          'update-button-text': false,
          'update-data-button': false,
          'update-type': false,
          'move-first-line': false,
          'move-last-line': false,
          view: false,
        },
      }
    } as StatesStore),
  getters: {
    Dialogs: (state) => state.dialogs,
    Loadings: (state) => state.loadings,
  },
  actions: {
    ChangeVisibilityDialogs(value: boolean, section: DialogNames) {
      this.dialogs[section] = value;
    },
    ChangeLoadingMessage(value: boolean, section: MessageMethods) {
      this.loadings.inline[section] = value;
    },
    ChangeLoadingRoute(value: boolean, section: RouteMethods) {
      this.loadings.route[section] = value;
    },
    ChangeLoadingColumn(value: boolean, section: ColumnMethods) {
      this.loadings.column[section] = value;
    },
    ChangeLoadingInline(value: boolean, section: InlineMethods) {
      this.loadings.inline[section] = value;
    },

  },
});
