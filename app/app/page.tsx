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

    // Prefer PNG when original is PNG to preserve edges
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

/** -------------------------------------------------------- **/

export default function AppPage() {
  const { session, loading } = useAuth();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !session) {
      router.push("/login");
    }
  }, [loading, session, router]);

  // IMPORTANT: no early returns before hooks in inner component
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

  useEffect(() => {
    setCredits(loadCredits());
  }, []);

  const plan = useMemo(
    () => (credits ? getPlanById(credits.planId) : getPlanById("free")),
    [credits]
  );

  // Cleanup preview object URLs when images change
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  function onFilesSelected(files: File[]) {
    const limited = files.slice(0, plan.maxBatchSize);
    const newItems: QueuedImage[] = limited.map((f) => ({
      id: `${f.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      file: f,
      previewUrl: URL.createObjectURL(f),
    }));
    setImages(newItems);
    setResults([]);
    setErrorMsg(null);
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

    if (!canConsumeCredits(credits, images.length, false)) {
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

      const maxSide = getMaxSidePx(credits.planId, qualityMode);
      const resized = await Promise.all(
        images.map(async (img) => {
          const resizedFile = await resizeImageFile(img.file, maxSide);
          return { ...img, file: resizedFile };
        })
      );

      const concurrency = 2;
      const qualityFlag = qualityMode === "quality";

      const processed = await asyncPool(concurrency, resized, async (img) => {
        // NOTE: endpoint name must match your Space. If your API shows "/remove_bg", use "/remove_bg".
        const result: any = await app.predict("/remove_bg", [
          img.file,
          qualityFlag,
        ]);

        const raw =
          Array.isArray(result?.data) && result.data.length > 0
            ? result.data[0]
            : null;

        if (!raw) {
          console.error("HF response:", result);
          throw new Error("Invalid response from HF");
        }

        const outputUrl =
          typeof raw === "string"
            ? raw
            : typeof raw === "object" && raw && "url" in raw
            ? (raw as any).url
            : null;

        if (!outputUrl) {
          throw new Error("Could not extract output url");
        }

        setProcessedCount((c) => c + 1);

        return {
          id: img.id,
          inputUrl: img.previewUrl,
          outputUrl,
        } as ProcessedImage;
      });

      setResults(processed);

      const updatedCredits = consumeCredits(credits, images.length, false);
      setCredits(updatedCredits);

      // Let Navbar refresh credits immediately
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("credits:update"));
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

  async function handleDownloadAll() {
    for (let i = 0; i < results.length; i++) {
      const res = results[i];
      try {
        const r = await fetch(res.outputUrl);
        const blob = await r.blob();
        const blobUrl = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `cleancut-${i + 1}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();

        URL.revokeObjectURL(blobUrl);
      } catch {
        const a = document.createElement("a");
        a.href = res.outputUrl;
        a.download = `cleancut-${i + 1}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">
            CleanCut AI – Background Removal App
          </h1>
          <p className="mt-1 text-xs text-slate-300">
            Fast mode is default (best speed). Use Quality for hair/fur edges.
          </p>
        </div>
        <CreditsBadge />
      </header>

      <section className="mt-6 grid gap-6 md:grid-cols-[2fr,2fr]">
        <div className="card p-4">
          <UploadArea onFilesSelected={onFilesSelected} />

          <div className="mt-4 space-y-3 text-xs text-slate-300">
            <div>
              <span className="font-semibold text-slate-200">
                Background mode
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {(
                  [
                    "transparent",
                    "white",
                    "black",
                    "custom",
                    "blur",
                    "shadow",
                  ] as BgMode[]
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

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
              <div>
                <div className="text-xs font-semibold text-slate-100">
                  Processing mode
                </div>
                <div className="mt-1 text-[11px] text-slate-400">
                  Fast = quicker. Quality = slower, cleaner edges.
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
                  Fast (default)
                </button>
                <button
                  onClick={() => setQualityMode("quality")}
                  className={`rounded-full px-3 py-1 text-[11px] ${
                    qualityMode === "quality"
                      ? "bg-indigo-500/20 text-indigo-200 border border-indigo-500/30"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  Quality
                </button>
              </div>
            </div>

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
                }`
              )}
            </button>

            {errorMsg && (
              <p className="text-[11px] text-rose-400">{errorMsg}</p>
            )}

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
          <BeforeAfter
            images={results}
            bgMode={bgMode}
            customColor={customColor}
          />
        </div>
      </section>

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
                href="/pricing"
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
