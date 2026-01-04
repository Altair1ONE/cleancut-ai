// app/pricing/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import PaddleCheckoutButton from "../../components/PaddleCheckoutButton";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "CleanCut AI pricing: start free with watermark-free exports. Upgrade to Pro Monthly for higher limits and Quality mode, or choose Lifetime for the best long-term value.",
  alternates: {
    canonical: "https://xevora.org/cleancut/pricing",
  },
};

type PlanCard = {
  id: "free" | "pro_monthly" | "lifetime";
  name: string;
  price: string;
  sub: string;
  badge: string;
  highlight?: boolean;
  creditsLabel: string;
  features: string[];
  pills: { label: string; tone?: "ok" | "info" | "soon" }[];
  cta: { label: string; href: string };
  note?: string;
};

const plans: PlanCard[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    sub: "to start",
    badge: "Try it now",
    creditsLabel: "30 credits total (one-time)",
    pills: [
      { label: "Fast mode", tone: "ok" },
      { label: "No watermark", tone: "ok" },
      { label: "Transparent PNG", tone: "ok" },
    ],
    features: [
      "Watermark-free exports",
      "Transparent PNG downloads",
      "Fast mode included",
      "One-time free credits (great for testing)",
      "Small batch size",
      "Quality mode available on paid plans",
    ],
    cta: { label: "Start Free", href: "/app" },
  },
  {
    id: "pro_monthly",
    name: "Pro Monthly",
    price: "$4.99",
    sub: "/ month",
    badge: "Most popular",
    highlight: true,
    creditsLabel: "1000 credits / month",
    pills: [
      { label: "Fast mode", tone: "ok" },
      { label: "Quality mode", tone: "info" },
      { label: "Bigger batches", tone: "ok" },
    ],
    features: [
      "1000 credits every month (auto-refill)",
      "Bigger batch processing",
      "Fast + Quality modes",
      "Batch uploads upto 20",
      "Priority processing",
      "Best for frequent product photos & content",
      "7-day free trial",
    ],
    cta: { label: "Upgrade", href: "/pricing#checkout" },
    note: "Fast costs 1 credit/image. Quality costs 2 credits/image.",
  },
  {
    id: "lifetime",
    name: "Lifetime",
    price: "$19.99",
    sub: "one-time",
    badge: "Best value",
    creditsLabel: "500 credits / month (forever)",
    pills: [
      { label: "Fast mode", tone: "ok" },
      { label: "Quality mode", tone: "info" },
      { label: "Great long-term value", tone: "ok" },
    ],
    features: [
      "One-time payment (no subscription)",
      "500 credits every month forever (auto-refill)",
      "Batch uploads upto 20",
      "Fast + Quality modes",
      "Perfect for steady monthly usage",
    ],
    cta: { label: "Get Lifetime", href: "/pricing#checkout" },
    note: "Lifetime gives monthly credits without a recurring subscription.",
  },
];

