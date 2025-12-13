"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  async function signUp() {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    // Basic checks (simple + helpful)
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

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Supabase might require email confirmation depending on your settings.
    setSuccessMsg(
      "Account created! If email confirmation is enabled, check your inbox. Otherwise you can sign in now."
    );

    // If confirmations are OFF, user may be signed in directly.
    // Still redirect them to app after a short moment.
    setTimeout(() => {
      router.push("/app");
    }, 800);

    setLoading(false);
  }

  return (
    <div className="mx-auto mt-20 max-w-sm rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
      <h1 className="text-xl font-semibold text-white">Create an account</h1>
      <p className="mt-2 text-sm text-slate-300">
        Sign up to track credits and unlock paid plans later.
      </p>

      <input
        type="email"
        placeholder="Email"
        className="mt-4 w-full rounded-xl bg-slate-950 p-3 text-sm text-white outline-none ring-0 focus:ring-2 focus:ring-indigo-500/40"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password (min 6 chars)"
        className="mt-3 w-full rounded-xl bg-slate-950 p-3 text-sm text-white outline-none ring-0 focus:ring-2 focus:ring-indigo-500/40"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="mt-2 text-xs text-rose-400">{error}</p>}

      {successMsg && (
        <p className="mt-2 text-xs text-emerald-300">{successMsg}</p>
      )}

      <button
        onClick={signUp}
        disabled={loading}
        className="mt-4 w-full rounded-full bg-indigo-500 py-2 text-sm font-semibold text-white hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-700"
      >
        {loading ? "Creating..." : "Sign up"}
      </button>

      {/* ✅ Recommended Optional Link */}
      <p className="mt-4 text-center text-xs text-slate-400">
        Already have an account?{" "}
        <Link href="/login" className="text-indigo-400 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
