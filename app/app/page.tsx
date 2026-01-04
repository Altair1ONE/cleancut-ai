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
import DownloadGateModal from "../../components/DownloadGateModal";

// ✅ Firebase (usage logging)
import { db } from "../../lib/firebaseClient";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

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

  const isGuest = !user?.uid;

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
  const [pendingDownload, setPendingDownload] = useState<PendingDownload | null>(null);

  // ✅ cold start hint (only show once ever)
  const [hasSeenColdStartHint, setHasSeenColdStartHint] = useState(true);

  useEffect(() => {
    try {
      const seen =
        typeof window !== "undefined" &&
        window.localStorage.getItem("cleancut_seen_first_process_hint") === "1";
      setHasSeenColdStartHint(!!seen);
    } catch {
      setHasSeenColdStartHint(true);
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

  // ✅ Load credits
  useEffect(() => {
    let mounted = true;

    async function refresh() {
      try {
        if (!user?.uid) {
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
  }, [user?.uid]);

  const plan = useMemo(
    () => (credits ? getPlanById(credits.planId) : getPlanById("free")),
    [credits]
  );

  const isFree = plan.id === "free";
  const allowQuality = !isFree && !isGuest;

  useEffect(() => {
    if ((isGuest || isFree) && qualityMode === "quality") {
      setQualityMode("fast");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGuest, isFree]);

  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  // ✅ If user signs in from the modal, run pending download immediately
  useEffect(() => {
    if (!user?.uid) return;
    if (!pendingDownload) return;

    (async () => {
      try {
        if (pendingDownload.type === "single") {
          await downloadUrlAsFile(pendingDownload.url, pendingDownload.filename);
        } else {
          for (let i = 0; i < results.length; i++) {
            await downloadUrlAsFile(results[i].outputUrl, `cleancut-${i + 1}.png`);
          }
        }
      } finally {
        setPendingDownload(null);
        setShowDownloadGate(false);
      }
    })();
  }, [user?.uid, pendingDownload, results]);

  function onFilesSelected(files: File[]) {
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
      setErrorMsg("Guest preview supports 1 image. Sign up free to batch + download.");
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

    const isQuality = allowQuality && qualityMode === "quality";

    if (isGuest && images.length > 1) {
      setErrorMsg("Guest preview supports 1 image. Sign up free to batch + download.");
      return;
    }

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
      const app = await Client.connect(spaceId);

      const maxSide = getMaxSidePx(credits.planId, isQuality ? "quality" : "fast");

      const resized = await Promise.all(
        images.map(async (img) => {
          const resizedFile = await resizeImageFile(img.file, maxSide);
          return { ...img, file: resizedFile };
        })
      );

      const concurrency = 2;
      const qualityFlag = isQuality;

      const processed = await asyncPool(concurrency, resized, async (img) => {
        const result: any = await app.predict("/remove_bg", [img.file, qualityFlag]);

        const raw =
          Array.isArray(result?.data) && result.data.length > 0 ? result.data[0] : null;

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

      if (!hasSeenColdStartHint) {
        markColdStartHintSeen();
      }

      // ✅ Signed-in users: log usage + deduct credits (FIRESTORE)
      if (!isGuest && user?.uid) {
        const creditsSpent = images.length * (isQuality ? 2 : 1);

        // 1) log usage event (non-blocking)
        try {
          await addDoc(collection(db, "users", user.uid, "usage_events"), {
            email: user.email ?? null,
            plan_id: credits.planId,
            mode: isQuality ? "quality" : "fast",
            images_count: images.length,
            credits_spent: creditsSpent,
            created_at: serverTimestamp(),
          });
        } catch (e) {
          console.warn("usage log failed:", e);
        }

        // 2) deduct credits (your existing credits.ts should handle Firebase now)
        const updatedCredits = await consumeCredits(credits, images.length, isQuality);
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

  const showFirstTimeHint = isProcessing && !hasSeenColdStartHint;

  return (
    <main className="cc-bg">
      <div className="cc-container relative py-10">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[1.5rem] font-extrabold tracking-tight text-slate-900 md:text-[2rem]">
              CleanCut AI – Background Removal App
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              {isGuest
                ? "Guest preview: process 1 image (Fast). Sign up free to download + batch."
                : "Fast costs 1 credit/image. Quality costs 2 credits/image (paid plans only)."}
            </p>
          </div>

          <CreditsBadge />
        </header>

        <section className="mt-8 grid gap-6 md:grid-cols-[2fr,2fr]">
          <div className="card p-6">
            <UploadArea onFilesSelected={onFilesSelected} />

            <div className="mt-6 space-y-4 text-sm text-slate-700">
              <div>
                <span className="text-sm font-semibold text-slate-900">Background mode</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(["transparent", "white", "black", "custom", "blur", "shadow"] as BgMode[]).map(
                    (mode) => (
                      <button
                        key={mode}
                        onClick={() => setBgMode(mode)}
                        className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                          bgMode === mode
                            ? "bg-blue-600 text-white"
                            : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        {mode}
                      </button>
                    )
                  )}
                  {bgMode === "custom" && (
                    <input
                      type="color"
                      className="h-9 w-12 cursor-pointer rounded-xl border border-slate-200 bg-white p-1"
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                    />
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Processing mode</div>
                    <div className="mt-1 text-xs text-slate-600">
                      {isGuest
                        ? "Guest preview supports Fast only."
                        : "Fast = 1 credit/image. Quality = 2 credits/image (paid only)."}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQualityMode("fast")}
                      className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                        qualityMode === "fast"
                          ? "bg-emerald-600/15 text-emerald-800 border border-emerald-600/25"
                          : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      Fast (1 credit)
                    </button>

                    <button
                      onClick={() => setQualityMode("quality")}
                      disabled={!allowQuality}
                      title={!allowQuality ? "Quality mode is available on paid plans." : ""}
                      className={`rounded-full px-4 py-2 text-xs font-semibold transition border ${
                        !allowQuality
                          ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                          : qualityMode === "quality"
                          ? "bg-blue-600/10 text-blue-800 border-blue-600/25"
                          : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      Quality (2 credits)
                    </button>
                  </div>
                </div>

                {showFirstTimeHint && (
                  <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3 text-xs text-slate-700">
                    <div className="font-semibold text-slate-900">
                      ⏳ First-time setup may take longer
                    </div>
                    <div className="mt-1 text-slate-600">
                      The first processing can take extra time while our AI starts up. Please
                      wait — next runs will be faster.
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleProcess}
                disabled={isProcessing || images.length === 0}
                className="w-full rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {isProcessing ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
                    Processing {processedCount}/{images.length}
                  </span>
                ) : (
                  `Process ${images.length || ""} image${images.length === 1 ? "" : "s"} • Cost: ${
                    isGuest ? 0 : totalCost
                  } credit${totalCost === 1 ? "" : "s"}`
                )}
              </button>

              {errorMsg && <p className="text-sm text-rose-600">{errorMsg}</p>}

              {results.length > 0 && (
                <button
                  onClick={handleDownloadAll}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-800 hover:border-slate-300"
                >
                  Download all as PNG
                </button>
              )}

              {results.length > 0 && isGuest && (
                <p className="text-sm text-slate-600">
                  Downloads require a free account. Your preview is already ready.
                </p>
              )}
            </div>
          </div>

          <div className="card p-6">
            <BeforeAfter
              images={results}
              bgMode={bgMode}
              customColor={customColor}
              onDownloadRequested={requestDownloadSingle}
            />
          </div>
        </section>

        {showPaywall && (
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 p-4">
            <div className="cc-card max-w-sm p-6">
              <h2 className="text-lg font-semibold text-slate-900">You&apos;re out of credits</h2>
              <p className="mt-2 text-sm text-slate-600">
                You&apos;ve reached the limit for your current plan. Upgrade to process more images.
              </p>
              <p className="mt-3 text-xs text-slate-500">
                Current selection:{" "}
                <span className="font-semibold text-slate-900">{isQuality ? "quality" : "fast"}</span>{" "}
                • Cost per image:{" "}
                <span className="font-semibold text-slate-900">{perImageCost}</span> credit(s)
              </p>
              <div className="mt-5 flex justify-end gap-2">
                <button
                  onClick={() => setShowPaywall(false)}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300"
                >
                  Close
                </button>
                <a
                  href="/pricing"
                  className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
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
    </main>
  );
}
