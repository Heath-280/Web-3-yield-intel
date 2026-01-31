import { NextResponse } from "next/server";

export async function GET() {
  const data = [
    {
      protocol: "Aave",
      chain: "Ethereum",
      apy: +(Math.random() * 4 + 2).toFixed(2),
    },
    {
      protocol: "Compound",
      chain: "Ethereum",
      apy: +(Math.random() * 3 + 1).toFixed(2),
    },
    {
      protocol: "Uniswap",
      chain: "Polygon",
      apy: +(Math.random() * 6 + 3).toFixed(2),
    },
  ];

  return NextResponse.json({
    updatedAt: new Date().toISOString(),
    data,
  });
}
