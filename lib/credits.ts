// lib/credits.ts
"use client";

import { PlanId, getPlanById } from "./plans";

export interface CreditState {
  planId: PlanId;
  creditsLeft: number;
  lastReset: string; // month key
}

const STORAGE_KEY = "bg_saas_credits_v1";

function getMonthKey(date: Date) {
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}`;
}

export function loadCredits(): CreditState {
  if (typeof window === "undefined") {
    return {
      planId: "free",
      creditsLeft: getPlanById("free").monthlyCredits,
      lastReset: new Date().toISOString(),
    };
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  const now = new Date();
  const thisMonth = getMonthKey(now);

  if (!raw) {
    const plan = getPlanById("free");
    const initial: CreditState = {
      planId: "free",
      creditsLeft: plan.monthlyCredits,
      lastReset: `${thisMonth}`,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }

  try {
    const parsed: CreditState = JSON.parse(raw);

    if (parsed.lastReset !== thisMonth) {
      const plan = getPlanById(parsed.planId);
      const resetState: CreditState = {
        ...parsed,
        creditsLeft: plan.monthlyCredits,
        lastReset: thisMonth,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(resetState));
      return resetState;
    }

    return parsed;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return loadCredits();
  }
}

export function saveCredits(state: CreditState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function switchPlan(planId: PlanId) {
  const plan = getPlanById(planId);
  const now = new Date();
  const thisMonth = getMonthKey(now);

  const newState: CreditState = {
    planId,
    creditsLeft: plan.monthlyCredits,
    lastReset: thisMonth,
  };

  saveCredits(newState);
  return newState;
}

/**
 * NOTE: You're currently using `useHd` to represent "2x cost mode".
 * In your app: Fast => useHd=false (1 credit/image), Quality => useHd=true (2 credits/image)
 */
export function canConsumeCredits(
  state: CreditState,
  imagesCount: number,
  useHd: boolean
): boolean {
  const plan = getPlanById(state.planId);
  const neededPerImage = useHd ? plan.hdMultiplier : 1;
  const totalNeeded = neededPerImage * imagesCount;
  return state.creditsLeft >= totalNeeded;
}

export function consumeCredits(
  state: CreditState,
  imagesCount: number,
  useHd: boolean
): CreditState {
  const plan = getPlanById(state.planId);
  const neededPerImage = useHd ? plan.hdMultiplier : 1;
  const totalNeeded = neededPerImage * imagesCount;

  const newState: CreditState = {
    ...state,
    creditsLeft: Math.max(0, state.creditsLeft - totalNeeded),
  };

  saveCredits(newState);
  return newState;
}
