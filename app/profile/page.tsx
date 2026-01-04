"use client";

import { useAuth } from "../../components/AuthProvider";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 text-sm text-slate-300">
          Loading…
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 text-sm text-slate-300">
          You’re not signed in.
        </div>
      </main>
    );
  }

  return (
    <main className="relative mx-auto max-w-3xl px-4 py-10">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-72 w-[38rem] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1 text-xs text-slate-300">
          <span className="h-2 w-2 rounded-full bg-indigo-400" />
          Account
        </div>

        <h1 className="mt-4 text-2xl font-bold text-white">Profile</h1>
        <p className="mt-2 text-sm text-slate-300">Your account details.</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-xs text-slate-300">Email</label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-200"
              value={user.email ?? ""} // ✅ never null (fixes TS + build)
              disabled
              readOnly
            />
          </div>

          <div>
            <label className="text-xs text-slate-300">User ID</label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-200"
              value={user.uid}
              disabled
              readOnly
            />
          </div>
        </div>
      </div>
    </main>
  );
}
