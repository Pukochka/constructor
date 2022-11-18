import axios from 'axios';
import { useStatesStore } from "../stores";
const TOKEN = '2109328710:AAGFynAUSvPhYwDCXkmp14HUsmC8h1ap3FI';
const BOT_ID = 12845;
const HOST = 'https://api.bot-t.com';
const { ChangeLoadingMessage } = useStatesStore()

export default function (METHOD: MessageMethods, POST_PARAMS?: PostParams) {
  ChangeLoadingMessage(true, METHOD)
  return axios.post(`${HOST}/v1/bot/message/message/${METHOD}?token=${TOKEN}`, { bot_id: BOT_ID, ...POST_PARAMS });
}

export type MessageMethods = 'index' | 'get' | 'colors' | 'types' | 'update-text' | 'update-title' | 'add-inline-menu' | 'delete-inline-menu' | 'duplicate' | 'update-type' | 'delete'

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
}