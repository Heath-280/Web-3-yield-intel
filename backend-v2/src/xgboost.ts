import { execSync } from "child_process";
import path from "path";

export function predictRisk(
  apy: number,
  apyChange: number,
  volatility: number
): "LOW" | "MEDIUM" | "HIGH" {
  try {
    // Validate inputs to prevent command injection
    if (!Number.isFinite(apy) || !Number.isFinite(apyChange) || !Number.isFinite(volatility)) {
      console.warn("Invalid input parameters, returning default risk level");
      return "MEDIUM";
    }

    const scriptPath = path.join(__dirname, "..", "ml", "predict.py");
    const result = execSync(
      `python "${scriptPath}" ${apy.toFixed(6)} ${apyChange.toFixed(6)} ${volatility.toFixed(6)}`,
      { encoding: 'utf8', timeout: 10000 }
    );

    const parsed = JSON.parse(result.trim());
    return parsed.risk || "MEDIUM";
  } catch (error) {
    console.error("XGBoost prediction failed:", error);
    return "MEDIUM"; // Safe fallback
  }
}