function Pill({ label, tone }: { label: string; tone?: "ok" | "info" | "soon" }) {
  const cls =
    tone === "ok"
      ? "border-emerald-600/25 bg-emerald-600/10 text-emerald-800"
      : tone === "info"
      ? "border-blue-600/25 bg-blue-600/10 text-blue-800"
      : "border-amber-600/25 bg-amber-600/10 text-amber-800";
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${cls}`}>
      {label}
    </span>
  );
}

function JsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CleanCut AI",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    offers: [
      { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD", category: "trial" },
      { "@type": "Offer", name: "Pro Monthly", price: "4.99", priceCurrency: "USD", category: "subscription" },
      { "@type": "Offer", name: "Lifetime", price: "19.99", priceCurrency: "USD", category: "one-time" },
    ],
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://xevora.org/cleancut",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Pricing",
        item: "https://xevora.org/cleancut/pricing",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
    </>
  );
}

export default function PricingPage() {
  return (
    <main className="cc-bg">
      <div className="cc-container relative py-12">
        <JsonLd />

        {/* HERO */}
        <section className="cc-card-soft p-8 md:p-12">
          <h1 className="text-slate-900">
            Pricing that’s{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              simple, fair, and made for real use
            </span>
          </h1>

          <p className="mt-4 max-w-3xl text-base text-slate-600">
            Start free with watermark-free exports. Upgrade when you need bigger
            batches, higher monthly limits, and Quality mode for sharper edges on
            complex subjects.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/app" className="cc-btn-primary">
              Try Free Now
            </Link>
            <Link href="/" className="cc-btn-secondary">
              Back to Home
            </Link>
          </div>
        </section>

        {/* PLANS */}
        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`relative overflow-hidden rounded-3xl border p-7 ${
                p.highlight
                  ? "border-blue-600/30 bg-white shadow-[0_30px_90px_rgba(37,99,235,0.18)]"
                  : "border-slate-200 bg-white shadow-[0_18px_55px_rgba(2,6,23,0.08)]"
              }`}
            >
              {p.highlight && (
                <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-blue-200/50 blur-2xl" />
              )}

              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-slate-900">{p.name}</div>
                  <div className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900">
                    {p.price}
                    <span className="ml-2 text-sm font-semibold text-slate-500">
                      {p.sub}
                    </span>
                  </div>
                  <div className="mt-2 text-sm font-semibold text-slate-700">
                    {p.creditsLabel}
                  </div>
                </div>

                <div
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    p.highlight ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {p.badge}
                </div>
              </div>

              {/* BADGES / PILLS */}
              <div className="relative mt-4 flex flex-wrap gap-2">
                {p.pills.map((x) => (
                  <Pill key={x.label} label={x.label} tone={x.tone} />
                ))}
              </div>

              <ul className="relative mt-5 space-y-2 text-sm text-slate-700">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-emerald-600">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {p.id === "free" ? (
                <Link
                  href={p.cta.href}
                  className={`relative mt-6 inline-flex w-full items-center justify-center rounded-2xl px-5 py-4 text-sm font-semibold ${
                    p.highlight
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "border border-slate-200 bg-white text-slate-900 hover:border-slate-300"
                  }`}
                >
                  {p.cta.label}
                </Link>
              ) : (
                <PaddleCheckoutButton
                  plan={p.id === "pro_monthly" ? "pro_monthly" : "lifetime"}
                  className={`relative mt-6 inline-flex w-full items-center justify-center rounded-2xl px-5 py-4 text-sm font-semibold ${
                    p.highlight
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "border border-slate-200 bg-white text-slate-900 hover:border-slate-300"
                  }`}
                >
                  {p.id === "pro_monthly" ? "Upgrade to Pro" : "Get Lifetime"}
                </PaddleCheckoutButton>
              )}

              {p.note && <p className="mt-3 text-xs text-slate-500">{p.note}</p>}

              {p.id !== "free" && (
                <p className="mt-3 text-xs text-slate-500">
                  Secure checkout via Paddle. Your plan and credits are applied automatically after payment.
                </p>
              )}
            </div>
          ))}
        </section>

        {/* COMPARISON */}
        <section className="mt-14 cc-card-soft p-8">
          <h2 className="text-slate-900">What you get with CleanCut AI</h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-600">
            Many tools lock exports behind watermarks or make pricing confusing.
            CleanCut AI keeps it straightforward: clean transparent PNGs, clear credit costs, and upgrades only when you need them.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Watermark-free exports</h3>
              <p className="mt-2 text-sm text-slate-600">
                Your results stay clean—ready for stores, ads, and design.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Batch-ready workflow</h3>
              <p className="mt-2 text-sm text-slate-600">
                Process collections and product sets without manual repetition.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Quality when it matters</h3>
              <p className="mt-2 text-sm text-slate-600">
                Upgrade for cleaner edges on hair, complex objects, and fine detail.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="text-slate-900">Pricing FAQ</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Do you add watermarks on the free plan?</h3>
              <p className="mt-2 text-sm text-slate-600">
                No. CleanCut AI never adds watermarks—even on the free tier.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">How do credits work?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Each processed image costs credits. Fast costs 1 credit/image.
                Quality costs 2 credits/image. Your monthly credits refill automatically on paid plans.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Can I upgrade later?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Yes. Start free and upgrade only when you need higher limits and Quality mode.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Will my plan apply automatically after payment?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Yes. Once checkout completes, your plan and credits are updated automatically.
              </p>
            </div>
          </div>
        </section>

        {/* Checkout anchor (keep structure) */}
        <section id="checkout" className="mt-14 cc-card-soft p-8">
          <h2 className="text-slate-900">Checkout</h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-600">
            Choose a plan above to open secure checkout. After payment, your account upgrades automatically and your credits are applied right away.
          </p>
          <Link href="/app" className="mt-6 inline-flex cc-btn-primary">
            Continue to App
          </Link>
        </section>
      </div>
    </main>
  );
}
