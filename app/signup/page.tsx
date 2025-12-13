"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function signUp() {
    setLoading(true);
    setError(null);

    const emailRedirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/login`
        : undefined;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo },
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

      {!success ? (
        <>
          <input
            className="mt-4 w-full rounded-xl bg-slate-950 p-3 text-sm"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="mt-3 w-full rounded-xl bg-slate-950 p-3 text-sm"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

          <button
            onClick={signUp}
            disabled={loading}
            className="mt-4 w-full rounded-full bg-indigo-500 py-2 text-sm text-white"
          >
            {loading ? "Creating..." : "Sign up"}
          </button>
        </>
      ) : (
        <p className="mt-4 text-sm text-green-400">
          ✅ Account created. Check your inbox <b>and spam folder</b> to verify.
        </p>
      )}

      <p className="mt-4 text-center text-xs text-slate-400">
        Already have an account?{" "}
        <Link href="/login" className="text-indigo-400">
          Sign in
        </Link>
      </p>
    </div>
  );
}
