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
}: {
  images: ProcessedImage[];
  bgMode: BgMode;
  customColor: string;
}) {
  const bgStyle = useMemo(() => {
    if (bgMode === "white") return { background: "#ffffff" };
    if (bgMode === "black") return { background: "#000000" };
    if (bgMode === "custom") return { background: customColor };
    // transparent / blur / shadow use the default dark card background
    return {};
  }, [bgMode, customColor]);

  const outputImgClass = useMemo(() => {
    if (bgMode === "blur") return "filter blur-[1.5px]";
    if (bgMode === "shadow") return "drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]";
    return "";
  }, [bgMode]);

  async function downloadImage(url: string, filename: string) {
    // More reliable than <a href=...> for cross-domain images:
    // fetch -> blob -> download
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
      // Fallback: direct link download
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  }

  if (images.length === 0) {
    return (
      <div className="text-sm text-slate-300">
        Upload an image and click <span className="text-slate-100">Process</span>
        . Your before/after preview will show here.
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
              onClick={() => downloadImage(img.outputUrl, `cleancut-${idx + 1}.png`)}
              className="rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white hover:bg-brand-dark"
            >
              Download PNG
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {/* BEFORE */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-2">
              <div className="mb-2 text-[11px] text-slate-400">Before</div>
              <img
                src={img.inputUrl}
                alt="Before"
                className="h-auto w-full rounded-lg"
              />
            </div>

            {/* AFTER */}
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
