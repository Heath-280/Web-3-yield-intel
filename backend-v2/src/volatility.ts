export function calculateVolatility(history: number[]) {
  if (history.length < 2) {
    return { change: 0, level: "LOW" };
  }

  const latest = history[history.length - 1];
  const previous = history[0];

  const change = +(latest - previous).toFixed(2);

  const absChange = Math.abs(change);

  let level: "LOW" | "MEDIUM" | "HIGH" = "LOW";

  if (absChange > 0.5) level = "HIGH";
  else if (absChange > 0.2) level = "MEDIUM";

  return { change, level };
}
