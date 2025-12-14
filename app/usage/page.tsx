"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../components/AuthProvider";
import { supabase } from "../../lib/supabaseClient";

type UsageRow = {
  id: number;
  email: string | null;
  plan_id: string | null;
  mode: string | null;
  images_count: number;
  credits_spent: number;
  created_at: string;
};

export default function UsagePage() {
  const router = useRouter();
  const { session, loading, user } = useAuth();

  const [rows, setRows] = useState<UsageRow[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !session) router.push("/login");
  }, [loading, session, router]);

  useEffect(() => {
    async function load() {
      if (!user) return;

      setStatus("loading");
      setError(null);

      try {
        const { data, error } = await supabase
          .from("usage_events")
          .select("id,email,plan_id,mode,images_count,credits_spent,created_at")
          .order("created_at", { ascending: false })
          .limit(50);

        if (error) throw error;

        setRows((data || []) as UsageRow[]);
        setStatus("idle");
      } catch (e: any) {
        setStatus("error");
        setError(e?.message || "Failed to load usage history.");
      }
    }

    load();
  }, [user]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 text-sm text-slate-300">
        Loading…
      </div>
    );
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 text-sm text-slate-300">
        Redirecting…
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold text-white">My Usage</h1>
      <p className="mt-2 text-sm text-slate-300">
        Your latest processing history (last 50 events).
      </p>

      {error && (
        <div className="mt-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">
          {error}
        </div>
      )}

      <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
        {status === "loading" ? (
          <div className="text-sm text-slate-300">Loading usage…</div>
        ) : rows.length === 0 ? (
          <div className="text-sm text-slate-300">
            No usage events yet. Process an image in the App and come back.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-slate-300">
                <tr className="border-b border-slate-800">
                  <th className="py-2 pr-4">Time</th>
                  <th className="py-2 pr-4">Plan</th>
                  <th className="py-2 pr-4">Mode</th>
                  <th className="py-2 pr-4">Images</th>
                  <th className="py-2 pr-4">Credits</th>
                </tr>
              </thead>
              <tbody className="text-slate-200">
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-slate-900">
                    <td className="py-2 pr-4 text-slate-400">
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
    </main>
  );
}
