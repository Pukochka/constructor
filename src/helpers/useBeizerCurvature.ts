export default function (start_x: number, start_y: number, offsetX: number, offsetY: number, is_reverse: boolean) {
  const cffc_l_cur = 1.15;
  const cffc_l_init = 1.3;
  const cffc_s_cur = 1.04;
  const cffc_s_init = 1.17;

  let cursor = offsetX / cffc_l_cur
  let init = start_x * cffc_l_init

  if (is_reverse && offsetX > start_x - 86) {
    cursor = offsetX / 1.1
    init = start_x / 1.3
  }
  else if (!is_reverse && offsetX < start_x + 86) {
    cursor = offsetX * cffc_s_cur
    init = start_x * cffc_s_init
  }
  else if (!is_reverse && offsetX > start_x + 86) {
    cursor = offsetX / cffc_l_cur
    init = start_x * cffc_l_init
  }
  else if (is_reverse && offsetX < start_x - 86) {
    cursor = offsetX * cffc_l_cur
    init = start_x / cffc_l_init
  }

  return "M" +
    start_x +
    " " +
    start_y +
    " " +
    "C" +
    init +
    " " +
    start_y +
    "," +
    cursor +
    " " +
    offsetY +
    "," +
    offsetX +
    " " +
    offsetY;
}

