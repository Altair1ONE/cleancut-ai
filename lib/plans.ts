// lib/plans.ts
export type PlanId = "free" | "pro_monthly" | "lifetime";

export interface Plan {
  id: PlanId;
  name: string;
  priceLabel: string;
  priceNote: string;
  monthlyCredits: number;
  maxBatchSize: number;
  hdMultiplier: number; // credits per HD image
  highlight?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free Tier",
    priceLabel: "$0",
    priceNote: "No watermark • Great for testing",
    monthlyCredits: 30,
    maxBatchSize: 5,
    hdMultiplier: 2,
  },
  {
    id: "pro_monthly",
    name: "Pro Monthly",
    priceLabel: "$4.99 / mo",
    priceNote: "Up to 5–10x cheaper per image",
    monthlyCredits: 1000,
    maxBatchSize: 20,
    hdMultiplier: 2,
    highlight: true,
  },
  {
    id: "lifetime",
    name: "Lifetime",
    priceLabel: "$19.99 one-time",
    priceNote: "Best value over time",
    monthlyCredits: 200,
    maxBatchSize: 10,
    hdMultiplier: 2,
  },
];

export function getPlanById(id: PlanId): Plan {
  const found = PLANS.find((p) => p.id === id);
  return found ?? PLANS[0];
}
