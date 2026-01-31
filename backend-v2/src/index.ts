import express from "express";
import cors from "cors";
import http from "http";

import routes from "./routes";
import { fetchCurveAPY } from "./fetcher";
import { updateStore, getAllYields } from "./store";

import { calculateVolatility } from "./volatility";
import { predictRisk } from "./xgboost";

const app = express();

// CORS configuration for production
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL || 'https://your-frontend-app.vercel.app']
    : true, // Allow all origins in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use("/api", routes);

const server = http.createServer(app);


const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});

// 🔁 Poll every 5 seconds
setInterval(async () => {
  try {
    const apy = await fetchCurveAPY();

    updateStore("curve-3pool", {
      protocol: "Curve",
      asset: "USDC",
      pool: "3pool",
      apy,
    });

    const latest = getAllYields().map((item) => {
      const { change, level } = calculateVolatility(item.history);

      // Convert volatility → numeric score for ML
      const volatilityScore =
        level === "LOW" ? 0.1 :
        level === "MEDIUM" ? 0.5 :
        1.0;

      const risk = predictRisk(item.apy, change, volatilityScore);

      return {
        protocol: item.protocol,
        asset: item.asset,
        pool: item.pool,
        apy: item.apy,
        history: item.history,     // ✅ EXPLICITLY SEND HISTORY
        apyChange: change,
        volatility: level,
        risk,
      };
    });
  } catch (error) {
    console.error("Error in polling interval:", error);
  }
}, 5000);
