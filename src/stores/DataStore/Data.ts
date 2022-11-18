import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { DataStore } from './model';
import { ResponseInstanse, MessageInstance, InlineMenuInstance } from "../../types";
import { useStatesStore } from "../";
import { RouteMethods, MessageMethods, ColumnMethods, } from "../../api";
// import { Commands } from '../../data/Commands';

export const useDataStore = defineStore('DataStore', {
  state: () =>
    ref({
      all_commands: [],
      ROUTES: [],
      SELECT_ROUTE: {},
      COLORS: [],
      TYPES_MESSAGE: [],
      is_column: false,
      is_line: false,
      block_type: 0,
      scale: 1,
      main_template: "select",
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
    } as DataStore),
  getters: {
    Commands: (state) => state.all_commands,
    GetBlockConfig: (state) => {
      if (state.block_type === 0) return { type: state.block_type, ...state.input }
      if (state.block_type === 1) return { type: state.block_type, ...state.uploader }
    },
    viewScale: state => state.scale,
    MainTemplate: state => state.main_template,
    AllRoutes: state => state.ROUTES,
    SelectRoute: state => state.SELECT_ROUTE,
    AllColors: state => state.COLORS,
    AllTypes: state => state.TYPES_MESSAGE,
    IsColumn: state => state.is_column,
    IsLine: state => state.is_line,
  },
  actions: {
    SetRoutes(response: ResponseInstanse, loading: RouteMethods) {
      const { ChangeLoadingRoute } = useStatesStore()
      if (response.result) {
        this.ROUTES = response.data;
        ChangeLoadingRoute(false, loading)
      } else {
        console.warn('errrr');
      }
    },
    SetSelectRoute(response: ResponseInstanse, loading: RouteMethods) {
      const { ChangeLoadingRoute } = useStatesStore()
      if (response.result) {
        this.SELECT_ROUTE = response.data;
        ChangeLoadingRoute(false, loading)
      } else {
        console.warn('errrr');
      }
    },
    ChangeSelectRoute(response: ResponseInstanse, loading: ColumnMethods) {
      const { ChangeLoadingColumn } = useStatesStore()
      if (response.result) {
        this.SELECT_ROUTE = response.data;
        ChangeLoadingColumn(false, loading)
      } else {
        console.warn('errrr');
      }
    },
    SetColors(response: ResponseInstanse, loading: MessageMethods) {
      const { ChangeLoadingMessage } = useStatesStore()
      if (response.result) {
        this.COLORS = response.data;
        ChangeLoadingMessage(false, loading)
      } else {
        console.warn('errrr');
      }
    },
    AddInlineMenuInMessage(id: number, value: MessageInstance) {
      for (const column of this.SELECT_ROUTE.columns) {
        for (const message of column.messages) {
          if (message.id === id) {
            this.SELECT_ROUTE.columns.find(item => item.id === column.id).messages.find(item => item.id === id).inline_menu = value.inline_menu
          }
        }
      }
    },
    UpdateInlineMenu(id: number, value: InlineMenuInstance) {
      for (const column of this.SELECT_ROUTE.columns) {
        for (const message of column.messages) {
          if (message.id === id) {
            this.SELECT_ROUTE.columns.find(item => item.id === column.id).messages.find(item => item.id === id).inline_menu = value
          }
        }
      }
    },
    SetTypes(value, loading: MessageMethods) {
      const { ChangeLoadingMessage } = useStatesStore()
      ChangeLoadingMessage(false, loading);
      this.TYPES_MESSAGE = value;
    },
    ChangeIsColumn(value: boolean) {
      this.is_column = value;
    },
    ChangeIsLine(value: boolean) {
      this.is_line = value;
    },
    ChangeTemplate(template: 'constructor' | 'select') {
      this.main_template = template;
    }
  },
});
