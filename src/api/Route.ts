import axios from 'axios';
import { useStatesStore } from "../stores";

const TOKEN = '2109328710:AAGFynAUSvPhYwDCXkmp14HUsmC8h1ap3FI';
const BOT_ID = 12845;
const HOST = 'https://api.bot-t.com';
const { ChangeLoadingRoute } = useStatesStore()

export default function (METHOD: RouteMethods, POST_PARAMS?: PostParams) {
  ChangeLoadingRoute(true, METHOD)
  return axios.post(`${HOST}/v1/bot/route/route/${METHOD}?token=${TOKEN}`, { bot_id: BOT_ID, ...POST_PARAMS });
}

export type RouteMethods = 'index' | 'view' | 'update-message' | 'update-route' | 'delete' | 'create' | 'create-with-column';

export interface PostParams {
  route_id?: number;
  type?: number;
  message?: string;
  route?: string;
}