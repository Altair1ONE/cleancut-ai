// lib/credits.ts
import { supabase } from "./supabaseClient";
import type { PlanId } from "./plans";

/* =========================
   TYPES
   ========================= */

export type CreditState = {
  planId: PlanId;
  creditsRemaining: number;
  lastResetAt?: string | null;
};

/* =========================
   LOAD CREDITS (DB SOURCE)
   ========================= */

export async function loadCreditsFromDB(): Promise<CreditState> {
  const { data: auth } = await supabase.auth.getUser();
  const user = auth?.user;

  // Not logged in → no credits
  if (!user) {
    return { planId: "free", creditsRemaining: 0, lastResetAt: null };
  }

  // Try reading existing credits row
  const { data, error } = await supabase
    .from("user_credits")
    .select("plan_id, credits_remaining, last_reset_at")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) throw error;

  // ✅ FIRST-TIME USER → call server-only init (Option B)
  if (!data) {
    const { data: sessionData } = await supabase.auth.getSession();
    const accessToken = sessionData?.session?.access_token;

    if (accessToken) {
      // Server route grants 30 credits ONCE
      await fetch("/api/credits/init", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
    }

    // Re-fetch after init (DB is source of truth)
    const { data: afterInit, error: err2 } = await supabase
      .from("user_credits")
      .select("plan_id, credits_remaining, last_reset_at")
      .eq("user_id", user.id)
      .maybeSingle();

    if (err2) throw err2;

    if (!afterInit) {
      // Extremely rare fallback
      return { planId: "free", creditsRemaining: 0, lastResetAt: null };
    }

    return {
      planId: (afterInit.plan_id as PlanId) || "free",
      creditsRemaining: Number(afterInit.credits_remaining ?? 0),
      lastResetAt: afterInit.last_reset_at ?? null,
    };
  }

  // Normal case: credits already exist
  return {
    planId: (data.plan_id as PlanId) || "free",
    creditsRemaining: Number(data.credits_remaining ?? 0),
    lastResetAt: data.last_reset_at ?? null,
  };
}

/* Backward-compatible alias (used across your app) */
export async function loadCredits(): Promise<CreditState> {
  return loadCreditsFromDB();
}

/* =========================
   CREDIT CHECK
   ========================= */

export function canConsumeCredits(
  state: CreditState | null,
  imageCount: number,
  isQuality: boolean
): boolean {
  if (!state) return false;

  const perImage = isQuality ? 2 : 1;
  const cost = Math.max(0, imageCount) * perImage;

  return state.creditsRemaining >= cost;
}

/* =========================
   CREDIT DEDUCTION
   ========================= */
/**
 * Supports BOTH call styles used in your app:
 * 1) consumeCredits(state, imageCount, isQuality)
 * 2) consumeCredits(imageCount, isQuality)
 */
export async function consumeCredits(
  stateOrImageCount: CreditState | number,
  imageCountOrIsQuality: number | boolean,
  maybeIsQuality?: boolean
): Promise<CreditState> {
  const { data: auth } = await supabase.auth.getUser();
  const user = auth?.user;

  if (!user) {
    throw new Error("Not signed in");
  }

  // Normalize arguments
  let imageCount: number;
  let isQuality: boolean;

  if (typeof stateOrImageCount === "object") {
    imageCount = imageCountOrIsQuality as number;
    isQuality = Boolean(maybeIsQuality);
  } else {
    imageCount = stateOrImageCount;
    isQuality = Boolean(imageCountOrIsQuality);
  }

  const current = await loadCreditsFromDB();

  const perImage = isQuality ? 2 : 1;
  const cost = Math.max(0, imageCount) * perImage;

  if (current.creditsRemaining < cost) {
    return current;
  }

  const nextRemaining = current.creditsRemaining - cost;

  const { error } = await supabase
    .from("user_credits")
    .update({
      credits_remaining: nextRemaining,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id);

  if (error) throw error;

  return { ...current, creditsRemaining: nextRemaining };
}

/* =========================
   NO-OP PLAN SWITCH (SAFETY)
   ========================= */

export async function switchPlan(_: PlanId): Promise<CreditState> {
  // Client is NOT allowed to change plans.
  // Plans are controlled by Paddle webhook.
  return loadCreditsFromDB();
}
