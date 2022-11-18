import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useSelectStore, useDataStore } from "../index";
import type { SvgStore, ScrollEffect } from './model';
import { Button, Block, AssamblyElements } from "../../types";
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
    get_collections: (state) => state.svg.collections,
    all_buttons: (state) => {
      // const select = useSelectStore()
      // select.Se.columns.forEach(item => {
      //   item.blocks.forEach(block => {
      //     block.buttons.forEach(btn => {
      //       if (!state.svg.collections.find(item => item.id === btn.id)) {
      //         state.svg.collections.push({
      //           block_id: block.id,
      //           column_id: item.id,
      //           id: btn.id,
      //           position: 0,
      //           start_x: null,
      //           start_y: null,
      //           end_x: null,
      //           end_y: null,
      //           path: null,
      //           polygon: null
      //         })
      //       }
      //     })
      //   })
      // })
      return state.svg.collections;
    }
  },
  actions: {
    SetParent(value: DOMRect) {
      this.svg.parent = value
    },
    StartCursorFollowing(value: AssamblyElements) {
      this.svg.cursor_path = true;
      this.svg.moving_line = value.id;
      this.svg.collections = this.svg.collections.map(item => {
        if (item.id === value.id) return value
        return item;
      })
    },
    EndCursorFollowing(value: AssamblyElements) {
      this.svg.cursor_path = false;
      this.svg.collections = this.svg.collections.map(item => {
        if (item.id === value.id) return value
        return item;
      })
      this.svg.moving_line = null;
    },
    MoveCursorFollowing(value: AssamblyElements) {
      this.svg.collections = this.svg.collections.map(item => {
        if (item.id === value.id) return value
        return item;
      })

    },
    ChangeScrollEffect(value: ScrollEffect) {
      this.svg.scroll_effect = value;
    },
    // DeleteConnection(id: number) {

    // },
    get_line(id: number): AssamblyElements {
      return this.all_buttons.find(item => item.id === id)
    },
    GetEndX(id: number): number {
      return this.all_buttons.find(item => item.id === id).end_x
    },
    GetEndY(id: number) {
      return this.all_buttons.find(item => item.id === id).end_y
    },
    GetReverse(id: number) {
      return this.all_buttons.find(item => item.id === id).reverse
    },
    DeleteBlockAndConnected(delete_block: Block) {
      const main = useDataStore()
      const select = useSelectStore()
      const select_command = computed(() =>
        main.all_commands.find((item) => item.id === select.SelectedButton.id)
      );
      for (const column of select_command.value.columns) {
        for (const block of column.blocks) {
          for (const button of block.buttons) {
            if (delete_block.connected.find(item => item === button.id)) {
              main.all_commands
                .find((item) => item.id === select.SelectedButton.id)
                .columns.find((item) => item.id === block.column_id)
                .blocks.find((item) => item.id === block.id)
                .buttons.find((item) => item.id === button.id).connection = {
                connected_with: null,
                route: '',
                reverse: false
              }
              this.svg.collections.find(item => item.id === button.id).position = 0
            }
          }
        }
      }
    },
    DeleteConnectionAndUpdateLine(button: Button, block: Block) {
      const main = useDataStore()
      const select = useSelectStore()
      main.all_commands
        .find((item) => item.id === select.SelectedButton.id)
        .columns.find((item) => item.id === button.connection.connected_with.column_id)
        .blocks.find(
          (item) => item.id === button.connection.connected_with.block_id
        ).connected = main.all_commands
          .find((item) => item.id === select.SelectedButton.id)
          .columns.find((item) => item.id === button.connection.connected_with.column_id)
          .blocks.find((item) => item.id === button.connection.connected_with.block_id)
          .connected.filter((item) => item !== button.id);

      const select_command = computed(() =>
        main.all_commands.find((item) => item.id === select.SelectedButton.id)
      );
      const block_connected = computed(() =>
        main.all_commands.find((item) => item.id === select.SelectedButton.id).columns.find(item => item.id === button.connection.connected_with.column_id).blocks.find(item => item.id === button.connection.connected_with.block_id).connected
      );
      for (const column of select_command.value.columns) {
        for (const block of column.blocks) {
          for (const button of block.buttons) {
            if (block_connected.value.find(item => item === button.id)) {
              const index = block_connected.value.indexOf(button.id)
              this.svg.collections.find(item => item.id === button.id).position = index;
              const updated_coords = this.UpdateAssambly(button, index);
              this.UpdateButtonConnectionLine(updated_coords);
            }
          }
        }
      }
      main.all_commands
        .find((item) => item.id === select.SelectedButton.id)
        .columns.find((item) => item.id === block.column_id)
        .blocks.find((item) => item.id === block.id)
        .buttons.find((item) => item.id === button.id).connection = {
        connected_with: null,
        route: '',
        reverse: false
      };
    },
    UpdateButtons() {
      if (this.gett.cursor_path) return;
      const main = useDataStore()
      const select = useSelectStore()
      const select_command = computed(() =>
        main.all_commands.find((item) => item.id === select.SelectedButton.id)
      );
      for (const column of select_command.value.columns) {
        for (const block of column.blocks) {
          for (const button of block.buttons) {
            if (button.type === 5) {
              const index = this.svg.collections.find(item => item.id === button.id).position
              const updated_coords = this.UpdateAssambly(button, index);
              this.UpdateButtonConnectionLine(updated_coords);
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
      const end_x = this.GetEndX(button.id);
      const end_y = this.GetEndY(button.id);
      return {
        block_id: this.get_line(button.id).block_id,
        column_id: this.get_line(button.id).column_id,
        id: button.id,
        reverse: this.get_line(button.id).reverse,
        position: this.get_line(button.id).position,
        start_x: start_x,
        start_y: start_y,
        end_x: end_x,
        end_y: end_y,
        path: useBeizerCurvature(
          start_x,
          start_y,
          end_x,
          end_y,
          this.GetReverse(button.id)
        ),
        polygon: usePolygonPoints(end_x, end_y, start_x, this.GetReverse(button.id)),
      }
    },
    UpdateAssambly(button: Button, count: number) {
      const { y } = document.getElementById(`block_${button.connection.connected_with.block_id}`).getBoundingClientRect()
      const route_button = document.getElementById(`route_button_${button.id}`).getBoundingClientRect()

      const start_x =
        route_button.x - this.gett.parent.x + this.gett.radius + this.gett.scroll_effect.horizontal;
      const start_y =
        route_button.y - this.gett.parent.y + this.gett.radius + this.gett.scroll_effect.vertical;

      const end_x = this.GetEndX(button.id);
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
          this.GetReverse(button.id)
        ),
        polygon: usePolygonPoints(end_x, end_y, start_x, this.GetReverse(button.id)),
      }
    },
    UpdateButtonConnectionLine(value: AssamblyElements) {
      this.svg.collections = this.svg.collections.map(item => {
        if (item.id === value.id) return value
        return item;
      })
    }
  },
});
