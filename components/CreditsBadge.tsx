"use client";

import { useEffect, useState } from "react";
import { CreditState, loadCredits } from "../lib/credits";
import { getPlanById } from "../lib/plans";
import { useAuth } from "./AuthProvider";

export function CreditsBadge() {
  const { user } = useAuth();
  const [state, setState] = useState<CreditState | null>(null);

  useEffect(() => {
    let mounted = true;

    async function refresh() {
      try {
        const creditState = await loadCredits();
        if (mounted) setState(creditState);
      } catch (err) {
        console.error("Failed to load credits:", err);
        if (mounted) setState(null);
      }
    }

    refresh();

    function onCreditsUpdate() {
      refresh();
    }

    window.addEventListener("credits:update", onCreditsUpdate);

    return () => {
      mounted = false;
      window.removeEventListener("credits:update", onCreditsUpdate);
    };
  }, [user?.uid]);

  if (!state) return null;

  const plan = getPlanById(state.planId);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm">
      <span className="rounded-full bg-slate-900 px-2 py-[2px] text-[10px] font-semibold uppercase tracking-wide text-white">
        {plan.name}
      </span>

      <span>
        Credits:{" "}
        <span className="font-semibold text-emerald-700">{state.creditsRemaining}</span>
        <span className="text-slate-400">/{plan.monthlyCredits}</span>
      </span>
    </div>
  );
}
