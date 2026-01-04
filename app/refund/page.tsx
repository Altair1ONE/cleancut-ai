import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Refund Policy for CleanCut AI by Xevora. Learn eligibility, timelines, and how to request a refund for subscriptions or lifetime purchases.",
  alternates: { canonical: "https://xevora.org/cleancut/refund" },
};

export default function RefundPage() {
  return (
    <main className="relative mx-auto max-w-4xl px-4 py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
        <h1 className="text-3xl font-bold text-white">Refund Policy</h1>

        <p className="mt-4 text-slate-300">
          We want CleanCut AI to be straightforward and fair. This Refund Policy explains when refunds may be available and how to request one.
        </p>

        <div className="mt-8 space-y-6 text-slate-300">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-5">
            <h2 className="text-xl font-semibold text-white">1. Free plan</h2>
            <p className="mt-2">The free plan is provided at no cost and is not eligible for refunds.</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-5">
            <h2 className="text-xl font-semibold text-white">2. Subscriptions</h2>
            <p className="mt-2">
              If a technical issue prevents you from using the service as described, you may request a refund within 7 days of purchase.
              We may ask for details to help verify the issue.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-5">
            <h2 className="text-xl font-semibold text-white">3. Non-refundable cases</h2>
            <p className="mt-2">
              Refunds are generally not provided for unused credits, partial usage, or changes of mind.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-5">
            <h2 className="text-xl font-semibold text-white">4. Lifetime purchases</h2>
            <p className="mt-2">
              Lifetime purchases may be refundable within 7 days if the service fails to function as described.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-5">
            <h2 className="text-xl font-semibold text-white">5. How to request a refund</h2>
            <p className="mt-2">
              Contact support with your purchase email and a short explanation of the issue. We’ll review and respond as quickly as possible.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
