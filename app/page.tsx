import Link from "next/link";
import Image from "next/image";
import { SeoFaq } from "../components/SeoFaq";

/**
 * Lightweight, dependency-free before/after slider
 * - Works with mouse + touch
 * - Pure client interaction via <input type="range">
 */
function BeforeAfter({
  beforeSrc,
  afterSrc,
  alt,
  label = "Drag to compare",
}: {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
  label?: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/40 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
        {/* BEFORE */}
        <Image
          src={beforeSrc}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 520px"
          className="object-cover"
          priority={false}
        />

        {/* AFTER (clipped via CSS) */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 w-1/2 overflow-hidden [--pos:50%]">
            <Image
              src={afterSrc}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 520px"
              className="object-cover"
              priority={false}
            />
          </div>

          {/* Divider line */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-white/70" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow">
            {label}
          </div>

          {/* Range slider controls the clip position */}
          <input
            aria-label="Before and after comparison"
            type="range"
            min={0}
            max={100}
            defaultValue={50}
            className="absolute inset-x-3 bottom-3 h-2 w-[calc(100%-1.5rem)] cursor-ew-resize appearance-none rounded-full bg-white/20 outline-none"
            onInput={(e) => {
              const v = Number((e.target as HTMLInputElement).value);
              const container = (e.target as HTMLInputElement).closest("div");
              if (!container) return;

              const afterWrapper = container.querySelector(
                ".absolute.inset-0.w-1\\/2"
              ) as HTMLDivElement | null;

              const divider = container.querySelector(
                ".pointer-events-none.absolute.inset-y-0.left-1\\/2"
              ) as HTMLDivElement | null;

              const badge = container.querySelector(
                ".pointer-events-none.absolute.left-1\\/2.top-1\\/2"
              ) as HTMLDivElement | null;

              if (afterWrapper) afterWrapper.style.width = `${v}%`;
              if (divider) divider.style.left = `${v}%`;
              if (badge) badge.style.left = `${v}%`;
            }}
          />
        </div>

        {/* Tiny labels */}
        <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white">
          Before
        </div>
        <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white">
          After
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-300">
        <span>Transparent PNG export</span>
        <span className="text-slate-400">No watermark • Fast & Quality</span>
      </div>
    </div>
  );
}

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
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900/40 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.45)] md:p-12">
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />

        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1 text-xs font-semibold text-slate-200">
              CleanCut AI <span className="text-slate-500">by</span> Xevora
              <span className="text-slate-500">•</span>
              Transparent PNGs in seconds
            </p>

            <h1 className="mt-4 text-3xl font-bold text-white md:text-5xl">
              Remove backgrounds in{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
                1 click
              </span>{" "}
              — get clean transparent PNGs
            </h1>

            <p className="mt-4 max-w-2xl text-base text-slate-300">
              Upload an image and download a crisp cutout (no watermark). Ideal
              for <strong>product photos</strong>, <strong>portraits</strong>,{" "}
              <strong>logos</strong>, thumbnails, and marketing creatives.
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
                Pricing & limits
              </Link>
            </div>

            <div className="mt-4 text-xs text-slate-400">
              No sign-up needed to try • Exports are watermark-free • Batch supported
            </div>

            <div className="mt-6 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
                ✔ Clean edges (great for catalogs)
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
                ✔ Fast & Quality modes
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
                ✔ Transparent PNG export
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
                ✔ Batch processing for workflows
              </div>
            </div>
          </div>

          {/* Interactive proof */}
          <div className="md:pl-4">
            <BeforeAfter
              beforeSrc="/examples/product-before.jpg"
              afterSrc="/examples/product-after.png"
              alt="Product photo background removal before and after"
              label="Drag to compare"
            />
            <div className="mt-4 grid grid-cols-3 gap-3">
              <Link
                href="/use-cases/shopify-product-photos"
                className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3 text-xs font-semibold text-slate-200 hover:border-slate-600"
              >
                Product photos
                <div className="mt-1 font-normal text-slate-400">
                  Shopify • Amazon • Etsy
                </div>
              </Link>
              <Link
                href="/use-cases/youtube-thumbnails"
                className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3 text-xs font-semibold text-slate-200 hover:border-slate-600"
              >
                Creators
                <div className="mt-1 font-normal text-slate-400">
                  Thumbnails • Social
                </div>
              </Link>
              <Link
                href="/use-cases/amazon-listing-images"
                className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3 text-xs font-semibold text-slate-200 hover:border-slate-600"
              >
                Listings
                <div className="mt-1 font-normal text-slate-400">
                  Catalogs • Collections
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <h2 className="text-sm font-semibold text-white">Privacy-first by design</h2>
          <p className="mt-2 text-sm text-slate-300">
            Built to be a practical tool: upload → process → download. Add a short
            privacy note on your app page to build trust fast.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <h2 className="text-sm font-semibold text-white">Made for real workflows</h2>
          <p className="mt-2 text-sm text-slate-300">
            Perfect for catalogs, listings, ads, and thumbnails. Process one image
            or batch files and keep your output consistent.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <h2 className="text-sm font-semibold text-white">No watermark tricks</h2>
          <p className="mt-2 text-sm text-slate-300">
            You get a clean transparent PNG. Upgrade only if you need bigger
            batches and more credits.
          </p>
        </div>
      </section>

      {/* VISUAL EXAMPLES GRID */}
      <section className="mt-14">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">See results on real use-cases</h2>
            <p className="mt-2 max-w-3xl text-sm text-slate-300">
              People use CleanCut AI for product photos, portraits, and logos. These
              examples show what “clean edges” means in practice.
            </p>
          </div>

          <Link
            href="/app"
            className="inline-flex w-fit items-center justify-center rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-600"
          >
            Try with your image
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="text-sm font-semibold text-white">Product photos</div>
            <p className="mt-1 text-sm text-slate-300">
              Clean cutouts for stores, catalogs, and collections.
            </p>
            <div className="mt-4">
              <BeforeAfter
                beforeSrc="/examples/product-before.jpg"
                afterSrc="/examples/product-after.png"
                alt="E-commerce product photo before and after background removal"
                label="Compare"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="text-sm font-semibold text-white">Portraits</div>
            <p className="mt-1 text-sm text-slate-300">
              Great for profile photos, creators, and teams.
            </p>
            <div className="mt-4">
              <BeforeAfter
                beforeSrc="/examples/portrait-before.jpg"
                afterSrc="/examples/portrait-after.png"
                alt="Portrait before and after background removal"
                label="Compare"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="text-sm font-semibold text-white">Logos & graphics</div>
            <p className="mt-1 text-sm text-slate-300">
              Transparent assets for web, slides, and branding.
            </p>
            <div className="mt-4">
              <BeforeAfter
                beforeSrc="/examples/logo-before.jpg"
                afterSrc="/examples/logo-after.png"
                alt="Logo before and after background removal"
                label="Compare"
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-white">Remove backgrounds in 3 quick steps</h2>

        <ol className="mt-4 grid list-decimal gap-4 pl-6 text-slate-300 md:grid-cols-3">
          <li>
            Upload an image (PNG, JPG, WEBP) — or drag &amp; drop multiple files
            for batch processing.
          </li>
          <li>
            Click <strong>Process</strong> and choose <strong>Fast</strong> or{" "}
            <strong>Quality</strong> mode depending on edge complexity (hair, fur,
            objects, etc.).
          </li>
          <li>
            Download a <strong>transparent PNG</strong> instantly — always
            watermark-free.
          </li>
        </ol>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/app"
            className="inline-flex rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-600"
          >
            Open Background Remover
          </Link>
          <Link
            href="/pricing"
            className="inline-flex rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500"
          >
            See pricing
          </Link>
        </div>
      </section>

      {/* VALUE / DIFFERENTIATORS */}
      <section className="mt-14 rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
        <h2 className="text-xl font-semibold text-white">Why people choose CleanCut AI</h2>

        <p className="mt-3 max-w-3xl text-sm text-slate-300">
          CleanCut AI is built to be simple and repeatable: clean PNG exports,
          batch support, and fair limits — made for everyday use.
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
        <h2 className="text-xl font-semibold text-white">Frequently asked questions</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-sm font-semibold text-white">
              Is CleanCut AI really free?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Yes. You can remove backgrounds for free with watermark-free exports.
              Usage limits exist to keep the app fast and fair for everyone.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-sm font-semibold text-white">
              Does it reduce image quality?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              We focus on clean results that preserve detail. For hair and complex
              edges, use <strong>Quality</strong> mode when available.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-sm font-semibold text-white">
              Can I remove backgrounds in bulk?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Yes. Batch background removal is supported. Paid plans unlock bigger
              batch sizes and higher monthly usage.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-sm font-semibold text-white">
              Do you add watermarks?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Never. Exports are always watermark-free — free plan included.
            </p>
          </div>
        </div>
      </section>

      {/* INTERNAL LINK HUB (SEO) */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-white">Popular use cases</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <Link
            className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 hover:border-slate-600"
            href="/use-cases/shopify-product-photos"
          >
            <div className="text-sm font-semibold text-white">Shopify product photos</div>
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
            <div className="text-sm font-semibold text-white">YouTube thumbnails</div>
            <p className="mt-1 text-sm text-slate-300">
              Make subjects stand out with transparent PNG exports.
            </p>
          </Link>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-950/40 p-6">
          <div className="text-sm font-semibold text-white">For developers</div>
          <p className="mt-1 text-sm text-slate-300">
            Building automation for your workflow? Add an API page later and link it here.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/pricing"
              className="inline-flex rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500"
            >
              See plans
            </Link>
            <Link
              href="/app"
              className="inline-flex rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-600"
            >
              Start free
            </Link>
          </div>
        </div>
      </section>

      {/* SEO FAQ SCHEMA */}
      <SeoFaq />
    </main>
  );
}
