"use client";

import { useEffect, useState } from "react";
import { PLANS, PlanId } from "../lib/plans";
import { loadCreditsFromDB } from "../lib/credits";

interface PricingTableProps {
  compact?: boolean;
}

export function PricingTable({ compact }: PricingTableProps) {
  const [currentPlanId, setCurrentPlanId] = useState<PlanId>("free");
  const [loading, setLoading] = useState(true);

  async function refresh() {
    try {
      setLoading(true);
      const state = await loadCreditsFromDB();
      setCurrentPlanId(state.planId);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div>
      <div className={`grid gap-4 ${compact ? "md:grid-cols-3" : "md:grid-cols-3"}`}>
        {PLANS.map((p) => {
          const isCurrent = currentPlanId === p.id;
          const highlight = p.id === "pro_monthly";

          return (
            <div
              key={p.id}
              className={`relative overflow-hidden rounded-3xl border bg-slate-950/40 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.35)]
              ${highlight ? "border-indigo-500/60" : "border-slate-800"}`}
            >
              {highlight && (
                <div className="absolute right-4 top-4 rounded-full bg-indigo-500/15 px-3 py-1 text-[11px] font-semibold text-indigo-200">
                  Best Value
                </div>
              )}

              <div className="text-sm font-semibold text-white">{p.name}</div>
              <div className="mt-2 text-3xl font-bold text-white">{p.priceLabel}</div>
              <div className="mt-1 text-sm text-slate-300">{p.priceNote}</div>

              <div className="mt-5 space-y-2 text-sm text-slate-300">
                <div className="flex items-center justify-between">
                  <span>Monthly credits</span>
                  <span className="font-semibold text-slate-100">{p.monthlyCredits}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Batch limit</span>
                  <span className="font-semibold text-slate-100">{p.maxBatchSize} images</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>HD cost</span>
                  <span className="font-semibold text-slate-100">{p.hdMultiplier} credits/image</span>
                </div>
                <div className="pt-3 text-xs text-slate-400">
                  ✅ No watermark • ✅ Transparent PNG • ✅ Batch processing
                </div>
              </div>

              <button
                onClick={refresh}
                className="mt-6 w-full rounded-full border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm font-semibold text-slate-100 hover:border-slate-500"
              >
                {loading ? "Checking..." : isCurrent ? "Current plan" : "Refresh status"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
