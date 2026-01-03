import Link from "next/link";
import { SeoFaq } from "../components/SeoFaq";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";

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

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
      {children}
    </span>
  );
}

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <JsonLd />

      {/* HERO */}
<section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-10">
  <div className="grid items-center gap-10 md:grid-cols-2">
    {/* Copy */}
    <div>
      <div className="flex flex-wrap gap-2">
        <Pill>No watermark</Pill>
        <Pill>Transparent PNG</Pill>
        <Pill>Batch ready</Pill>
      </div>

      <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
        Remove backgrounds in seconds —{" "}
        <span className="text-indigo-600">get a transparent PNG you can use anywhere</span>
      </h1>

      <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
        Upload your image and you’ll get a clean cutout instantly —{" "}
        <strong className="text-slate-900">no watermark</strong>, no fuss. Use it for{" "}
        <strong className="text-slate-900">product photos</strong>,{" "}
        <strong className="text-slate-900">profile pictures</strong>,{" "}
        <strong className="text-slate-900">thumbnails</strong>, ads, and brand assets.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/app"
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
        >
          Upload an image (free)
        </Link>
        <Link
          href="/pricing"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-300"
        >
          View pricing
        </Link>
      </div>

      <div className="mt-4 text-xs text-slate-500">
        No sign-up to try • Download instantly • Upgrade only when you need more credits
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-sm font-semibold text-slate-900">Looks natural (clean edges)</div>
          <div className="mt-1 text-sm text-slate-600">
            Your cutouts won’t look “AI rough.” Great for shops, catalogs, and brand work.
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-sm font-semibold text-slate-900">Choose speed or detail</div>
          <div className="mt-1 text-sm text-slate-600">
            Go fast for simple images, switch to Quality when you need better hair/edges.
          </div>
        </div>
      </div>
    </div>

    {/* Proof */}
    <div className="md:pl-4">
      <BeforeAfterSlider
        originalSrc="/examples/product-before.jpg"
        cutoutSrc="/examples/product-after.png"
        alt="CleanCut AI background removal demo"
      />

      <div className="mt-3 text-center text-xs text-slate-600">
        Drag the slider: <span className="font-semibold text-slate-900">left</span> shows the original —{" "}
        <span className="font-semibold text-slate-900">right</span> shows your transparent PNG
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <Link
          href="/use-cases/shopify-product-photos"
          className="rounded-2xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-800 shadow-sm hover:border-slate-300"
        >
          Product photos
          <div className="mt-1 font-normal text-slate-500">Shopify • Amazon • Etsy</div>
        </Link>

        <Link
          href="/use-cases/youtube-thumbnails"
          className="rounded-2xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-800 shadow-sm hover:border-slate-300"
        >
          Creators
          <div className="mt-1 font-normal text-slate-500">Thumbnails • Social</div>
        </Link>

        <Link
          href="/use-cases/amazon-listing-images"
          className="rounded-2xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-800 shadow-sm hover:border-slate-300"
        >
          Listings
          <div className="mt-1 font-normal text-slate-500">Catalogs • Collections</div>
        </Link>
      </div>
    </div>
  </div>
</section>

      {/* TRUST STRIP */}
      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Watermark-free, even on Free</h2>
          <p className="mt-2 text-sm text-slate-600">
            No “surprise watermark” at export time. You get a clean transparent PNG.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Built for real workflows</h2>
          <p className="mt-2 text-sm text-slate-600">
            Process one image or batch files for catalogs, listings, ads, and thumbnails.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Simple pricing</h2>
          <p className="mt-2 text-sm text-slate-600">
            Start free. Upgrade only when you need bigger batches and more monthly credits.
          </p>
        </div>
      </section>

      {/* USE CASES + INTERNAL LINKING (SEO) */}
      <section className="mt-14">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Made for e-commerce, creators, and marketing
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              CleanCut AI is designed for consistent outputs — clean edges, transparent PNGs, and repeatable results.
            </p>
          </div>

          <Link
            href="/app"
            className="inline-flex w-fit items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
          >
            Upload your image
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link
            href="/use-cases/shopify-product-photos"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-slate-300"
          >
            <div className="text-sm font-semibold text-slate-900">Shopify product photos</div>
            <p className="mt-2 text-sm text-slate-600">
              Clean cutouts for listings, collections, and catalogs.
            </p>
            <div className="mt-4 text-xs font-semibold text-indigo-600">Read the guide →</div>
          </Link>

          <Link
            href="/use-cases/amazon-listing-images"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-slate-300"
          >
            <div className="text-sm font-semibold text-slate-900">Amazon listing images</div>
            <p className="mt-2 text-sm text-slate-600">
              Make subjects pop with transparent PNG exports.
            </p>
            <div className="mt-4 text-xs font-semibold text-indigo-600">Read the guide →</div>
          </Link>

          <Link
            href="/use-cases/youtube-thumbnails"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-slate-300"
          >
            <div className="text-sm font-semibold text-slate-900">YouTube thumbnails</div>
            <p className="mt-2 text-sm text-slate-600">
              Increase contrast and clarity in thumbnail design.
            </p>
            <div className="mt-4 text-xs font-semibold text-indigo-600">Read the guide →</div>
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">How it works</h2>

        <ol className="mt-5 grid gap-4 md:grid-cols-3">
          <li className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-sm font-semibold text-slate-900">1) Upload</div>
            <p className="mt-2 text-sm text-slate-600">
              Upload PNG, JPG, or WEBP — or drag &amp; drop multiple files for batch processing.
            </p>
          </li>
          <li className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-sm font-semibold text-slate-900">2) Process</div>
            <p className="mt-2 text-sm text-slate-600">
              Click <strong className="text-slate-900">Process</strong> and choose{" "}
              <strong className="text-slate-900">Fast</strong> or{" "}
              <strong className="text-slate-900">Quality</strong>.
            </p>
          </li>
          <li className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-sm font-semibold text-slate-900">3) Download</div>
            <p className="mt-2 text-sm text-slate-600">
              Download a <strong className="text-slate-900">transparent PNG</strong> instantly — always watermark-free.
            </p>
          </li>
        </ol>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/app"
            className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Open the app
          </Link>
          <Link
            href="/pricing"
            className="inline-flex rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-300"
          >
            Compare plans
          </Link>
        </div>
      </section>

      {/* FAQ (VISIBLE) */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Frequently asked questions</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">Is CleanCut AI really free?</h3>
            <p className="mt-2 text-sm text-slate-600">
              Yes. You can try background removal for free with watermark-free exports.
              Usage limits exist to keep the app fast and fair for everyone.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">Does it reduce image quality?</h3>
            <p className="mt-2 text-sm text-slate-600">
              We aim for clean edges and preserved detail. For hair or complex edges,
              use <strong className="text-slate-900">Quality</strong> mode when available.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">Can I remove backgrounds in bulk?</h3>
            <p className="mt-2 text-sm text-slate-600">
              Yes. Batch processing is supported. Paid plans unlock bigger batch sizes and higher monthly limits.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">Do you add watermarks?</h3>
            <p className="mt-2 text-sm text-slate-600">
              Never. Exports are always watermark-free — free plan included.
            </p>
          </div>
        </div>
      </section>

      {/* SEO FAQ SCHEMA */}
      <SeoFaq />
    </main>
  );
}
