import { execSync } from "child_process";
import path from "path";

export function predictRisk(
  apy: number,
  apyChange: number,
  volatility: number
): "LOW" | "MEDIUM" | "HIGH" {
  console.log(`🧠 ML Prediction input: APY=${apy}, Change=${apyChange}, Volatility=${volatility}`);
  try {
    if (!Number.isFinite(apy) || !Number.isFinite(apyChange) || !Number.isFinite(volatility)) {
      console.log("⚠️ Invalid inputs, returning MEDIUM");
      return "MEDIUM";
    }

    console.log("🐍 Attempting Python ML model...");
    const scriptPath = path.join(__dirname, "..", "ml", "predict.py");
    const result = execSync(
      `python "${scriptPath}" ${apy.toFixed(6)} ${apyChange.toFixed(6)} ${volatility.toFixed(6)}`,
      { encoding: 'utf8', timeout: 5000 }
    );

    const parsed = JSON.parse(result.trim());
    console.log(`✅ ML model result: ${parsed.risk}`);
    return parsed.risk || "MEDIUM";
  } catch (error) {
    console.log("⚠️ ML model failed, using fallback logic");
    // Simple fallback logic
    if (Math.abs(apyChange) > 0.5 || apy > 10) {
      console.log("🔄 Fallback result: HIGH");
      return "HIGH";
    }
    if (Math.abs(apyChange) > 0.2 || apy > 7) {
      console.log("🔄 Fallback result: MEDIUM");
      return "MEDIUM";
    }
    console.log("🔄 Fallback result: LOW");
    return "LOW";
  }
}
