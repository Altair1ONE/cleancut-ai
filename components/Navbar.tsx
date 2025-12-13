"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "./AuthProvider";
import { FeedbackModal } from "./FeedbackModal";

export function Navbar() {
  const pathname = usePathname();
  const { session, loading } = useAuth();
  const [openFeedback, setOpenFeedback] = useState(false);

  const isActive = (p: string) => pathname === p;

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500" />
            <div>
              <div className="text-sm font-semibold text-white">
                CleanCut <span className="text-slate-400">by</span> Xevora
              </div>
              <div className="text-[11px] text-slate-400">
                Background remover
              </div>
            </div>
          </Link>

          <div className="hidden gap-2 md:flex">
            <Link
              href="/"
              className={`px-3 py-1 rounded-full ${
                isActive("/") ? "bg-slate-800 text-white" : "text-slate-300"
              }`}
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className={`px-3 py-1 rounded-full ${
                isActive("/pricing")
                  ? "bg-slate-800 text-white"
                  : "text-slate-300"
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/app"
              className={`px-3 py-1 rounded-full ${
                isActive("/app")
                  ? "bg-slate-800 text-white"
                  : "text-slate-300"
              }`}
            >
              App
            </Link>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setOpenFeedback(true)}
              className="hidden md:inline rounded-full border border-slate-700 px-4 py-2 text-sm"
            >
              Feedback
            </button>

            {!loading && session ? (
              <button
                onClick={() => supabase.auth.signOut()}
                className="rounded-full border border-slate-700 px-4 py-2 text-sm"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-full border border-slate-700 px-4 py-2 text-sm"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="rounded-full bg-indigo-500 px-4 py-2 text-sm text-white"
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
