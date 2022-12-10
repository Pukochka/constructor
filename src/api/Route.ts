import axios from 'axios';
import CONFIG from '../../botconfig';
import { useErrorStore } from "../stores";

const TOKEN = CONFIG.BOT.token;
const BOT_ID = CONFIG.BOT.id;
const HOST = CONFIG.HOST;

export default async function (METHOD: RouteMethods, POST_PARAMS?: PostParams) {
  const error = useErrorStore();
  try {
    return await axios.post(`${HOST}/v1/bot/route/route/${METHOD}?token=${TOKEN}`, {
      bot_id: BOT_ID,
      ...POST_PARAMS
    });
  } catch {
    error.handleErrorReq();
  }
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
