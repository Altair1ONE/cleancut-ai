"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { loadCredits, CreditState } from "../lib/credits";
import { useAuth } from "./AuthProvider";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../lib/firebaseClient";

function getBasePath() {
  // Your production basePath is /cleancut
  return process.env.NEXT_PUBLIC_BASE_PATH?.trim()
    ? `/${process.env.NEXT_PUBLIC_BASE_PATH.trim().replace(/^\/+/, "")}`
    : "/cleancut";
}

export default function Navbar() {
  const [credits, setCredits] = useState<CreditState | null>(null);
  const [open, setOpen] = useState(false);

  const { user } = useAuth();
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;

    async function refresh() {
      try {
        if (!user?.uid) {
          if (mounted) setCredits(null);
          return;
        }
        const state = await loadCredits();
        if (mounted) setCredits(state);
      } catch (e) {
        console.error("Navbar loadCredits failed:", e);
        if (mounted) setCredits(null);
      }
    }

    refresh();

    function onCreditsUpdate() {
      refresh();
    }

    window.addEventListener("credits:update", onCreditsUpdate);
    return () => {
      mounted = false;
      window.removeEventListener("credits:update", onCreditsUpdate);
    };
  }, [user?.uid]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  async function handleSignOut() {
    await signOut(firebaseAuth);
    setOpen(false);
    window.location.href = getBasePath(); // ✅ don’t bounce to domain root
  }

  const initial = user?.email?.charAt(0).toUpperCase() ?? "U";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="cc-container flex items-center justify-between py-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white shadow-sm">
            CC
          </div>
          <div className="leading-tight">
            <div className="text-[15px] font-extrabold tracking-tight text-slate-900">
              CleanCut <span className="text-blue-600">AI</span>
            </div>
            <div className="text-xs text-slate-500">
              by Xevora • watermark-free PNG
            </div>
          </div>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-7 md:flex">
          <Link href="/app" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
            App
          </Link>
          <Link href="/pricing" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
            Pricing
          </Link>
          <Link href="/blog" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
            Guides
          </Link>
          <Link href="/contact" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
            Support
          </Link>
        </nav>

        {/* Right */}
        <div ref={wrapRef} className="relative flex items-center gap-3">
          {credits && (
            <div className="hidden rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 md:block">
              Credits: <span className="font-semibold text-slate-900">{credits.creditsRemaining}</span>
            </div>
          )}

          {!user && (
            <>
              <Link
                href="/login"
                className="hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-slate-300 md:inline-flex"
              >
                Sign in
              </Link>

              <Link
                href="/app"
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                Try Free
              </Link>
            </>
          )}

          {user && (
            <>
              <Link
                href="/app"
                className="hidden rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 md:inline-flex"
              >
                Remove Background
              </Link>

              <button
                onClick={() => setOpen((v) => !v)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white shadow-sm hover:bg-slate-800"
                aria-label="Open user menu"
              >
                {initial}
              </button>

              {open && (
                <div className="absolute right-0 top-12 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                  <div className="px-3 py-2 text-xs text-slate-500">{user.email}</div>

                  <Link
                    href="/profile"
                    className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>

                  <Link
                    href="/usage"
                    className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    onClick={() => setOpen(false)}
                  >
                    Usage & Credits
                  </Link>

                  <Link
                    href="/pricing"
                    className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    onClick={() => setOpen(false)}
                  >
                    Plans & Billing
                  </Link>

                  <div className="my-2 border-t border-slate-200" />

                  <button
                    onClick={handleSignOut}
                    className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-rose-600 hover:bg-rose-50"
                    type="button"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
