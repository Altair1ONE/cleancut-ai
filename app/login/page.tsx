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
    <main className="cc-bg">
      <div className="cc-container py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left: value */}
          <section className="cc-card-soft p-8">
            <div className="cc-pill">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              <span className="ml-2">CleanCut AI account</span>
            </div>

            <h1 className="mt-5">Welcome back</h1>
            <p className="mt-3 text-slate-600">{subtitle}</p>

            <div className="mt-6 grid gap-3 text-sm text-slate-700">
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-3">
                ✔ No watermark exports
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-3">
                ✔ Track your usage & credits
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-3">
                ✔ Upgrade anytime for bigger batches
              </div>
            </div>

            <p className="mt-6 text-xs text-slate-500">
              By signing in, you agree to our{" "}
              <Link href="/terms" className="text-blue-700 hover:text-blue-800">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-blue-700 hover:text-blue-800">
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          {/* Right: form */}
          <section className="cc-card p-8">
            <h2 className="text-[1.25rem] font-semibold text-slate-900">Sign in</h2>
            <p className="mt-2 text-sm text-slate-600">Access your CleanCut AI account.</p>

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              {error && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                  {error}
                </div>
              )}

              <button disabled={loading} className="cc-btn-primary w-full">
                {loading ? "Signing in..." : "Sign in"}
              </button>

              <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <p className="text-slate-600">
                  Don’t have an account?{" "}
                  <Link href="/signup" className="font-semibold text-blue-700 hover:text-blue-800">
                    Sign up
                  </Link>
                </p>
                <Link href="/contact" className="font-semibold text-blue-700 hover:text-blue-800">
                  Need help?
                </Link>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}