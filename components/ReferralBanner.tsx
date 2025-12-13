// components/ReferralBanner.tsx
"use client";

import { useState } from "react";

export function ReferralBanner() {
  const [copied, setCopied] = useState(false);

  const url =
    typeof window !== "undefined"
      ? window.location.origin + "/app?ref=my-future-ref-code"
      : "https://your-domain.com/app?ref=my-future-ref-code";

  function copyLink() {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="card p-4 text-xs text-slate-300">
      <h2 className="text-sm font-semibold text-white">
        Invite friends, grow your free credits (coming soon)
      </h2>
      <p className="mt-2">
        In the future, users will earn bonus credits for each friend who signs
        up via their link. For now, you can still share the app:
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          onClick={copyLink}
          className="rounded-full bg-brand px-3 py-1 text-[11px] font-semibold text-white hover:bg-brand-dark"
        >
          {copied ? "Copied!" : "Copy share link"}
        </button>
        <span className="text-[11px] text-slate-400">
          This will be wired into real referrals once auth + database are
          added.
        </span>
      </div>
    </section>
  );
}
