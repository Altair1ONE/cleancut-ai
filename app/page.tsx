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
  Make image backgrounds transparent in seconds{" "}
  <span className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
    — export clean transparent PNGs, no watermark
  </span>
</h1>


        <p className="mt-4 max-w-2xl text-base text-slate-300">
  CleanCut AI by Xevora makes your{" "}
  <strong>background transparent</strong> instantly. Upload a photo and get a crisp{" "}
  <strong>transparent PNG</strong> for product images, portraits, thumbnails, and
  marketing assets. Process one image or{" "}
  <strong>batch</strong> files and keep clean edges that look professional.
</p>


        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/app"
            className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(99,102,241,0.25)] hover:bg-indigo-600"
          >
            Start Free Background Removal
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500"
          >
            See pricing & limits
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
            ✔ Batch processing
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
            ✔ Fast & Quality modes
          </div>
        </div>

        <p className="mt-5 text-sm text-slate-400">
          Want bigger batches, Quality mode, and more credits?{" "}
          <Link href="/pricing" className="text-indigo-300 hover:text-indigo-200">
            Compare plans
          </Link>{" "}
          or{" "}
          <Link href="/app" className="text-indigo-300 hover:text-indigo-200">
            try the app now
          </Link>
          .
        </p>
      </section>

      {/* TRUST / VALUE */}
      <section className="mt-12 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <h2 className="text-sm font-semibold text-white">
            Crisp cutouts that look natural
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            CleanCut AI aims for clean edges and solid subject separation—so your
            exports look like real product-ready cutouts, not “rough AI blobs.”
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <h2 className="text-sm font-semibold text-white">
            Built for real workflows, not demos
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Remove backgrounds for catalogs, listings, thumbnails, and ads. Do it
            one-by-one or in batch—then download transparent PNGs instantly.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <h2 className="text-sm font-semibold text-white">
            Simple pricing you can trust
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            No hidden exports, no watermark tricks. Start free, upgrade only when
            you need bigger batches and higher monthly limits.
          </p>
        </div>
      </section>

      {/* USE CASES */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-white">
          What people use CleanCut AI for
        </h2>

        <p className="mt-3 max-w-3xl text-sm text-slate-300">
          If you need transparent PNGs that look clean and consistent, CleanCut AI
          fits right into your workflow—especially for e-commerce and content.
        </p>

        <ul className="mt-4 grid list-disc gap-2 pl-6 text-slate-300 md:grid-cols-2">
          <li>Product photos for Shopify, Amazon, Etsy, and marketplaces</li>
          <li>Brand assets for landing pages, ads, and banners</li>
          <li>YouTube thumbnails and social posts</li>
          <li>Portraits, profile photos, and creators</li>
          <li>Bulk cleanup for catalogs and collections</li>
          <li>Transparent PNG assets for designers</li>
        </ul>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-white">
          Remove backgrounds in 3 quick steps
        </h2>

        <ol className="mt-4 grid list-decimal gap-4 pl-6 text-slate-300 md:grid-cols-3">
          <li>
            Upload an image (PNG, JPG, or WEBP) or drag &amp; drop multiple
            files for batch processing.
          </li>
          <li>
            Click <strong>Process</strong> and pick{" "}
            <strong>Fast</strong> or <strong>Quality</strong> mode based on your
            needs.
          </li>
          <li>
            Download your <strong>transparent PNG</strong> instantly — always
            watermark-free.
          </li>
        </ol>

        <div className="mt-6">
          <Link
            href="/app"
            className="inline-flex rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-600"
          >
            Open the Background Remover
          </Link>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="mt-14 rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
        <h2 className="text-xl font-semibold text-white">
          Why creators choose CleanCut AI
        </h2>

        <p className="mt-3 max-w-3xl text-sm text-slate-300">
          CleanCut AI is a straightforward background remover: clean PNG exports,
          fast processing, and fair limits—built for repeat use.
        </p>

        <ul className="mt-4 space-y-2 text-slate-300">
          <li>• No watermark, even on the free plan</li>
          <li>• Batch background removal for real workflows</li>
          <li>• Transparent PNG export for design + e-commerce</li>
          <li>• Fast mode for speed, Quality mode for details</li>
          <li>• Simple pricing with a lifetime option</li>
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/app"
            className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-600"
          >
            Try it free
          </Link>
          <Link
            href="/pricing"
            className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500"
          >
            Compare plans
          </Link>
        </div>
      </section>

      {/* FAQ (VISIBLE) */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-white">
          Frequently asked questions
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-sm font-semibold text-white">
              Is CleanCut AI really free?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Yes. You can remove backgrounds for free with watermark-free
              exports. Usage limits exist to keep the app fast and fair for
              everyone.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-sm font-semibold text-white">
              Does it reduce image quality?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              We focus on clean results that preserve detail. For hair and
              complex edges, use <strong>Quality</strong> mode when available.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-sm font-semibold text-white">
              Can I remove backgrounds in bulk?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Yes. Batch background removal is supported. Paid plans unlock
              bigger batch sizes and higher monthly usage.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-sm font-semibold text-white">
              Do you add watermarks?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Never. Exports are always watermark-free—free plan included.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold text-white">Popular use cases</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <Link
            className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 hover:border-slate-600"
            href="/use-cases/shopify-product-photos"
          >
            <div className="text-sm font-semibold text-white">
              Shopify product photos
            </div>
            <p className="mt-1 text-sm text-slate-300">
              Clean cutouts for listings, collections, and catalogs.
            </p>
          </Link>
          <Link
            className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 hover:border-slate-600"
            href="/use-cases/amazon-listing-images"
          >
            <div className="text-sm font-semibold text-white">Amazon listings</div>
            <p className="mt-1 text-sm text-slate-300">
              Professional subject isolation for marketplace images.
            </p>
          </Link>
          <Link
            className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 hover:border-slate-600"
            href="/use-cases/youtube-thumbnails"
          >
            <div className="text-sm font-semibold text-white">
              YouTube thumbnails
            </div>
            <p className="mt-1 text-sm text-slate-300">
              Make subjects stand out with transparent PNG exports.
            </p>
          </Link>
        </div>
      </section>

      {/* SEO FAQ SCHEMA */}
      <SeoFaq />
    </main>
  );
}
