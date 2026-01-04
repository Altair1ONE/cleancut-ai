"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { firebaseAuth, db } from "../../lib/firebaseClient";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

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
      const cred = await createUserWithEmailAndPassword(firebaseAuth, email, password);

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

      const continueUrl = "https://xevora.org/cleancut/login";

      await sendEmailVerification(cred.user, {
        url: continueUrl,
        handleCodeInApp: false,
      });

      // ✅ Keep user signed-in so "Resend" works without logging in again
      router.push(`/check-email?email=${encodeURIComponent(email)}`);
    } catch (e: any) {
      setErr(e?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative mx-auto max-w-5xl px-4 py-12">
      {/* background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-28 right-0 h-72 w-[34rem] rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Left: value */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/30 p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1 text-xs text-slate-300">
            <span className="h-2 w-2 rounded-full bg-indigo-400" />
            Start free
          </div>

          <h1 className="mt-5 text-3xl font-bold text-white">Create your account</h1>
          <p className="mt-3 text-slate-300">
            Get instant access to background removal, transparent PNG exports, and your usage history.
          </p>

          <div className="mt-6 grid gap-3 text-sm text-slate-300">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
              ✔ Free tier available
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
              ✔ No watermark exports
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
              ✔ Upgrade when you need more
            </div>
          </div>

          <p className="mt-6 text-xs text-slate-400">
            You’ll be asked to verify your email after signup.
          </p>
        </section>

        {/* Right: form */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
          <h2 className="text-xl font-bold text-white">Sign up</h2>
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

            {err && (
              <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-200">
                {err}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !agree}
              className="w-full rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-500/20 hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-700"
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
        </section>
      </div>
    </main>
  );
}
