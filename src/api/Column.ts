import axios from 'axios';
import CONFIG from '../../botconfig';

const TOKEN = CONFIG.BOT.token;
const BOT_ID = CONFIG.BOT.id;
const HOST = CONFIG.HOST;

export default function (METHOD: ColumnMethods, POST_PARAMS?: PostParams) {
  return axios.post(`${HOST}/v1/bot/route/column/${METHOD}?token=${TOKEN}`, {
    bot_id: BOT_ID,
    ...POST_PARAMS,
  });
}

export type ColumnMethods =
  | 'delete'
  | 'create'
  | 'add-message-in-column'
  | 'change-sort-and-column';

export interface PostParams {
  route_id?: number;
  type?: number;
  column_id?: number;
  message_type?: number;
  message_id?: number;
  sort?: number;
}
