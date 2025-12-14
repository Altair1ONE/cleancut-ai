"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default function CheckEmailClient() {
  const sp = useSearchParams();
  const email = sp.get("email") || "";

  const supabase = useMemo(() => {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }, []);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function resend() {
    setMsg(null);
    setErr(null);

    if (!email) {
      setErr("Missing email. Please go back and sign up again.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: "https://xevora.org/cleancut/login",
        },
      });
      if (error) throw error;

      setMsg("Confirmation email resent. Please check Inbox + Spam/Promotions.");
    } catch (e: any) {
      setErr(e?.message || "Could not resend email. Try again in a minute.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
      <h1 className="text-2xl font-bold text-white">Check your email</h1>

      <p className="mt-3 text-slate-300">
        We sent a confirmation link to{" "}
        <span className="font-semibold text-white">
          {email || "your email"}
        </span>
        .
      </p>

      <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-sm text-slate-300">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Check your <b>Spam</b> / <b>Promotions</b> folder.
          </li>
          <li>Wait 1–3 minutes (email delivery can be delayed).</li>
          <li>If you still don’t see it, press “Resend”.</li>
        </ul>
      </div>

      {err && <p className="mt-4 text-sm text-rose-400">{err}</p>}
      {msg && <p className="mt-4 text-sm text-emerald-400">{msg}</p>}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={resend}
          disabled={loading}
          className="rounded-full bg-indigo-500 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-600 disabled:bg-slate-700"
          type="button"
        >
          {loading ? "Resending..." : "Resend email"}
        </button>

        <Link
          href="/login"
          className="rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500"
        >
          Go to login
        </Link>
      </div>
    </div>
  );
}
