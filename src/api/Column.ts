import axios from 'axios';
import { useStatesStore } from "../stores";

const TOKEN = '2109328710:AAGFynAUSvPhYwDCXkmp14HUsmC8h1ap3FI';
const BOT_ID = 12845;
const HOST = 'https://api.bot-t.com';
const { ChangeLoadingColumn } = useStatesStore()

export default function (METHOD: ColumnMethods, POST_PARAMS?: PostParams) {
  ChangeLoadingColumn(true, METHOD)
  return axios.post(`${HOST}/v1/bot/route/column/${METHOD}?token=${TOKEN}`, { bot_id: BOT_ID, ...POST_PARAMS });
}

export type ColumnMethods = 'delete' | 'create' | 'add-message-in-column'

export interface PostParams {
  route_id?: number;
  type?: number;
  column_id?: number;
  message_type?: number;
}