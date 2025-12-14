"use client";

import Link from "next/link";

export default function ContactClient({ supportEmail }: { supportEmail: string }) {
  const mailto = `mailto:${supportEmail}?subject=${encodeURIComponent(
    "CleanCut AI Support / Inquiry"
  )}&body=${encodeURIComponent(
    "Hi Xevora team,\n\nI need help with:\n- (Refund / Billing / Bug / Question)\n\nDetails:\n- Account email:\n- Issue:\n- Screenshot link (optional):\n\nThanks!"
  )}`;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(supportEmail);
      alert("Support email copied!");
    } catch {
      alert(`Copy this email: ${supportEmail}`);
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Contact & Support</h1>
      <p className="mt-3 text-slate-300">
        Need help, want to request a refund, or have an inquiry? Contact us by
        email and we’ll get back to you.
      </p>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="text-lg font-semibold text-white">Email us</h2>
          <p className="mt-2 text-sm text-slate-300">
            For refunds, billing, bugs, or general questions.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={mailto}
              className="rounded-full bg-indigo-500 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-600"
            >
              Open email
            </a>

            <button
              onClick={copyEmail}
              type="button"
              className="rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500"
            >
              Copy email
            </button>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Email: <span className="text-slate-300">{supportEmail}</span>
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="text-lg font-semibold text-white">Useful links</h2>
          <p className="mt-2 text-sm text-slate-300">
            Policies and plan info.
          </p>

          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>
              <Link className="text-indigo-300 hover:text-indigo-200" href="/terms">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link className="text-indigo-300 hover:text-indigo-200" href="/privacy">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="text-indigo-300 hover:text-indigo-200" href="/refund">
                Refund Policy
              </Link>
            </li>
            <li>
              <Link className="text-indigo-300 hover:text-indigo-200" href="/pricing">
                Pricing
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
