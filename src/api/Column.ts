import axios from 'axios';

const TOKEN = '2109328710:AAGFynAUSvPhYwDCXkmp14HUsmC8h1ap3FI';
const BOT_ID = 12845;
const HOST = 'https://api.bot-t.com';

export default function (METHOD: ColumnMethods, POST_PARAMS?: PostParams) {
  return axios.post(`${HOST}/v1/bot/route/column/${METHOD}?token=${TOKEN}`, { bot_id: BOT_ID, ...POST_PARAMS });
}

export type ColumnMethods = 'delete' | 'create' | 'add-message-in-column'

export interface PostParams {
  route_id?: number;
  type?: number;
  column_id?: number;
}