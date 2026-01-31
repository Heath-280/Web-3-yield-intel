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
    ? [process.env.FRONTEND_URL || 'https://web-3-yield-intel-yield.vercel.app']
    : ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://web-3-yield-intel-yield.vercel.app'],
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
