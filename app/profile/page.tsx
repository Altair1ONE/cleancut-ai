"use client";

import { useAuth } from "../../components/AuthProvider";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="cc-bg">
        <div className="cc-container py-10">
          <div className="cc-card p-6 text-sm text-slate-600">Loading…</div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="cc-bg">
        <div className="cc-container py-10">
          <div className="cc-card p-6 text-sm text-slate-600">You’re not signed in.</div>
        </div>
      </main>
    );
  }

  return (
    <main className="cc-bg">
      <div className="cc-container py-10">
        <div className="cc-card p-6 md:p-8">
          <div className="cc-pill">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            <span className="ml-2">Account</span>
          </div>

          <h1 className="mt-4 text-[1.75rem] font-semibold text-slate-900">Profile</h1>
          <p className="mt-2 text-sm text-slate-600">Your account details.</p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700">Email</label>
              <input
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
                value={user.email ?? ""}
                disabled
                readOnly
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700">User ID</label>
              <input
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
                value={user.uid}
                disabled
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}