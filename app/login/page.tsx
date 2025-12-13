"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function signIn() {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid credentials or email not verified yet.");
      setLoading(false);
      return;
    }

    router.push("/app");
  }

  return (
    <div className="mx-auto mt-20 max-w-sm rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
      <h1 className="text-xl font-semibold text-white">Sign in</h1>

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
        onClick={signIn}
        disabled={loading}
        className="mt-4 w-full rounded-full bg-indigo-500 py-2 text-sm text-white"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>

      <p className="mt-4 text-center text-xs text-slate-400">
        Don’t have an account?{" "}
        <Link href="/signup" className="text-indigo-400">
          Create one
        </Link>
      </p>
    </div>
  );
}
