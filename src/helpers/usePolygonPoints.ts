export default function (offsetX: number, offsetY: number, start_x: number, is_reverse: boolean) {
  const polygon = `${offsetX - 5},${offsetY - 7} ${offsetX + 12},${offsetY} ${offsetX - 5},${offsetY + 7} ${offsetX},${offsetY}`;
  const reverse_polygon = `${offsetX + 5},${offsetY + 7} ${offsetX - 12},${offsetY} ${offsetX + 5},${offsetY - 7} ${offsetX},${offsetY}`;

  if (is_reverse && offsetX > start_x - 86) return polygon
  else if (!is_reverse && offsetX < start_x + 86) return reverse_polygon
  else if (!is_reverse && offsetX > start_x + 86) return polygon
  else if (is_reverse && offsetX < start_x - 86) return reverse_polygon
}