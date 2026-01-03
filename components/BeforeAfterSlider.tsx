"use client";

import { useEffect, useId, useMemo, useState } from "react";

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
  initial?: number;
  className?: string;
}) {
  const id = useId();
  const [pos, setPos] = useState(() => Math.min(100, Math.max(0, initial)));

  const before = useMemo(() => withBasePath(beforeSrc), [beforeSrc]);
  const after = useMemo(() => withBasePath(afterSrc), [afterSrc]);

  const [beforeOk, setBeforeOk] = useState<null | boolean>(null);
  const [afterOk, setAfterOk] = useState<null | boolean>(null);

  // Helps you verify you’re seeing the latest build/component
  const [mountedAt, setMountedAt] = useState<string>("");
  useEffect(() => {
    setMountedAt(new Date().toISOString());
  }, []);

  return (
    <div
      className={
        "rounded-3xl border border-slate-800 bg-slate-950/40 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.35)] " +
        className
      }
    >
      {/* DEBUG PANEL */}
      <div className="mb-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-3 text-[11px] text-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 font-semibold text-indigo-200">
            BeforeAfterSlider DEBUG
          </span>
          <span className="text-slate-400">mounted:</span>
          <span className="text-slate-200">{mountedAt || "…"}</span>
        </div>

        <div className="mt-2 grid gap-2">
          <div>
            <div className="text-slate-400">Computed BEFORE URL</div>
            <a className="break-all text-indigo-300 underline" href={before} target="_blank" rel="noreferrer">
              {before}
            </a>
            <div className="mt-1 text-slate-400">
              load status:{" "}
              <span className={beforeOk === false ? "text-red-300" : "text-emerald-300"}>
                {beforeOk === null ? "not attempted yet" : beforeOk ? "OK" : "FAILED"}
              </span>
            </div>
          </div>

          <div>
            <div className="text-slate-400">Computed AFTER URL</div>
            <a className="break-all text-indigo-300 underline" href={after} target="_blank" rel="noreferrer">
              {after}
            </a>
            <div className="mt-1 text-slate-400">
              load status:{" "}
              <span className={afterOk === false ? "text-red-300" : "text-emerald-300"}>
                {afterOk === null ? "not attempted yet" : afterOk ? "OK" : "FAILED"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SLIDER */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-950">
        {/* BEFORE */}
        <img
          src={before}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          onLoad={() => setBeforeOk(true)}
          onError={() => setBeforeOk(false)}
        />

        {/* AFTER clipped */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
            <img
              src={after}
              alt={alt}
              className="absolute inset-0 h-full w-full object-cover"
              onLoad={() => setAfterOk(true)}
              onError={() => setAfterOk(false)}
            />
          </div>

          {/* Divider */}
          <div className="pointer-events-none absolute inset-y-0 w-px bg-white/80" style={{ left: `${pos}%` }} />
          <div className="pointer-events-none absolute top-1/2 -translate-y-1/2" style={{ left: `${pos}%` }}>
            <div className="ml-[-18px] h-9 w-9 rounded-full bg-white/90 shadow ring-1 ring-black/10" />
          </div>

          {/* Badge */}
          <div
            className="pointer-events-none absolute top-3 -translate-x-1/2 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur"
            style={{ left: `${pos}%` }}
          >
            {label}
          </div>

          {/* Range */}
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

        {/* Labels */}
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
