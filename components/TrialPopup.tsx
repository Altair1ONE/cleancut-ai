"use client";

import { useEffect, useState } from "react";
import PaddleCheckoutButton from "./PaddleCheckoutButton";
import { useAuth } from "./AuthProvider";
import { loadCredits } from "../lib/credits";

const DISMISS_KEY = "cc_trial_popup_dismissed_v1";

export default function TrialPopup() {
  const { user, justLoggedIn } = useAuth();
  const [open, setOpen] = useState(false);
  const [eligible, setEligible] = useState(false);

  // Check eligibility (free plan only)
  useEffect(() => {
    let mounted = true;

    async function check() {
      if (!user?.id) {
        if (mounted) {
          setEligible(false);
          setOpen(false);
        }
        return;
      }

      try {
        const state = await loadCredits();
        const isFree = state?.planId === "free";

        if (!mounted) return;

        setEligible(isFree);

        // Show logic:
        // - show immediately after SIGNED_IN (justLoggedIn)
        // - OR show once if not dismissed before
        const dismissed = typeof window !== "undefined"
          ? window.localStorage.getItem(DISMISS_KEY) === "1"
          : true;

        if (isFree && (justLoggedIn || !dismissed)) {
          setOpen(true);
        } else {
          setOpen(false);
        }
      } catch {
        // If credits can't load, don't annoy user with popup
        if (mounted) {
          setEligible(false);
          setOpen(false);
        }
      }
    }

    check();
    return () => {
      mounted = false;
    };
  }, [user?.id, justLoggedIn]);

  // Allow other parts of app to refresh popup state if credits change
  useEffect(() => {
    function onCreditsUpdate() {
      // Re-run eligibility check by toggling open state safely
      // (simple approach: just close; it can show again next sign-in if still eligible)
      setOpen(false);
    }
    window.addEventListener("credits:update", onCreditsUpdate);
    return () => window.removeEventListener("credits:update", onCreditsUpdate);
  }, []);

  function dismiss() {
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {}
    setOpen(false);
  }

  if (!user?.id) return null;
  if (!eligible) return null;
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold text-indigo-200">
              🎁 Pro Monthly • 7-day free trial
            </div>

            <h2 className="mt-3 text-lg font-semibold text-white">
              Unlock Quality mode + bigger batches
            </h2>

            <p className="mt-2 text-sm text-slate-300">
              Start a <span className="font-semibold text-white">7-day free trial</span> of Pro Monthly.
              Cancel anytime.
            </p>

            <ul className="mt-3 space-y-1 text-sm text-slate-300">
              <li>• Quality mode (cleaner edges)</li>
              <li>• Bigger batch size</li>
              <li>• Higher monthly credits</li>
            </ul>
          </div>

          <button
            onClick={dismiss}
            className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 hover:border-slate-500"
            type="button"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            onClick={dismiss}
            className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500"
            type="button"
          >
            Maybe later
          </button>

          <PaddleCheckoutButton
            plan="pro_monthly"
            className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-600"
          >
            Start free trial
          </PaddleCheckoutButton>
        </div>

        <p className="mt-3 text-[11px] text-slate-500">
          Note: Your Paddle plan must have the trial configured to actually apply it in checkout.
        </p>
      </div>
    </div>
  );
}
