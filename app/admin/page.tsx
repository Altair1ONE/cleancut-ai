// app/admin/page.tsx
"use client";

import { useMemo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../components/AuthProvider";
import { db } from "../../lib/firebaseClient";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";

// ✅ Prevent SSG/prerender assumptions for admin dashboards
export const dynamic = "force-dynamic";

type AdminUserRow = {
  uid: string;
  email: string | null;
  plan_id: string | null;
  credits_remaining: number | null;
  paddle_status: string | null;
  paddle_subscription_id: string | null;
  updated_at: string | null;
  email_verified: boolean | null;
};

function safeIso(v: any): string | null {
  if (!v) return null;

  // Firestore Timestamp
  if (v instanceof Timestamp) return v.toDate().toISOString();

  // string date
  if (typeof v === "string") {
    const d = new Date(v);
    return isNaN(d.getTime()) ? null : d.toISOString();
  }

  // Date
  if (v instanceof Date) return v.toISOString();

  // object with seconds/nanoseconds
  if (typeof v === "object" && typeof v.seconds === "number") {
    return new Date(v.seconds * 1000).toISOString();
  }

  return null;
}

export default function AdminPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [rows, setRows] = useState<AdminUserRow[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  // ✅ IMPORTANT: client pages should use NEXT_PUBLIC_* only
  const adminEmails = useMemo(() => {
    const raw = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "";
    return raw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
  }, []);

  const isAdmin = useMemo(() => {
    const email = (user?.email || "").toLowerCase();
    if (!email) return false;
    return adminEmails.includes(email);
  }, [user?.email, adminEmails]);

  const isVerified = Boolean(user?.emailVerified);

  // ✅ If not logged in -> login
  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  // ✅ If logged in but not verified -> send them to check-email
  useEffect(() => {
    if (loading) return;
    if (!user) return;
    if (isVerified) return;

    const email = user.email || "";
    router.push(`/check-email?email=${encodeURIComponent(email)}`);
  }, [loading, user, isVerified, router]);

  // ✅ Load users for admins (with safe fallback if orderBy fails)
  useEffect(() => {
    async function load() {
      if (loading) return;
      if (!user) return;
      if (!isVerified) return;
      if (!isAdmin) return;

      setStatus("loading");
      setError(null);

      try {
        // Try ordered query first
        let snap;
        try {
          const q1 = query(
            collection(db, "users"),
            orderBy("updated_at", "desc"),
            limit(200)
          );
          snap = await getDocs(q1);
        } catch (orderErr) {
          // Fallback: no orderBy (works even if field missing / mixed types)
          const q2 = query(collection(db, "users"), limit(200));
          snap = await getDocs(q2);
        }

        const out: AdminUserRow[] = snap.docs.map((d) => {
          const data: any = d.data();
          return {
            uid: d.id,
            email: data?.email ?? null,
            plan_id: data?.plan_id ?? null,
            credits_remaining:
              typeof data?.credits_remaining === "number"
                ? data.credits_remaining
                : data?.credits_remaining != null
                ? Number(data.credits_remaining)
                : null,
            paddle_status: data?.paddle_status ?? null,
            paddle_subscription_id: data?.paddle_subscription_id ?? null,
            updated_at: safeIso(data?.updated_at),
            email_verified:
              typeof data?.email_verified === "boolean"
                ? data.email_verified
                : null,
          };
        });

        // If we had to fallback (no orderBy), let's sort locally by updated_at
        out.sort((a, b) => {
          const ta = a.updated_at ? new Date(a.updated_at).getTime() : 0;
          const tb = b.updated_at ? new Date(b.updated_at).getTime() : 0;
          return tb - ta;
        });

        setRows(out);
        setStatus("idle");
      } catch (e: any) {
        console.error(e);
        setStatus("error");
        setError(e?.message || "Failed to load admin data.");
      }
    }

    load();
  }, [loading, user, isAdmin, isVerified]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-300">
        Loading…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-300">
        Redirecting…
      </div>
    );
  }

  if (!isVerified) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
          <h1 className="text-xl font-bold text-white">Verify your email</h1>
          <p className="mt-2 text-sm text-slate-300">
            Please verify your email address to continue.
          </p>
        </div>
      </main>
    );
  }

  // ✅ Helpful debug if env not set
  if (adminEmails.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
          <h1 className="text-xl font-bold text-white">Admin not configured</h1>
          <p className="mt-2 text-sm text-slate-300">
            <b>NEXT_PUBLIC_ADMIN_EMAILS</b> is not set, so no one can pass the admin
            check.
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Set it in your .env.local / Vercel env to:
            <br />
            <code className="text-slate-200">
              NEXT_PUBLIC_ADMIN_EMAILS=inbox2hammad@gmail.com
            </code>
          </p>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
          <h1 className="text-xl font-bold text-white">Admin</h1>
          <p className="mt-2 text-sm text-slate-300">
            You don’t have access to this page.
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Signed in as: <span className="text-slate-200">{user.email}</span>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
      <p className="mt-2 text-sm text-slate-300">
        Latest users (Firestore <code className="text-slate-200">users</code>{" "}
        collection).
      </p>

      {error && (
        <div className="mt-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">
          {error}
        </div>
      )}

      <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
        {status === "loading" ? (
          <div className="text-sm text-slate-300">Loading users…</div>
        ) : rows.length === 0 ? (
          <div className="text-sm text-slate-300">No users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-slate-300">
                <tr className="border-b border-slate-800">
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">Verified</th>
                  <th className="py-2 pr-4">UID</th>
                  <th className="py-2 pr-4">Plan</th>
                  <th className="py-2 pr-4">Credits</th>
                  <th className="py-2 pr-4">Paddle</th>
                  <th className="py-2 pr-4">Updated</th>
                </tr>
              </thead>
              <tbody className="text-slate-200">
                {rows.map((r) => (
                  <tr key={r.uid} className="border-b border-slate-900">
                    <td className="py-2 pr-4">{r.email || "-"}</td>
                    <td className="py-2 pr-4">
                      {r.email_verified === true
                        ? "✅"
                        : r.email_verified === false
                        ? "❌"
                        : "-"}
                    </td>
                    <td className="py-2 pr-4 text-slate-400">{r.uid}</td>
                    <td className="py-2 pr-4">{r.plan_id || "-"}</td>
                    <td className="py-2 pr-4">{r.credits_remaining ?? "-"}</td>
                    <td className="py-2 pr-4">
                      <div>{r.paddle_status || "-"}</div>
                      <div className="text-xs text-slate-500">
                        {r.paddle_subscription_id || ""}
                      </div>
                    </td>
                    <td className="py-2 pr-4 text-slate-400">
                      {r.updated_at
                        ? new Date(r.updated_at).toLocaleString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
