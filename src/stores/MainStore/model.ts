import { Command, Scenary } from '../../types/types';

export interface MainStore {
  all_commands: Command[];
  all_scenaries: Scenary[];
  input: TextInput;
  uploader: Uploader;
  block_type: number;
}

export interface TextInput {
  value: string;
  max: number;
  min: number;
  required: Required
}

export interface Uploader {
  value: string | ArrayBuffer;
  name: number;
  required: Required
}

interface Required {
  (): boolean
}
