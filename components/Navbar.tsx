"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadCredits, CreditState } from "../lib/credits";

export default function Navbar() {
  const [credits, setCredits] = useState<CreditState | null>(null);

  useEffect(() => {
    const c = loadCredits();
    setCredits(c);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* LEFT: BRAND */}
        <Link
          href="/"
          className="text-sm font-bold tracking-wide text-white"
        >
          CleanCut<span className="text-indigo-400"> AI</span>
          <span className="ml-2 text-xs font-normal text-slate-400">
            by Xevora
          </span>
        </Link>

        {/* CENTER: NAV LINKS */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/app"
            className="text-sm text-slate-300 hover:text-white"
          >
            App
          </Link>

          <Link
            href="/pricing"
            className="text-sm text-slate-300 hover:text-white"
          >
            Pricing
          </Link>

          <Link
            href="/blog"
            className="text-sm text-slate-300 hover:text-white"
          >
            Blog
          </Link>
        </nav>

        {/* RIGHT: CTA + CREDITS */}
        <div className="flex items-center gap-3">
          {credits && (
            <div className="hidden rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 md:block">
              Credits:{" "}
              <span className="font-semibold text-white">
                {credits.creditsLeft}
              </span>
            </div>
          )}

          <Link
            href="/app"
            className="rounded-full bg-indigo-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-indigo-600"
          >
            Try Free
          </Link>
        </div>
      </div>
    </header>
  );
}
