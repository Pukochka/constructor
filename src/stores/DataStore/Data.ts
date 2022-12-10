import { useErrorStore } from './../ErrorStore/Error';
import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { DataStore } from './model';
import {
  ResponseInstanse,
  MessageInstance,
  InlineMenuInstance,
} from '../../types';

export const useDataStore = defineStore('DataStore', {
  state: () =>
    ref({
      ROUTES: [],
      SELECT_ROUTE: {},
      COLORS: [],
      TYPES_MESSAGE: [],
      is_column: false,
      is_line: false,
      scale: 1,
      loading: true,
      main_template: 'select',
      input: {
        value: '',
        max: 100,
        min: 1,
        required() {
          return this.max > this.value.length && this.min < this.value.length;
        },
      },
      uploader: {
        value: null,
        name: null,
        required() {
          return this.value;
        },
      },
    } as DataStore),
  getters: {
    viewScale: (state) => state.scale,
    MainTemplate: (state) => state.main_template,
    AllRoutes: (state) => state.ROUTES,
    SelectRoute: (state) => state.SELECT_ROUTE,
    AllColors: (state) => state.COLORS,
    AllTypes: (state) => state.TYPES_MESSAGE,
    IsColumn: (state) => state.is_column,
    IsLine: (state) => state.is_line,
    InitLoading: (state) => state.loading,
  },
  actions: {
    ChangeLoading(value: boolean) {
      this.loading = value;
    },
    SetRoutes(response: ResponseInstanse) {
      if (response.result) this.ROUTES = response.data;
    },
    SetSelectRoute(response: ResponseInstanse) {
      if (response.result) {
        this.SELECT_ROUTE = response.data;
        if (!window.location.search.includes('route_id')) {
          window.history.pushState(
            null,
            document.title,
            window.location.search + `&route_id=${this.SELECT_ROUTE.id}`
          );
        }
      } else {
        const error = useErrorStore();
        error.handleErrorRes(response?.message);
      }
    },
    SetMessage(message_id: number, value: MessageInstance) {
      for (const column of this.SELECT_ROUTE.columns) {
        for (const message of column.messages) {
          if (message.id === message_id) {
            this.SELECT_ROUTE.columns
              .find((item) => item.id === column.id)
              .messages.find((item) => item.id === message_id).inline_menu =
              value.inline_menu;
          }
        }
      }
    },
    SetColors(response: ResponseInstanse) {
      if (response.result) this.COLORS = response.data;
    },
    AddInlineMenuInMessage(id: number, value: MessageInstance) {
      for (const column of this.SELECT_ROUTE.columns) {
        for (const message of column.messages) {
          if (message.id === id) {
            this.SELECT_ROUTE.columns
              .find((item) => item.id === column.id)
              .messages.find((item) => item.id === id).inline_menu =
              value.inline_menu;
          }
        }
      }
    },
    UpdateInlineMenu(id: number, value: InlineMenuInstance) {
      for (const column of this.SELECT_ROUTE.columns) {
        for (const message of column.messages) {
          if (message.id === id) {
            this.SELECT_ROUTE.columns
              .find((item) => item.id === column.id)
              .messages.find((item) => item.id === id).inline_menu = value;
          }
        }
      }
    },
    SetTypes(value) {
      this.TYPES_MESSAGE = value;
    },
    ChangeIsColumn(value: boolean) {
      this.is_column = value;
    },
    ChangeIsLine(value: boolean) {
      this.is_line = value;
    },
    ChangeTemplate(template: 'constructor' | 'select' | 'dontsupport') {
      this.main_template = template;
    },
  },
});
