
export interface StatesStore {
  dialogs: Dialogs;
  loadings: Loadings;
}

export interface Dialogs {
  add_route: boolean;
  edit_route: boolean;
  add_button: boolean;
  settings_buttons: boolean;
  change_type: boolean;
  add_message: boolean;
  edit_button: boolean;
  edit_message: boolean;
  set_connection: boolean;
  set_route: boolean;
  test_constructor: boolean;
}

export type DialogNames = 'add_route' | 'add_button' | 'add_message' | 'edit_button' | 'change_type' | 'settings_buttons' | 'set_connection' | 'set_route' | 'edit_route' | 'test_constructor' | 'edit_message';

interface Loadings {
  message: MessageQueries;
  route: RouteQueries;
  column: ColumnQueries;
  inline: InlineQueries;
}

interface MessageQueries {
  index: boolean;
  get: boolean;
  colors: boolean;
  types: boolean;
  'update-text': boolean;
  'update-title': boolean;
  'add-inline-menu': boolean;
  'delete-inline-menu': boolean;
  duplicate: boolean;
  'update-type': boolean;
  delete: boolean;
}

interface RouteQueries {
  index: boolean;
  view: boolean;
  'update-message': boolean;
  'update-route': boolean;
  delete: boolean;
  create: boolean;
  'create-with-column': boolean;
}

interface ColumnQueries {
  'add-message-in-column': boolean;
  delete: boolean;
  create: boolean;
}

interface InlineQueries {
  'delete-button': boolean;
  'delete-line': boolean;
  'change-sort-and-line': boolean;
  'update-data-and-type': boolean;
  'add-button-in-line': boolean;
  'add-button-with-line': boolean;
  'update-button-text': boolean;
  'update-data-button': boolean;
  'update-type': boolean;
  'move-first-line': boolean;
  'move-last-line': boolean;
  view: boolean;
}


