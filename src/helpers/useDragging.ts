import { useVectorStore } from '../stores';
export default function (top: number, left: number) {
  const vector = useVectorStore();

  const x = left - vector.InitValues.parent.left + 5;
  const y = top - 50 /** ПЕРЕДЕЛАТЬ */ - vector.InitValues.parent.top + 5;
  return {
    top: y,
    left: x,
  };
}
