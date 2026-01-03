"use client";

import { useId, useMemo, useState } from "react";

function withBasePath(src: string) {
  if (!src) return src;

  // External URLs or data URIs -> leave untouched
  if (/^(https?:)?\/\//.test(src)) return src;
  if (src.startsWith("data:")) return src;

  const normalized = src.startsWith("/") ? src : `/${src}`;

  // Already prefixed
  if (normalized.startsWith("/cleancut/")) return normalized;

  // Prefer env var if set
  const envBase = (process.env.NEXT_PUBLIC_BASE_PATH || "").trim();
  if (envBase) {
    const base = envBase.startsWith("/") ? envBase : `/${envBase}`;
    return `${base}${normalized}`;
  }

  // Fallback: detect deployment under /cleancut
  if (typeof window !== "undefined") {
    const p = window.location.pathname || "";
    if (p.startsWith("/cleancut")) return `/cleancut${normalized}`;
  }

  // Local default
  return normalized;
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
  initial?: number; // 0..100
  className?: string;
}) {
  const id = useId();
  const [pos, setPos] = useState(() => Math.min(100, Math.max(0, initial)));

  const before = useMemo(() => withBasePath(beforeSrc), [beforeSrc]);
  const after = useMemo(() => withBasePath(afterSrc), [afterSrc]);

  return (
    <div
      className={
        "rounded-3xl border border-slate-800 bg-slate-950/40 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.35)] " +
        className
      }
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-950">
        {/* BEFORE */}
        <img
          src={before}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* AFTER (clipped by width) */}
        <div className="absolute inset-0">
          {/* IMPORTANT: must be relative so the absolute image positions INSIDE the clip */}
          <div
            className="relative h-full overflow-hidden"
            style={{ width: `${pos}%` }}
          >
            <img
              src={after}
              alt={alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          {/* Divider */}
          <div
            className="pointer-events-none absolute inset-y-0 w-px bg-white/80"
            style={{ left: `${pos}%` }}
          />
          <div
            className="pointer-events-none absolute top-1/2 -translate-y-1/2"
            style={{ left: `${pos}%` }}
          >
            <div className="ml-[-18px] h-9 w-9 rounded-full bg-white/90 shadow ring-1 ring-black/10" />
          </div>

          {/* Badge */}
          <div
            className="pointer-events-none absolute top-3 -translate-x-1/2 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur"
            style={{ left: `${pos}%` }}
          >
            {label}
          </div>

          {/* Range control */}
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
            className="absolute inset-x-3 bottom-3 h-2 w-[calc(100%-1.5rem)] cursor-ew-resize appearance-none rounded-full bg-white/20 outline-none"
          />
        </div>

        {/* Corner labels */}
        <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white">
          Before
        </div>
        <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white">
          After
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-300">
        <span>Transparent PNG export</span>
        <span className="text-slate-400">No watermark • Fast &amp; Quality</span>
      </div>
    </div>
  );
}
