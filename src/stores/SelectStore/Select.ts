import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { SelectStore } from './model';
import { Commands } from '../../data/Commands';
import { NameReplics, StateValues, StateTypes } from './model'

export const useSelectStore = defineStore({
  id: 'SelectStore',
  state: () =>
    ref({
      select: {
        command: Commands[0],
        column: {},
        block: {},
        button: {},
        tabs: {
          replics: 'all'
        }
      },
    } as SelectStore),
  getters: {
    SelectedColumn: (state) => state.select.column,
    SelectedCommand: (state) => state.select.command,
    SelectedBlock: (state) => state.select.block,
    SelectedButton: (state) => state.select.button,
    SelectedReplics: (state) => state.select.tabs.replics
  },
  actions: {
    SelectState(value: StateTypes, section: StateValues) {
      this.select[section] = value;
    },
    ChangeReplics(value: NameReplics) {
      this.select.tabs.replics = value;
    },
  },
});