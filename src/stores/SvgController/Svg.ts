import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useSelectStore, useMainStore } from "../index";
import type { SvgStore, ScrollEffect } from './model';
import { Coords, Button, Block } from "../../types";

export const useSvgStore = defineStore({
  id: 'SvgStore',
  state: () =>
    ref({
      svg: {
        parent: null,
        cursor_path: false,
        moving_line: null,
        radius: 7,
        scroll_effect: {
          horizontal: 0,
          vertical: 0,
        },
        collections: [],
      },
    } as SvgStore),
  getters: {
    gett: (state) => state.svg,
  },
  actions: {
    SetParent(value: DOMRect) {
      this.svg.parent = value
    },
    StartCursorFollowing(value: Coords) {
      const main = useMainStore()
      const select = useSelectStore()
      this.svg.cursor_path = true;

      main.all_commands.find(item => item.id === select.SelectedCommand.id).columns.find(item => item.id === select.SelectedBlock.column_id).blocks.find(item => item.id === select.SelectedBlock.id).buttons.find(item => item.id === select.SelectedButton.id).connection.coords = value
    },
    EndCursorFollowing(current_coords: Coords) {
      const main = useMainStore()
      const select = useSelectStore()
      this.svg.cursor_path = false;
      main.all_commands.find(item => item.id === select.SelectedCommand.id).columns.find(item => item.id === select.SelectedBlock.column_id).blocks.find(item => item.id === select.SelectedBlock.id).buttons.find(item => item.id === select.SelectedButton.id).connection.coords = current_coords
    },
    MoveCursorFollowing(value: Coords) {
      const main = useMainStore()
      const select = useSelectStore()
      main.all_commands.find(item => item.id === select.SelectedCommand.id).columns.find(item => item.id === select.SelectedBlock.column_id).blocks.find(item => item.id === select.SelectedBlock.id).buttons.find(item => item.id === select.SelectedButton.id).connection.coords = value
    },
    ChangeScrollEffect(value: ScrollEffect) {
      this.svg.scroll_effect = value;
    },
    UpdateButtonConnectionLine(block: Block, button: Button, value: Coords) {
      const main = useMainStore()
      const select = useSelectStore()
      main.all_commands.find(item => item.id === select.SelectedCommand.id).columns.find(item => item.id === block.column_id).blocks.find(item => item.id === block.id).buttons.find(item => item.id === button.id).connection.coords = value
    }
  },
});
