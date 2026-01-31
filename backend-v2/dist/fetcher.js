"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCurveAPY = fetchCurveAPY;
async function fetchCurveAPY() {
    // simulate real APY changes
    const base = 6.2;
    const randomFluctuation = (Math.random() - 0.5) * 0.3;
    return +(base + randomFluctuation).toFixed(2);
}
