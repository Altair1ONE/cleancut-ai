// lib/credits.ts
import type { PlanId } from "./plans";
import { firebaseAuth } from "./firebaseClient";
import { apiPath } from "./apiPath";

export type CreditState = {
  planId: PlanId;
  creditsRemaining: number;
  lastResetAt?: string | null;
};

export async function loadCreditsFromDB(): Promise<CreditState> {
  const user = firebaseAuth.currentUser;
  if (!user) return { planId: "free", creditsRemaining: 0, lastResetAt: null };

  const token = await user.getIdToken();

  const res = await fetch(apiPath("/api/credits/get"), {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    await fetch(apiPath("/api/credits/init"), {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    const res2 = await fetch(apiPath("/api/credits/get"), {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res2.ok) return { planId: "free", creditsRemaining: 0, lastResetAt: null };
    const json2 = await res2.json();

    return {
      planId: (json2.planId as PlanId) || "free",
      creditsRemaining: Number(json2.creditsRemaining ?? 0),
      lastResetAt: json2.lastResetAt ?? null,
    };
  }

  const json = await res.json();
  return {
    planId: (json.planId as PlanId) || "free",
    creditsRemaining: Number(json.creditsRemaining ?? 0),
    lastResetAt: json.lastResetAt ?? null,
  };
}

export async function loadCredits(): Promise<CreditState> {
  return loadCreditsFromDB();
}

export function canConsumeCredits(state: CreditState | null, imageCount: number, isQuality: boolean) {
  if (!state) return false;
  const perImage = isQuality ? 2 : 1;
  const cost = Math.max(0, imageCount) * perImage;
  return state.creditsRemaining >= cost;
}

export async function consumeCredits(
  stateOrImageCount: CreditState | number,
  imageCountOrIsQuality: number | boolean,
  maybeIsQuality?: boolean
): Promise<CreditState> {
  const user = firebaseAuth.currentUser;
  if (!user) throw new Error("Not signed in");

  let imageCount: number;
  let isQuality: boolean;

  if (typeof stateOrImageCount === "object") {
    imageCount = imageCountOrIsQuality as number;
    isQuality = Boolean(maybeIsQuality);
  } else {
    imageCount = stateOrImageCount;
    isQuality = Boolean(imageCountOrIsQuality);
  }

  const token = await user.getIdToken();

  const res = await fetch(apiPath("/api/credits/consume"), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imageCount, isQuality }),
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(json?.error || "Failed to deduct credits");
  }

  return {
    planId: (json.planId as PlanId) || "free",
    creditsRemaining: Number(json.creditsRemaining ?? 0),
    lastResetAt: json.lastResetAt ?? null,
  };
}

export async function switchPlan(_: PlanId): Promise<CreditState> {
  return loadCreditsFromDB();
}
