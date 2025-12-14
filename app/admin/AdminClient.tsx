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

// ✅ Fallback (so you never get locked out if env isn't injected properly)
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
    const envRaw = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "";
    const allowedFromEnv = parseAdminEmails(envRaw);
    const effectiveAllowed = allowedFromEnv.length
      ? allowedFromEnv
      : FALLBACK_ADMIN_EMAILS;

    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 text-sm text-slate-300">
        <div className="text-white font-semibold">Access denied</div>
        <div className="mt-2">
          Your email is not in{" "}
          <code className="text-slate-200">NEXT_PUBLIC_ADMIN_EMAILS</code>.
        </div>

        {/* ✅ Debug panel so you can see EXACTLY what's happening */}
        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-xs">
          <div className="text-slate-200 font-semibold mb-2">Debug</div>
          <div>
            <span className="text-slate-400">Logged-in email:</span>{" "}
            <span className="text-slate-100">{user.email ?? "(null)"}</span>
          </div>
          <div className="mt-1">
            <span className="text-slate-400">Env raw:</span>{" "}
            <span className="text-slate-100">
              {envRaw ? JSON.stringify(envRaw) : "(empty/undefined)"}
            </span>
          </div>
          <div className="mt-1">
            <span className="text-slate-400">Effective allow-list:</span>{" "}
            <span className="text-slate-100">
              {effectiveAllowed.join(", ")}
            </span>
          </div>

          <div className="mt-3 text-slate-400">
            If <b>Env raw</b> is empty, your Vercel env var isn’t being injected
            into the client build. In that case the fallback list is used.
          </div>
        </div>

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

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-slate-300">
          View user usage analytics (latest 100). Credit override panel will
          become fully active once credits are stored in Supabase (after Paddle
          automation).
        </p>

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

        {error && <div className="mt-3 text-sm text-rose-400">{error}</div>}
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-lg font-semibold text-white">Usage events</h2>

        {rows.length === 0 ? (
          <p className="mt-3 text-sm text-slate-300">
            No events yet. Process an image while logged in to generate
            analytics.
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

      <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-lg font-semibold text-white">
          Credit override panel (coming next)
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          After Paddle is connected, we’ll store credits & plan in Supabase per
          user and enable: manual credit top-up, plan switch, refund handling,
          and support bonuses — all from here.
        </p>
      </section>
    </div>
  );
}
