export interface SvgStore {
  svg: Svg
}

export interface Svg {
  collections: AssamblyElements[];
  cursor_path: boolean;
  moving_line: number;
  radius: number;
  scroll_effect: ScrollEffect;
  parent: DOMRect
}

export interface AssamblyElements {
  block_id: number,
  column_id: number;
  id: number;
  position: number;
  start_x: number;
  start_y: number;
  end_x: number;
  end_y: number;
  path: string;
  polygon: string;
}

export interface ScrollEffect {
  horizontal: number;
  vertical: number;
}

export interface ScrollCustomEvent {
  verticalPosition: number,
  verticalPercentage: number,
  verticalSize: number,
  verticalContainerSize: number,
  horizontalPosition: number,
  horizontalPercentage: number,
  horizontalSize: number,
  horizontalContainerSize: number,
  ref: {
    dark: null | boolean,
    thumbStyle: {
      right: string,
      height: string,
      bottom: string,
      padding: string,
      'border-radius': string,
      'background-color': string,
      width: string
    },
    delay: number,
    visible: boolean
  }

}