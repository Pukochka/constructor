const REVERSE_DIFF = 86;
const CURSOR_CFF_LONG = 120;
const START_CFF_LONG = 160;
const CURSOR_CFF_SHORT = 60;
const START_CFF_SHORT = 100;

export default function (start_x: number, start_y: number, end_x: number, end_y: number, is_reverse: boolean) {
  let cursor = end_x - CURSOR_CFF_LONG
  let start = start_x + START_CFF_LONG

  if (is_reverse && end_x > start_x - REVERSE_DIFF) {
    cursor = end_x - CURSOR_CFF_SHORT
    start = start_x - START_CFF_SHORT
  }
  else if (!is_reverse && end_x < start_x + REVERSE_DIFF) {
    cursor = end_x + CURSOR_CFF_SHORT
    start = start_x + START_CFF_SHORT
  }
  else if (!is_reverse && end_x > start_x + REVERSE_DIFF) {
    cursor = end_x - CURSOR_CFF_LONG
    start = start_x + START_CFF_LONG
  }
  else if (is_reverse && end_x < start_x - REVERSE_DIFF) {
    cursor = end_x + CURSOR_CFF_LONG
    start = start_x - START_CFF_LONG
  }

  return "M" +
    start_x +
    " " +
    start_y +
    " " +
    "C" +
    start +
    " " +
    start_y +
    "," +
    cursor +
    " " +
    end_y +
    "," +
    end_x +
    " " +
    end_y;
}

