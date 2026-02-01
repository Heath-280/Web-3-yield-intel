🚀 Web3 Yield Intelligence Platform

A real-time Web3 yield tracking and risk intelligence platform that combines on-chain data, statistical volatility, machine learning risk analysis, and AI-powered explanations to help users make informed DeFi yield decisions.

📌 Problem Statement

In DeFi, users often chase high APYs without understanding:

How stable the yield is

How risky the yield might be

Whether the yield is sustainable

Most existing platforms show only raw APY numbers, forcing users to manually research volatility, protocol behavior, and risks across multiple sources.

This creates confusion, poor decision-making, and unnecessary exposure to risk.


💡 Our Solution

We built a real-time Web3 Yield Intelligence Platform that transforms raw yield data into actionable insights by combining:

🔄 Live on-chain APY tracking

📉 Volatility analysis (statistical)

🧠 ML-based risk prediction (XGBoost)

🤖 AI-powered yield explanations (Gemini)

All insights are delivered through a clean, interactive dashboard with live updates.


✨ Key Features
🔴 Real-Time Yield Tracking

Live APY data fetched from Curve Finance

Backend polling with WebSocket-based live updates

📊 Volatility Analysis

Mathematical analysis of APY history

Classifies yield stability as LOW / MEDIUM / HIGH volatility

🧠 ML-Powered Risk Prediction (XGBoost)

Uses historical APY changes + volatility

Predicts overall yield risk level

Helps identify unstable or risky yields that APY alone cannot reveal

🤖 AI Yield Explanation (Premium Feature)

Converts raw data into human-readable explanations

Explains:

Yield behavior

Risk level

Suitability for users

Powered by Gemini LLM

Subscription-gated to simulate a real SaaS model

📈 Interactive APY Trend Graph

Live APY history visualization

Helps users visually assess yield stability over time

🔐 Subscription Model

Free Plan: Live APY, volatility, ML risk

Premium Plan: AI-powered explanations


🧠 Why Curve Finance?

Curve Finance focuses on stablecoin liquidity pools, making it ideal for:

Studying yield stability

Analyzing real-world DeFi risk

Avoiding extreme speculative behavior

This makes Curve a strong foundation for yield intelligence rather than yield speculation.


🛠 Tech Stack
Frontend

Next.js (App Router)

TypeScript

Tailwind CSS

Recharts (graphs)

WebSockets (live updates)

Backend

Node.js

Express

WebSockets

Real-time data polling

Machine Learning

Python

XGBoost (risk classification model)

AI

Google Gemini API

Used for explainability (not prediction)


🏗 Architecture Overview

Backend fetches live APY from Curve

Data stored with rolling APY history

Volatility calculated mathematically

XGBoost predicts ML-based risk

WebSocket broadcasts updates to frontend

Frontend renders live dashboard + graph

Gemini AI generates explanations on demand



⚙️ Setup Instructions
🔹 Clone Repository
git clone <https://github.com/Heath-280/Web-3-yield-intel.git>
cd web3-yield-intel

🔹 Frontend Setup
npm install
npm run dev

🔹 Backend Setup
cd backend-v2
npm install
npm run dev


## 🔐 Environment Variables

Create a `.env` file inside `backend-v2`:

```env
GEMINI_API_KEY=your_api_key_here


Screenshots
## 📸 Screenshots

### Live Yield Intelligence Dashboard
![Dashboard](Screenshots/Screenshot-2026-01-31-133931.png)

### AI Yield Insight (Premium)
![AI Insight](Screenshots/Screenshot-2026-01-31-135518.png)

### ML Risk & APY Graph
![ML Risk](Screenshots/Screenshot-2026-01-31-135544.png)




🎥 Demo Video

A short demo video explaining:
- The problem
- Live yield tracking
- Volatility vs ML risk
- AI-powered explanations
- Subscription-based access

📺 Demo Link: <https://youtu.be/PnNUHPXtdK0>


🚀 Deployment

Frontend is deployed using Vercel for fast and reliable access.

Backend supports production deployment using platforms like Render or Railway.

Live Deployment URL:
<https://web-3-yield-intel.vercel.app/>
