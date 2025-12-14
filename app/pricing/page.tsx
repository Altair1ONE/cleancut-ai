import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Affordable background removal pricing. Free plan with no watermark, Pro Monthly for higher limits, and Lifetime for best value. CleanCut AI by Xevora.",
  alternates: {
    canonical: "https://xevora.org/cleancut/pricing",
  },
};

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    sub: "per month",
    badge: "Start here",
    features: [
      "No watermark",
      "Transparent PNG export",
      "Fast mode included",
      "Limited monthly credits",
      "Small batch size",
      "Quality mode (paid only)",
    ],
    cta: { label: "Try Free", href: "/app" },
  },
  {
    id: "pro",
    name: "Pro Monthly",
    price: "$4.99",
    sub: "per month",
    badge: "Most popular",
    highlight: true,
    features: [
      "Higher monthly credits",
      "Bigger batch processing",
      "Fast + Quality modes",
      "Priority processing",
      "HD export (Lifetime only • Coming soon)",
    ],
    cta: { label: "Upgrade (coming soon)", href: "/pricing#checkout" },
  },
  {
    id: "lifetime",
    name: "Lifetime",
    price: "$19.99",
    sub: "one-time",
    badge: "Best value",
    features: [
      "One-time payment",
      "Monthly credits forever",
      "Bigger batch processing",
      "Fast + Quality modes",
      "HD export (Coming soon)",
      "Best long-term savings",
    ],
    cta: { label: "Get Lifetime (coming soon)", href: "/pricing#checkout" },
  },
];

function JsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CleanCut AI",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        price: "0",
        priceCurrency: "USD",
        category: "subscription",
      },
      {
        "@type": "Offer",
        name: "Pro Monthly",
        price: "4.99",
        priceCurrency: "USD",
        category: "subscription",
      },
      {
        "@type": "Offer",
        name: "Lifetime",
        price: "19.99",
        priceCurrency: "USD",
        category: "one-time",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd />

      {/* HERO */}
      <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 md:p-12">
        <h1 className="text-3xl font-bold text-white md:text-5xl">
          Simple pricing that stays{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
            cheaper than alternatives
          </span>
        </h1>

        <p className="mt-4 max-w-3xl text-slate-300">
          CleanCut AI is built for creators and businesses who need clean
          background removal without watermarks. Start free, then upgrade only
          when you need bigger batches, higher limits, and faster processing.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/app"
            className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-600"
          >
            Try Free Now
          </Link>
          <Link
            href="/"
            className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500"
          >
            Back to Home
          </Link>
        </div>
      </section>

      {/* PLANS */}
      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.id}
            className={`rounded-3xl border p-6 ${
              p.highlight
                ? "border-indigo-500/60 bg-indigo-500/10 shadow-[0_25px_80px_rgba(99,102,241,0.15)]"
                : "border-slate-800 bg-slate-900/40"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-white">{p.name}</div>
                <div className="mt-1 text-3xl font-bold text-white">
                  {p.price}
                  <span className="ml-2 text-sm font-medium text-slate-400">
                    {p.sub}
                  </span>
                </div>
              </div>
              <div
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  p.highlight
                    ? "bg-indigo-500 text-white"
                    : "bg-slate-800 text-slate-200"
                }`}
              >
                {p.badge}
              </div>
            </div>

            <ul className="mt-5 space-y-2 text-sm text-slate-300">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-green-400">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href={p.cta.href}
              className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold ${
                p.highlight
                  ? "bg-indigo-500 text-white hover:bg-indigo-600"
                  : "border border-slate-700 text-slate-200 hover:border-slate-500"
              }`}
            >
              {p.cta.label}
            </Link>

            {p.id !== "free" && (
              <p className="mt-3 text-xs text-slate-400">
                Checkout is coming soon. Once payments go live, your plan will
                upgrade automatically.
              </p>
            )}
          </div>
        ))}
      </section>

      {/* COMPARISON */}
      <section className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
        <h2 className="text-xl font-semibold text-white">
          Why CleanCut AI is a smarter deal
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-slate-300">
          Many background removers charge more per image or place limits behind
          watermarks. CleanCut AI keeps it simple: no watermark, clear credit
          limits, and affordable upgrades.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
            <h3 className="text-sm font-semibold text-white">
              No watermark (even free)
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Your exports are clean and usable from day one.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
            <h3 className="text-sm font-semibold text-white">
              Better for batches
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Built for real workflows like catalogs and product photos.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
            <h3 className="text-sm font-semibold text-white">
              Lifetime plan = best value
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              One-time payment for ongoing monthly credits.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">Pricing FAQ</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-sm font-semibold text-white">
              Do you add watermarks on the free plan?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              No. CleanCut AI never adds watermarks, even on the free tier.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-sm font-semibold text-white">
              What are credits?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Each processed image costs credits. Quality mode costs more
              credits per image. Credits reset monthly based on your plan.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-sm font-semibold text-white">
              Can I upgrade later?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Yes. You can start free and upgrade when you need bigger batches,
              more credits, and higher limits.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-sm font-semibold text-white">
              When will HD export be available?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              HD export requires heavier processing. It’s coming soon and will be
              included in the Lifetime plan.
            </p>
          </div>
        </div>
      </section>

      {/* Placeholder checkout section (for future payments) */}
      <section
        id="checkout"
        className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/40 p-8"
      >
        <h2 className="text-xl font-semibold text-white">
          Checkout (coming soon)
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-slate-300">
          This section will become a real checkout once we connect payments.
          For now, it’s a placeholder so the user journey feels complete.
        </p>
        <Link
          href="/app"
          className="mt-5 inline-flex rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-600"
        >
          Continue to App
        </Link>
      </section>
    </main>
  );
}
