import { execSync } from "child_process";

export function predictRisk(
  apy: number,
  apyChange: number,
  volatility: number
): "LOW" | "MEDIUM" | "HIGH" {
  const result = execSync(
    `python ml/predict.py ${apy} ${apyChange} ${volatility}`
  ).toString();

  return JSON.parse(result).risk;
}
