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
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
      {children}
    </span>
  );
}

function IconBullet({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-1 text-sm leading-relaxed text-slate-600">{desc}</div>
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
        <div className="text-base font-semibold text-slate-900">{title}</div>
        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
          {tag}
        </span>
      </div>

      <ul className="mt-4 space-y-2 text-sm text-slate-600">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-900" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 text-xs font-medium text-slate-900">
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
    <main className="mx-auto max-w-7xl px-4 py-10">
      <JsonLd />

      {/* HERO */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-10">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="flex flex-wrap gap-2">
              <Pill>No watermark</Pill>
              <Pill>Transparent PNG</Pill>
              <Pill>Batch ready</Pill>
            </div>

            <h1 className="mt-5 max-w-2xl text-[2.25rem] font-semibold leading-[1.1] tracking-tight text-slate-900 md:text-[3.25rem]">
              Remove image backgrounds automatically
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
              Upload an image and get a clean, transparent background in seconds.
              No manual work. No watermark.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/app"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
              >
                Upload an image
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 hover:border-slate-300"
              >
                View pricing
              </Link>
            </div>

            <div className="mt-4 text-xs text-slate-500">
              Try it free • Download instantly • Upgrade only if you need more
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <IconBullet
                title="Clean, natural cutouts"
                desc="Edges look professional — ideal for catalogs, branding, and listings."
              />
              <IconBullet
                title="Automatic, but flexible"
                desc="Use Fast mode for speed or Quality mode for detailed edges."
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
              Slide right to preview transparency • left shows the original
            </div>
          </div>
        </div>
      </section>

      {/* PERSONAS */}
      <section className="mt-12">
        <h2 className="text-[1.75rem] font-semibold tracking-tight text-slate-900">
          Built for everyday workflows
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Whether you sell products, create content, or design assets, CleanCut AI
          helps you get results that are ready to use.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <PersonaCard
            title="E-commerce sellers"
            tag="Listings"
            href="/use-cases/shopify-product-photos"
            bullets={[
              "Consistent product images for marketplaces",
              "Faster cleanup for large catalogs",
              "Professional-looking listings",
            ]}
          />
          <PersonaCard
            title="Creators & social"
            tag="Content"
            href="/use-cases/youtube-thumbnails"
            bullets={[
              "Subjects that stand out in thumbnails",
              "Reusable overlays and cutouts",
              "Consistent visual style",
            ]}
          />
          <PersonaCard
            title="Designers & marketers"
            tag="Brand"
            href="/use-cases/amazon-listing-images"
            bullets={[
              "Transparent assets for ads and landing pages",
              "Quick iterations for creatives",
              "Less manual cleanup work",
            ]}
          />
        </div>
      </section>

      <SeoFaq />
    </main>
  );
}
