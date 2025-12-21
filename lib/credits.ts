// lib/credits.ts
import { supabase } from "./supabaseClient";
import type { PlanId } from "./plans";

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

  if (!user) {
    return { planId: "free", creditsRemaining: 0, lastResetAt: null };
  }

  const { data, error } = await supabase
    .from("user_credits")
    .select("plan_id, credits_remaining, last_reset_at")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    return { planId: "free", creditsRemaining: 0, lastResetAt: null };
  }

  return {
    planId: (data.plan_id as PlanId) || "free",
    creditsRemaining: Number(data.credits_remaining ?? 0),
    lastResetAt: data.last_reset_at ?? null,
  };
}

/* Backward-compatible alias */
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

  // 🔹 Normalize arguments to support old UI calls
  let imageCount: number;
  let isQuality: boolean;

  if (typeof stateOrImageCount === "object") {
    // Called as: consumeCredits(state, imageCount, isQuality)
    imageCount = imageCountOrIsQuality as number;
    isQuality = Boolean(maybeIsQuality);
  } else {
    // Called as: consumeCredits(imageCount, isQuality)
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
  return loadCreditsFromDB();
}
