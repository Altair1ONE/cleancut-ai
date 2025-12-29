"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { sendEmailVerification } from "firebase/auth";
import { firebaseAuth } from "../lib/firebaseClient";

export default function CheckEmailClient() {
  const sp = useSearchParams();
  const email = sp.get("email") || "";

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const continueUrl = useMemo(() => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
    return `${siteUrl}${basePath}/login`;
  }, []);

  async function resend() {
    setMsg(null);
    setErr(null);

    // In Firebase, resend requires a signed-in user in this browser.
    const u = firebaseAuth.currentUser;

    if (!u) {
      setErr(
        "To resend, please sign in first. Then come back here and press Resend."
      );
      return;
    }

    if (u.emailVerified) {
      setMsg("Your email is already verified. You can sign in now.");
      return;
    }

    setLoading(true);
    try {
      await u.reload();
      if (u.emailVerified) {
        setMsg("Your email is already verified. You can sign in now.");
        return;
      }

      await sendEmailVerification(u, {
        url: continueUrl,
        handleCodeInApp: false,
      });

      setMsg("Verification email sent again. Check Inbox + Spam/Promotions.");
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
        We sent a verification link to{" "}
        <span className="font-semibold text-white">
          {email || "your email"}
        </span>
        .
      </p>

      <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-sm text-slate-300">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Check <b>Spam</b> / <b>Promotions</b>.
          </li>
          <li>Wait 1–3 minutes (email delivery can be delayed).</li>
          <li>
            If you don’t see it, click <b>Resend</b>.
          </li>
          <li>
            If Resend says “sign in first”, go to Login, sign in once, then come
            back here and press Resend.
          </li>
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
