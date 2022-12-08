import { InlineMenuButtonInstance } from './../../types/index';
import { useDataStore } from './../DataStore/Data';
import { ref } from 'vue';
import { defineStore } from 'pinia';

import { TestStore } from "./model";

export const useTestStore = defineStore({
  id: 'TestStore',
  state: () => ref({
    READY_TO_TEST: [],
    ALL_MESSAGES: [],
    ACTIVE_MESSAGE: {},
  } as TestStore),

  getters: {
    TestReady: (state) => state.READY_TO_TEST,
  },
  actions: {
    FirstMessage() {
      const main = useDataStore();
      for (const column of main.SelectRoute.columns) {
        for (const message of column.messages) {
          if (message.active) {
            this.ACTIVE_MESSAGE = message;
            this.READY_TO_TEST.push(message)
          };
        }
      }
    },
    ConnectedMessages() {
      const connections = [];
      const main = useDataStore();
      for (const item of main.SelectRoute.lines) {
        connections.push(item.message_id);
      }

      for (const column of main.SelectRoute.columns) {
        for (const message of column.messages) {
          if (connections.find(item => item === message.id)) this.ALL_MESSAGES.push(message);
        }
      }
    },
    CurrentMessage(id: number) {
      return this.ALL_MESSAGES.find(item => item.id === id);
    },
    ToConnectMessage(button: InlineMenuButtonInstance) {
      this.READY_TO_TEST.push(this.CurrentMessage(button.line))
    },
    UserAnswers(button: InlineMenuButtonInstance) {
      this.READY_TO_TEST.push({
        id: button.id,
        text: { content: button.data.text },
        type: { id: -1 }
      })
    },
    ReloadTest() {
      this.READY_TO_TEST = [this.ACTIVE_MESSAGE]
    },
    EndTest() {
      this.READY_TO_TEST = [];
      this.ACTIVE_MESSAGE = [];
      this.ALL_MESSAGES = [];
    }
  },
});
