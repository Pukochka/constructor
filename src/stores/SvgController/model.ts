export interface SvgStore {
  svg: Svg
}

export interface Svg {
  circle: CircleHelper;
  cursor_path: boolean;
  g_lines: GLine[];
  moving_line: number;
}

export interface Circle {
  x: number;
  y: number;
  id: number;
  button_id: number;
}

export interface CircleHelper {
  radius: number;
  dpi_y: number;
  circles: Circle[];
}

export interface GLine {
  id: number;
  start_x: number;
  start_y: number;
  now_x: number;
  now_y: number;
  end_x: number;
  end_y: number;
}