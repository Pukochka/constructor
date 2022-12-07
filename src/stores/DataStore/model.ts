import {
  RouteInstance,
  SelectRouteInstance,
  ColorsInstance,
  MessageTypes,
} from '../../types';

export interface DataStore {
  input: TextInput;
  scale: number;
  uploader: Uploader;
  loading: boolean;
  is_column: boolean;
  is_line: boolean;
  main_template: 'dontsupport' | 'select' | 'constructor';
  ROUTES: RouteInstance[];
  SELECT_ROUTE: SelectRouteInstance;
  COLORS: ColorsInstance[];
  TYPES_MESSAGE: MessageTypes[];
}

export interface TextInput {
  value: string;
  max: number;
  min: number;
  required: Required;
}

export interface Uploader {
  value: string;
  name: number;
  required: Required;
}

export interface Required {
  (): boolean;
}
