"use client";

import { useAuth } from "./AuthProvider";
import TrialPopup from "./TrialPopup";

export default function WelcomeBar() {
  const { user } = useAuth();

  if (!user?.email) return null;

  const name = user.email.split("@")[0];

  return (
    <>
      <div className="border-b border-slate-800 bg-slate-950/60">
        <div className="mx-auto max-w-7xl px-4 py-2 text-sm text-slate-300">
          Welcome back, <span className="font-semibold text-white">{name}</span> 👋
        </div>
      </div>

      {/* ✅ Trial CTA popup (free users only) */}
      <TrialPopup />
    </>
  );
}
