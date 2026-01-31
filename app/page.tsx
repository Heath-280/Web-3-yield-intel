"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ---------------- TYPES ---------------- */

type YieldItem = {
  protocol: string;
  asset?: string;
  pool: string;
  apy: number;
  apyChange: number;
  volatility: "LOW" | "MEDIUM" | "HIGH";
  risk?: "LOW" | "MEDIUM" | "HIGH";
  history?: number[];
};

/* ---------------- PAGE ---------------- */

export default function Home() {
  const [yields, setYields] = useState<YieldItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Subscription mock
  const [userPlan, setUserPlan] =
    useState<"FREE" | "PREMIUM">("FREE");

  // AI states (UI only – backend already exists)
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  /* ---------------- FETCH DATA (REST) ---------------- */

  useEffect(() => {
    async function fetchYields() {
      try {
        const res = await fetch(
          "https://web-3-yield-intel.onrender.com/api/yields"
        );
        const data: YieldItem[] = await res.json();
        setYields(data.sort((a, b) => b.apy - a.apy));
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    fetchYields();
    const interval = setInterval(fetchYields, 5000);
    return () => clearInterval(interval);
  }, []);

  /* ---------------- AI MOCK (SAFE FOR DEMO) ---------------- */

  async function analyzeWithAI(item: YieldItem) {
    if (userPlan !== "PREMIUM") {
      setAiInsight(
        "🔒 AI Yield Analysis is a Premium feature.\n\nUpgrade to Premium to get AI-powered explanations and risk insights."
      );
      return;
    }

    try {
      setLoadingAI(true);
      setAiInsight(null);

      const res = await fetch(
        "https://web-3-yield-intel.onrender.com/api/ai/analyze-yield",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        }
      );

      const data = await res.json();
      setAiInsight(data.analysis);
    } catch {
      setAiInsight(
        "AI analysis is temporarily unavailable.\nThis feature is part of the Premium plan."
      );
    } finally {
      setLoadingAI(false);
    }
  }

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        Fetching real-time Curve yields…
      </main>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white px-6 py-10">
      {/* HEADER */}
      <header className="max-w-6xl mx-auto mb-10">
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => setUserPlan("FREE")}
            className={`px-3 py-1 text-xs rounded ${
              userPlan === "FREE"
                ? "bg-blue-500 text-white"
                : "bg-white/10"
            }`}
          >
            Free
          </button>
          <button
            onClick={() => setUserPlan("PREMIUM")}
            className={`px-3 py-1 text-xs rounded ${
              userPlan === "PREMIUM"
                ? "bg-emerald-500 text-black"
                : "bg-white/10"
            }`}
          >
            Premium
          </button>
        </div>

        <p className="text-sm text-gray-400 mb-3">
          Current Plan: <span className="font-semibold">{userPlan}</span>
        </p>

        <h1 className="text-4xl font-bold">
          Web3 Yield Intelligence
        </h1>
        <p className="text-gray-400">
          Live Curve APY tracking with ML-powered risk analysis
        </p>
      </header>

      {/* CARDS */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {yields.map((item) => {
          const chartData =
            item.history?.map((v, i) => ({
              time: i,
              apy: v,
            })) ?? [];

          return (
            <div
              key={item.pool}
              className="rounded-2xl p-6 bg-white/5 border border-emerald-400 shadow-xl"
            >
              <h2 className="text-xl font-semibold mb-1">
                {item.protocol} · {item.pool}
              </h2>

              <p className="text-4xl font-bold mb-1">
                {item.apy}% APY
              </p>

              <p
                className={`mb-3 text-sm ${
                  item.apyChange >= 0
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {item.apyChange >= 0 ? "+" : ""}
                {item.apyChange}% last minute
              </p>

              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 text-xs rounded-full bg-emerald-500/20">
                  Volatility: {item.volatility}
                </span>
                {item.risk && (
                  <span className="px-3 py-1 text-xs rounded-full bg-yellow-500/20">
                    🧠 ML Risk: {item.risk}
                  </span>
                )}
              </div>

              {/* GRAPH */}
              {chartData.length > 1 && (
                <div className="h-32 w-full mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <XAxis hide />
                      <YAxis hide />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="apy"
                        stroke="#34d399"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              <button
                onClick={() => analyzeWithAI(item)}
                className="w-full mt-2 py-2 bg-white/10 rounded hover:bg-white/20"
              >
                🤖 Analyze with AI
              </button>
            </div>
          );
        })}
      </section>

      {/* AI OUTPUT */}
      {loadingAI && (
        <p className="text-center mt-8 text-gray-400 animate-pulse">
          AI is analyzing this yield…
        </p>
      )}

      {aiInsight && (
        <div className="max-w-4xl mx-auto mt-10 p-6 rounded-xl bg-white/5 border border-white/10">
          <h3 className="text-lg font-semibold mb-2">
            🤖 AI Yield Insight
          </h3>
          <p className="text-gray-300 whitespace-pre-line">
            {aiInsight}
          </p>
          <p className="text-xs text-gray-500 mt-3">
            This analysis is informational and not financial advice.
          </p>
        </div>
      )}
    </main>
  );
}
