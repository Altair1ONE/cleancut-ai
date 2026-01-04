"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { firebaseAuth } from "../lib/firebaseClient";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_30px_100px_rgba(2,6,23,0.25)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
            <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:border-slate-300"
            type="button"
          >
            Close
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`rounded-2xl px-4 py-2 text-sm font-semibold ${
              mode === "signup"
                ? "bg-blue-600 text-white"
                : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300"
            }`}
          >
            Sign up (free)
          </button>
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`rounded-2xl px-4 py-2 text-sm font-semibold ${
              mode === "signin"
                ? "bg-blue-600 text-white"
                : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300"
            }`}
          >
            Sign in
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700">Email</label>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Password</label>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500"
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            {mode === "signup" && (
              <p className="mt-2 text-xs text-slate-500">Minimum 6 characters.</p>
            )}
          </div>

          {mode === "signup" && (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <span>
                  I agree to{" "}
                  <Link href="/terms" className="text-blue-700 hover:text-blue-800">
                    Terms
                  </Link>
                  ,{" "}
                  <Link href="/privacy" className="text-blue-700 hover:text-blue-800">
                    Privacy
                  </Link>
                  , and{" "}
                  <Link href="/refund" className="text-blue-700 hover:text-blue-800">
                    Refunds
                  </Link>
                  .
                </span>
              </label>
            </div>
          )}

          {err && <p className="text-sm text-rose-600">{err}</p>}
          {msg && <p className="text-sm text-emerald-700">{msg}</p>}

          <button
            type="submit"
            disabled={loading || !canSubmit}
            className="w-full rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {loading ? "Please wait…" : mode === "signup" ? "Create free account" : "Sign in"}
          </button>

          <p className="text-center text-xs text-slate-500">
            Tip: Downloads require a free account.
          </p>
        </form>
      </div>
    </div>
  );
}
