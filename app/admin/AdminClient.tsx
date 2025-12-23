"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../components/AuthProvider";

type UsageRow = {
  id: number;
  email: string | null;
  plan_id: string | null;
  mode: string | null;
  images_count: number;
  credits_spent: number;
  created_at: string;
};

// UI-only allowlist (not security) — real security is enforced server-side in /api/admin/credits
const FALLBACK_ADMIN_EMAILS = ["inbox2hammad@gmail.com"];

function parseAdminEmails(raw: string) {
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

function isAdminEmail(email?: string | null) {
  const envRaw = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "";
  const allowedFromEnv = parseAdminEmails(envRaw);
  const allowed = allowedFromEnv.length ? allowedFromEnv : FALLBACK_ADMIN_EMAILS;
  return !!email && allowed.includes(email.trim().toLowerCase());
}

export default function AdminClient() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [rows, setRows] = useState<UsageRow[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  // Credit override states
  const [targetUserId, setTargetUserId] = useState("");
  const [action, setAction] = useState<"add" | "deduct" | "set">("add");
  const [amount, setAmount] = useState<number>(30);
  const [planId, setPlanId] = useState<string>(""); // optional
  const [adminResult, setAdminResult] = useState<any>(null);
  const [adminBusy, setAdminBusy] = useState(false);

  const adminOk = useMemo(() => isAdminEmail(user?.email), [user?.email]);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  if (loading) {
    return <div className="text-sm text-slate-300">Loading…</div>;
  }

  if (!user) {
    return <div className="text-sm text-slate-300">Redirecting…</div>;
  }

  if (!adminOk) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 text-sm text-slate-300">
        <div className="text-white font-semibold">Access denied</div>
        <div className="mt-2">Your email is not allowed to view this page.</div>
        <button
          onClick={() => router.push("/")}
          className="mt-5 rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500"
        >
          Go back
        </button>
      </div>
    );
  }

  async function loadLatestUsage(targetEmail?: string) {
    setError(null);
    setStatus("loading");
    try {
      let q = supabase
        .from("usage_events")
        .select("id,email,plan_id,mode,images_count,credits_spent,created_at")
        .order("created_at", { ascending: false })
        .limit(100);

      if (targetEmail && targetEmail.trim()) {
        q = q.ilike("email", `%${targetEmail.trim()}%`);
      }

      const { data, error } = await q;
      if (error) throw error;

      setRows((data || []) as UsageRow[]);
      setStatus("idle");
    } catch (e: any) {
      setStatus("error");
      setError(e?.message || "Failed to load usage events");
    }
  }

  async function runCreditOverride() {
    setError(null);
    setAdminResult(null);

    if (!targetUserId.trim()) {
      setError("Please paste a target user_id (UUID).");
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      setError("Amount must be a positive number.");
      return;
    }

    setAdminBusy(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData?.session?.access_token;
      if (!accessToken) throw new Error("Missing access token");

      const res = await fetch("api/admin/credits", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: targetUserId.trim(),
          action,
          amount,
          planId: planId.trim() ? planId.trim() : null,
        }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(json?.error || `Admin request failed (${res.status})`);
      }

      setAdminResult(json);
    } catch (e: any) {
      setError(e?.message || "Admin action failed");
    } finally {
      setAdminBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-slate-300">
          Paddle still awards credits automatically on successful payment. This admin panel is only
          for support: manual credit adjustments, fixing failed transactions, and controlled plan overrides.
        </p>
      </section>

      {/* Credit Override Panel */}
      <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-lg font-semibold text-white">Credit override panel</h2>
        <p className="mt-2 text-sm text-slate-300">
          Use this only when needed (failed transaction / bonus credits). This is enforced server-side
          by <code className="text-slate-200">ADMIN_EMAILS</code>.
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-xs text-slate-400">Target user_id (UUID)</label>
            <input
              value={targetUserId}
              onChange={(e) => setTargetUserId(e.target.value)}
              placeholder="e.g. 3f5c6a7e-9b1a-4b2e-9f01-..."
              className="mt-1 w-full rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-2 text-sm text-slate-100 outline-none focus:border-slate-600"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400">Action</label>
            <select
              value={action}
              onChange={(e) => setAction(e.target.value as any)}
              className="mt-1 w-full rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-2 text-sm text-slate-100 outline-none focus:border-slate-600"
            >
              <option value="add">Add credits</option>
              <option value="deduct">Deduct credits</option>
              <option value="set">Set credits to exact value</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-1 w-full rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-2 text-sm text-slate-100 outline-none focus:border-slate-600"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400">Optional plan override</label>
            <input
              value={planId}
              onChange={(e) => setPlanId(e.target.value)}
              placeholder="free | pro_monthly | lifetime (optional)"
              className="mt-1 w-full rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-2 text-sm text-slate-100 outline-none focus:border-slate-600"
            />
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={runCreditOverride}
            disabled={adminBusy}
            className="rounded-full bg-indigo-500 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-600 disabled:opacity-60"
          >
            {adminBusy ? "Applying…" : "Apply"}
          </button>

          <button
            onClick={() => {
              setTargetUserId("");
              setPlanId("");
              setAmount(30);
              setAction("add");
              setAdminResult(null);
              setError(null);
            }}
            className="rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500"
          >
            Reset
          </button>
        </div>

        {error && <div className="mt-3 text-sm text-rose-400">{error}</div>}

        {adminResult && (
          <pre className="mt-4 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-xs text-slate-200">
{JSON.stringify(adminResult, null, 2)}
          </pre>
        )}
      </section>

      {/* Usage viewer */}
      <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-lg font-semibold text-white">Usage events (latest 100)</h2>

        <div className="mt-4 flex flex-wrap gap-3">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Filter by user email (optional)"
            className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-2 text-sm text-slate-100 outline-none focus:border-slate-600"
          />
          <button
            onClick={() => loadLatestUsage(email)}
            className="rounded-full bg-indigo-500 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-600"
          >
            {status === "loading" ? "Loading…" : "Load usage"}
          </button>
          <button
            onClick={() => {
              setEmail("");
              loadLatestUsage("");
            }}
            className="rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500"
          >
            Clear
          </button>
        </div>

        {rows.length === 0 ? (
          <p className="mt-3 text-sm text-slate-300">
            No events yet. Process an image while logged in to generate analytics.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-slate-300">
                <tr className="border-b border-slate-800">
                  <th className="py-2 pr-4">Time</th>
                  <th className="py-2 pr-4">Email</th>
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
                    <td className="py-2 pr-4">{r.email || "-"}</td>
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
      </section>
    </div>
  );
}
