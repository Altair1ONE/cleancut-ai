"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Link from "next/link";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function signUp() {
    setLoading(true);
    setError(null);

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    const emailRedirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/login`
        : undefined;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  return (
    <div className="mx-auto mt-20 max-w-sm rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
      <h1 className="text-xl font-semibold text-white">Create an account</h1>
      <p className="mt-2 text-sm text-slate-300">
        Sign up to start using CleanCut AI.
      </p>

      {!success ? (
        <>
          <input
            type="email"
            placeholder="Email"
            className="mt-4 w-full rounded-xl bg-slate-950 p-3 text-sm text-white focus:ring-2 focus:ring-indigo-500/40"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password (min 6 characters)"
            className="mt-3 w-full rounded-xl bg-slate-950 p-3 text-sm text-white focus:ring-2 focus:ring-indigo-500/40"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="mt-2 text-xs text-rose-400">{error}</p>}

          <button
            onClick={signUp}
            disabled={loading}
            className="mt-4 w-full rounded-full bg-indigo-500 py-2 text-sm font-semibold text-white hover:bg-indigo-600 disabled:bg-slate-700"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </>
      ) : (
        <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300">
          ✅ <strong>Account created!</strong>
          <br />
          Please check your email <strong>and spam folder</strong> for the
          confirmation link before signing in.
        </div>
      )}

      <p className="mt-4 text-center text-xs text-slate-400">
        Already have an account?{" "}
        <Link href="/login" className="text-indigo-400 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
