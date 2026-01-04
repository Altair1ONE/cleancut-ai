"use client";

import { useAuth } from "./AuthProvider";

export default function WelcomeBar() {
  const { user } = useAuth();

  if (!user?.email) return null;

  const name = user.email.split("@")[0];

  return (
    <div className="border-b border-slate-200 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2">
        <div className="text-sm text-slate-600">
          Welcome back,{" "}
          <span className="font-semibold text-slate-900">{name}</span> 👋
        </div>

        <div className="hidden text-xs text-slate-500 md:block">
          Tip: Quality mode is available on paid plans for cleaner edges.
        </div>
      </div>
    </div>
  );
}
