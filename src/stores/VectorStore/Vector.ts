import { useSelectStore } from './../SelectStore/Select';
import { useDataStore } from './../DataStore/Data';
import { defineStore } from 'pinia';

import { ref } from 'vue';
import { useInitIndents, usePosition, useVectorConnect } from '../../helpers';

import type { SvgStore, ScrollEffect, LineInstance } from './model';

export const useVectorStore = defineStore({
  id: 'VectorStore',
  state: () =>
    ref({
      active: false,
      active_button: null,
      consilience: -1,
      buttons: [],
      scope: 1,
      init: {
        parent: null,
        radius: 12,
        scroll_effect: {
          horizontal: 0,
          vertical: 0,
        },
      },
    } as SvgStore),
  getters: {
    is_active: (state) => state.active,
    VectorLines: (state) => state.buttons,
    InitValues: (state) => state.init,
    Scale: (state) => state.scope,
  },
  actions: {
    IncreaseScale() {
      this.scope += 0.05;
    },
    DecreaseScale() {
      this.scope -= 0.05;
    },
    ApplyLine(line: LineInstance, id: number) {
      this.buttons.map((item) => {
        if (item.id === id) {
          item.line = line;
        }
        return item;
      });
    },
    InitParent(value: DOMRect) {
      this.init.parent = value;
    },
    ChangeScrollEffect(value: ScrollEffect) {
      this.init.scroll_effect = value;
    },
    UpdateRouteConnections(message_id: number, button_id: number) {
      const main = useDataStore();
      for (const connection of main.SELECT_ROUTE.lines) {
        if (connection.button_id === button_id) {
          main.SELECT_ROUTE.lines = main.SELECT_ROUTE.lines.filter(
            (item) => item.button_id !== button_id
          );
        }
      }
      main.SELECT_ROUTE.lines.push({
        message_id: message_id,
        button_id: button_id,
      });
    },
    /**
     *
     *
     */
    MountedButton(id: number) {
      if (this.buttons.find((item) => item.id === id)) {
        this.consilience = id;
        return;
      }
      this.buttons.push({
        id: id,
        line: null,
        position: 0,
      });
    },
    UnMountedButton(id: number) {
      if ((this.consilience = id)) {
        this.consilience = -1;
        return;
      }
      this.buttons = this.buttons.filter((item) => item.id !== id);
    },
    UnMountedLine(id: number) {
      const main = useDataStore();
      main.SELECT_ROUTE.lines = main.SELECT_ROUTE.lines.filter(
        (item) => item.button_id !== id
      );

      this.buttons = this.buttons.map((button) => {
        if (id === button.id)
          return {
            id: button.id,
            line: null,
            position: 0,
          };
        return button;
      });
    },
    UnMountedButtonsMessageDeleted(message_id: number, response) {
      const main = useDataStore();
      const deleted = [];

      for (const connection of main.SelectRoute.lines) {
        if (connection.message_id === message_id)
          deleted.push(connection.button_id);
      }

      for (const item of deleted) {
        this.buttons = this.buttons.map((button) => {
          if (item === button.id)
            return {
              id: button.id,
              line: null,
              position: 0,
            };
          return button;
        });
      }

      main.SetSelectRoute(response.data);
    },
    /**
     *
     *
     *
     */
    InitFollowing(event: MouseEvent, button_id: number, message_id: number) {
      document.addEventListener('mousemove', this.MoveFollowing, false);
      this.active = true;
      this.active_button = button_id;

      const line = useInitIndents(event, button_id, message_id);

      this.ApplyLine(line, button_id);
    },
    /**
     *
     *
     *
     */
    MoveFollowing(event: MouseEvent) {
      const select = useSelectStore();
      const line = useInitIndents(
        event,
        select.SelectedButton.id,
        select.SelectedMessage.id
      );

      this.ApplyLine(line, this.active_button);
    },
    /**
     *
     *
     *
     */
    EndFollowing(message_id: number) {
      document.removeEventListener('mousemove', this.MoveFollowing, false);
      this.active = false;
      const main = useDataStore();
      const is_first = main.SELECT_ROUTE.lines;

      if (is_first) {
        this.UpdateRouteConnections(message_id, this.active_button);
      } else {
        main.SELECT_ROUTE.lines = [
          { message_id: message_id, button_id: this.active_button },
        ];
      }

      const position = usePosition(
        main.SELECT_ROUTE.lines,
        message_id,
        this.active_button
      );

      const line = useVectorConnect(
        message_id,
        this.active_button,
        position,
        false
      );

      this.ApplyLine(line, this.active_button);
    },
  },
});
