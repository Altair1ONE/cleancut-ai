"use client";

import { useEffect, useMemo, useState } from "react";
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
import DownloadGateModal from "../../components/DownloadGateModal";

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

async function resizeImageFile(file: File, maxSide: number): Promise<File> {
  if (!file.type.startsWith("image/")) return file;

  const img = document.createElement("img");
  const url = URL.createObjectURL(file);

  try {
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = url;
    });

    const w = img.naturalWidth;
    const h = img.naturalHeight;
    const longSide = Math.max(w, h);

    if (longSide <= maxSide) return file;

    const scale = maxSide / longSide;
    const newW = Math.round(w * scale);
    const newH = Math.round(h * scale);

    const canvas = document.createElement("canvas");
    canvas.width = newW;
    canvas.height = newH;

    const ctx = canvas.getContext("2d");
    if (!ctx) return file;

    ctx.drawImage(img, 0, 0, newW, newH);

    const outType =
      file.type === "image/png"
        ? "image/png"
        : file.type === "image/webp"
        ? "image/webp"
        : "image/jpeg";

    const outQuality = outType === "image/jpeg" ? 0.92 : 0.92;

    const blob: Blob = await new Promise((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
        outType,
        outQuality
      );
    });

    const newName =
      file.name.replace(/\.(png|jpg|jpeg|webp)$/i, "") +
      `-${maxSide}px` +
      (outType === "image/png"
        ? ".png"
        : outType === "image/webp"
        ? ".webp"
        : ".jpg");

    return new File([blob], newName, { type: outType });
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function asyncPool<T, R>(
  poolLimit: number,
  array: T[],
  iteratorFn: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const ret: Promise<R>[] = [];
  const executing: Promise<void>[] = [];

  for (let i = 0; i < array.length; i++) {
    const p = Promise.resolve().then(() => iteratorFn(array[i], i));
    ret.push(p);

    let removePromise!: Promise<void>;
    removePromise = p.then(() => {
      const idx = executing.indexOf(removePromise);
      if (idx >= 0) executing.splice(idx, 1);
    });

    executing.push(removePromise);

    if (executing.length >= poolLimit) {
      await Promise.race(executing);
    }
  }

  return Promise.all(ret);
}

/** Download helper */
async function downloadUrlAsFile(url: string, filename: string) {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(blobUrl);
  } catch {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}

type PendingDownload =
  | { type: "single"; url: string; filename: string }
  | { type: "all" };

export default function AppPage() {
  // ✅ NO redirect to login anymore — guest preview is allowed
  return <AppInner />;
}

