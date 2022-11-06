import { DialogNames } from "../stores/DialogStore/model";
import { TextInput, Required, Uploader } from "../stores/MainStore/model";
import { StateTypes, NameReplics } from "../stores/SelectStore/model";
import { AssamblyElements, ScrollCustomEvent, ScrollEffect } from "../stores/SvgController/model";

export type { DialogNames, TextInput, Required, Uploader, StateTypes, NameReplics, AssamblyElements, ScrollCustomEvent, ScrollEffect }

export interface Command {
  /** label - название команды */
  label: string;
  /** id - id команды */
  id: number;
  /** columns - массив колонок */
  columns: Column[]
}

export interface Column {
  /** id - id колонки */
  id: number;
  /** command_id - id команды */
  command_id: number;
  /** blocks - массив экранов/свободных сообщений */
  blocks: Block[];
}

export interface Block {
  /**
   * type
   * 0 -- Текст;
   * 1 -- Изображение;
   * */
  type: number;
  /** buttons - массив кнопок */
  buttons: Button[];
  /** options - в зависимости от типа строка или base64 */
  options: string;
  /** block_options - название экрана/свободного сообщения */
  block_options: BlockOptions;
  /** id - id экрана/свободных сообщения*/
  id: number;
  /** column_id - id колонки */
  column_id: number;
  connection_count: number,
}

export interface BlockOptions {
  /** name - название экрана/свободного сообщения */
  name: string;
  /** color - цвет экрана/свободного сообщения */
  color: string;
}

// export interface TextReplic {
//   content: string;
// }

// export interface ImageReplic {
//   image: string;
// }

export interface Button {
  /**
   * type:
   * 0 - кнопка routes;
   * 1 - связь с блоком
   * 2 - */
  type: number;
  /** label - название кнопки */
  label: string;
  /** id - id кнопки */
  id: number;
  /** connection - соединение (routes / связь с блоком) */
  connection: Connection | null | undefined;
}

export interface Connection {
  /**
   * type:
   * 0 -- Ссылка;
   * 1 -- Действие;
   * 2 -- Поделиться;
   * 3 -- Выбрать текст;
   * 4 -- Web;
   * 5 -- Связь с блоком 
   * */
  type: number;
  /** to - для отрисовки линии или парса routes */
  to: string;
  /** info - инфо про связанный с кнопкой экран/свободного сообщение */
  info: ConnectionInfo;
  /** */
  coords: Coords;
  /** */
  toRoute: RouteTo;
}

export interface Coords {
  start_x: number;
  start_y: number;
  path: string;
  polygon: string;
}

export interface RouteTo {
  /** command_id - id команды */
  command_id: number;
  /** block_id - id экрана/свободного сообщения */
  block_id: number;
  column_id: number;
}

export interface ConnectionInfo {
  /** block_name - название экрана/свободного сообщения */
  block_name: string;
  /** button_name - название кнопки */
  button_name: string;
}

export interface RoutesSelect {
  select: MainRoutes,
  current: RoutesSelectCurrent,
  clckAction: boolean,
  parsed_arr: Array<string>,
  end_route: string,
  danger: boolean,
}

export interface RoutesSelectCurrent {
  data: RoutesOptionsStatic[] | RoutesOptionsEdit[] | null,
  select: RoutesOptionsStatic | RoutesOptionsEdit | null,
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
  id: number,
  title: string,
  description: string,
}

export interface RoutesOptionsStatic {
  text: string,
  route: string,
  type: string,
  type_value: number,
}
