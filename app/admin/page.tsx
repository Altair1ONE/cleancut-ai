// app/admin/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../components/AuthProvider";
import { apiPath } from "../../lib/apiPath";

export const dynamic = "force-dynamic";

type PlanId = "free" | "pro_monthly" | "lifetime";

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

export default function AdminPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [rows, setRows] = useState<AdminUserRow[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const adminEmails = useMemo(() => {
    const raw = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "";
    return raw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
  }, []);

  const isAdminByEmail = useMemo(() => {
    const email = (user?.email || "").toLowerCase();
    return !!email && adminEmails.includes(email);
  }, [user?.email, adminEmails]);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  async function loadUsers() {
    if (!user) return;

    setStatus("loading");
    setError(null);

    try {
      const token = await user.getIdToken();

      const url = apiPath("/api/admin/users/list");
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`Failed to load admin users (HTTP ${res.status}). URL: ${url}\n${txt}`);
      }

      const json = await res.json();
      setRows(json.rows || []);
      setStatus("idle");
    } catch (e: any) {
      setStatus("error");
      setError(e?.message || "Failed to load admin users.");
    }
  }

  async function updateUser(uid: string, patch: any) {
    if (!user) return;

    setError(null);
    try {
      const token = await user.getIdToken();

      const url = apiPath("/api/admin/users/update");
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid, ...patch }),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`Update failed (HTTP ${res.status}). URL: ${url}\n${txt}`);
      }

      await loadUsers();
    } catch (e: any) {
      setError(e?.message || "Update failed.");
    }
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return;
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user?.uid]);

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

  if (!isAdminByEmail) {
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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-slate-300">
            View users + manually set plan/credits.
          </p>
        </div>

        <button
          onClick={loadUsers}
          className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200 whitespace-pre-wrap">
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
                  <th className="py-2 pr-4">Verified</th>
                  <th className="py-2 pr-4">Updated</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>

              <tbody className="text-slate-200">
                {rows.map((r) => (
                  <tr key={r.uid} className="border-b border-slate-900 align-top">
                    <td className="py-2 pr-4">{r.email || "-"}</td>
                    <td className="py-2 pr-4 text-slate-400">{r.uid}</td>

                    <td className="py-2 pr-4">
                      <select
                        defaultValue={(r.plan_id as PlanId) || "free"}
                        className="rounded-xl border border-slate-700 bg-slate-950/60 px-2 py-1 text-sm text-white"
                        onChange={(e) => updateUser(r.uid, { plan_id: e.target.value })}
                      >
                        <option value="free">free</option>
                        <option value="pro_monthly">pro_monthly</option>
                        <option value="lifetime">lifetime</option>
                      </select>
                    </td>

                    <td className="py-2 pr-4">
                      <div className="flex items-center gap-2">
                        <input
                          defaultValue={r.credits_remaining ?? 0}
                          type="number"
                          min={0}
                          className="w-24 rounded-xl border border-slate-700 bg-slate-950/60 px-2 py-1 text-sm text-white"
                          onKeyDown={(ev) => {
                            if (ev.key === "Enter") {
                              const v = Number((ev.target as HTMLInputElement).value);
                              updateUser(r.uid, { credits_remaining: v });
                            }
                          }}
                        />
                        <button
                          className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 hover:border-slate-500"
                          onClick={() => {
                            const v = prompt("Add credits (can be negative):", "50");
                            if (v == null) return;
                            updateUser(r.uid, { add_credits: Number(v) });
                          }}
                        >
                          Add/Remove
                        </button>
                      </div>
                      <div className="mt-1 text-[11px] text-slate-500">
                        Press Enter to set exact credits
                      </div>
                    </td>

                    <td className="py-2 pr-4">
                      {r.email_verified === true ? "✅" : r.email_verified === false ? "❌" : "-"}
                    </td>

                    <td className="py-2 pr-4 text-slate-400">
                      {r.updated_at ? new Date(r.updated_at).toLocaleString() : "-"}
                    </td>

                    <td className="py-2 pr-4">
                      <button
                        className="rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-600"
                        onClick={() => loadUsers()}
                      >
                        Refresh
                      </button>
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
