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

  // basePath should stay from env (you use /cleancut)
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // ✅ always correct in production + local (no localhost fallback mistakes)
  const continueUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}${basePath}/login`;
  }, [basePath]);

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
        email,
        password
      );

      // ✅ Create Firestore user doc so Admin panel shows user
      await setDoc(
        doc(db, "users", cred.user.uid),
        {
          uid: cred.user.uid,
          email: cred.user.email || email,
          plan_id: "free",
          credits_remaining: 30,
          created_at: serverTimestamp(),
          updated_at: serverTimestamp(),
          last_reset_at: null,
          email_verified: false,
        },
        { merge: true }
      );

      // ✅ Send verification email with correct continue URL
      await sendEmailVerification(cred.user, {
        url: continueUrl, // <— IMPORTANT
        handleCodeInApp: false,
      });

      // ✅ Prevent “half logged-in” UI
      await signOut(firebaseAuth);

      router.push(`/check-email?email=${encodeURIComponent(email)}`);
    } catch (e: any) {
      setErr(e?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
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
                <Link href="/terms" className="text-indigo-300 hover:text-indigo-200">
                  Terms of Service
                </Link>
                ,{" "}
                <Link href="/privacy" className="text-indigo-300 hover:text-indigo-200">
                  Privacy Policy
                </Link>
                , and{" "}
                <Link href="/refund" className="text-indigo-300 hover:text-indigo-200">
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
            <Link href="/login" className="text-indigo-300 hover:text-indigo-200">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
