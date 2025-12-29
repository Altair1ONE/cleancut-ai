"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { sendEmailVerification, signOut } from "firebase/auth";
import { firebaseAuth } from "../lib/firebaseClient";

export default function CheckEmailClient() {
  const sp = useSearchParams();
  const router = useRouter();

  const emailFromQuery = sp.get("email") || "";

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const continueUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}${basePath}/login`;
  }, [basePath]);

  const [email, setEmail] = useState(emailFromQuery);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // If user is already verified, kick them to login (or app)
  useEffect(() => {
    const u = firebaseAuth.currentUser;
    if (u?.email) setEmail(u.email);

    if (u?.emailVerified) {
      router.push("/login");
    }
  }, [router]);

  async function resend() {
    setMsg(null);
    setErr(null);

    const u = firebaseAuth.currentUser;

    if (!u) {
      // If user refreshed the page and lost session, we can't resend without login.
      setErr("Session expired. Please login once, then resend verification.");
      return;
    }

    if (u.emailVerified) {
      setMsg("Your email is already verified. You can login now.");
      return;
    }

    setLoading(true);
    try {
      await sendEmailVerification(u, {
        url: continueUrl,
        handleCodeInApp: false,
      });

      setMsg("Verification email resent. Please check Inbox + Spam/Promotions.");
    } catch (e: any) {
      setErr(e?.message || "Could not resend email. Try again in a minute.");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await signOut(firebaseAuth);
    router.push("/login");
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
      <h1 className="text-2xl font-bold text-white">Check your email</h1>

      <p className="mt-3 text-slate-300">
        We sent a verification link to{" "}
        <span className="font-semibold text-white">{email || "your email"}</span>.
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

        <button
          onClick={logout}
          className="rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500"
          type="button"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
