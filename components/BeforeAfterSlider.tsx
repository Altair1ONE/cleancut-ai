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
 *
 * This requires:
 * - originalSrc: original photo (jpg/png)
 * - cutoutSrc: transparent PNG of the same photo after background removal
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
    <div
      className={
        "rounded-3xl border border-slate-800 bg-slate-950/40 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.35)] " +
        className
      }
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-950">
        {/* BEFORE (original full image) */}
        <img
          src={original}
          alt={alt}
          loading="lazy"
          className={`absolute inset-0 h-full w-full ${fitClass}`}
        />

        {/* AFTER overlay: checkerboard + cutout (clipped by width) */}
        <div className="absolute inset-0">
          <div
            className="relative h-full overflow-hidden"
            style={{ width: `${pos}%` }}
          >
            {/* Checkerboard background */}
            <div className="absolute inset-0" style={checkerboard(14)} />

            {/* Cutout PNG */}
            <img
              src={cutout}
              alt={alt}
              loading="lazy"
              className={`absolute inset-0 h-full w-full ${fitClass}`}
            />
          </div>

          {/* Divider + knob */}
          <div
            className="pointer-events-none absolute inset-y-0 w-px bg-black/70"
            style={{ left: `${pos}%` }}
          />
          <div
            className="pointer-events-none absolute top-1/2 -translate-y-1/2"
            style={{ left: `${pos}%` }}
          >
            <div className="ml-[-18px] h-9 w-9 rounded-full bg-white shadow ring-1 ring-black/20" />
          </div>

          {/* Badge */}
          <div
            className="pointer-events-none absolute top-3 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur"
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
            className="absolute inset-x-3 bottom-3 h-2 w-[calc(100%-1.5rem)] cursor-ew-resize appearance-none rounded-full bg-black/20 outline-none"
          />
        </div>

        {/* Corner labels */}
        <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
          Original
        </div>
        <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
          Transparent PNG
        </div>
      </div>

      <div className="mt-3 text-center text-xs text-slate-300">
  Slide <span className="font-semibold text-white">left</span> to view the original • Slide{" "}
  <span className="font-semibold text-white">right</span> to preview transparency
</div>

    </div>
  );
}
