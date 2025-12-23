import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Refund Policy for CleanCut AI by Xevora. Learn eligibility, timelines, and how to request a refund for subscriptions or lifetime purchases.",
  alternates: { canonical: "https://xevora.org/cleancut/refund" },
};

export default function RefundPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Refund Policy</h1>

      <p className="mt-4 text-slate-300">
        We want CleanCut AI to be straightforward and fair. This Refund Policy explains when refunds may be available and how to request one.
      </p>

      <section className="mt-8 space-y-4 text-slate-300">
        <h2 className="text-xl font-semibold text-white">1. Free plan</h2>
        <p>
          The free plan is provided at no cost and is not eligible for refunds.
        </p>

        <h2 className="text-xl font-semibold text-white">2. Subscriptions</h2>
        <p>
          If a technical issue prevents you from using the service as described, you may request a refund within 7 days of purchase.
          We may ask for details to help verify the issue.
        </p>

        <h2 className="text-xl font-semibold text-white">3. Non-refundable cases</h2>
        <p>
          Refunds are generally not provided for unused credits, partial usage, or changes of mind.
        </p>

        <h2 className="text-xl font-semibold text-white">4. Lifetime purchases</h2>
        <p>
          Lifetime purchases may be refundable within 7 days if the service fails to function as described.
        </p>

        <h2 className="text-xl font-semibold text-white">5. How to request a refund</h2>
        <p>
          Contact support with your purchase email and a short explanation of the issue. We’ll review and respond as quickly as possible.
        </p>
      </section>
    </main>
  );
}
