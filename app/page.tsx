import Link from "next/link";
import Image from "next/image";
import { SeoFaq } from "../components/SeoFaq";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";

function withBasePath(src: string) {
  if (!src) return src;
  if (/^(https?:)?\/\//.test(src)) return src;
  if (src.startsWith("data:")) return src;

  const normalized = src.startsWith("/") ? src : `/${src}`;
  if (normalized.startsWith("/cleancut/")) return normalized;
  return `/cleancut${normalized}`;
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

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="cc-pill">
      {children}
    </span>
  );
}

function IconBullet({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-2 text-sm text-slate-600">{desc}</div>
    </div>
  );
}

function PersonaCard({
  title,
  bullets,
  href,
  tag,
}: {
  title: string;
  bullets: string[];
  href: string;
  tag: string;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-blue-100/70 blur-2xl" />
        <div className="absolute -bottom-28 -left-28 h-56 w-56 rounded-full bg-indigo-100/70 blur-2xl" />
      </div>

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <div className="text-base font-extrabold tracking-tight text-slate-900">
            {title}
          </div>
          <div className="mt-2 text-sm text-slate-600">
            Get clean transparent PNGs ready for your workflow.
          </div>
        </div>

        <span className="relative rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
          {tag}
        </span>
      </div>

      <ul className="relative mt-5 space-y-2 text-sm text-slate-600">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
        See examples <span aria-hidden="true">→</span>
      </div>
    </Link>
  );
}

