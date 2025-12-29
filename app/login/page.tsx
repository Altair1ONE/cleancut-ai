"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
    <main className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
        <h1 className="text-2xl font-bold text-white">Sign in</h1>
        <p className="mt-2 text-sm text-slate-300">Access your CleanCut AI account.</p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="text-xs text-slate-300">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
            />
          </div>

          {error && <p className="text-sm text-rose-400">{error}</p>}

          <button
            disabled={loading}
            className="w-full rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-600 disabled:bg-slate-700"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <p className="text-center text-sm text-slate-400">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-indigo-300 hover:text-indigo-200">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
