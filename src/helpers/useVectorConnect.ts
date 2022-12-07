import { useVectorStore } from './../stores/VectorStore/Vector';
import { useBeizerCurvature, usePolygonPoints } from './';

const POLYGON_OFFSET = 13;
const REVERSE_DIFF = 86;
const COUNT_OFFSET = 18;

export default function (
  message_id: number,
  button_id: number,
  position: number,
  is_init: boolean
) {
  const vector = useVectorStore();

  const { left, top, width } = document
    .getElementById(`message_${message_id}`)
    .getBoundingClientRect();
  const circle = document
    .getElementById(`inline_${button_id}`)
    .getBoundingClientRect();

  let reverse = false;

  const parent_x = vector.InitValues.parent.left;
  const parent_y = vector.InitValues.parent.top + 50; // ПЕРЕДЕЛАТЬ
  const radius = vector.InitValues.radius;
  const horizontal = vector.InitValues.scroll_effect.horizontal;
  const vertical = vector.InitValues.scroll_effect.vertical;
  const scale = Math.round(vector.Scale * 100) / 100;


  let start_x = (circle.left - parent_x + horizontal + radius) / scale;
  const start_y = (circle.top - parent_y + vertical + radius) / scale;
  let end_x = (left - parent_x + horizontal) / scale;
  const end_y = (top - parent_y + position * COUNT_OFFSET + vertical) / scale;

  if (start_x + REVERSE_DIFF / scale < end_x) {
    /** RIGHT MESSAGE */
    end_x -= POLYGON_OFFSET / scale;
    reverse = false;
  } else if (start_x - REVERSE_DIFF / scale > end_x + width / scale) {
    /** LEFT MESSAGE */
    end_x += (width + POLYGON_OFFSET) / scale;
    reverse = true;
    if (is_init) start_x -= 297;
  } else if (start_x + REVERSE_DIFF / scale > end_x + width / scale) {
    /** RIGHT SIDE */
    end_x += (width + POLYGON_OFFSET) / scale;
    reverse = false;
  } else if (start_x - REVERSE_DIFF / scale < end_x) {
    /** LEFT SIDE */
    end_x -= POLYGON_OFFSET / scale;
    reverse = true;
    if (is_init) start_x -= 297;
  }

  const path = useBeizerCurvature(start_x, start_y, end_x, end_y, reverse);
  const polygon = usePolygonPoints(start_x, end_x, end_y, reverse);

  return {
    start_x: start_x,
    start_y: start_y,
    end_x: end_x,
    end_y: end_y,
    reverse: reverse,
    path: path,
    polygon: polygon,
  };
}
