export default function (start_x: number, start_y: number, offsetX: number, offsetY: number) {
  return "M" +
    start_x +
    " " +
    start_y +
    " " +
    "C" +
    start_x * 1.17 +
    " " +
    start_y +
    "," +
    (offsetX / 1.17) +
    " " +
    offsetY +
    "," +
    offsetX +
    " " +
    offsetY;
}

