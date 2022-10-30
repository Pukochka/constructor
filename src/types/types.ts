export interface Command {
  label: string;
  id: number;
  columns: Column[]
}

export interface Column {
  id: number;
  command_id: number;
  blocks: Block[];
}

export interface Block {
  /**
   * type
   * 0 -- Текст;
   * 1 -- Изображение;
   * */
  type: number;
  buttons: Button[];
  options: string | ArrayBuffer;
  block_options: BlockOptions;
  id: number;
  column_id: number;
}

export interface BlockOptions {
  name: string;
  color: string;
}

// export interface TextReplic {
//   content: string;
// }

// export interface ImageReplic {
//   image: string;
// }

export interface Button {
  type: number;
  label: string;
  id: number;
  connection: Connection | null | undefined;
}

export interface Connection {
  to: RouteTo;
  info: ConnectionInfo;
  type: number; /**0 -- Действие из routes; 1 -- Связь с блоком */
}

export interface RouteTo {
  command_id: number;
  block_id: number;
  button_id: number;
}

export interface ConnectionInfo {
  block_name: string;
  button_name: string;
}



export interface Scenary {
  type: number;
  title: string;
  description: string;
  icon: string;
}
