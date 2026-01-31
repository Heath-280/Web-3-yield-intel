import { Router } from "express";
import { getAllYields, updateStore } from "./store";
import { calculateVolatility } from "./volatility";
import { analyzeYieldWithAI } from "./ai";
import { predictRisk } from "./xgboost";
import { fetchCurveAPY } from "./fetcher";

const router = Router();

// Health check
router.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// 🔹 Yield data
router.get("/yields", (req, res) => {
  console.log("📊 GET /api/yields - Request received");
  try {
    // Generate new APY on each request
    console.log("🎲 Generating new APY data...");
    const apy = fetchCurveAPY();
    console.log(`💰 New APY generated: ${apy}%`);

    updateStore("curve-3pool", {
      protocol: "Curve",
      asset: "USDC",
      pool: "3pool",
      apy,
    });
    console.log("💾 Data stored in memory");

    const data = getAllYields().map(item => {
      console.log(`📈 Processing ${item.protocol}-${item.pool}`);
      const { change, level } = calculateVolatility(item.history);
      console.log(`📊 Volatility: ${level}, Change: ${change}%`);
      
      // Convert volatility → numeric score for ML
      const volatilityScore =
        level === "LOW" ? 0.1 :
        level === "MEDIUM" ? 0.5 :
        1.0;
      console.log(`🔢 Volatility score: ${volatilityScore}`);

      const risk = predictRisk(item.apy, change, volatilityScore);
      console.log(`🧠 ML Risk calculated: ${risk}`);
      
      return {
        ...item,
        apyChange: change,
        volatility: level,
        risk,
      };
    });

    console.log(`✅ Returning ${data.length} yield items`);
    res.json(data);
  } catch (error) {
    console.error("❌ Error in /yields:", error);
    res.status(500).json({ error: "Failed to fetch yield data" });
  }
});

// 🔹 AI analysis
router.post("/ai/analyze-yield", async (req, res) => {
  console.log("🤖 POST /api/ai/analyze-yield - Request received");
  try {
    if (!req.body || typeof req.body !== 'object') {
      console.log("❌ Invalid request body");
      return res.status(400).json({ error: "Invalid request body" });
    }

    console.log("📝 Processing AI analysis request:", req.body);
    const analysis = await analyzeYieldWithAI(req.body);
    console.log("✅ AI analysis completed");
    res.json({ analysis });
  } catch (err) {
    console.error("❌ AI analysis failed:", err);
    res.status(500).json({ error: "AI analysis failed" });
  }
});

export default router;
