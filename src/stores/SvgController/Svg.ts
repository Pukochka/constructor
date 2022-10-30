import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { SvgStore, Circle } from './model';

export const useSvgStore = defineStore({
  id: 'SvgStore',
  state: () =>
    ref({
      svg: {
        circle: {
          radius: 7,
          dpi_y: 12,
          circles: []
        },
        cursor_path: false,
        moving_line: null,
        g_lines: []
      },
    } as SvgStore),
  getters: {
    SvgView: (state) => state.svg,
  },
  actions: {
    DetermingCircle(circle: Circle) {
      this.svg.circle.circles.push(circle)
    },
    DeativateCircle(id: number) {
      this.svg.circle.circles = this.svg.circle.circles.filter(item => item.id !== id)
    },
    StartCursorFollowing(id: number, start_x: number, start_y: number) {
      this.svg.cursor_path = true;
      this.svg.moving_line = id;
      this.svg.g_lines.push({
        id: id,
        start_x: start_x,
        start_y: start_y,
        now_x: null,
        now_y: null,
        end_x: null,
        end_y: null,
      })
      setTimeout(() => this.svg.cursor_path = false, 5000)
    },
    EndCursorFollowing() {
      this.svg.cursor_path = false;
    },
    MoveCursorFollowing(id: number, now_x: number, now_y: number) {
      this.svg.g_lines.find(item => item.id === id).now_x = now_x;
      this.svg.g_lines.find(item => item.id === id).now_y = now_y;
    }
  },
});
