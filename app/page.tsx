import Link from "next/link";
import { SeoFaq } from "../components/SeoFaq";

function JsonLd() {
  const siteUrl = "https://xevora.org";
  const basePath = "/cleancut";

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CleanCut AI",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    url: `${siteUrl}${basePath}`,
    offers: [
      { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD" },
      { "@type": "Offer", name: "Pro Monthly", price: "4.99", priceCurrency: "USD" },
      { "@type": "Offer", name: "Lifetime", price: "19.99", priceCurrency: "USD" },
    ],
    publisher: { "@type": "Organization", name: "Xevora", url: siteUrl },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteUrl}${basePath}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </>
  );
}

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd />

      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900/40 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.35)] md:p-12">
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />

        <h1 className="text-3xl font-bold text-white md:text-5xl">
          AI Background Remover — Remove Background from Images Instantly{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
            (No Watermark)
          </span>
        </h1>

        <p className="mt-4 max-w-2xl text-base text-slate-300">
          CleanCut AI by Xevora is a fast online tool to{" "}
          <strong>remove backgrounds from images</strong> in seconds. Export{" "}
          <strong>transparent PNG</strong> results, process files in{" "}
          <strong>batch</strong>, and keep clean edges — perfect for e-commerce,
          creators, and businesses.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/app"
            className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(99,102,241,0.25)] hover:bg-indigo-600"
          >
            Remove Background Free
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500"
          >
            View Pricing
          </Link>
        </div>

        <div className="mt-6 grid gap-3 text-sm text-slate-300 sm:grid-cols-2 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
            ✔ No watermark (even free)
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
            ✔ Transparent PNG export
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
            ✔ Batch background removal
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
            ✔ Fast / Quality modes
          </div>
        </div>

        <p className="mt-5 text-sm text-slate-400">
          Need HD exports and bigger batches?{" "}
          <Link href="/pricing" className="text-indigo-300 hover:text-indigo-200">
            See plans
          </Link>{" "}
          or{" "}
          <Link href="/app" className="text-indigo-300 hover:text-indigo-200">
            try the remover now
          </Link>
          .
        </p>
      </section>

      {/* TRUST / VALUE */}
      <section className="mt-12 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <h2 className="text-sm font-semibold text-white">
            Clean Results That Preserve Image Quality
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Unlike many free background remover tools, CleanCut AI avoids heavy
            compression and never adds watermarks. Your output stays sharp and
            professional.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <h2 className="text-sm font-semibold text-white">
            Built for E-commerce & Real Workflows
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Remove backgrounds from product photos, portraits, and marketing
            images — one by one or in bulk. Works great for Shopify, Amazon,
            Etsy, and catalogs.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <h2 className="text-sm font-semibold text-white">
            Simple Pricing (Cheaper Than Alternatives)
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            CleanCut AI is designed to be affordable. Many users spend far less
            per image compared to popular tools like Remove.bg and ClipDrop.
          </p>
        </div>
      </section>

      {/* USE CASES */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-white">
          Best Use Cases for Background Removal
        </h2>

        <p className="mt-3 max-w-3xl text-sm text-slate-300">
          Whether you need a transparent PNG for design or clean product images
          for an online store, CleanCut AI helps you remove backgrounds quickly
          and consistently.
        </p>

        <ul className="mt-4 grid list-disc gap-2 pl-6 text-slate-300 md:grid-cols-2">
          <li>Product photos for Shopify, Amazon, and Etsy</li>
          <li>Marketing banners, ads, and landing pages</li>
          <li>Social media content and thumbnails</li>
          <li>Profile photos and portraits</li>
          <li>Bulk image cleanup for catalogs</li>
          <li>Transparent PNG assets for design work</li>
        </ul>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-white">
          How to Remove Backgrounds in 3 Simple Steps
        </h2>

        <ol className="mt-4 grid list-decimal gap-4 pl-6 text-slate-300 md:grid-cols-3">
          <li>
            Upload your image (PNG, JPG, or WEBP) — or drag &amp; drop multiple
            files for batch processing.
          </li>
          <li>
            Click <strong>Process</strong> and choose Fast or Quality mode based
            on your needs.
          </li>
          <li>
            Download your <strong>transparent PNG</strong> instantly — no
            watermark.
          </li>
        </ol>

        <div className="mt-6">
          <Link
            href="/app"
            className="inline-flex rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-600"
          >
            Start Removing Backgrounds
          </Link>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="mt-14 rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
        <h2 className="text-xl font-semibold text-white">
          Why Choose CleanCut AI by Xevora?
        </h2>

        <p className="mt-3 max-w-3xl text-sm text-slate-300">
          If you’re looking for a reliable AI background remover that’s fast,
          clean, and affordable, CleanCut AI is built for you.
        </p>

        <ul className="mt-4 space-y-2 text-slate-300">
          <li>• No watermark, even on the free plan</li>
          <li>• Supports batch background removal</li>
          <li>• Transparent PNG export</li>
          <li>• Fast mode for speed, Quality mode for details</li>
          <li>• Simple pricing with a lifetime option</li>
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/app"
            className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-600"
          >
            Try It Free
          </Link>
          <Link
            href="/pricing"
            className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500"
          >
            See Pricing
          </Link>
        </div>
      </section>

      {/* FAQ (VISIBLE) */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-white">
          Frequently Asked Questions
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-sm font-semibold text-white">
              Is CleanCut AI really free?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Yes. You can remove backgrounds for free without watermarks.
              Monthly usage limits apply to keep the service fast and available.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-sm font-semibold text-white">
              Does it reduce image quality?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              CleanCut AI is designed to preserve quality. For the best edges
              (hair, complex objects), use Quality mode when available.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-sm font-semibold text-white">
              Can I remove backgrounds in bulk?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Yes. Batch background removal is supported, with larger batch sizes
              available on paid plans.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-sm font-semibold text-white">
              Do you add watermarks?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              No. CleanCut AI never adds watermarks — even on the free tier.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold text-white">Popular use cases</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <Link
            className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 hover:border-slate-600"
            href="/cleancut/use-cases/shopify-product-photos"
          >
            <div className="text-sm font-semibold text-white">
              Shopify product photos
            </div>
            <p className="mt-1 text-sm text-slate-300">
              Remove backgrounds for listings & catalogs.
            </p>
          </Link>
          <Link
            className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 hover:border-slate-600"
            href="/cleancut/use-cases/amazon-listing-images"
          >
            <div className="text-sm font-semibold text-white">Amazon listings</div>
            <p className="mt-1 text-sm text-slate-300">
              Clean subject isolation for marketplace images.
            </p>
          </Link>
          <Link
            className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 hover:border-slate-600"
            href="/cleancut/use-cases/youtube-thumbnails"
          >
            <div className="text-sm font-semibold text-white">
              YouTube thumbnails
            </div>
            <p className="mt-1 text-sm text-slate-300">
              Make faces pop with transparent PNG exports.
            </p>
          </Link>
        </div>
      </section>

      {/* SEO FAQ SCHEMA */}
      <SeoFaq />
    </main>
  );
}
