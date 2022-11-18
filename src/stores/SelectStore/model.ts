import type { RouteInstance, MessageInstance, ColumnInstance, InlineMenuButtonInstance, InlineMenuLineInstance } from '../../types';

export interface SelectStore {
  route: RouteInstance;
  column: ColumnInstance;
  message: MessageInstance;
  button: InlineMenuButtonInstance,
  line: InlineMenuLineInstance,
  tabs: Tabs;
}

export interface Tabs {
  replics: NameReplics
}

export type NameReplics = 'all' | 'text' | 'image'

export type StateValues = "route" | "column" | "button" | 'message' | 'line'
export type StateTypes = RouteInstance | MessageInstance | ColumnInstance | InlineMenuButtonInstance | InlineMenuLineInstance
