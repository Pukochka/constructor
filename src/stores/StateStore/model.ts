export interface StatesStore {
  dialogs: Dialogs;
  drag: boolean;
}

export interface Dialogs {
  add_route: boolean;
  add_route_with_column: boolean;
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
  route_without_column: boolean;
  sure_reset: boolean;
  edit_feed_back: boolean;
  edit_image: boolean;
}

export type DialogNames =
  | 'route_without_column'
  | 'add_route'
  | 'add_button'
  | 'add_message'
  | 'edit_button'
  | 'change_type'
  | 'settings_buttons'
  | 'set_connection'
  | 'set_route'
  | 'edit_route'
  | 'test_constructor'
  | 'edit_message'
  | 'add_route_with_column'
  | 'sure_reset'
  | 'edit_feed_back'
  | 'edit_image';
