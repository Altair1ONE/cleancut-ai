"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

const STORAGE_KEY = "trial_popup_dismissed";

export default function TrialPopup() {
  const { user, authEventNonce } = useAuth();
  const [open, setOpen] = useState(false);

  // Show only after SIGNED_IN (not on page refresh)
  useEffect(() => {
    if (!user?.id) return;

    // When a new SIGNED_IN happens, we want popup to show again,
    // so we clear the dismissal on login.
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}

    setOpen(true);
  }, [authEventNonce, user?.id]);

  // If user dismissed in this session, keep closed (even if they navigate)
  useEffect(() => {
    if (!user?.id) {
      setOpen(false);
      return;
    }

    try {
      const dismissed = sessionStorage.getItem(STORAGE_KEY) === "1";
      if (dismissed) setOpen(false);
    } catch {}
  }, [user?.id]);

  function dismiss() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setOpen(false);
  }

  if (!user?.id) return null;
  if (!open) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[92vw] max-w-sm rounded-3xl border border-slate-800 bg-slate-950 p-5 shadow-2xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-slate-400">Limited-time</div>
          <h3 className="mt-1 text-lg font-bold text-white">
            Try Pro Monthly free for 7 days
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            Unlock bigger batches + Quality mode. Cancel anytime.
          </p>
        </div>

        <button
          type="button"
          onClick={dismiss}
          className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 hover:border-slate-500"
        >
          Dismiss
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href="/pricing"
          className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-600"
        >
          Start 7-day trial
        </Link>

        <Link
          href="/app"
          className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500"
        >
          Keep using free
        </Link>
      </div>

      <p className="mt-3 text-[11px] text-slate-500">
        This message stays until you dismiss it. It will reappear after you sign in again.
      </p>
    </div>
  );
}
