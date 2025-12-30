// lib/planCredits.ts
import type { PlanId } from "./plans";
import { getPlanById } from "./plans";

/**
 * Single source of truth for "credits granted for a plan".
 * Uses plans.ts monthlyCredits to stay consistent across app + webhook + admin.
 */
export function creditsForPlan(planId: PlanId): number {
  const plan = getPlanById(planId);
  // safety: ensure finite non-negative integer
  const n = Number(plan?.monthlyCredits ?? 0);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.floor(n);
}
