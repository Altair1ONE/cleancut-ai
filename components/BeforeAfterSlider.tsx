"use client";

import { useId, useMemo, useState } from "react";

/* Force basePath for your deployment */
function toPublicUrl(src: string) {
  if (!src) return src;
  if (/^(https?:)?\/\//.test(src)) return src;
  if (src.startsWith("data:")) return src;

  const normalized = src.startsWith("/") ? src : `/${src}`;
  if (normalized.startsWith("/cleancut/")) return normalized;

  return `/cleancut${normalized}`;
}

/* White checkerboard background */
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

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  alt,
  label = "Drag to compare",
  initial = 50,
  className = "",
}: {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
  label?: string;
  initial?: number;
  className?: string;
}) {
  const id = useId();
  const [pos, setPos] = useState(() =>
    Math.min(100, Math.max(0, initial))
  );

  const before = useMemo(() => toPublicUrl(beforeSrc), [beforeSrc]);
  const after = useMemo(() => toPublicUrl(afterSrc), [afterSrc]);

  return (
    <div
      className={
        "rounded-3xl border border-slate-800 bg-slate-950/40 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.35)] " +
        className
      }
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
        {/* BEFORE (base layer) */}
        <img
          src={before}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />

        {/* AFTER (overlay layer) */}
        <div
          className="absolute inset-y-0 left-0 z-10 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          {/* Checkerboard background */}
          <div
            className="absolute inset-0"
            style={checkerboard(14)}
            aria-hidden
          />

          {/* After image */}
          <img
            src={after}
            alt={alt}
            className="absolute inset-0 h-full w-full object-contain"
            loading="lazy"
          />
        </div>

        {/* Divider */}
        <div
          className="pointer-events-none absolute inset-y-0 z-20 w-px bg-black/70"
          style={{ left: `${pos}%` }}
        />
        <div
          className="pointer-events-none absolute top-1/2 z-20 -translate-y-1/2"
          style={{ left: `${pos}%` }}
        >
          <div className="ml-[-18px] h-9 w-9 rounded-full bg-white shadow ring-1 ring-black/20" />
        </div>

        {/* Badge */}
        <div
          className="pointer-events-none absolute top-3 z-20 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur"
          style={{ left: `${pos}%` }}
        >
          {label}
        </div>

        {/* Range input */}
        <label htmlFor={id} className="sr-only">
          Before and after comparison slider
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-x-3 bottom-3 z-30 h-2 w-[calc(100%-1.5rem)] cursor-ew-resize appearance-none rounded-full bg-black/20 outline-none"
        />

        {/* Corner labels */}
        <div className="pointer-events-none absolute left-3 top-3 z-20 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
          Before
        </div>
        <div className="pointer-events-none absolute right-3 top-3 z-20 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
          After
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-300">
        <span>Transparent PNG preview</span>
        <span className="text-slate-400">White checkerboard background</span>
      </div>
    </div>
  );
}
