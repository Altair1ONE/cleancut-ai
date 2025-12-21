"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Client } from "@gradio/client";

import { useAuth } from "../../components/AuthProvider";
import { CreditsBadge } from "../../components/CreditsBadge";
import {
  CreditState,
  canConsumeCredits,
  consumeCredits,
  loadCredits,
} from "../../lib/credits";
import { getPlanById } from "../../lib/plans";
import { UploadArea } from "../../components/UploadArea";
import { BeforeAfter } from "../../components/BeforeAfter";
import { supabase } from "../../lib/supabaseClient";

type BgMode =
  | "transparent"
  | "white"
  | "black"
  | "custom"
  | "blur"
  | "shadow";

interface QueuedImage {
  id: string;
  file: File;
  previewUrl: string;
}

interface ProcessedImage {
  id: string;
  inputUrl: string;
  outputUrl: string;
}

type QualityMode = "fast" | "quality";

/** ---------- Helpers: resize + concurrency pool ---------- **/

function getMaxSidePx(planId: string, mode: QualityMode): number {
  const isPaid = planId !== "free";
  if (!isPaid) return mode === "fast" ? 1600 : 2400;
  return mode === "fast" ? 2200 : 3200;
}

// ... keep everything else above unchanged ...

export default function AppPage() {
  const { session, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push("/cleancut/login");
    }
  }, [loading, session, router]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 text-sm text-slate-300">
        Loading…
      </div>
    );
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 text-sm text-slate-300">
        Redirecting to login…
      </div>
    );
  }

  return <AppInner />;
}

function AppInner() {
  const { user } = useAuth();

  const [credits, setCredits] = useState<CreditState | null>(null);
  const [images, setImages] = useState<QueuedImage[]>([]);
  const [results, setResults] = useState<ProcessedImage[]>([]);
  const [bgMode, setBgMode] = useState<BgMode>("transparent");
  const [customColor, setCustomColor] = useState("#ffffff");
  const [qualityMode, setQualityMode] = useState<QualityMode>("fast");

  // HD export UI (coming soon, lifetime only)
  const [useHd, setUseHd] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const [processedCount, setProcessedCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);

  // ✅ Reload credits when user logs in + when credits:update fires
  useEffect(() => {
    let mounted = true;

    async function refresh() {
      try {
        const state = await loadCredits();
        if (mounted) setCredits(state);
      } catch (e) {
        console.error("AppInner loadCredits failed:", e);
        if (mounted) setCredits(null);
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
  }, [user?.id]);

  const plan = useMemo(
    () => (credits ? getPlanById(credits.planId) : getPlanById("free")),
    [credits]
  );

  // ... keep everything else unchanged until paywall ...

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* keep everything unchanged */}

      {showPaywall && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 p-4">
          <div className="card max-w-sm p-4 text-xs text-slate-300">
            <h2 className="text-sm font-semibold text-white">
              You&apos;re out of credits
            </h2>
            <p className="mt-2">
              You&apos;ve reached the limit for your current plan. Upgrade to
              process more images.
            </p>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowPaywall(false)}
                className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200"
              >
                Close
              </button>
              <a
                href="/cleancut/pricing"
                className="rounded-full bg-indigo-500 px-4 py-1 text-xs font-semibold text-white hover:bg-indigo-600"
              >
                See plans
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
