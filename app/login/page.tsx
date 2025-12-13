"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

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
      setError(error.message);
    } else {
      router.push("/app");
    }

    setLoading(false);
  }

  return (
    <div className="mx-auto mt-20 max-w-sm rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
      <h1 className="text-xl font-semibold text-white">Sign in</h1>

      <input
        type="email"
        placeholder="Email"
        className="mt-4 w-full rounded-xl bg-slate-950 p-3 text-sm"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="mt-3 w-full rounded-xl bg-slate-950 p-3 text-sm"
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

      <button
        onClick={signIn}
        disabled={loading}
        className="mt-4 w-full rounded-full bg-indigo-500 py-2 text-sm font-semibold"
      >
        {loading ? "Signing in..." : "Login"}
      </button>
    </div>
  );
}
