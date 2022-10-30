export interface DialogsStore {
  dialogs: Dialogs;
}

interface Dialogs {
  add_scenary: boolean;
  add_command: boolean;
  add_button: boolean;
  add_block: boolean;
  edit_button: boolean;
  set_connection: boolean;
  set_route: boolean;
}

export type DialogNames = 'add_scenary' | 'add_command' | 'add_button' | 'add_block' | 'edit_button' | 'set_connection' | 'set_route';
