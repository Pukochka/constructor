import type { Command, Scenary, Block, Button, Column } from '../../types/types';

export interface SelectStore {
  select: Select;
}

export interface Select {
  scenary: Scenary;
  command: Command;
  column: Column;
  block: Block;
  button: Button,
  tabs: Tabs;
}

export interface Tabs {
  replics: NameReplics
}

export type NameReplics = 'all' | 'text' | 'image'

export type StateValues = "scenary" | "command" | "column" | "block" | "button"
export type StateTypes = Scenary | Command | Column | Block | Button 
