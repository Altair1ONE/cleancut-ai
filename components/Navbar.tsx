"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { loadCredits, CreditState } from "../lib/credits";
import { useAuth } from "./AuthProvider";

export default function Navbar() {
  const [credits, setCredits] = useState<CreditState | null>(null);
  const [open, setOpen] = useState(false);

  const { user, signOut } = useAuth(); // ✅ use AuthProvider (no extra supabase client)
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const feedbackUrl = process.env.NEXT_PUBLIC_FEEDBACK_URL;

  // Load credits + listen for updates (from app/page.tsx)
  useEffect(() => {
    const c = loadCredits();
    setCredits(c);

    function onCreditsUpdate() {
      const latest = loadCredits();
      setCredits(latest);
    }

    window.addEventListener("credits:update", onCreditsUpdate);
    return () => window.removeEventListener("credits:update", onCreditsUpdate);
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
    try {
      await signOut(); // ✅ centralized sign out
    } finally {
      setOpen(false);
      window.location.href = "/";
    }
  }

  const initial = user?.email?.charAt(0).toUpperCase() ?? "U";

  return (
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
          <Link
            href="/blog"
            className="text-sm text-slate-300 hover:text-white"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="text-sm text-slate-300 hover:text-white"
          >
            Contact
          </Link>

          {/* ✅ Feedback (Google Sheet / Apps Script URL) */}
          {feedbackUrl && (
            <a
              href={feedbackUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-slate-300 hover:text-white"
            >
              Feedback
            </a>
          )}
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
                <div className="absolute right-0 top-12 w-52 rounded-2xl border border-slate-800 bg-slate-950 p-2 shadow-xl">
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

                  {/* ✅ Feedback in dropdown too */}
                  {feedbackUrl && (
                    <a
                      href={feedbackUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-slate-800"
                      onClick={() => setOpen(false)}
                    >
                      Feedback
                    </a>
                  )}

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

      {/* ✅ Mobile nav (simple) */}
      <div className="border-t border-slate-900/60 md:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs text-slate-300">
          <Link href="/app" className="hover:text-white">
            App
          </Link>
          <Link href="/pricing" className="hover:text-white">
            Pricing
          </Link>
          <Link href="/blog" className="hover:text-white">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
          {feedbackUrl && (
            <a
              href={feedbackUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              Feedback
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
