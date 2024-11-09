export const scale = (
  x: number,
  inLow: number,
  inHigh: number,
  outLow: number,
  outHigh: number,
) => {
  if (x === Infinity || x === -Infinity) return x;
  return ((x - inLow) * (outHigh - outLow)) / (inHigh - inLow) + outLow;
};
