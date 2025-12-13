import Link from "next/link";
import { SeoFaq } from "../components/SeoFaq";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900/40 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.35)] md:p-12">
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />

        <h1 className="text-3xl font-bold text-white md:text-5xl">
          Remove Background from Images Instantly —{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
            No Watermark
          </span>
        </h1>

        <p className="mt-4 max-w-2xl text-base text-slate-300">
          CleanCut AI is a fast, free online background remover that lets you
          remove backgrounds from images in seconds. Export transparent PNGs,
          process images in bulk, and keep full quality — even on the free plan.
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
            ✔ No watermark
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
            ✔ Transparent PNG
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
            ✔ Batch processing
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
            ✔ Free & affordable plans
          </div>
        </div>
      </section>

      {/* TRUST / VALUE */}
      <section className="mt-12 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <h2 className="text-sm font-semibold text-white">
            AI Background Removal That Respects Quality
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Unlike many free tools, CleanCut AI does not aggressively compress
            your images or add watermarks. Your results stay clean and usable.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <h2 className="text-sm font-semibold text-white">
            Built for Real Workflows
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Remove backgrounds from product photos, portraits, and marketing
            images — one by one or in bulk.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <h2 className="text-sm font-semibold text-white">
            Cheaper Than Most Alternatives
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            CleanCut AI costs up to 5–10× less per image compared to popular
            background remover tools.
          </p>
        </div>
      </section>

      {/* USE CASES */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-white">
          Perfect for E-commerce, Creators, and Businesses
        </h2>

        <ul className="mt-4 grid list-disc gap-2 pl-6 text-slate-300 md:grid-cols-2">
          <li>Product photos for Shopify, Amazon, and Etsy</li>
          <li>Marketing banners and ads</li>
          <li>Social media and content creation</li>
          <li>Profile photos and portraits</li>
          <li>Bulk image cleanup for catalogs</li>
          <li>Transparent PNG assets for design</li>
        </ul>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-white">
          How to Remove Backgrounds in 3 Simple Steps
        </h2>

        <ol className="mt-4 grid list-decimal gap-4 pl-6 text-slate-300 md:grid-cols-3">
          <li>
            Upload your image (PNG, JPG, or WEBP) or drag & drop multiple files.
          </li>
          <li>
            Click <strong>Remove Background</strong> using Fast or Quality mode.
          </li>
          <li>
            Download your transparent PNG instantly — no watermark.
          </li>
        </ol>
      </section>

      {/* COMPARISON */}
      <section className="mt-14 rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
        <h2 className="text-xl font-semibold text-white">
          Why Choose CleanCut AI?
        </h2>

        <ul className="mt-4 space-y-2 text-slate-300">
          <li>• No watermark, even on the free plan</li>
          <li>• Supports batch background removal</li>
          <li>• Transparent PNG export</li>
          <li>• Much cheaper than Remove.bg, Canva, and ClipDrop</li>
          <li>• Simple pricing with a lifetime option</li>
        </ul>

        <div className="mt-6 flex gap-3">
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
        <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-sm font-semibold text-white">
              Is CleanCut AI really free?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Yes. You can remove backgrounds for free without watermarks.
              Usage limits apply to keep the service fast.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-sm font-semibold text-white">
              Does it reduce image quality?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              No. CleanCut AI preserves quality and offers a Quality mode for
              more detailed edges.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-sm font-semibold text-white">
              Can I remove backgrounds in bulk?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Yes. Batch background removal is supported depending on your plan.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-sm font-semibold text-white">
              Are there any watermarks?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              No. CleanCut AI never adds watermarks — even on the free tier.
            </p>
          </div>
        </div>
      </section>

      {/* SEO FAQ SCHEMA */}
      <SeoFaq />
    </main>
  );
}
