
export interface StatesStore {
  dialogs: Dialogs;
  loadings: Loadings;
}

export interface Dialogs {
  add_scenary: boolean;
  add_command: boolean;
  add_button: boolean;
  add_block: boolean;
  edit_button: boolean;
  edit_block: boolean;
  set_connection: boolean;
  set_route: boolean;
  test_constructor: boolean;
}

interface Loadings {
  route: RouteQueries;
  column: ColumnQueries;
  inline: InlineQueries;
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

export type DialogNames = 'add_scenary' | 'add_command' | 'add_button' | 'add_block' | 'edit_button' | 'set_connection' | 'set_route' | 'edit_block' | 'test_constructor';
