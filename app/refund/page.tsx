import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Refund Policy for CleanCut AI by Xevora. Learn when refunds are available and how they are handled.",
};

export default function RefundPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Refund Policy</h1>

      <p className="mt-4 text-slate-300">
        CleanCut AI aims to provide a reliable and transparent service. This
        Refund Policy explains when refunds may be issued.
      </p>

      <section className="mt-8 space-y-4 text-slate-300">
        <h2 className="text-xl font-semibold text-white">1. Free Plan</h2>
        <p>
          The free plan is provided at no cost and is not eligible for refunds.
        </p>

        <h2 className="text-xl font-semibold text-white">2. Paid Subscriptions</h2>
        <p>
          If you experience a technical issue that prevents you from using the
          service as described, you may request a refund within 7 days of
          purchase.
        </p>

        <h2 className="text-xl font-semibold text-white">3. Non-Refundable Cases</h2>
        <p>
          Refunds are generally not provided for unused credits, partial usage,
          or changes of mind.
        </p>

        <h2 className="text-xl font-semibold text-white">4. Lifetime Plans</h2>
        <p>
          Lifetime purchases are refundable only within 7 days if the service
          fails to function as described.
        </p>

        <h2 className="text-xl font-semibold text-white">5. How to Request a Refund</h2>
        <p>
          To request a refund, please contact us with your purchase details and
          reason for the request.
        </p>
      </section>
    </main>
  );
}
