"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.predictRisk = predictRisk;
const child_process_1 = require("child_process");
function predictRisk(apy, apyChange, volatility) {
    const result = (0, child_process_1.execSync)(`python ml/predict.py ${apy} ${apyChange} ${volatility}`).toString();
    return JSON.parse(result).risk;
}
