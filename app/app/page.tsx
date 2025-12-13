"use client";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "App",
  description:
    "Upload an image and remove the background instantly. Export transparent PNG with no watermark using CleanCut AI by Xevora.",
  alternates: {
    canonical: "https://xevora.org/cleancut/app",
  },
};


import { useEffect, useState } from "react";
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

export default function AppPage() {
  const [credits, setCredits] = useState<CreditState | null>(null);
  const [images, setImages] = useState<QueuedImage[]>([]);
  const [results, setResults] = useState<ProcessedImage[]>([]);
  const [bgMode, setBgMode] = useState<BgMode>("transparent");
  const [customColor, setCustomColor] = useState("#ffffff");
  const [useHd, setUseHd] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    setCredits(loadCredits());
  }, []);

  const plan = credits ? getPlanById(credits.planId) : getPlanById("free");

  function onFilesSelected(files: File[]) {
    const limited = files.slice(0, plan.maxBatchSize);
    const newItems: QueuedImage[] = limited.map((f) => ({
      id: `${f.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      file: f,
      previewUrl: URL.createObjectURL(f),
    }));
    setImages(newItems);
    setResults([]);
  }

  async function handleProcess() {
    setErrorMsg(null);
    if (!credits) {
      setErrorMsg("Credits are still loading, please wait a second.");
      return;
    }
    if (images.length === 0) {
      setErrorMsg("Please upload at least one image.");
      return;
    }

    if (!canConsumeCredits(credits, images.length, useHd)) {
      setShowPaywall(true);
      return;
    }

    const bgUrl = process.env.NEXT_PUBLIC_BG_API_URL;
    const upscaleUrl = process.env.NEXT_PUBLIC_UPSCALE_API_URL;

    if (!bgUrl) {
      setErrorMsg("Background removal endpoint (NEXT_PUBLIC_BG_API_URL) is not set.");
      return;
    }

    setIsProcessing(true);
    try {
      const newResults: ProcessedImage[] = [];

      for (const img of images) {
        const formData = new FormData();
        formData.append("file", img.file);

        const removeRes = await fetch(bgUrl, {
          method: "POST",
          body: formData,
        });

        if (!removeRes.ok) throw new Error("Background removal failed");

        const removeBlob = await removeRes.blob();
        let finalBlob = removeBlob;

        if (useHd && upscaleUrl) {
          const upscaleForm = new FormData();
          upscaleForm.append("file", finalBlob, "removed.png");
          const upRes = await fetch(upscaleUrl, { method: "POST", body: upscaleForm });
          if (upRes.ok) finalBlob = await upRes.blob();
        }

        const outputUrl = URL.createObjectURL(finalBlob);
        newResults.push({
          id: img.id,
          inputUrl: img.previewUrl,
          outputUrl,
        });
      }

      const updatedCredits = consumeCredits(credits, images.length, useHd);
setCredits(updatedCredits);
setResults(newResults);

// ✅ Tell Navbar to refresh credits immediately
if (typeof window !== "undefined") {
  window.dispatchEvent(new Event("credits:update"));
}


      // ✅ Recommended: instantly refresh Navbar credits badge
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("credits:update"));
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        "Something went wrong while processing images. Please check your HuggingFace Space URL and try again."
      );
    } finally {
      setIsProcessing(false);
    }
  }

  function handleDownloadAll() {
    results.forEach((res, index) => {
      const a = document.createElement("a");
      a.href = res.outputUrl;
      a.download = `cleancut-${index + 1}.png`;
      a.click();
    });
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">
            CleanCut AI – Background Removal App
          </h1>
          <p className="mt-1 text-xs text-slate-300">
            Drag &amp; drop images, choose background mode, and export HD PNGs.
            No watermark.
          </p>
        </div>
        <CreditsBadge />
      </header>

      <section className="mt-6 grid gap-6 md:grid-cols-[2fr,2fr]">
        <div className="card p-4">
          <UploadArea onFilesSelected={onFilesSelected} />

          <div className="mt-4 space-y-3 text-xs text-slate-300">
            <div>
              <span className="font-semibold text-slate-200">Background mode</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {(
                  ["transparent", "white", "black", "custom", "blur", "shadow"] as BgMode[]
                ).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setBgMode(mode)}
                    className={`rounded-full px-3 py-1 text-[11px] ${
                      bgMode === mode
                        ? "bg-brand text-white"
                        : "bg-slate-800 text-slate-200"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
                {bgMode === "custom" && (
                  <input
                    type="color"
                    className="h-6 w-10 cursor-pointer rounded"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                  />
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  className="h-3 w-3"
                  checked={useHd}
                  onChange={(e) => setUseHd(e.target.checked)}
                />
                <span>HD Upscale (costs 2 credits / image on your current plan)</span>
              </label>
              <span className="text-[11px] text-slate-400">
                Max batch: {plan.maxBatchSize} images
              </span>
            </div>

            <button
              onClick={handleProcess}
              disabled={isProcessing || images.length === 0}
              className="w-full rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-slate-700"
            >
              {isProcessing
                ? "Processing..."
                : `Process ${images.length || ""} image${images.length === 1 ? "" : "s"}`}
            </button>

            {errorMsg && <p className="text-[11px] text-rose-400">{errorMsg}</p>}

            {results.length > 0 && (
              <button
                onClick={handleDownloadAll}
                className="w-full rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 hover:border-slate-500"
              >
                Download all as PNG
              </button>
            )}
          </div>
        </div>

        <div className="card p-4">
          <BeforeAfter images={results} bgMode={bgMode} customColor={customColor} />
        </div>
      </section>

      {showPaywall && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 p-4">
          <div className="card max-w-sm p-4 text-xs text-slate-300">
            <h2 className="text-sm font-semibold text-white">You&apos;re out of credits</h2>
            <p className="mt-2">
              You&apos;ve reached the limit for your current plan. Upgrade to Pro Monthly
              ($4.99) or Lifetime ($19.99 one-time) to process more images.
            </p>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowPaywall(false)}
                className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200"
              >
                Close
              </button>
              <a
                href="/pricing"
                className="rounded-full bg-brand px-4 py-1 text-xs font-semibold text-white hover:bg-brand-dark"
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
