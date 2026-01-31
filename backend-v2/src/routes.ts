import { Router } from "express";
import { getAllYields } from "./store";
import { calculateVolatility } from "./volatility";
import { analyzeYieldWithAI } from "./ai";
import { predictRisk } from "./xgboost";

const router = Router();

// Health check
router.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// 🔹 Yield data
router.get("/yields", (req, res) => {
  try {
    const data = getAllYields().map(item => {
      const { change, level } = calculateVolatility(item.history);
      
      // Convert volatility → numeric score for ML
      const volatilityScore =
        level === "LOW" ? 0.1 :
        level === "MEDIUM" ? 0.5 :
        1.0;

      const risk = predictRisk(item.apy, change, volatilityScore);
      
      return {
        ...item,
        apyChange: change,
        volatility: level,
        risk,
      };
    });

    res.json(data);
  } catch (error) {
    console.error("Error fetching yields:", error);
    res.status(500).json({ error: "Failed to fetch yield data" });
  }
});

// 🔹 AI analysis
router.post("/ai/analyze-yield", async (req, res) => {
  try {
    // Basic input validation
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const analysis = await analyzeYieldWithAI(req.body);
    res.json({ analysis });
  } catch (err) {
    console.error("AI analysis error:", err instanceof Error ? err.message : err);
    res.status(500).json({ error: "AI analysis failed" });
  }
});

export default router;
