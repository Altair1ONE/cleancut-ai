"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { firebaseAuth, db } from "../../lib/firebaseClient";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // ✅ popup after successful signup
  const [showSuccess, setShowSuccess] = useState(false);

  const continueUrl = useMemo(() => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
    return `${siteUrl}${basePath}/login`;
  }, []);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (!agree) {
      setErr("Please confirm you have read and agree to the Terms & Policies.");
      return;
    }

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(
        firebaseAuth,
        email.trim(),
        password
      );

      // ✅ Create/merge Firestore user doc (so Admin panel can show them)
      await setDoc(
        doc(db, "users", cred.user.uid),
        {
          uid: cred.user.uid,
          email: cred.user.email || email.trim(),
          plan_id: "free",
          credits_remaining: 30,
          created_at: serverTimestamp(),
          updated_at: serverTimestamp(),
          last_reset_at: null,
          // keep a flag in DB for admin UI convenience
          email_verified: false,
        },
        { merge: true }
      );

      // ✅ Send verification email
      await sendEmailVerification(cred.user, {
        url: continueUrl,
        handleCodeInApp: false,
      });

      // ✅ show popup (human UX)
      setShowSuccess(true);

      // ✅ Prevent “half logged-in” UI: sign out, then redirect
      setTimeout(async () => {
        try {
          await signOut(firebaseAuth);
        } finally {
          router.push(`/check-email?email=${encodeURIComponent(email.trim())}`);
        }
      }, 900);
    } catch (e: any) {
      setErr(e?.message || "Signup failed. Please try again.");
      setShowSuccess(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      {/* ✅ Success popup */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Almost done ✅</h3>
            <p className="mt-2 text-sm text-slate-300">
              We sent a verification link to{" "}
              <span className="font-semibold text-white">{email}</span>.
              <br />
              Please verify your email to activate your account.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Redirecting you to “Check email”…
            </p>
          </div>
        </div>
      )}

      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
        <h1 className="text-2xl font-bold text-white">Create your account</h1>
        <p className="mt-2 text-sm text-slate-300">
          Sign up to access plans and manage your credits.
        </p>

        <form onSubmit={handleSignup} className="mt-6 space-y-4">
          <div>
            <label className="text-xs text-slate-300">Email</label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
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
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <p className="mt-2 text-xs text-slate-500">Minimum 6 characters.</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
            <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-200">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <span>
                I have read and agree to the{" "}
                <Link
                  href="/terms"
                  className="text-indigo-300 hover:text-indigo-200"
                >
                  Terms of Service
                </Link>
                ,{" "}
                <Link
                  href="/privacy"
                  className="text-indigo-300 hover:text-indigo-200"
                >
                  Privacy Policy
                </Link>
                , and{" "}
                <Link
                  href="/refund"
                  className="text-indigo-300 hover:text-indigo-200"
                >
                  Refund Policy
                </Link>
                .
              </span>
            </label>
          </div>

          {err && <p className="text-sm text-rose-400">{err}</p>}

          <button
            type="submit"
            disabled={loading || !agree}
            className="w-full rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-700"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

          <p className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-indigo-300 hover:text-indigo-200"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
