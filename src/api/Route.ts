import axios from 'axios';
import CONFIG from '../../botconfig';

const TOKEN = CONFIG.BOT.token;
const BOT_ID = CONFIG.BOT.id;
const HOST = CONFIG.HOST;

export default function (METHOD: RouteMethods, POST_PARAMS?: PostParams) {
  return axios.post(`${HOST}/v1/bot/route/route/${METHOD}?token=${TOKEN}`, {
    bot_id: BOT_ID,
    ...POST_PARAMS,
  });
}

export type RouteMethods =
  | 'index'
  | 'view'
  | 'update-message'
  | 'update-route'
  | 'delete'
  | 'create'
  | 'create-with-column'
  | 'set-active';

export interface PostParams {
  route_id?: number;
  type?: number;
  message?: string;
  message_type?: number;
  route?: string;
  message_id?: number;
}
