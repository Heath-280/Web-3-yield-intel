import { Router } from "express";
import { getAllYields } from "./store";
import { calculateVolatility } from "./volatility";
import { analyzeYieldWithAI } from "./ai";

const router = Router();

// 🔹 Yield data
router.get("/yields", (req, res) => {
  const data = getAllYields().map(item => {
    const { change, level } = calculateVolatility(item.history);
    return {
      ...item,
      apyChange: change,
      volatility: level,
    };
  });

  res.json(data);
});

// 🔹 AI analysis
router.post("/ai/analyze-yield", async (req, res) => {
  try {
    const analysis = await analyzeYieldWithAI(req.body);
    res.json({ analysis });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI analysis failed" });
  }
});

export default router;
