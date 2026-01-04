"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../components/AuthProvider";

// Firebase client DB (you should already have this in your firebase client file)
import { db } from "../../lib/firebaseClient";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";

type UsageRow = {
  id: string; // firestore doc id
  plan_id: string | null;
  mode: string | null;
  images_count: number;
  credits_spent: number;
  created_at: string; // ISO string for UI
};

function toIsoStringSafe(v: any): string {
  // Firestore Timestamp
  if (v instanceof Timestamp) return v.toDate().toISOString();
  // Serialized timestamp-like object
  if (v?.seconds && typeof v.seconds === "number") {
    return new Date(v.seconds * 1000).toISOString();
  }
  // ISO already
  if (typeof v === "string") return v;
  // Date
  if (v instanceof Date) return v.toISOString();
  // fallback
  return new Date().toISOString();
}

export default function UsagePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [rows, setRows] = useState<UsageRow[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const uid = user?.uid ?? null;

  // Redirect if not signed in (Firebase)
  useEffect(() => {
    if (!loading && !uid) router.push("/login");
  }, [loading, uid, router]);

  useEffect(() => {
    async function load() {
      if (!uid) return;

      setStatus("loading");
      setError(null);

      try {
        // Recommended path: users/{uid}/usage_events
        const q = query(
          collection(db, "users", uid, "usage_events"),
          orderBy("created_at", "desc"),
          limit(50)
        );

        const snap = await getDocs(q);

        const mapped: UsageRow[] = snap.docs.map((doc) => {
          const d = doc.data() as any;

          return {
            id: doc.id,
            plan_id: d.plan_id ?? null,
            mode: d.mode ?? null,
            images_count: Number(d.images_count ?? 0),
            credits_spent: Number(d.credits_spent ?? 0),
            created_at: toIsoStringSafe(d.created_at),
          };
        });

        setRows(mapped);
        setStatus("idle");
      } catch (e: any) {
        setStatus("error");
        setError(e?.message || "Failed to load usage history.");
      }
    }

    load();
  }, [uid]);

  const title = useMemo(() => {
    if (loading) return "Loading…";
    if (!uid) return "Redirecting…";
    return "My Usage";
  }, [loading, uid]);

  if (loading) {
    return (
      <main className="cc-bg">
        <div className="cc-container py-10 text-sm text-slate-600">{title}</div>
      </main>
    );
  }

  if (!uid) {
    return (
      <main className="cc-bg">
        <div className="cc-container py-10 text-sm text-slate-600">{title}</div>
      </main>
    );
  }

  return (
    <main className="cc-bg">
      <div className="cc-container py-10">
        <div className="cc-card p-6 md:p-8">
          <div className="cc-pill">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            <span className="ml-2">Usage</span>
          </div>

          <h1 className="mt-4 text-[1.75rem] font-semibold text-slate-900">My Usage</h1>
          <p className="mt-2 text-sm text-slate-600">
            Your latest processing history (last 50 events).
          </p>

          {error && (
            <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
              {error}
            </div>
          )}

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white/70 p-4">
            {status === "loading" ? (
              <div className="text-sm text-slate-600">Loading usage…</div>
            ) : rows.length === 0 ? (
              <div className="text-sm text-slate-600">
                No usage events yet. Process an image in the App and come back.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="text-slate-600">
                    <tr className="border-b border-slate-200">
                      <th className="py-2 pr-4">Time</th>
                      <th className="py-2 pr-4">Plan</th>
                      <th className="py-2 pr-4">Mode</th>
                      <th className="py-2 pr-4">Images</th>
                      <th className="py-2 pr-4">Credits</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-800">
                    {rows.map((r) => (
                      <tr key={r.id} className="border-b border-slate-100">
                        <td className="py-2 pr-4 text-slate-500">
                          {new Date(r.created_at).toLocaleString()}
                        </td>
                        <td className="py-2 pr-4">{r.plan_id || "-"}</td>
                        <td className="py-2 pr-4">{r.mode || "-"}</td>
                        <td className="py-2 pr-4">{r.images_count}</td>
                        <td className="py-2 pr-4">{r.credits_spent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mt-6 text-xs text-slate-500">
            Tip: credits update instantly after processing and purchases.
          </div>
        </div>
      </div>
    </main>
  );
}