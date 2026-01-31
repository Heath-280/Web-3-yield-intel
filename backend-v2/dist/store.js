"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStore = updateStore;
exports.getAllYields = getAllYields;
const MAX_HISTORY = 12; // ~1 minute (5s × 12)
const store = new Map();
function updateStore(key, data) {
    const existing = store.get(key);
    const history = existing
        ? [...existing.history, data.apy].slice(-MAX_HISTORY)
        : [data.apy];
    store.set(key, {
        ...data,
        history,
        updatedAt: new Date(),
    });
}
function getAllYields() {
    return Array.from(store.values());
}
