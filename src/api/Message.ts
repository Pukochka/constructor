import axios from 'axios';

import CONFIG from '../../botconfig';

const TOKEN = CONFIG.BOT.token;
const BOT_ID = CONFIG.BOT.id;
const HOST = CONFIG.HOST;

export default function (METHOD: MessageMethods, POST_PARAMS?: PostParams) {
  return axios.post(`${HOST}/v1/bot/message/message/${METHOD}?token=${TOKEN}`, {
    bot_id: BOT_ID,
    ...POST_PARAMS,
  });
}

export type MessageMethods =
  | 'index'
  | 'get'
  | 'colors'
  | 'types'
  | 'update-text'
  | 'update-title'
  | 'add-inline-menu'
  | 'delete-inline-menu'
  | 'duplicate'
  | 'update-type'
  | 'delete'
  | 'set-color';

export interface PostParams {
  id?: number;
  title?: string;
  text?: string;
  link?: string;
  active?: boolean;
  sort?: number | null;
  specType?: number | null;
  route_id?: number;
  color?: string;
  inline_menu?: null;
  type?: number;
  column_id?: number;
  message_id?: number;
  color_id?: number;
}
