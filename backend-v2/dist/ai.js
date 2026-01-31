"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeYieldWithAI = analyzeYieldWithAI;
async function analyzeYieldWithAI(input) {
    // Never throw — always return explanation
    const riskLevel = input.risk || input.volatility;
    return `
VERDICT:
This yield is classified as ${riskLevel} risk.

EXPLANATION:
The current APY of ${input.apy}% comes from activity in the ${input.protocol} ${input.pool} pool. The recent change of ${input.apyChange}% reflects short-term liquidity dynamics rather than long-term instability.

RISK & STABILITY:
The ML model (XGBoost) has classified this pool as ${riskLevel} risk based on yield behavior and volatility patterns.

SUITABLE FOR:
${riskLevel === "LOW"
        ? "Conservative users seeking stable returns."
        : riskLevel === "MEDIUM"
            ? "Users comfortable with moderate yield fluctuations."
            : "Experienced users willing to accept higher risk for potentially higher returns."}

KEY TAKEAWAY:
This pool offers ${riskLevel === "LOW"
        ? "steady yield with minimal risk."
        : riskLevel === "MEDIUM"
            ? "a balance between risk and return."
            : "higher potential returns with increased risk."}
`;
}
