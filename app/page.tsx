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
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
      {children}
    </span>
  );
}

function IconBullet({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{desc}</div>
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
      className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="text-base font-bold text-slate-900">{title}</div>
        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
          {tag}
        </span>
      </div>

      <ul className="mt-4 space-y-2 text-sm text-slate-600">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-indigo-600" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 text-xs font-semibold text-indigo-600">
        See how people use it →
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
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className="text-xs text-slate-500">Before → After</div>
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

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <Image
            src={withBasePath(afterSrc)}
            alt={`${title} after`}
            width={800}
            height={600}
            className="h-auto w-full object-cover"
          />
        </div>
      </div>

      <div className="mt-3 text-xs text-slate-600">{note}</div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <JsonLd />

      {/* HERO */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-10">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="flex flex-wrap gap-2">
              <Pill>No watermark</Pill>
              <Pill>Transparent PNG</Pill>
              <Pill>Batch-ready</Pill>
            </div>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Remove backgrounds in seconds —{" "}
              <span className="text-indigo-600">
                get a transparent PNG you can use anywhere
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
              Upload your image and you’ll get a clean cutout instantly —{" "}
              <strong className="text-slate-900">no watermark</strong>, no friction.
              Use it for{" "}
              <strong className="text-slate-900">e-commerce</strong>,{" "}
              <strong className="text-slate-900">YouTube &amp; social</strong>,{" "}
              <strong className="text-slate-900">design</strong>, and marketing.
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
              No sign-up to try • Download instantly • Upgrade only when you need
              more credits
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <IconBullet
                title="Looks natural (clean edges)"
                desc="Your cutouts won’t look rough. Great for catalogs, brand assets, and listings."
              />
              <IconBullet
                title="Choose speed or detail"
                desc="Go fast for simple images. Switch to Quality when hair/edges need more detail."
              />
            </div>
          </div>

          <div className="md:pl-4">
            <BeforeAfterSlider
              originalSrc="/examples/product-before.jpg"
              cutoutSrc="/examples/product-after.png"
              alt="CleanCut AI background removal demo"
            />
            <div className="mt-3 text-center text-xs text-slate-600">
              Drag the slider:{" "}
              <span className="font-semibold text-slate-900">left</span> is original
              —{" "}
              <span className="font-semibold text-slate-900">right</span> is your
              transparent PNG
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <Link
                href="/use-cases/shopify-product-photos"
                className="rounded-2xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-800 shadow-sm hover:border-slate-300"
              >
                E-commerce
                <div className="mt-1 font-normal text-slate-500">
                  Products • Catalogs
                </div>
              </Link>
              <Link
                href="/use-cases/youtube-thumbnails"
                className="rounded-2xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-800 shadow-sm hover:border-slate-300"
              >
                Creators
                <div className="mt-1 font-normal text-slate-500">
                  YouTube • Social
                </div>
              </Link>
              <Link
                href="/use-cases/amazon-listing-images"
                className="rounded-2xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-800 shadow-sm hover:border-slate-300"
              >
                Designers
                <div className="mt-1 font-normal text-slate-500">Brand assets</div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PERSONAS */}
      <section className="mt-12">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Built for your workflow — whatever you’re making
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              Whether you’re selling products, posting content, or designing
              assets, you want one thing: a clean transparent PNG that’s ready to
              use.
            </p>
          </div>
          <Link
            href="/app"
            className="inline-flex w-fit items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
          >
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
              "Consistent images for collections & catalogs",
              "Faster workflow when you have lots of SKUs",
            ]}
          />
          <PersonaCard
            title="Creators & social"
            tag="Content"
            href="/use-cases/youtube-thumbnails"
            bullets={[
              "Make subjects pop in thumbnails and reels",
              "Create overlays, stickers, and visuals fast",
              "Keep your style consistent across posts",
            ]}
          />
          <PersonaCard
            title="Designers & marketers"
            tag="Brand"
            href="/use-cases/amazon-listing-images"
            bullets={[
              "Transparent PNG assets for ads & landing pages",
              "Quick cutouts for banners and creatives",
              "Save time on repetitive background cleanup",
            ]}
          />
        </div>
      </section>

      {/* VISUAL EXAMPLES */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Real examples (before → after)
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          This is what you should expect: clean subject isolation and a transparent
          PNG you can drop into any design.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <ExampleTile
            title="Product photo"
            beforeSrc="/examples/product-before.jpg"
            afterSrc="/examples/product-after.png"
            note="Perfect for e-commerce listings, catalogs, and collections."
          />
          <ExampleTile
            title="Portrait"
            beforeSrc="/examples/portrait-before.jpg"
            afterSrc="/examples/portrait-after.png"
            note="Great for profile pictures, creators, and team pages."
          />
          <ExampleTile
            title="Logo / graphic"
            beforeSrc="/examples/logo-before.jpg"
            afterSrc="/examples/logo-after.png"
            note="Transparent assets for web, slides, branding, and UI."
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Upload → done → download
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          You don’t need to learn Photoshop or waste time. Just upload your image,
          process it, and download your PNG.
        </p>

        <ol className="mt-5 grid gap-4 md:grid-cols-3">
          <li className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">1) Upload</div>
            <p className="mt-2 text-sm text-slate-600">
              PNG, JPG, WEBP — single or batch.
            </p>
          </li>
          <li className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">2) Process</div>
            <p className="mt-2 text-sm text-slate-600">
              Choose Fast or Quality depending on edges.
            </p>
          </li>
          <li className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">3) Download</div>
            <p className="mt-2 text-sm text-slate-600">
              Transparent PNG. Watermark-free.
            </p>
          </li>
        </ol>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/app"
            className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Upload an image (free)
          </Link>
          <Link
            href="/pricing"
            className="inline-flex rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-300"
          >
            Compare plans
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Frequently asked questions
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">
              Is it really free?
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Yes — you can try it free and download watermark-free results. If
              you need bigger batches or more monthly credits, you can upgrade
              anytime.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">
              Will my image lose quality?
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              You’ll get a clean PNG cutout designed to look natural. For hair and
              detailed edges, use{" "}
              <strong className="text-slate-900">Quality</strong> mode when
              available.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">
              Can I remove backgrounds in bulk?
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Yes. Batch processing is supported. Paid plans unlock larger batch
              sizes and higher monthly limits.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">
              Do you add watermarks?
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Never. Your exports are watermark-free — including the free plan.
            </p>
          </div>
        </div>
      </section>

      <SeoFaq />
    </main>
  );
}
