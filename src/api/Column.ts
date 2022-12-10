import axios from 'axios';
import CONFIG from '../../botconfig';
import { useErrorStore } from "../stores";

const TOKEN = CONFIG.BOT.token;
const BOT_ID = CONFIG.BOT.id;
const HOST = CONFIG.HOST;

export default async function (METHOD: ColumnMethods, POST_PARAMS?: PostParams) {
  const error = useErrorStore();
  try {
    return await axios.post(`${HOST}/v1/bot/route/column/${METHOD}?token=${TOKEN}`, {
      bot_id: BOT_ID,
      ...POST_PARAMS
    });
  } catch (e) {
    error.handleErrorReq();
  }
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
