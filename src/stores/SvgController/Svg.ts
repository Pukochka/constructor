import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useSelectStore, useMainStore } from "../index";
import type { SvgStore, ScrollEffect } from './model';
import { Coords, Button, Block } from "../../types";
import { useBeizerCurvature, usePolygonPoints } from "../../helpers";

export const useSvgStore = defineStore({
  id: 'SvgStore',
  state: () =>
    ref({
      svg: {
        parent: null,
        cursor_path: false,
        moving_line: null,
        radius: 12,
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

      main.all_commands.find(item => item.id === select.SelectedCommand.id).columns.find(item => item.id === select.SelectedBlock.column_id).blocks.find(item => item.id === select.SelectedBlock.id).buttons.find(item => item.id === select.SelectedButton.id).connection.coords = value;
    },
    EndCursorFollowing(current_coords: Coords) {
      const main = useMainStore()
      const select = useSelectStore()
      this.svg.cursor_path = false;

      main.all_commands.find(item => item.id === select.SelectedCommand.id).columns.find(item => item.id === select.SelectedBlock.column_id).blocks.find(item => item.id === select.SelectedBlock.id).buttons.find(item => item.id === select.SelectedButton.id).connection.coords = current_coords
    },
    MoveCursorFollowing(value: Coords) {
      const main = useMainStore();
      const select = useSelectStore();

      main.all_commands.find(item => item.id === select.SelectedCommand.id).columns.find(item => item.id === select.SelectedBlock.column_id).blocks.find(item => item.id === select.SelectedBlock.id).buttons.find(item => item.id === select.SelectedButton.id).connection.coords = value
    },
    ChangeScrollEffect(value: ScrollEffect) {
      this.svg.scroll_effect = value;
    },
    DeleteBlockAndConnected(delete_block: Block) {
      const main = useMainStore()
      const select = useSelectStore()
      const select_command = computed(() =>
        main.all_commands.find((item) => item.id === select.SelectedCommand.id)
      );
      for (const column of select_command.value.columns) {
        for (const block of column.blocks) {
          for (const button of block.buttons) {
            if (delete_block.connected.find(item => item === button.id)) {
              main.all_commands
                .find((item) => item.id === select.SelectedCommand.id)
                .columns.find((item) => item.id === block.column_id)
                .blocks.find((item) => item.id === block.id)
                .buttons.find((item) => item.id === button.id).connection = {
                to: null,
                type: 0,
                info: null,
                reverse: false,
                coords: {
                  start_x: 0,
                  start_y: 0,
                  end_x: 0,
                  end_y: 0,
                  path: "",
                  polygon: "",
                },
                toRoute: null,
              }
              main.all_commands
                .find((item) => item.id === select.SelectedCommand.id)
                .columns.find((item) => item.id === block.column_id)
                .blocks.find((item) => item.id === block.id)
                .buttons.find((item) => item.id === button.id).element = 0
            }
          }
        }
      }
    },
    DeleteConnectionAndUpdateLine(button: Button, block: Block) {
      const main = useMainStore()
      const select = useSelectStore()
      main.all_commands
        .find((item) => item.id === select.SelectedCommand.id)
        .columns.find((item) => item.id === button.connection.toRoute.column_id)
        .blocks.find(
          (item) => item.id === button.connection.toRoute.block_id
        ).connected = main.all_commands
          .find((item) => item.id === select.SelectedCommand.id)
          .columns.find((item) => item.id === button.connection.toRoute.column_id)
          .blocks.find((item) => item.id === button.connection.toRoute.block_id)
          .connected.filter((item) => item !== button.id);

      const select_command = computed(() =>
        main.all_commands.find((item) => item.id === select.SelectedCommand.id)
      );
      const block_connected = computed(() =>
        main.all_commands.find((item) => item.id === select.SelectedCommand.id).columns.find(item => item.id === button.connection.toRoute.column_id).blocks.find(item => item.id === button.connection.toRoute.block_id).connected
      );
      for (const column of select_command.value.columns) {
        for (const block of column.blocks) {
          for (const button of block.buttons) {
            if (block_connected.value.find(item => item === button.id)) {
              const index = block_connected.value.indexOf(button.id)
              button.element = index;
              const updated_coords = this.UpdateAssambly(button, index);
              this.UpdateButtonConnectionLine(block, button, updated_coords);
            }
          }
        }
      }
      main.all_commands
        .find((item) => item.id === select.SelectedCommand.id)
        .columns.find((item) => item.id === block.column_id)
        .blocks.find((item) => item.id === block.id)
        .buttons.find((item) => item.id === button.id).connection = {
        to: null,
        type: 0,
        info: null,
        reverse: false,
        coords: {
          start_x: 0,
          start_y: 0,
          end_x: 0,
          end_y: 0,
          path: "",
          polygon: "",
        },
        toRoute: null,
      };
    },
    UpdateButtons() {
      if (this.gett.cursor_path) return;
      const main = useMainStore()
      const select = useSelectStore()
      const select_command = computed(() =>
        main.all_commands.find((item) => item.id === select.SelectedCommand.id)
      );
      for (const column of select_command.value.columns) {
        for (const block of column.blocks) {
          for (const button of block.buttons) {
            if (button.connection.coords.start_x) {
              const updated_coords = this.UpdateAssambly(button, button.element);
              this.UpdateButtonConnectionLine(block, button, updated_coords);
            }
          }
        }
      }
    },
    AccountAssambly(button: Button) {
      const route_button = document.getElementById(`route_button_${button.id}`).getBoundingClientRect()
      const start_x =
        route_button.x - this.gett.parent.x + this.gett.radius + this.gett.scroll_effect.horizontal;
      const start_y =
        route_button.y - this.gett.parent.y + this.gett.radius + this.gett.scroll_effect.vertical;
      const end_x = button.connection.coords.end_x;
      const end_y = button.connection.coords.end_y;
      return {
        start_x: start_x,
        start_y: start_y,
        end_x: end_x,
        end_y: end_y,
        path: useBeizerCurvature(
          start_x,
          start_y,
          end_x,
          end_y,
          button.connection.reverse
        ),
        polygon: usePolygonPoints(end_x, end_y, start_x, button.connection.reverse),
      }
    },
    UpdateAssambly(button: Button, count: number) {
      const { y } = document.getElementById(`block_${button.connection.toRoute.block_id}`).getBoundingClientRect()
      const route_button = document.getElementById(`route_button_${button.id}`).getBoundingClientRect()

      const start_x =
        route_button.x - this.gett.parent.x + this.gett.radius + this.gett.scroll_effect.horizontal;
      const start_y =
        route_button.y - this.gett.parent.y + this.gett.radius + this.gett.scroll_effect.vertical;

      const end_x = button.connection.coords.end_x;
      const end_y = y - this.gett.parent.y + 20 * count + 7 + this.gett.scroll_effect.vertical;

      return {
        start_x: start_x,
        start_y: start_y,
        end_x: end_x,
        end_y: end_y,
        path: useBeizerCurvature(
          start_x,
          start_y,
          end_x,
          end_y,
          button.connection.reverse
        ),
        polygon: usePolygonPoints(end_x, end_y, start_x, button.connection.reverse),
      }
    },
    UpdateButtonConnectionLine(block: Block, button: Button, value: Coords) {

      const main = useMainStore()
      const select = useSelectStore()
      main.all_commands.find(item => item.id === select.SelectedCommand.id).columns.find(item => item.id === block.column_id).blocks.find(item => item.id === block.id).buttons.find(item => item.id === button.id).connection.coords = value
    }
  },
});
