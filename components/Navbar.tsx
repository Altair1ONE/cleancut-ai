"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "./AuthProvider";
import { FeedbackModal } from "./FeedbackModal";
import { Toast } from "./Toast";
import { loadCredits } from "../lib/credits";

// Works with any CreditState shape (no TS errors)
function getCreditsLeftSafe(creditState: any): number {
  if (!creditState) return 0;

  if (typeof creditState.remaining === "number") return creditState.remaining;
  if (typeof creditState.creditsRemaining === "number") return creditState.creditsRemaining;
  if (typeof creditState.creditsLeft === "number") return creditState.creditsLeft;
  if (typeof creditState.credits === "number") return creditState.credits;

  if (
    typeof creditState.monthlyLimit === "number" &&
    typeof creditState.usedThisMonth === "number"
  ) {
    return Math.max(0, creditState.monthlyLimit - creditState.usedThisMonth);
  }

  return 0;
}

export function Navbar() {
  const pathname = usePathname();
  const { session, user, loading, justLoggedIn, displayName } = useAuth();
  const [openFeedback, setOpenFeedback] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [creditsLeft, setCreditsLeft] = useState<number>(0);

  const email = user?.email || "";
  const initial = (displayName || email || "?").charAt(0).toUpperCase();

  function refreshCredits() {
    const c = loadCredits() as any;
    setCreditsLeft(getCreditsLeftSafe(c));
  }

  useEffect(() => {
    refreshCredits();

    // ✅ Update credits instantly after processing
    const handler = () => refreshCredits();
    window.addEventListener("credits:update", handler);

    return () => {
      window.removeEventListener("credits:update", handler);
    };
  }, []);

  const toastMsg = useMemo(() => {
    if (!justLoggedIn) return null;
    return displayName ? `Welcome back, ${displayName} 👋` : "Welcome back 👋";
  }, [justLoggedIn, displayName]);

  return (
    <>
      <Toast message={toastMsg} onClose={() => {}} />

      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500" />
            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">
                CleanCut <span className="text-slate-400">by</span> Xevora
              </div>
              <div className="text-[11px] text-slate-400">Background remover</div>
            </div>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/"
              className={`rounded-full px-3 py-1 text-sm ${
                pathname === "/" ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className={`rounded-full px-3 py-1 text-sm ${
                pathname === "/pricing"
                  ? "bg-slate-800 text-white"
                  : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/app"
              className={`rounded-full px-3 py-1 text-sm ${
                pathname === "/app" ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
              }`}
            >
              App
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {!loading && session && (
              <div className="hidden md:flex items-center rounded-full border border-slate-700 bg-slate-900/40 px-3 py-1 text-xs text-slate-200">
                <span className="font-semibold">{creditsLeft}</span>
                <span className="ml-1 text-slate-400">credits</span>
              </div>
            )}

            <button
              onClick={() => setOpenFeedback(true)}
              className="hidden md:inline rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-slate-500"
            >
              Feedback
            </button>

            {!loading && session ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white"
                  title={email}
                >
                  {initial}
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-700 bg-slate-900 shadow-xl">
                    <div className="px-3 py-2 text-xs text-slate-400 truncate">
                      {email}
                    </div>

                    <div className="px-3 pb-2 text-xs text-slate-200 md:hidden">
                      <span className="font-semibold">{creditsLeft}</span>{" "}
                      <span className="text-slate-400">credits</span>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="block px-3 py-2 text-sm text-slate-200 hover:bg-slate-800"
                    >
                      Profile
                    </Link>

                    <button
                      onClick={async () => {
                        await supabase.auth.signOut();
                        setMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-rose-300 hover:bg-slate-800"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-slate-500"
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

      <FeedbackModal open={openFeedback} onClose={() => setOpenFeedback(false)} page={pathname} />
    </>
  );
}
