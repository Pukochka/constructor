import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { MainStore } from './model';
import { Commands } from '../../data/Commands';

export const useMainStore = defineStore('MainStore', {
  state: () =>
    ref({
      all_commands: Commands,
      block_type: 0,
      input: {
        value: "",
        max: 100,
        min: 1,
        required() {
          return this.max > this.value.length && this.min < this.value.length
        }
      },
      uploader: {
        value: null,
        name: null,
        required() {
          return this.value
        }
      }
    } as MainStore),
  getters: {
    Commands: (state) => state.all_commands,
    GetBlockConfig: (state) => {
      if (state.block_type === 0) return { type: state.block_type, ...state.input }
      if (state.block_type === 1) return { type: state.block_type, ...state.uploader }
    },
  },
  actions: {
    SelectBlockType(value: number) {
      this.block_type = value;
    }
  },
});