function ExampleTile({
  title,
  beforeSrc,
  afterSrc,
  note,
}: {
  title: string;
  beforeSrc: string;
  afterSrc: string;
  note: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className="text-xs text-slate-400">Before → After</div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <Image
            src={withBasePath(beforeSrc)}
            alt={`${title} before`}
            width={800}
            height={600}
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="checker-bg overflow-hidden rounded-2xl border border-slate-200">
          <Image
            src={withBasePath(afterSrc)}
            alt={`${title} after`}
            width={800}
            height={600}
            className="h-auto w-full object-contain"
          />
        </div>
      </div>

      <div className="mt-3 text-xs text-slate-600">{note}</div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="cc-bg">
      <JsonLd />

      <div className="cc-container relative py-10 md:py-14">
        {/* HERO */}
        <section className="cc-card-soft p-7 md:p-12">
          <div className="grid items-center gap-10 md:grid-cols-2">
            {/* Left */}
            <div>
              <div className="flex flex-wrap gap-2">
                <Pill>No watermark</Pill>
                <Pill>Transparent PNG</Pill>
                <Pill>Batch-ready</Pill>
              </div>

              <h1 className="mt-6 text-slate-900">
                Remove backgrounds in seconds —{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  get a transparent PNG you can use anywhere
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base text-slate-600">
                Upload your image and get a clean cutout instantly —{" "}
                <span className="font-semibold text-slate-900">watermark-free</span>.
                Made for{" "}
                <span className="font-semibold text-slate-900">e-commerce</span>,{" "}
                <span className="font-semibold text-slate-900">YouTube &amp; social</span>,{" "}
                <span className="font-semibold text-slate-900">design</span>, and marketing.
              </p>

              {/* Primary CTA row (remove.bg-style simple) */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/app" className="cc-btn-primary w-full sm:w-auto">
                  Upload an image (free)
                </Link>
                <Link href="/pricing" className="cc-btn-secondary w-full sm:w-auto">
                  View pricing
                </Link>
              </div>

              <div className="mt-3 text-xs text-slate-500">
                No sign-up to try • Download instantly • Upgrade only when you need more credits
              </div>

              {/* Benefits row */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <IconBullet
                  title="Natural-looking cutouts"
                  desc="Clean edges that don’t look rough. Great for product listings and brand assets."
                />
                <IconBullet
                  title="Speed or detail (your choice)"
                  desc="Fast for simple images. Quality for hair & complex edges (paid plans)."
                />
              </div>
            </div>

            {/* Right */}
            <div className="md:pl-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <BeforeAfterSlider
                  originalSrc="/examples/product-before.jpg"
                  cutoutSrc="/examples/product-after.png"
                  alt="CleanCut AI background removal demo"
                />
                <div className="mt-3 text-center text-xs text-slate-600">
                  Drag the slider:{" "}
                  <span className="font-semibold text-slate-900">left</span> is original —{" "}
                  <span className="font-semibold text-slate-900">right</span> is your transparent PNG
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <Link
                  href="/use-cases/shopify-product-photos"
                  className="rounded-2xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-900 shadow-sm hover:border-slate-300"
                >
                  E-commerce
                  <div className="mt-1 font-normal text-slate-500">
                    Products • Catalogs
                  </div>
                </Link>

                <Link
                  href="/use-cases/youtube-thumbnails"
                  className="rounded-2xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-900 shadow-sm hover:border-slate-300"
                >
                  Creators
                  <div className="mt-1 font-normal text-slate-500">
                    YouTube • Social
                  </div>
                </Link>

                <Link
                  href="/use-cases/amazon-listing-images"
                  className="rounded-2xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-900 shadow-sm hover:border-slate-300"
                >
                  Designers
                  <div className="mt-1 font-normal text-slate-500">
                    Brand assets
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* PERSONAS */}
        <section className="mt-12 md:mt-16">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-slate-900">Built for your workflow</h2>
              <p className="mt-3 max-w-3xl text-sm text-slate-600">
                Whether you’re selling products, posting content, or designing assets —
                you want one thing: a clean transparent PNG that’s ready to use.
              </p>
            </div>
            <Link href="/app" className="cc-btn-primary w-fit">
              Try it on your image
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <PersonaCard
              title="E-commerce sellers"
              tag="Listings"
              href="/use-cases/shopify-product-photos"
              bullets={[
                "Clean product cutouts for Shopify, Amazon, Etsy",
                "Consistent images for catalogs and collections",
                "Faster workflow for many SKUs",
              ]}
            />
            <PersonaCard
              title="Creators & social"
              tag="Content"
              href="/use-cases/youtube-thumbnails"
              bullets={[
                "Make subjects pop in thumbnails and reels",
                "Create overlays/stickers fast",
                "Keep a consistent visual style",
              ]}
            />
            <PersonaCard
              title="Designers & marketers"
              tag="Brand"
              href="/use-cases/amazon-listing-images"
              bullets={[
                "Transparent PNG assets for ads & landing pages",
                "Quick cutouts for banners and creatives",
                "Save time on repetitive cleanup",
              ]}
            />
          </div>
        </section>

        {/* EXAMPLES */}
        <section className="mt-12 md:mt-16">
          <h2 className="text-slate-900">Real examples</h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-600">
            Clean subject isolation and a transparent PNG you can drop into any design.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <ExampleTile
              title="Product photo"
              beforeSrc="/examples/product-before.webp"
              afterSrc="/examples/product-after.webp"
              note="Perfect for listings, catalogs, and collections."
            />
            <ExampleTile
              title="Portrait"
              beforeSrc="/examples/portrait-before.webp"
              afterSrc="/examples/portrait-after.webp"
              note="Great for profile pictures, creators, and team pages."
            />
            <ExampleTile
              title="Logo / graphic"
              beforeSrc="/examples/logo-before.webp"
              afterSrc="/examples/logo-after.webp"
              note="Transparent assets for web, slides, branding, and UI."
            />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mt-12 md:mt-16 cc-card-soft p-8 md:p-10">
          <h2 className="text-slate-900">Upload → done → download</h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-600">
            No Photoshop. No learning curve. Upload your image, process, and download your PNG.
          </p>

          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            <li className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">1) Upload</div>
              <p className="mt-2 text-sm text-slate-600">PNG, JPG, WEBP — single or batch.</p>
            </li>
            <li className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">2) Process</div>
              <p className="mt-2 text-sm text-slate-600">Fast or Quality depending on edges.</p>
            </li>
            <li className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">3) Download</div>
              <p className="mt-2 text-sm text-slate-600">Transparent PNG. Watermark-free.</p>
            </li>
          </ol>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/app" className="cc-btn-primary w-full sm:w-auto">
              Upload an image (free)
            </Link>
            <Link href="/pricing" className="cc-btn-secondary w-full sm:w-auto">
              Compare plans
            </Link>
          </div>
        </section>

        {/* FAQ Cards */}
        <section className="mt-12 md:mt-16">
          <h2 className="text-slate-900">Frequently asked questions</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Is it really free?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Yes — you can try it free and download watermark-free results. Upgrade only if you need bigger batches or higher monthly credits.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Will my image lose quality?</h3>
              <p className="mt-2 text-sm text-slate-600">
                You’ll get a clean PNG cutout designed to look natural. For hair and detailed edges, use{" "}
                <strong className="text-slate-900">Quality</strong> mode when available.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Can I remove backgrounds in bulk?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Yes. Batch processing is supported. Paid plans unlock larger batch sizes and higher monthly limits.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Do you add watermarks?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Never. Your exports are watermark-free — including the free plan.
              </p>
            </div>
          </div>
        </section>

        <SeoFaq />
      </div>
    </main>
  );
}
