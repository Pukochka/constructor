import axios from 'axios';

import CONFIG from '../../botconfig';

const TOKEN = CONFIG.BOT.token;
const BOT_ID = CONFIG.BOT.id;
const HOST = CONFIG.HOST;

export default function (METHOD: ReplyMethods, POST_PARAMS?: PostParams) {
  return axios.post(
    `${HOST}/v1/bot/keyboard/inline-keyboard/${METHOD}?token=${TOKEN}`,
    { bot_id: BOT_ID, ...POST_PARAMS }
  );
}

export type ReplyMethods =
  | 'view'
  | 'delete-button'
  | 'delete-line'
  | 'change-sort-and-line'
  | 'update-data-and-type'
  | 'add-button-in-line'
  | 'add-button-with-line'
  | 'update-button-text'
  | 'update-data-button'
  | 'update-type'
  | 'move-first-line'
  | 'move-last-line';

export interface PostParams {
  menu_id?: number;
  type?: number;
  id?: number;
  line_id?: number;
  sort?: number;
  text?: number;
  action?: number;
}
