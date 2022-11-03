import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useSelectStore } from "../index";
import type { SvgStore, AssamblyElements } from './model';

export const useSvgStore = defineStore({
  id: 'SvgStore',
  state: () =>
    ref({
      svg: {
        mass: [],
        cursor_path: false,
        moving_line: null,
        radius: 7,
        collections: [],
      },
    } as SvgStore),
  getters: {
    gett: (state) => state.svg,
  },
  actions: {
    ToggleAction(id: number, value: boolean) {
      console.log(id, this.svg.collections);
      this.svg.collections.find(item => item.button_id === id).action = value
    },
    DetermingCollection(elements: AssamblyElements) {
      this.svg.collections.push(elements)
    },
    UnmountCollection(id: number) {
      this.svg.collections = this.svg.collections.filter(item => item.button_id === id)
    },
    UpdateCollection() {
      const select = useSelectStore();
      const current_collection = []
      for (const item of select.SelectCommandButtonsId) {
        console.log(item);
        console.log(this.svg.collections.find(col => col.button_id === item));
        current_collection.push()
      }
      this.svg.collections = current_collection
      console.log(this.svg.collections);
    },
    StartCursorFollowing(assambly: AssamblyElements) {
      this.svg.moving_line = assambly.button_id;
      this.ToggleAction(assambly.button_id, true)
      this.svg.cursor_path = true;
      setTimeout(() => document.addEventListener("click", this.EndCursorFollowing, false), 10)
    },
    EndCursorFollowing() {
      this.svg.cursor_path = false;
      document.removeEventListener("click", this.EndCursorFollowing, false)
    },
    MoveCursorFollowing(id: number, beizer_curve: string, polygon_points: string) {
      this.svg.collections.find(item => item.button_id === id).path.beizer_curve = beizer_curve;
      this.svg.collections.find(item => item.button_id === id).polygon_points = polygon_points;
    },
    MassP(id: number) {
      this.svg.mass.push(id)
      console.log(this.svg.mass);
    }
  },
});
