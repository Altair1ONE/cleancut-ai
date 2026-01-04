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
      <div className="cc-container py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-[1.75rem] font-extrabold tracking-tight text-slate-900 md:text-[2.25rem]">
              Support
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Need help with CleanCut AI? Whether it’s a bug, billing question, or refund request,
              we’re here to help. The fastest way to reach us is email.
            </p>
          </div>

          <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600 md:block">
            Contact
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
          <div className="font-semibold text-slate-900">Typical response time</div>
          <div className="mt-1 text-slate-600">
            We usually reply within <span className="font-semibold text-slate-900">24–48 hours</span> (often faster).
          </div>
        </div>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          {/* Email card */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-900">Email support</h2>
            <p className="mt-2 text-sm text-slate-600">
              For refunds, billing, account help, and technical issues.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={mailto}
                className="rounded-2xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                Email support →
              </a>

              <button
                onClick={copyEmail}
                type="button"
                className="rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:border-slate-300"
              >
                Copy email
              </button>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Email: <span className="text-slate-700">{supportEmail}</span>
            </p>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
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
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-900">Quick links</h2>
            <p className="mt-2 text-sm text-slate-600">
              Policies, pricing, and common answers.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>
                <Link className="text-blue-700 hover:underline" href="/pricing">
                  Pricing & plans
                </Link>
              </li>
              <li>
                <Link className="text-blue-700 hover:underline" href="/refund">
                  Refund policy
                </Link>
              </li>
              <li>
                <Link className="text-blue-700 hover:underline" href="/privacy">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link className="text-blue-700 hover:underline" href="/terms">
                  Terms of service
                </Link>
              </li>
            </ul>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-900">Want to keep working?</div>
              <p className="mt-2 text-sm text-slate-700">
                You can continue removing backgrounds while you wait—your account and credits remain available.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/app"
                  className="rounded-2xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                >
                  Open the app
                </Link>
                <Link
                  href="/use-cases"
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:border-slate-300"
                >
                  Explore use cases
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
