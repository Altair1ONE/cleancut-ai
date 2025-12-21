// lib/paddlePrices.ts
export type PlanId = "free" | "pro_monthly" | "lifetime";

/**
 * Put your real Paddle PRICE IDs here (recommended).
 * Example: "pri_01h...."
 */
export const PADDLE_PRICE_IDS: Record<Exclude<PlanId, "free">, string> = {
  pro_monthly: process.env.NEXT_PUBLIC_PADDLE_PRICE_PRO_MONTHLY || "",
  lifetime: process.env.NEXT_PUBLIC_PADDLE_PRICE_LIFETIME || "",
};

/** Reverse lookup (priceId -> planId) */
export function planIdFromPriceId(priceId: string): PlanId | null {
  const entries = Object.entries(PADDLE_PRICE_IDS) as Array<[Exclude<PlanId, "free">, string]>;
  const found = entries.find(([, id]) => id === priceId);
  return found ? found[0] : null;
}
