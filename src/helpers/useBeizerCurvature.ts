export default function (start_x: number, start_y: number, offsetX: number, offsetY: number) {
  const coefficient = 1.35;

  let accounting_division = offsetX / coefficient
  let accounting_multiply = start_x * coefficient
  if (offsetX < start_x) {
    accounting_division = offsetX * coefficient
    accounting_multiply = start_x / coefficient
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
    accounting_division +
    " " +
    offsetY +
    "," +
    offsetX +
    " " +
    offsetY;
}

