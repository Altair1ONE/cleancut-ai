import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Refund Policy for CleanCut AI by Xevora. Learn eligibility, timelines, and how to request a refund for subscriptions or lifetime purchases.",
  alternates: { canonical: "https://xevora.org/cleancut/refund" },
};

export default function RefundPage() {
  return (
    <main className="cc-bg">
      <div className="cc-container py-10">
        <section className="card p-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
            Refund Policy
          </h1>

          <p className="mt-4 text-sm text-slate-600">
            We want CleanCut AI to be straightforward and fair. This Refund Policy explains when refunds may be available and how to request one.
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <h2 className="text-base font-semibold text-slate-900">1. Free plan</h2>
              <p className="mt-2 text-sm text-slate-700">
                The free plan is provided at no cost and is not eligible for refunds.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">2. Subscriptions</h2>
              <p className="mt-2 text-sm text-slate-700">
                If a technical issue prevents you from using the service as described, you may request a refund within 7 days of purchase.
                We may ask for details to help verify the issue.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">3. Non-refundable cases</h2>
              <p className="mt-2 text-sm text-slate-700">
                Refunds are generally not provided for unused credits, partial usage, or changes of mind.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">4. Lifetime purchases</h2>
              <p className="mt-2 text-sm text-slate-700">
                Lifetime purchases may be refundable within 7 days if the service fails to function as described.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">5. How to request a refund</h2>
              <p className="mt-2 text-sm text-slate-700">
                Contact support with your purchase email and a short explanation of the issue. We’ll review and respond as quickly as possible.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Contact support
            </Link>
            <Link
              href="/pricing"
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:border-slate-300"
            >
              View plans
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
