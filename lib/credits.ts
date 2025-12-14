// lib/credits.ts
"use client";

import { PlanId, getPlanById } from "./plans";

export interface CreditState {
  planId: PlanId;
  creditsLeft: number;
  lastReset: string; // ISO date
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

// ✅ NEW: options object (minimal + clean)
export type CreditUseOptions = {
  quality?: boolean; // Quality mode costs 2 credits/image
  hd?: boolean;      // HD export costs plan.hdMultiplier credits/image
};

function creditsPerImage(planId: PlanId, opts?: CreditUseOptions): number {
  const plan = getPlanById(planId);

  const quality = !!opts?.quality;
  const hd = !!opts?.hd;

  // Base cost: Fast = 1
  // Quality adds +1 (so total 2)
  const qualityCost = quality ? 2 : 1;

  // HD adds +plan.hdMultiplier (you set 2) BUT only when hd=true
  // If you want HD to be "instead of" normal: change to (hd ? plan.hdMultiplier : 0)
  const hdExtra = hd ? plan.hdMultiplier : 0;

  return qualityCost + hdExtra;
}

export function canConsumeCredits(
  state: CreditState,
  imagesCount: number,
  opts?: CreditUseOptions
): boolean {
  const per = creditsPerImage(state.planId, opts);
  const totalNeeded = per * imagesCount;
  return state.creditsLeft >= totalNeeded;
}

export function consumeCredits(
  state: CreditState,
  imagesCount: number,
  opts?: CreditUseOptions
): CreditState {
  const per = creditsPerImage(state.planId, opts);
  const totalNeeded = per * imagesCount;

  const newState: CreditState = {
    ...state,
    creditsLeft: Math.max(0, state.creditsLeft - totalNeeded),
  };
  saveCredits(newState);
  return newState;
}
