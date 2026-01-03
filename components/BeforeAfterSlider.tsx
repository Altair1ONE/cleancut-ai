"use client";

import { useId, useMemo, useState } from "react";

/**
 * Your production site uses basePath: /cleancut
 * and static assets resolve under /cleancut/...
 *
 * This helper FORCE-prefixes /cleancut for local public assets,
 * while leaving external URLs untouched.
 */
function toPublicUrl(src: string) {
  if (!src) return src;

  // External URLs or data URIs -> leave untouched
  if (/^(https?:)?\/\//.test(src)) return src;
  if (src.startsWith("data:")) return src;

  const normalized = src.startsWith("/") ? src : `/${src}`;

  // Already prefixed
  if (normalized.startsWith("/cleancut/")) return normalized;

  // FORCE basePath for your deployment
  return `/cleancut${normalized}`;
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

  const before = useMemo(() => toPublicUrl(beforeSrc), [beforeSrc]);
  const after = useMemo(() => toPublicUrl(afterSrc), [afterSrc]);

  const [beforeOk, setBeforeOk] = useState(true);
  const [afterOk, setAfterOk] = useState(true);

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
          onError={() => setBeforeOk(false)}
        />

        {/* AFTER (clipped by width) */}
        <div className="absolute inset-0">
          {/* IMPORTANT: relative container so the absolute image positions inside */}
          <div
            className="relative h-full overflow-hidden"
            style={{ width: `${pos}%` }}
          >
            <img
              src={after}
              alt={alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
              onError={() => setAfterOk(false)}
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

        {/* Visible fallback if something fails */}
        {(!beforeOk || !afterOk) && (
          <div className="absolute inset-0 grid place-items-center bg-black/50 p-6 text-center">
            <div className="max-w-sm rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-200">
              <div className="font-semibold text-white">Example image failed to load</div>
              <div className="mt-2 text-xs text-slate-300 break-all">
                Before: {before}
              </div>
              <div className="mt-1 text-xs text-slate-300 break-all">
                After: {after}
              </div>
              <div className="mt-2 text-xs text-slate-400">
                If these URLs open in a new tab, the issue is caching/import. If they don’t,
                it’s path/basePath.
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-300">
        <span>Transparent PNG export</span>
        <span className="text-slate-400">No watermark • Fast &amp; Quality</span>
      </div>
    </div>
  );
}
