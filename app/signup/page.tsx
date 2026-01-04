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
    <main className="cc-bg">
      <div className="cc-container py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left: value */}
          <section className="cc-card-soft p-8">
            <div className="cc-pill">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              <span className="ml-2">Start free</span>
            </div>

            <h1 className="mt-5">Create your account</h1>
            <p className="mt-3 text-slate-600">
              Get instant access to background removal, transparent PNG exports, and your usage history.
            </p>

            <div className="mt-6 grid gap-3 text-sm text-slate-700">
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-3">
                ✔ Free tier available
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-3">
                ✔ No watermark exports
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-3">
                ✔ Upgrade when you need more
              </div>
            </div>

            <p className="mt-6 text-xs text-slate-500">
              You’ll be asked to verify your email after signup.
            </p>
          </section>

          {/* Right: form */}
          <section className="cc-card p-8">
            <h2 className="text-[1.25rem] font-semibold text-slate-900">Sign up</h2>
            <p className="mt-2 text-sm text-slate-600">
              Sign up to access plans and manage your credits.
            </p>

            <form onSubmit={handleSignup} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">Email</label>
                <input
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <input
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <p className="mt-2 text-xs text-slate-500">Minimum 6 characters.</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/70 p-4">
                <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  <span>
                    I have read and agree to the{" "}
                    <Link href="/terms" className="font-semibold text-blue-700 hover:text-blue-800">
                      Terms of Service
                    </Link>
                    ,{" "}
                    <Link href="/privacy" className="font-semibold text-blue-700 hover:text-blue-800">
                      Privacy Policy
                    </Link>
                    , and{" "}
                    <Link href="/refund" className="font-semibold text-blue-700 hover:text-blue-800">
                      Refund Policy
                    </Link>
                    .
                  </span>
                </label>
              </div>

              {err && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                  {err}
                </div>
              )}

              <button type="submit" disabled={loading || !agree} className="cc-btn-primary w-full disabled:opacity-60">
                {loading ? "Creating account..." : "Create account"}
              </button>

              <p className="text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-blue-700 hover:text-blue-800">
                  Sign in
                </Link>
              </p>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}