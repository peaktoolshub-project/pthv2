import { NextResponse } from "next/server";

// Edge runtime for fastest response globally
export const runtime = "edge";
export const revalidate = 3600; // 1 hour cache

const BASE_FALLBACK_RATES: Record<string, number> = {
  USD: 1, MYR: 3.96, EUR: 0.921, GBP: 0.789, SGD: 1.27,
  JPY: 149.5, AUD: 1.39, CAD: 1.362, HKD: 7.824, THB: 32.52,
  IDR: 17,374.46, PHP: 56.8, INR: 94.97, CNY: 6.83, KRW: 1330,
  BND: 1.348, TWD: 31.8, VND: 24500, PKR: 278,
  AED: 3.673, SAR: 3.751, QAR: 3.641, KWD: 0.308,
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const base = (searchParams.get("base") ?? "USD").toUpperCase();

  try {
    // Try primary API (free tier, no key required, 1500 req/month)
    const res = await fetch(`https://open.er-api.com/v6/latest/${base}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`API responded with ${res.status}`);
    const data = await res.json();

    if (data.result !== "success") throw new Error("API returned failure");

    return NextResponse.json({
      base,
      rates: data.rates,
      timestamp: data.time_last_update_utc,
      source: "live",
    }, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (err) {
    // Fallback: convert fallback rates to requested base
    const baseRate = BASE_FALLBACK_RATES[base] ?? 1;
    const rates = Object.fromEntries(
      Object.entries(BASE_FALLBACK_RATES).map(([k, v]) => [k, v / baseRate])
    );

    return NextResponse.json({
      base,
      rates,
      timestamp: new Date().toUTCString(),
      source: "fallback",
      warning: "Using approximate fallback rates. Live data temporarily unavailable.",
    }, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  }
}
