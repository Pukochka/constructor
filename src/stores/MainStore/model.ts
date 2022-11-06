import { Command } from '../../types';

export interface MainStore {
  all_commands: Command[];
  input: TextInput;
  scale: number;
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
  value: string;
  name: number;
  required: Required
}

export interface Required {
  (): boolean
}
