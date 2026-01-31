type YieldData = {
  protocol: string;
  asset: string;
  pool: string;
  apy: number;
  history: number[];
  updatedAt: Date;
};

const MAX_HISTORY = 12; // ~1 minute (5s × 12)

const store = new Map<string, YieldData>();

export function updateStore(
  key: string,
  data: Omit<YieldData, "history" | "updatedAt">
) {
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

export function getAllYields(): YieldData[] {
  return Array.from(store.values());
}
