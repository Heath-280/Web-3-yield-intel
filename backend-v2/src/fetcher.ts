export function fetchCurveAPY() {
  console.log("🎲 Generating mock APY data...");
  // simulate real APY changes
  const base = 6.2;
  const randomFluctuation = (Math.random() - 0.5) * 0.3;
  const result = +(base + randomFluctuation).toFixed(2);
  console.log(`💰 Generated APY: ${result}%`);
  return result;
}
