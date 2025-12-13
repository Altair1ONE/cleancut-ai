// components/CreditsBadge.tsx
"use client";

import { useEffect, useState } from "react";
import { CreditState, loadCredits } from "../lib/credits";
import { getPlanById } from "../lib/plans";

export function CreditsBadge() {
  const [state, setState] = useState<CreditState | null>(null);

  useEffect(() => {
    setState(loadCredits());
  }, []);

  if (!state) return null;

  const plan = getPlanById(state.planId);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[11px] text-slate-200">
      <span className="rounded-full bg-slate-800 px-2 py-[2px] text-[10px] uppercase tracking-wide text-slate-300">
        {plan.name}
      </span>
      <span>
        Credits:{" "}
        <span className="font-semibold text-emerald-300">
          {state.creditsLeft}
        </span>
        /{plan.monthlyCredits}
      </span>
    </div>
  );
}
