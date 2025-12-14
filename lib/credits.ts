// lib/credits.ts
"use client";

import { PlanId, getPlanById } from "./plans";

export interface CreditState {
  planId: PlanId;
  creditsLeft: number;
  lastReset: string; // month key for paid plans, "one-time" for free
}

const STORAGE_KEY = "bg_saas_credits_v1";

function getMonthKey(date: Date) {
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}`;
}

export function loadCredits(): CreditState {
  if (typeof window === "undefined") {
    return {
      planId: "free",
      creditsLeft: getPlanById("free").monthlyCredits, // 30
      lastReset: "one-time",
    };
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  const now = new Date();
  const thisMonth = getMonthKey(now);

  // First time user
  if (!raw) {
    const plan = getPlanById("free");
    const initial: CreditState = {
      planId: "free",
      creditsLeft: plan.monthlyCredits, // 30 one-time
      lastReset: "one-time",
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }

  try {
    const parsed: CreditState = JSON.parse(raw);

    // ✅ Free tier is one-time credits: never reset monthly
    if (parsed.planId === "free") {
      return parsed;
    }

    // ✅ Paid plans: monthly reset
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

  // ✅ Free = one-time 30 credits (no monthly reset)
  const newState: CreditState =
    planId === "free"
      ? {
          planId,
          creditsLeft: plan.monthlyCredits, // 30 once
          lastReset: "one-time",
        }
      : {
          planId,
          creditsLeft: plan.monthlyCredits,
          lastReset: thisMonth,
        };

  saveCredits(newState);
  return newState;
}

/**
 * NOTE: Your app uses the boolean flag to represent "2x cost mode" (Quality).
 * Fast => false (1 credit/image), Quality => true (2 credits/image)
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
