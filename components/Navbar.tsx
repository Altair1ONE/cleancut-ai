"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { loadCredits, CreditState } from "../lib/credits";
import { useAuth } from "./AuthProvider";
import { createClient } from "@supabase/supabase-js";
import { FeedbackModal } from "./FeedbackModal"; // ✅ add this

export default function Navbar() {
  const [credits, setCredits] = useState<CreditState | null>(null);
  const [open, setOpen] = useState(false);

  // ✅ add these 2 lines
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [page, setPage] = useState("/");

  const { user } = useAuth(); // your AuthProvider already provides this
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Supabase client (safe on client)
  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    return createClient(url, key);
  }, []);

  useEffect(() => {
    const c = loadCredits();
    setCredits(c);
  }, []);

  // ✅ set current page for feedback sheet logging
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPage(window.location.pathname || "/");
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    setOpen(false);
    // optional hard refresh so UI updates everywhere
    window.location.href = "/";
  }

  const initial = user?.email?.charAt(0).toUpperCase() ?? "U";

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* LEFT: BRAND */}
          <Link href="/" className="text-sm font-bold tracking-wide text-white">
            CleanCut<span className="text-indigo-400"> AI</span>
            <span className="ml-2 text-xs font-normal text-slate-400">
              by Xevora
            </span>
          </Link>

          {/* CENTER: NAV LINKS */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/app" className="text-sm text-slate-300 hover:text-white">
              App
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-slate-300 hover:text-white"
            >
              Pricing
            </Link>
            <Link href="/blog" className="text-sm text-slate-300 hover:text-white">
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-sm text-slate-300 hover:text-white"
            >
              Contact
            </Link>

            {/* ✅ Feedback button (added) */}
            <button
              type="button"
              onClick={() => setFeedbackOpen(true)}
              className="text-sm text-slate-300 hover:text-white"
            >
              Feedback
            </button>
          </nav>

          {/* RIGHT */}
          <div ref={wrapRef} className="relative flex items-center gap-3">
            {credits && (
              <div className="hidden rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 md:block">
                Credits:{" "}
                <span className="font-semibold text-white">
                  {credits.creditsLeft}
                </span>
              </div>
            )}

            {!user && (
              <Link
                href="/login"
                className="rounded-full bg-indigo-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-indigo-600"
              >
                Sign in
              </Link>
            )}

            {user && (
              <>
                <button
                  onClick={() => setOpen((v) => !v)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white hover:bg-indigo-600"
                  aria-label="Open user menu"
                >
                  {initial}
                </button>

                {open && (
                  <div className="absolute right-0 top-12 w-48 rounded-2xl border border-slate-800 bg-slate-950 p-2 shadow-xl">
                    <div className="px-3 py-2 text-xs text-slate-400">
                      {user.email}
                    </div>

                    <Link
                      href="/profile"
                      className="block rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-slate-800"
                      onClick={() => setOpen(false)}
                    >
                      Profile
                    </Link>

                    <Link
                      href="/pricing"
                      className="block rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-slate-800"
                      onClick={() => setOpen(false)}
                    >
                      Billing
                    </Link>

                    {/* ✅ Feedback inside dropdown too (optional but useful) */}
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        setFeedbackOpen(true);
                      }}
                      className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-200 hover:bg-slate-800"
                    >
                      Feedback
                    </button>

                    <button
                      onClick={handleSignOut}
                      className="w-full rounded-lg px-3 py-2 text-left text-sm text-rose-400 hover:bg-slate-800"
                      type="button"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </>
            )}

            <Link
              href="/app"
              className="hidden rounded-full border border-slate-700 px-4 py-1.5 text-xs font-semibold text-slate-200 hover:border-slate-500 md:inline-flex"
            >
              Try Free
            </Link>
          </div>
        </div>
      </header>

      {/* ✅ Use your existing modal EXACTLY as-is */}
      <FeedbackModal
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        page={page}
      />
    </>
  );
}
