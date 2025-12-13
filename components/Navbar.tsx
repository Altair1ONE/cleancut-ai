"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { FeedbackModal } from "./FeedbackModal";
import { useAuth } from "./AuthProvider";
import { supabase } from "../lib/supabaseClient";

export function Navbar() {
  const pathname = usePathname();
  const [openFeedback, setOpenFeedback] = useState(false);
  const { session, loading } = useAuth();

  const isActive = (p: string) => pathname === p;

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500 shadow-[0_10px_30px_rgba(99,102,241,0.35)]" />
            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">CleanCut AI</div>
              <div className="text-[11px] text-slate-400">
                Background remover
              </div>
            </div>
          </Link>

          {/* Nav links */}
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

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpenFeedback(true)}
              className="hidden rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500 md:inline-flex"
            >
              Feedback
            </button>

            {!loading && session ? (
              <button
                onClick={() => supabase.auth.signOut()}
                className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-600"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <FeedbackModal
        open={openFeedback}
        onClose={() => setOpenFeedback(false)}
        page={pathname}
      />
    </>
  );
}
