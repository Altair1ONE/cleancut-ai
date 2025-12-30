// lib/planCredits.ts
import type { PlanId } from "./plans";
import { getPlanById } from "./plans";

/**
 * Single source of truth: credits granted for each plan.
 * Uses plans.ts monthlyCredits so everything stays consistent.
 */
export function creditsForPlan(planId: PlanId): number {
  const plan = getPlanById(planId);
  const n = Number(plan?.monthlyCredits ?? 0);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.floor(n);
}
