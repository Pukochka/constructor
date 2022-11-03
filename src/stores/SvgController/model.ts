export interface SvgStore {
  svg: Svg
}

export interface Svg {
  collections: AssamblyElements[];
  cursor_path: boolean;
  moving_line: number;
  radius: number;
  mass: Array<number>
}

export interface AssamblyElements {
  button_id: number;
  start_x: number;
  start_y: number;
  action: boolean;
  path: Path;
  polygon_points: string;
}

export interface Path {
  beizer_curve: string;
}