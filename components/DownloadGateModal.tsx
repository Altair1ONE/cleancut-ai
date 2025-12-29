"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { firebaseAuth } from "../lib/firebaseClient";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

type Mode = "signin" | "signup";

export default function DownloadGateModal({
  open,
  onClose,
  title = "Create a free account to download",
  subtitle = "Downloads require a free account to prevent abuse.",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}) {
  const [mode, setMode] = useState<Mode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [agree, setAgree] = useState(true);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    if (!email || !password) return false;
    if (mode === "signup" && !agree) return false;
    return true;
  }, [email, password, agree, mode]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setMsg(null);

    if (mode === "signup" && !agree) {
      setErr("Please agree to the Terms & Policies.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "signin") {
        await signInWithEmailAndPassword(firebaseAuth, email, password);
        setMsg("Signed in. Starting download…");
        setTimeout(() => onClose(), 600);
      } else {
        await createUserWithEmailAndPassword(firebaseAuth, email, password);
        setMsg("Account created. Starting download…");
        setTimeout(() => onClose(), 800);
      }
    } catch (e: any) {
      setErr(e?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <p className="mt-2 text-sm text-slate-300">{subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 hover:border-slate-500"
            type="button"
          >
            Close
          </button>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold ${
              mode === "signup"
                ? "bg-indigo-500 text-white"
                : "border border-slate-700 text-slate-200 hover:border-slate-500"
            }`}
          >
            Sign up (free)
          </button>
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold ${
              mode === "signin"
                ? "bg-indigo-500 text-white"
                : "border border-slate-700 text-slate-200 hover:border-slate-500"
            }`}
          >
            Sign in
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <div>
            <label className="text-xs text-slate-300">Email</label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xs text-slate-300">Password</label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            {mode === "signup" && <p className="mt-2 text-xs text-slate-500">Minimum 6 characters.</p>}
          </div>

          {mode === "signup" && (
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-200">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <span>
                  I agree to{" "}
                  <Link href="/terms" className="text-indigo-300 hover:text-indigo-200">
                    Terms
                  </Link>
                  ,{" "}
                  <Link href="/privacy" className="text-indigo-300 hover:text-indigo-200">
                    Privacy
                  </Link>
                  , and{" "}
                  <Link href="/refund" className="text-indigo-300 hover:text-indigo-200">
                    Refunds
                  </Link>
                  .
                </span>
              </label>
            </div>
          )}

          {err && <p className="text-sm text-rose-400">{err}</p>}
          {msg && <p className="text-sm text-emerald-400">{msg}</p>}

          <button
            type="submit"
            disabled={loading || !canSubmit}
            className="w-full rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-700"
          >
            {loading ? "Please wait…" : mode === "signup" ? "Create free account" : "Sign in"}
          </button>

          <p className="text-center text-xs text-slate-500">Tip: Downloads require a free account.</p>
        </form>
      </div>
    </div>
  );
}
