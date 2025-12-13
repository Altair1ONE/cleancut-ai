"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FeedbackModal } from "./FeedbackModal";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (p: string) => pathname === p;

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500 shadow-[0_10px_30px_rgba(99,102,241,0.35)]" />
            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">CleanCut AI</div>
              <div className="text-[11px] text-slate-400">
                Background remover
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/"
              className={`rounded-full px-3 py-1 text-sm ${
                isActive("/")
                  ? "bg-slate-800 text-white"
                  : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className={`rounded-full px-3 py-1 text-sm ${
                isActive("/pricing")
                  ? "bg-slate-800 text-white"
                  : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/app"
              className={`rounded-full px-3 py-1 text-sm ${
                isActive("/app")
                  ? "bg-slate-800 text-white"
                  : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
              }`}
            >
              App
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              className="hidden rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500 md:inline-flex"
            >
              Feedback
            </button>

            <Link
              href="/app"
              className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_15px_40px_rgba(99,102,241,0.25)] hover:bg-indigo-600"
            >
              Try app
            </Link>
          </div>
        </nav>
      </header>

      <FeedbackModal open={open} onClose={() => setOpen(false)} page={pathname} />
    </>
  );
}
