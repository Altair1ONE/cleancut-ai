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

  const adminEmails = useMemo(() => {
    const raw = process.env.NEXT_PUBLIC_ADMIN_EMAILS || process.env.ADMIN_EMAILS || "";
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

  // If not logged in, send to login
  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  // Load users for admins
  useEffect(() => {
    async function load() {
      if (loading) return;
      if (!user) return;
      if (!isAdmin) return;

      setStatus("loading");
      setError(null);

      try {
        // ✅ Most recent updated users first (if updated_at exists)
        // If your Firestore docs don’t have updated_at as sortable field,
        // remove orderBy() and it will still work.
        const q = query(
          collection(db, "users"),
          orderBy("updated_at", "desc"),
          limit(200)
        );

        const snap = await getDocs(q);

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
          };
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
  }, [loading, user, isAdmin]);

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

  if (!isAdmin) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
          <h1 className="text-xl font-bold text-white">Admin</h1>
          <p className="mt-2 text-sm text-slate-300">
            You don’t have access to this page.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
      <p className="mt-2 text-sm text-slate-300">
        Latest users (from Firestore <code className="text-slate-200">users</code>{" "}
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
                    <td className="py-2 pr-4 text-slate-200">
                      {r.email || "-"}
                    </td>
                    <td className="py-2 pr-4 text-slate-400">{r.uid}</td>
                    <td className="py-2 pr-4">{r.plan_id || "-"}</td>
                    <td className="py-2 pr-4">
                      {r.credits_remaining ?? "-"}
                    </td>
                    <td className="py-2 pr-4">
                      <div className="text-slate-200">
                        {r.paddle_status || "-"}
                      </div>
                      <div className="text-xs text-slate-500">
                        {r.paddle_subscription_id || ""}
                      </div>
                    </td>
                    <td className="py-2 pr-4 text-slate-400">
                      {r.updated_at ? new Date(r.updated_at).toLocaleString() : "-"}
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
