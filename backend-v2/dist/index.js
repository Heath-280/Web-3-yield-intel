"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const routes_1 = __importDefault(require("./routes"));
const fetcher_1 = require("./fetcher");
const store_1 = require("./store");
const socket_1 = require("./socket");
const volatility_1 = require("./volatility");
const xgboost_1 = require("./xgboost");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", routes_1.default);
const server = http_1.default.createServer(app);
(0, socket_1.initSocket)(server);
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
// 🔁 Poll every 5 seconds
setInterval(async () => {
    const apy = await (0, fetcher_1.fetchCurveAPY)();
    (0, store_1.updateStore)("curve-3pool", {
        protocol: "Curve",
        asset: "USDC",
        pool: "3pool",
        apy,
    });
    const latest = (0, store_1.getAllYields)().map((item) => {
        const { change, level } = (0, volatility_1.calculateVolatility)(item.history);
        // Convert volatility → numeric score for ML
        const volatilityScore = level === "LOW" ? 0.1 :
            level === "MEDIUM" ? 0.5 :
                1.0;
        const risk = (0, xgboost_1.predictRisk)(item.apy, change, volatilityScore);
        return {
            protocol: item.protocol,
            asset: item.asset,
            pool: item.pool,
            apy: item.apy,
            history: item.history, // ✅ EXPLICITLY SEND HISTORY
            apyChange: change,
            volatility: level,
            risk,
        };
    });
    (0, socket_1.broadcast)("yield:update", latest);
}, 5000);
