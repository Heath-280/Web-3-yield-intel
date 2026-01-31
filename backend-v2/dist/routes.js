"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_1 = require("./store");
const volatility_1 = require("./volatility");
const ai_1 = require("./ai");
const router = (0, express_1.Router)();
// 🔹 Yield data
router.get("/yields", (req, res) => {
    const data = (0, store_1.getAllYields)().map(item => {
        const { change, level } = (0, volatility_1.calculateVolatility)(item.history);
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
        const analysis = await (0, ai_1.analyzeYieldWithAI)(req.body);
        res.json({ analysis });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "AI analysis failed" });
    }
});
exports.default = router;
