import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { SelectStore } from './model';
// import { Commands } from '../../data/Commands';
import { NameReplics, StateValues, StateTypes } from './model';

export const useSelectStore = defineStore({
  id: 'SelectStore',
  state: () =>
    ref({
      route: {},
      column: {},
      message: {},
      button: {},
      line: {},
      tabs: {
        replics: 'all',
      },
    } as SelectStore),
  getters: {
    SelectedRoute: (state) => state.route,
    SelectedColumn: (state) => state.column,
    SelectedMessage: (state) => state.message,
    SelectedButton: (state) => state.button,
    SelectedLine: (state) => state.line,
    SelectedReplics: (state) => state.tabs.replics,
  },
  actions: {
    SelectState(value: StateTypes, section: StateValues) {
      this[section] = value;
    },
    ChangeReplics(value: NameReplics) {
      this.tabs.replics = value;
    },
  },
});
