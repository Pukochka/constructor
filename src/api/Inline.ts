import axios from 'axios';

const TOKEN = '2109328710:AAGFynAUSvPhYwDCXkmp14HUsmC8h1ap3FI';
const BOT_ID = 12845;
const HOST = 'https://api.bot-t.com';

export default function (METHOD: InlineMethods, POST_PARAMS?: PostParams) {
  return axios.post(`${HOST}/v1/bot/keyboard/inline-keyboard/${METHOD}?token=${TOKEN}`, { bot_id: BOT_ID, ...POST_PARAMS });
}

export type InlineMethods = 'view' | 'delete-button' | 'delete-line' | 'change-sort-and-line' | 'update-data-and-type' | 'add-button-in-line' | 'add-button-with-line' | 'update-button-text' | 'update-data-button' | 'update-type' | 'move-first-line' | 'move-last-line';

export interface PostParams {
  menu_id?: number;
  type?: number;
  id?: number;
  line_id?: number;
  sort?: number;
  text?: string;
  action?: string;
}