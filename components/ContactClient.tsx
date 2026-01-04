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
    <main className="cc-bg">
      <div className="cc-container py-12">
        <section className="cc-card p-8">
          <div className="cc-pill">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            <span className="ml-2">Support</span>
          </div>

          <h1 className="mt-4">Support</h1>
          <p className="mt-3 text-slate-600">
            Need help with CleanCut AI? Whether it’s a bug, billing question, or refund request,
            we’re here to help. The fastest way to reach us is email.
          </p>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm text-slate-700">
            <div className="font-semibold text-slate-900">Typical response time</div>
            <div className="mt-1 text-slate-700">
              We usually reply within <span className="font-semibold text-slate-900">24–48 hours</span> (often faster).
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {/* Email card */}
            <div className="cc-card-soft p-6">
              <h2 className="text-lg font-semibold text-slate-900">Email support</h2>
              <p className="mt-2 text-sm text-slate-600">
                For refunds, billing, account help, and technical issues.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <a href={mailto} className="cc-btn-primary">
                  Email support →
                </a>

                <button onClick={copyEmail} type="button" className="cc-btn-secondary">
                  Copy email
                </button>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                Email: <span className="text-slate-700">{supportEmail}</span>
              </p>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white/70 p-4">
                <div className="text-sm font-semibold text-slate-900">Before you email</div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  <li>
                    For <span className="font-semibold text-slate-900">refunds</span>, include your purchase email and date.
                  </li>
                  <li>
                    For <span className="font-semibold text-slate-900">billing</span>, mention the plan (Pro Monthly / Lifetime).
                  </li>
                  <li>
                    For <span className="font-semibold text-slate-900">bugs</span>, include steps + screenshot if possible.
                  </li>
                </ul>
              </div>
            </div>

            {/* Useful links card */}
            <div className="cc-card-soft p-6">
              <h2 className="text-lg font-semibold text-slate-900">Quick links</h2>
              <p className="mt-2 text-sm text-slate-600">
                Policies, pricing, and common answers.
              </p>

              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link className="font-semibold text-blue-700 hover:text-blue-800" href="/pricing">
                    Pricing & plans
                  </Link>
                </li>
                <li>
                  <Link className="font-semibold text-blue-700 hover:text-blue-800" href="/refund">
                    Refund policy
                  </Link>
                </li>
                <li>
                  <Link className="font-semibold text-blue-700 hover:text-blue-800" href="/privacy">
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link className="font-semibold text-blue-700 hover:text-blue-800" href="/terms">
                    Terms of service
                  </Link>
                </li>
              </ul>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white/70 p-4">
                <div className="text-sm font-semibold text-slate-900">Want to keep working?</div>
                <p className="mt-2 text-sm text-slate-700">
                  You can continue removing backgrounds while you wait—your account and credits remain available.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href="/app" className="cc-btn-primary">
                    Open the app
                  </Link>
                  <Link href="/use-cases" className="cc-btn-secondary">
                    Explore use cases
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}