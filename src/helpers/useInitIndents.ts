import { useVectorStore } from '../stores';
import { useBeizerCurvature, usePolygonPoints } from ".";

const REVERSE_DIFF = 48;

export default function (event: MouseEvent, button_id: number, message_id: number) {
  const vector = useVectorStore();

  const { clientX, clientY } = event;

  const { left } = vector.InitValues.parent;
  const top = vector.InitValues.parent.top + 50; // ПЕРЕДЕЛАТЬ
  const message = document.getElementById(`message_${message_id}`).getBoundingClientRect();
  const button = document.getElementById(`inline_${button_id}`).getBoundingClientRect();

  let reverse = false;
  const radius = vector.InitValues.radius;
  const horizontal = vector.InitValues.scroll_effect.horizontal;
  const vertical = vector.InitValues.scroll_effect.vertical;
  const scale = Math.round(vector.Scale * 100) / 100;

  const start_x = (button.x - left + radius + horizontal) / scale;
  const start_y = (button.y - top + radius + vertical) / scale;
  const end_x = (clientX - left + horizontal) / scale;
  const end_y = (clientY - top + vertical) / scale;

  if (end_x < (message.left + horizontal + message.width / 2) / scale && end_x > (message.left - REVERSE_DIFF) / scale) {
    /**LEFT SIDE */
    reverse = true
  } else if (end_x > (message.left + horizontal + message.width / 2) / scale && end_x < (message.left + message.width + REVERSE_DIFF) / scale) {
    /**RIGHT SIDE */
    reverse = false
  } else if (end_x > (message.left + horizontal + message.width + REVERSE_DIFF) / scale) {
    /**RIGHT MESSAGE */
    reverse = false
  } else if (end_x < (message.left + horizontal - REVERSE_DIFF) / scale) {
    /**LEFT MESSAGE */
    reverse = true
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
  }
}
