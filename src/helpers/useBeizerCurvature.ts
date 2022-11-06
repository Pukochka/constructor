export default function (start_x: number, start_y: number, offsetX: number, offsetY: number) {
  let accounting_division = offsetX / 1.17
  let accounting_multiply = start_x * 1.17
  if (offsetX < start_x) {
    accounting_division = offsetX * 1.17
    accounting_multiply = start_x / 1.17
  }
  return "M" +
    start_x +
    " " +
    start_y +
    " " +
    "C" +
    accounting_multiply +
    " " +
    start_y +
    "," +
    (accounting_division) +
    " " +
    offsetY +
    "," +
    offsetX +
    " " +
    offsetY;
}

