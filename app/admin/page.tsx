"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../components/AuthProvider";

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

function apiPath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  // ensure "/cleancut" + "/api/..." => "/cleancut/api/..."
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

async function authedFetch(user: any, path: string, init?: RequestInit) {
  const token = await user.getIdToken();
  const url = apiPath(path);

  return fetch(url, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });
}

export default function AdminPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [rows, setRows] = useState<AdminUserRow[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  // UI-only gate (real security is server route)
  const adminEmails = useMemo(() => {
    const raw = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "";
    return raw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
  }, []);

  const isAdminUi = useMemo(() => {
    const email = (user?.email || "").toLowerCase();
    return !!email && adminEmails.includes(email);
  }, [user?.email, adminEmails]);

  const isVerified = Boolean(user?.emailVerified);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (loading) return;
    if (!user) return;
    if (isVerified) return;

    const email = user.email || "";
    router.push(`/check-email?email=${encodeURIComponent(email)}`);
  }, [loading, user, isVerified, router]);

  async function load() {
    if (!user) return;
    setStatus("loading");
    setError(null);

    try {
      const res = await authedFetch(user, "/api/admin/users/list");
      const text = await res.text();
      const json = (() => {
        try {
          return JSON.parse(text);
        } catch {
          return { raw: text };
        }
      })();

      if (!res.ok) {
        throw new Error(
          json?.error ||
            `Failed to load admin users (HTTP ${res.status}). URL: ${apiPath(
              "/api/admin/users/list"
            )}`
        );
      }

      setRows((json.rows || []) as AdminUserRow[]);
      setStatus("idle");
    } catch (e: any) {
      setStatus("error");
      setError(e?.message || "Failed to load admin users");
    }
  }

  useEffect(() => {
    if (!user || loading) return;
    if (!isVerified) return;
    if (!isAdminUi) return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid, loading, isVerified, isAdminUi]);

  async function updateUser(uid: string, payload: any) {
    if (!user) return;
    setError(null);

    try {
      const res = await authedFetch(user, "/api/admin/users/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, ...payload }),
      });

      const text = await res.text();
      const json = (() => {
        try {
          return JSON.parse(text);
        } catch {
          return { raw: text };
        }
      })();

      if (!res.ok) throw new Error(json?.error || `Update failed (HTTP ${res.status})`);
      await load();
    } catch (e: any) {
      setError(e?.message || "Update failed");
    }
  }

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

  if (adminEmails.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
          <h1 className="text-xl font-bold text-white">Admin not configured</h1>
          <p className="mt-2 text-sm text-slate-300">
            <b>NEXT_PUBLIC_ADMIN_EMAILS</b> is not set.
          </p>
        </div>
      </main>
    );
  }

  if (!isAdminUi) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
          <h1 className="text-xl font-bold text-white">Admin</h1>
          <p className="mt-2 text-sm text-slate-300">You don’t have access.</p>
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
            API: <code className="text-slate-200">{apiPath("/api/admin/users/list")}</code>
          </p>
        </div>

        <button
          onClick={load}
          className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 hover:border-slate-500"
        >
          Refresh
        </button>
      </div>

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
                  <th className="py-2 pr-4">Actions</th>
                  <th className="py-2 pr-4">Paddle</th>
                  <th className="py-2 pr-4">Updated</th>
                </tr>
              </thead>

              <tbody className="text-slate-200">
                {rows.map((r) => (
                  <tr key={r.uid} className="border-b border-slate-900 align-top">
                    <td className="py-2 pr-4">{r.email || "-"}</td>
                    <td className="py-2 pr-4">
                      {r.email_verified === true ? "✅" : r.email_verified === false ? "❌" : "-"}
                    </td>
                    <td className="py-2 pr-4 text-slate-400">{r.uid}</td>
                    <td className="py-2 pr-4">{r.plan_id || "-"}</td>
                    <td className="py-2 pr-4">{r.credits_remaining ?? "-"}</td>

                    <td className="py-2 pr-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap gap-2">
                          {(["free", "pro_monthly", "lifetime"] as PlanId[]).map((p) => (
                            <button
                              key={p}
                              onClick={() => updateUser(r.uid, { action: "set_plan", planId: p })}
                              className="rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                            >
                              Set {p}
                            </button>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => updateUser(r.uid, { action: "add_credits", delta: 100 })}
                            className="rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                          >
                            +100
                          </button>
                          <button
                            onClick={() => updateUser(r.uid, { action: "add_credits", delta: 500 })}
                            className="rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                          >
                            +500
                          </button>
                          <button
                            onClick={() => updateUser(r.uid, { action: "set_credits", credits: 0 })}
                            className="rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-200 hover:border-slate-500"
                          >
                            Set 0
                          </button>
                        </div>
                      </div>
                    </td>

                    <td className="py-2 pr-4">
                      <div>{r.paddle_status || "-"}</div>
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
