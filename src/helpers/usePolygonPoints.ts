const REVERSE_DIFF = 86;

export default function (start_x: number, offsetX: number, offsetY: number, is_reverse: boolean) {
  const polygon = `${offsetX - 5},${offsetY - 7} ${offsetX + 12},${offsetY} ${offsetX - 5},${offsetY + 7} ${offsetX},${offsetY}`;
  const reverse_polygon = `${offsetX + 5},${offsetY + 7} ${offsetX - 12},${offsetY} ${offsetX + 5},${offsetY - 7} ${offsetX},${offsetY}`;

  if (is_reverse && offsetX > start_x - REVERSE_DIFF) return polygon
  else if (!is_reverse && offsetX < start_x + REVERSE_DIFF) return reverse_polygon
  else if (!is_reverse && offsetX > start_x + REVERSE_DIFF) return polygon
  else if (is_reverse && offsetX < start_x - REVERSE_DIFF) return reverse_polygon
}
