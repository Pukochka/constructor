export const Colors: string[] = ["#1976D2", "#26A69A", "#9C27B0", "#21BA45", "#C10015", "#31CCEC", "#F2C037", "#13ce80", "#8dce13", "#7413ce", "#ce13a6", "#51ff2f", "#bad3b5"];
export const RndColor = () => {
  const number: number = Math.round(Math.random() * Colors.length);
  return Colors[number]
}