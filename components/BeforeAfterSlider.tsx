"use client";

import { useId, useMemo, useState } from "react";

/**
 * Your production site uses basePath: /cleancut
 * Public assets resolve under /cleancut/...
 */
function toPublicUrl(src: string) {
  if (!src) return src;
  if (/^(https?:)?\/\//.test(src)) return src;
  if (src.startsWith("data:")) return src;

  const normalized = src.startsWith("/") ? src : `/${src}`;
  if (normalized.startsWith("/cleancut/")) return normalized;

  return `/cleancut${normalized}`;
}

/** White checkerboard background (remove.bg style) */
function checkerboard(size = 14) {
  return {
    backgroundColor: "#ffffff",
    backgroundImage: `
      linear-gradient(45deg, #e5e7eb 25%, transparent 25%),
      linear-gradient(-45deg, #e5e7eb 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #e5e7eb 75%),
      linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)
    `,
    backgroundSize: `${size}px ${size}px`,
    backgroundPosition: `0 0, 0 ${size / 2}px, ${size / 2}px -${size / 2}px, -${size / 2}px 0px`,
  } as React.CSSProperties;
}

/**
 * Demo that "changes background" like remove.bg:
 * - BEFORE: shows the ORIGINAL image
 * - AFTER: shows a white checkerboard + CUTOUT PNG on top
 */
export function BeforeAfterSlider({
  originalSrc,
  cutoutSrc,
  alt,
  label = "Drag to see transparent PNG",
  initial = 50,
  className = "",
  objectFit = "cover",
}: {
  originalSrc: string;
  cutoutSrc: string; // transparent PNG
  alt: string;
  label?: string;
  initial?: number; // 0..100
  className?: string;
  objectFit?: "cover" | "contain";
}) {
  const id = useId();
  const [pos, setPos] = useState(() => Math.min(100, Math.max(0, initial)));

  const original = useMemo(() => toPublicUrl(originalSrc), [originalSrc]);
  const cutout = useMemo(() => toPublicUrl(cutoutSrc), [cutoutSrc]);

  const fitClass = objectFit === "contain" ? "object-contain" : "object-cover";

  return (
    <div className={"rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_24px_70px_rgba(2,6,23,0.10)] " + className}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100">
        {/* BEFORE (original full image) */}
        <img src={original} alt={alt} loading="lazy" className={`absolute inset-0 h-full w-full ${fitClass}`} />

        {/* AFTER overlay: checkerboard + cutout (clipped by width) */}
        <div className="absolute inset-0">
          <div className="relative h-full overflow-hidden" style={{ width: `${pos}%` }}>
            <div className="absolute inset-0" style={checkerboard(14)} />
            <img src={cutout} alt={alt} loading="lazy" className={`absolute inset-0 h-full w-full ${fitClass}`} />
          </div>

          {/* Divider */}
          <div className="pointer-events-none absolute inset-y-0 w-px bg-slate-900/30" style={{ left: `${pos}%` }} />

          {/* Knob */}
          <div className="pointer-events-none absolute top-1/2 -translate-y-1/2" style={{ left: `${pos}%` }}>
            <div className="ml-[-20px] grid h-10 w-10 place-items-center rounded-full bg-white shadow ring-1 ring-slate-900/10">
              <div className="h-4 w-4 rounded-full bg-blue-600/90" />
            </div>
          </div>

          {/* Badge */}
          <div
            className="pointer-events-none absolute top-3 -translate-x-1/2 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur"
            style={{ left: `${pos}%` }}
          >
            {label}
          </div>

          {/* Range */}
          <label htmlFor={id} className="sr-only">
            Background comparison slider
          </label>
          <input
            id={id}
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            className="absolute inset-x-3 bottom-3 h-2 w-[calc(100%-1.5rem)] cursor-ew-resize appearance-none rounded-full bg-slate-900/10 outline-none"
          />
        </div>

        {/* Corner labels */}
        <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
          Original
        </div>
        <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
          Transparent PNG
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-slate-600">
        Slide <span className="font-semibold text-slate-900">left</span> to view the original • Slide{" "}
        <span className="font-semibold text-slate-900">right</span> to preview transparency
      </div>
    </div>
  );
}
