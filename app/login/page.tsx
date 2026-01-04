"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { firebaseAuth, db } from "../../lib/firebaseClient";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://xevora.org";
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const continueUrl = `${siteUrl}${basePath}/login`;

  const subtitle = useMemo(() => {
    return "Sign in to manage your credits and keep your processing history in one place.";
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const cred = await signInWithEmailAndPassword(firebaseAuth, email, password);

      // ✅ Important: reload user to get latest emailVerified
      await cred.user.reload();

      if (!cred.user.emailVerified) {
        await sendEmailVerification(cred.user, { url: continueUrl, handleCodeInApp: false });

        await setDoc(
          doc(db, "users", cred.user.uid),
          {
            uid: cred.user.uid,
            email: cred.user.email || email,
            email_verified: false,
            updated_at: serverTimestamp(),
          },
          { merge: true }
        );

        await signOut(firebaseAuth);

        router.push(`/check-email?email=${encodeURIComponent(email)}`);
        return;
      }

      // ✅ Mark verified in Firestore
      await setDoc(
        doc(db, "users", cred.user.uid),
        {
          uid: cred.user.uid,
          email: cred.user.email || email,
          email_verified: true,
          updated_at: serverTimestamp(),
        },
        { merge: true }
      );

      router.push("/app");
    } catch (err: any) {
      setError(err?.message || "Invalid login credentials");
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
            CleanCut AI account
          </div>

          <h1 className="mt-5 text-3xl font-bold text-white">Welcome back</h1>
          <p className="mt-3 text-slate-300">{subtitle}</p>

          <div className="mt-6 grid gap-3 text-sm text-slate-300">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
              ✔ No watermark exports
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
              ✔ Track your usage & credits
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
              ✔ Upgrade anytime for bigger batches
            </div>
          </div>

          <p className="mt-6 text-xs text-slate-400">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-indigo-300 hover:text-indigo-200">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-indigo-300 hover:text-indigo-200">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        {/* Right: form */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
          <h2 className="text-xl font-bold text-white">Sign in</h2>
          <p className="mt-2 text-sm text-slate-300">Access your CleanCut AI account.</p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="text-xs text-slate-300">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
              />
            </div>

            {error && (
              <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-200">
                {error}
              </div>
            )}

            <button
              disabled={loading}
              className="w-full rounded-full bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-500/20 hover:bg-indigo-600 disabled:bg-slate-700"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <p className="text-slate-400">
                Don’t have an account?{" "}
                <Link href="/signup" className="text-indigo-300 hover:text-indigo-200">
                  Sign up
                </Link>
              </p>
              <Link href="/contact" className="text-indigo-300 hover:text-indigo-200">
                Need help?
              </Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
