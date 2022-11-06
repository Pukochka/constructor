export default function (offsetX: number, offsetY: number, start_x: number) {
  if (offsetX < start_x) return `${offsetX + 5},${offsetY + 7} ${offsetX - 12},${offsetY} ${offsetX + 5},${offsetY - 7} ${offsetX},${offsetY}`
  else return `${offsetX - 5},${offsetY - 7} ${offsetX + 12},${offsetY} ${offsetX - 5},${offsetY + 7} ${offsetX},${offsetY}`

}