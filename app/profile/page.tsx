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
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
        <h1 className="text-xl font-bold text-white">Profile</h1>
        <p className="mt-2 text-sm text-slate-300">
          Your account details.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-xs text-slate-300">Email</label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-slate-300"
              value={user.email ?? ""}   // ✅ never null (fixes TS + build)
              disabled
              readOnly
            />
          </div>

          <div>
            <label className="text-xs text-slate-300">User ID</label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-slate-300"
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