function AppInner() {
  const { user } = useAuth();

  const isGuest = !user?.id;

  const [credits, setCredits] = useState<CreditState | null>(null);
  const [images, setImages] = useState<QueuedImage[]>([]);
  const [results, setResults] = useState<ProcessedImage[]>([]);
  const [bgMode, setBgMode] = useState<BgMode>("transparent");
  const [customColor, setCustomColor] = useState("#ffffff");
  const [qualityMode, setQualityMode] = useState<QualityMode>("fast");

  const [isProcessing, setIsProcessing] = useState(false);
  const [processedCount, setProcessedCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [showPaywall, setShowPaywall] = useState(false);

  // ✅ Download gate modal
  const [showDownloadGate, setShowDownloadGate] = useState(false);
  const [pendingDownload, setPendingDownload] = useState<PendingDownload | null>(
    null
  );

  // ✅ NEW: cold start hint (only show once ever)
  const [hasSeenColdStartHint, setHasSeenColdStartHint] = useState(true);

  useEffect(() => {
    // Read once on mount
    try {
      const seen =
        typeof window !== "undefined" &&
        window.localStorage.getItem("cleancut_seen_first_process_hint") === "1";
      setHasSeenColdStartHint(!!seen);
    } catch {
      setHasSeenColdStartHint(true); // fail-safe: don't annoy user
    }
  }, []);

  function markColdStartHintSeen() {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("cleancut_seen_first_process_hint", "1");
      }
    } catch {}
    setHasSeenColdStartHint(true);
  }

  // ✅ Load credits: real credits for logged-in users; fake credits for guests
  useEffect(() => {
    let mounted = true;

    async function refresh() {
      try {
        if (!user?.id) {
          // Guest: allow preview (no DB calls)
          if (mounted)
            setCredits({
              planId: "free",
              creditsRemaining: 999,
              lastResetAt: null,
            });
          return;
        }

        const state = await loadCredits();
        if (mounted) setCredits(state);
      } catch (e) {
        console.error("loadCredits failed:", e);
      }
    }

    refresh();

    function onCreditsUpdate() {
      refresh();
    }

    if (typeof window !== "undefined") {
      window.addEventListener("credits:update", onCreditsUpdate);
    }

    return () => {
      mounted = false;
      if (typeof window !== "undefined") {
        window.removeEventListener("credits:update", onCreditsUpdate);
      }
    };
  }, [user?.id]);

  const plan = useMemo(
    () => (credits ? getPlanById(credits.planId) : getPlanById("free")),
    [credits]
  );

  const isFree = plan.id === "free";
  const allowQuality = !isFree && !isGuest; // ✅ quality only for signed-in paid users

  // ✅ Guests forced to Fast
  useEffect(() => {
    if ((isGuest || isFree) && qualityMode === "quality") {
      setQualityMode("fast");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGuest, isFree]);

  // Cleanup preview URLs
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  // ✅ If user signs in from the modal, run pending download immediately (preview stays!)
  useEffect(() => {
    if (!user?.id) return;
    if (!pendingDownload) return;

    (async () => {
      try {
        if (pendingDownload.type === "single") {
          await downloadUrlAsFile(
            pendingDownload.url,
            pendingDownload.filename
          );
        } else {
          // all
          for (let i = 0; i < results.length; i++) {
            await downloadUrlAsFile(
              results[i].outputUrl,
              `cleancut-${i + 1}.png`
            );
          }
        }
      } finally {
        setPendingDownload(null);
        setShowDownloadGate(false);
      }
    })();
  }, [user?.id, pendingDownload, results]);

  function onFilesSelected(files: File[]) {
    // Guest: restrict to 1 image (preview only). Signed in uses plan batch size.
    const max = isGuest ? 1 : plan.maxBatchSize;

    const limited = files.slice(0, max);
    const newItems: QueuedImage[] = limited.map((f) => ({
      id: `${f.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      file: f,
      previewUrl: URL.createObjectURL(f),
    }));

    setImages(newItems);
    setResults([]);
    setErrorMsg(null);

    if (isGuest && files.length > 1) {
      setErrorMsg(
        "Guest preview supports 1 image. Sign up free to batch + download."
      );
    }
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

    // Guests: only Fast
    const isQuality = allowQuality && qualityMode === "quality";

    // Guests: prevent batch
    if (isGuest && images.length > 1) {
      setErrorMsg(
        "Guest preview supports 1 image. Sign up free to batch + download."
      );
      return;
    }

    // Signed-in users: normal credit check
    if (!isGuest && !canConsumeCredits(credits, images.length, isQuality)) {
      setShowPaywall(true);
      return;
    }

    const spaceId = process.env.NEXT_PUBLIC_BG_SPACE;
    if (!spaceId) {
      setErrorMsg("NEXT_PUBLIC_BG_SPACE is not set in environment variables.");
      return;
    }

    setIsProcessing(true);
    setProcessedCount(0);

    try {
      // ✅ On first-ever processing, show hint while this cold-start happens
      const app = await Client.connect(spaceId);

      const maxSide = getMaxSidePx(
        credits.planId,
        isQuality ? "quality" : "fast"
      );
      const resized = await Promise.all(
        images.map(async (img) => {
          const resizedFile = await resizeImageFile(img.file, maxSide);
          return { ...img, file: resizedFile };
        })
      );

      const concurrency = 2;
      const qualityFlag = isQuality;

      const processed = await asyncPool(concurrency, resized, async (img) => {
        const result: any = await app.predict("/remove_bg", [
          img.file,
          qualityFlag,
        ]);

        const raw =
          Array.isArray(result?.data) && result.data.length > 0
            ? result.data[0]
            : null;

        if (!raw) throw new Error("Invalid response from HF");

        const outputUrl =
          typeof raw === "string"
            ? raw
            : typeof raw === "object" && raw && "url" in raw
            ? (raw as any).url
            : null;

        if (!outputUrl) throw new Error("Could not extract output url");

        setProcessedCount((c) => c + 1);

        return {
          id: img.id,
          inputUrl: img.previewUrl,
          outputUrl,
        } as ProcessedImage;
      });

      setResults(processed);

      // ✅ Mark "first time hint" as seen after first successful processing
      if (!hasSeenColdStartHint) {
        markColdStartHintSeen();
      }

      // Signed-in users: log usage + deduct credits
      if (!isGuest) {
        try {
          const {
            data: { user: u },
          } = await supabase.auth.getUser();

          if (u) {
            const creditsSpent = images.length * (isQuality ? 2 : 1);
            await supabase.from("usage_events").insert({
              user_id: u.id,
              email: u.email,
              plan_id: credits.planId,
              mode: isQuality ? "quality" : "fast",
              images_count: images.length,
              credits_spent: creditsSpent,
            });
          }
        } catch (e) {
          console.warn("usage analytics insert failed", e);
        }

        const updatedCredits = await consumeCredits(
          credits,
          images.length,
          isQuality
        );
        setCredits(updatedCredits);

        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("credits:update"));
        }
      }
    } catch (err: any) {
      console.error("HF Space error:", err);
      setErrorMsg(
        "Processing failed. Your HuggingFace Space may be cold-starting or overloaded. Try again in a moment."
      );
    } finally {
      setIsProcessing(false);
    }
  }

  function requestDownloadSingle(url: string, filename: string) {
    if (isGuest) {
      setPendingDownload({ type: "single", url, filename });
      setShowDownloadGate(true);
      return;
    }
    downloadUrlAsFile(url, filename);
  }

  async function handleDownloadAll() {
    if (results.length === 0) return;

    if (isGuest) {
      setPendingDownload({ type: "all" });
      setShowDownloadGate(true);
      return;
    }

    for (let i = 0; i < results.length; i++) {
      await downloadUrlAsFile(results[i].outputUrl, `cleancut-${i + 1}.png`);
    }
  }

  const isQuality = allowQuality && qualityMode === "quality";
  const perImageCost = isQuality ? 2 : 1;
  const totalCost = images.length * perImageCost;

  // ✅ show this message only while processing AND only if user hasn't seen it before
  const showFirstTimeHint = isProcessing && !hasSeenColdStartHint;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">
            CleanCut AI – Background Removal App
          </h1>
          <p className="mt-1 text-xs text-slate-300">
            {isGuest
              ? "Guest preview: process 1 image (Fast). Sign up free to download + batch."
              : "Fast costs 1 credit/image. Quality costs 2 credits/image (paid plans only)."}
          </p>
        </div>

        {/* keep badge, but it may show free credits in guest mode */}
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
                        ? "bg-indigo-500 text-white"
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

            {/* Processing mode */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
              <div>
                <div className="text-xs font-semibold text-slate-100">Processing mode</div>
                <div className="mt-1 text-[11px] text-slate-400">
                  {isGuest
                    ? "Guest preview supports Fast only."
                    : "Fast = 1 credit/image. Quality = 2 credits/image (paid only)."}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQualityMode("fast")}
                  className={`rounded-full px-3 py-1 text-[11px] ${
                    qualityMode === "fast"
                      ? "bg-emerald-500/20 text-emerald-200 border border-emerald-500/30"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  Fast (1 credit)
                </button>

                <button
                  onClick={() => setQualityMode("quality")}
                  disabled={!allowQuality}
                  title={!allowQuality ? "Quality mode is available on paid plans." : ""}
                  className={`rounded-full px-3 py-1 text-[11px] border ${
                    !allowQuality
                      ? "cursor-not-allowed border-slate-800 bg-slate-900/40 text-slate-500"
                      : qualityMode === "quality"
                      ? "bg-indigo-500/20 text-indigo-200 border border-indigo-500/30"
                      : "bg-slate-800 text-slate-200 border border-slate-800"
                  }`}
                >
                  Quality (2 credits)
                </button>
              </div>
            </div>

            {/* ✅ NEW: first-time cold start hint */}
            {showFirstTimeHint && (
              <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3 text-[11px] text-slate-300">
                <div className="font-semibold text-slate-100">
                  ⏳ First-time setup may take longer
                </div>
                <div className="mt-1 text-slate-400">
                  The first processing can take extra time while our AI starts up. Please
                  wait — next runs will be faster.
                </div>
              </div>
            )}

            <button
              onClick={handleProcess}
              disabled={isProcessing || images.length === 0}
              className="w-full rounded-full bg-indigo-500 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-700"
            >
              {isProcessing ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
                  Processing {processedCount}/{images.length}
                </span>
              ) : (
                `Process ${images.length || ""} image${
                  images.length === 1 ? "" : "s"
                } • Cost: ${isGuest ? 0 : totalCost} credit${
                  totalCost === 1 ? "" : "s"
                }`
              )}
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

            {results.length > 0 && isGuest && (
              <p className="text-[11px] text-slate-400">
                Downloads require a free account. Your preview is already ready.
              </p>
            )}
          </div>
        </div>

        <div className="card p-4">
          <BeforeAfter
            images={results}
            bgMode={bgMode}
            customColor={customColor}
            onDownloadRequested={requestDownloadSingle}
          />
        </div>
      </section>

      {showPaywall && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 p-4">
          <div className="card max-w-sm p-4 text-xs text-slate-300">
            <h2 className="text-sm font-semibold text-white">You&apos;re out of credits</h2>
            <p className="mt-2">
              You&apos;ve reached the limit for your current plan. Upgrade to process more
              images.
            </p>
            <p className="mt-2 text-[11px] text-slate-400">
              Current selection:{" "}
              <span className="text-slate-200">{isQuality ? "quality" : "fast"}</span> •
              Cost per image:{" "}
              <span className="text-slate-200">{perImageCost}</span> credit(s)
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
                className="rounded-full bg-indigo-500 px-4 py-1 text-xs font-semibold text-white hover:bg-indigo-600"
              >
                See plans
              </a>
            </div>
          </div>
        </div>
      )}

      <DownloadGateModal
        open={showDownloadGate}
        onClose={() => {
          setShowDownloadGate(false);
          setPendingDownload(null);
        }}
      />
    </div>
  );
}
