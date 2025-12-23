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
    if (bgMode === "shadow") return "drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]";
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
      <div className="text-sm text-slate-300">
        Upload an image and click <span className="text-slate-100">Process</span>. Your
        before/after preview will show here.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {images.map((img, idx) => (
        <div key={img.id} className="rounded-2xl border border-slate-800 p-3">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-xs text-slate-300">
              Result {idx + 1} / {images.length}
            </div>

            <button
              onClick={() =>
                handleDownload(img.outputUrl, `cleancut-${idx + 1}.png`)
              }
              className="rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-600"
            >
              Download PNG
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-2">
              <div className="mb-2 text-[11px] text-slate-400">Before</div>
              <img src={img.inputUrl} alt="Before" className="h-auto w-full rounded-lg" />
            </div>

            <div
              className="rounded-xl border border-slate-800 bg-slate-950 p-2"
              style={bgStyle}
            >
              <div className="mb-2 text-[11px] text-slate-400">After</div>
              <img
                src={img.outputUrl}
                alt="After"
                className={`h-auto w-full rounded-lg ${outputImgClass}`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
