import { DialogNames } from '../stores/StateStore/model';
import { TextInput, Required, Uploader } from '../stores/DataStore/model';
import { StateTypes, NameReplics } from '../stores/SelectStore/model';
import {
  AssamblyElements,
  ScrollCustomEvent,
  ScrollEffect,
} from '../stores/VectorStore/model';

export type {
  DialogNames,
  TextInput,
  Required,
  Uploader,
  StateTypes,
  NameReplics,
  AssamblyElements,
  ScrollCustomEvent,
  ScrollEffect,
};

export interface ResponseInstanse {
  message?: string;
  result: boolean;
  data?: RouteInstance[] | null;
}

export interface RouteInstance {
  bot_id: number;
  id: number;
  label: string;
  route: string;
  is_column: boolean;
  is_menu: boolean;
}

export interface SelectRouteInstance {
  bot_id: number;
  columns: ColumnInstance[];
  id: number;
  label: string;
  route: string;
  lines: Connections[];
}

export interface ColumnInstance {
  id: number;
  route_id: number;
  messages: MessageInstance[];
  sort: number;
}

export interface MessageInstance {
  active: boolean;
  color: {
    color: string;
    id: number;
    title: string;
  };
  column_id: number;
  id: number;
  inline_menu: InlineMenuInstance | null;
  link: string;
  sort: number;
  specType: { id: number };
  text: { content: string; length: number };
  title: string;
  type: { id: number; title: string };
}

export interface InlineMenuInstance {
  id: number;
  title: string;
  lines: InlineMenuLineInstance[];
}

export interface InlineMenuLineInstance {
  buttons: InlineMenuButtonInstance[];
  id: number;
  keyboard_id: number;
  sort: number;
}

export interface InlineMenuButtonInstance {
  data: { text: string; action: string };
  id: number;
  line_id: number;
  sort: number;
  type: number;
}

export interface ColorsInstance {
  id: number;
  title: string;
  color: string;
}

export interface MessageTypes {
  id: number;
  title: string;
}

export interface Connections {
  message_id: number;
  button_id: number;
}

export interface RoutesSelect {
  select: MainRoutes;
  current: RoutesSelectCurrent;
  clckAction: boolean;
  parsed_arr: Array<string>;
  end_route: string;
  danger: boolean;
}

export interface RoutesSelectCurrent {
  data: RoutesOptionsStatic[] | RoutesOptionsEdit[] | null;
  select: RoutesOptionsStatic | RoutesOptionsEdit | null;
}

export interface MainSelect {
  text: string;
  route: string;
  type_value: number;
  text_value?: undefined;
  identifier?: undefined;
  options?: undefined;
  value?: undefined;
  type?: undefined;
}

export interface MainRoutes {
  text: string;
  route?: string;
  type_value: number;
  text_value?: string;
  identifier?: string;
  options?: RoutesOptionsStatic[] | RoutesOptionsEdit[];
  type?: string;
}

export interface RoutesOptionsEdit {
  id: number;
  title: string;
  description: string;
}

export interface RoutesOptionsStatic {
  text: string;
  route: string;
  type: string;
  type_value: number;
}
