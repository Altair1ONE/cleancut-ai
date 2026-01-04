"use client";

import Link from "next/link";

export default function ContactClient({ supportEmail }: { supportEmail: string }) {
  const mailto = `mailto:${supportEmail}?subject=${encodeURIComponent(
    "CleanCut AI Support"
  )}&body=${encodeURIComponent(
    "Hi Xevora team,\n\nTopic (choose one): Refund / Billing / Bug / Account / Other\n\nAccount email:\n\nWhat happened?\n\nSteps to reproduce (if bug):\n1)\n2)\n3)\n\nExpected result:\nActual result:\n\nScreenshot/recording link (optional):\n\nThanks!"
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
    <main className="relative mx-auto max-w-4xl px-4 py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1 text-xs text-slate-300">
          <span className="h-2 w-2 rounded-full bg-indigo-400" />
          Support
        </div>

        <h1 className="mt-4 text-3xl font-bold text-white">Support</h1>
        <p className="mt-3 text-slate-300">
          Need help with CleanCut AI? Whether it’s a bug, billing question, or refund request,
          we’re here to help. The fastest way to reach us is email.
        </p>

        <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/30 p-4 text-sm text-slate-300">
          <div className="font-semibold text-white">Typical response time</div>
          <div className="mt-1 text-slate-300">
            We usually reply within <span className="font-semibold text-white">24–48 hours</span> (often faster).
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {/* Email card */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950/30 p-6">
            <h2 className="text-lg font-semibold text-white">Email support</h2>
            <p className="mt-2 text-sm text-slate-300">
              For refunds, billing, account help, and technical issues.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={mailto}
                className="rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-500/20 hover:bg-indigo-600"
              >
                Email support →
              </a>

              <button
                onClick={copyEmail}
                type="button"
                className="rounded-full border border-slate-700 bg-slate-950/30 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:border-slate-500"
              >
                Copy email
              </button>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Email: <span className="text-slate-300">{supportEmail}</span>
            </p>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="text-sm font-semibold text-white">Before you email</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                <li>
                  For <span className="font-semibold text-white">refunds</span>, include your purchase email and date.
                </li>
                <li>
                  For <span className="font-semibold text-white">billing</span>, mention the plan (Pro Monthly / Lifetime).
                </li>
                <li>
                  For <span className="font-semibold text-white">bugs</span>, include steps + screenshot if possible.
                </li>
              </ul>
            </div>
          </div>

          {/* Useful links card */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950/30 p-6">
            <h2 className="text-lg font-semibold text-white">Quick links</h2>
            <p className="mt-2 text-sm text-slate-300">
              Policies, pricing, and common answers.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>
                <Link className="text-indigo-300 hover:text-indigo-200" href="/pricing">
                  Pricing & plans
                </Link>
              </li>
              <li>
                <Link className="text-indigo-300 hover:text-indigo-200" href="/refund">
                  Refund policy
                </Link>
              </li>
              <li>
                <Link className="text-indigo-300 hover:text-indigo-200" href="/privacy">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link className="text-indigo-300 hover:text-indigo-200" href="/terms">
                  Terms of service
                </Link>
              </li>
            </ul>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="text-sm font-semibold text-white">Want to keep working?</div>
              <p className="mt-2 text-sm text-slate-300">
                You can continue removing backgrounds while you wait—your account and credits remain available.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/app"
                  className="rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-600"
                >
                  Open the app
                </Link>
                <Link
                  href="/use-cases"
                  className="rounded-full border border-slate-700 bg-slate-950/30 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:border-slate-500"
                >
                  Explore use cases
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
