"use client";

import { useMemo } from "react";

type BgMode = "transparent" | "white" | "black" | "custom" | "blur" | "shadow";

type ProcessedImage = {
  id: string;
  inputUrl: string;
  outputUrl: string;
};

export function BeforeAfter({
  images,
  bgMode,
  customColor,
  onDownloadRequested,
}: {
  images: ProcessedImage[];
  bgMode: BgMode;
  customColor: string;
  onDownloadRequested?: (url: string, filename: string) => void;
}) {
  const bgStyle = useMemo(() => {
    if (bgMode === "white") return { background: "#ffffff" };
    if (bgMode === "black") return { background: "#000000" };
    if (bgMode === "custom") return { background: customColor };
    return {};
  }, [bgMode, customColor]);

  const outputImgClass = useMemo(() => {
    if (bgMode === "blur") return "filter blur-[1.5px]";
    if (bgMode === "shadow") return "drop-shadow-[0_12px_28px_rgba(2,6,23,0.35)]";
    return "";
  }, [bgMode]);

  async function downloadImage(url: string, filename: string) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Download failed");
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

  function handleDownload(url: string, filename: string) {
    if (onDownloadRequested) {
      onDownloadRequested(url, filename);
      return;
    }
    downloadImage(url, filename);
  }

  if (images.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
        Upload an image and click{" "}
        <span className="font-semibold text-slate-900">Process</span>. Your before/after
        preview will show here.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {images.map((img, idx) => (
        <div
          key={img.id}
          className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_20px_60px_rgba(2,6,23,0.08)]"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-slate-900">
              Result {idx + 1}{" "}
              <span className="font-normal text-slate-500">/ {images.length}</span>
            </div>

            <button
              onClick={() => handleDownload(img.outputUrl, `cleancut-${idx + 1}.png`)}
              className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Download PNG
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <div className="mb-2 text-xs font-semibold text-slate-700">Before</div>
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <img src={img.inputUrl} alt="Before" className="h-auto w-full" />
              </div>
            </div>

            <div
              className="rounded-2xl border border-slate-200 bg-slate-50 p-3"
              style={bgStyle}
            >
              <div className="mb-2 text-xs font-semibold text-slate-700">After</div>
              <div className="checker-bg overflow-hidden rounded-xl border border-slate-200 bg-white">
                <img
                  src={img.outputUrl}
                  alt="After"
                  className={`h-auto w-full ${outputImgClass}`}
                />
              </div>
            </div>
          </div>

          <div className="mt-3 text-xs text-slate-500">
            Tip: Use <span className="font-semibold">white</span> /{" "}
            <span className="font-semibold">custom</span> background to preview edges.
          </div>
        </div>
      ))}
    </div>
  );
}
