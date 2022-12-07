import type {
  RouteInstance,
  MessageInstance,
  ColumnInstance,
  InlineMenuButtonInstance,
  InlineMenuLineInstance,
} from '../../types';

export interface SelectStore {
  route: RouteInstance;
  column: ColumnInstance;
  message: MessageInstance;
  button: InlineMenuButtonInstance;
  line: InlineMenuLineInstance;
  tabs: Tabs;
}

export interface Tabs {
  replics: NameReplics;
}

export type NameReplics = 'all' | 'text' | 'image';

export type StateValues = 'route' | 'column' | 'button' | 'message' | 'line';

export type StateTypes =
  | RouteInstance
  | MessageInstance
  | ColumnInstance
  | InlineMenuButtonInstance
  | InlineMenuLineInstance;

// interface Routes {
//   text?: string;
//   route?: string;
//   type_value?: number;
//   text_value?: string;
//   identifier?: string;
//   type?: string;
//   options?: Options[];
//   value?: Value[];
// }

// interface Options {
//   id?: number;
//   title?: string;
//   description?: string;
//   text?: string;
//   route?: string;
//   type_value?: number;
//   type?: string;
// }

// interface Value {
//   text?: string;
//   route?: string;
//   type_value?: number;
//   type?: string;
// }
