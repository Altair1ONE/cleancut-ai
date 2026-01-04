import Link from "next/link";
import type { Metadata } from "next";
import { getUseCaseBySlug, useCases } from "../../../lib/use-cases";

type Props = {
  // ✅ Next 16 (turbopack) can pass params as a Promise
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return useCases.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const uc = getUseCaseBySlug(slug);

  if (!uc) {
    return {
      title: "Use cases",
      description: "CleanCut AI use cases",
      alternates: { canonical: "https://xevora.org/cleancut/use-cases" },
    };
  }

  return {
    title: uc.title,
    description: uc.description,
    alternates: { canonical: `https://xevora.org/cleancut/use-cases/${uc.slug}` },
  };
}

function FaqJsonLd({ faq, url }: { faq: { q: string; a: string }[]; url: string }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
    mainEntityOfPage: url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

function BreadcrumbJsonLd({ url, name }: { url: string; name: string }) {
  const json = {
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
        name: "Use cases",
        item: "https://xevora.org/cleancut/use-cases",
      },
      { "@type": "ListItem", position: 3, name, item: url },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

function HowToJsonLd({ title, url }: { title: string; url: string }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to ${title} with CleanCut AI`,
    description:
      "A simple workflow: upload your image, remove the background, and download a transparent PNG cutout.",
    totalTime: "PT1M",
    supply: [{ "@type": "HowToSupply", name: "Image (PNG/JPG/WEBP)" }],
    tool: [{ "@type": "HowToTool", name: "CleanCut AI" }],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your image",
        text: "Upload a PNG, JPG, or WEBP. You can also drag and drop multiple images for batch processing (plan-based limits).",
        url: `${url}#step-1`,
      },
      {
        "@type": "HowToStep",
        name: "Remove the background",
        text: "Click Process and choose Fast mode for speed or Quality mode for complex edges (paid plans).",
        url: `${url}#step-2`,
      },
      {
        "@type": "HowToStep",
        name: "Download your transparent PNG",
        text: "Download the cutout as a transparent PNG and use it in listings, thumbnails, ads, or designs.",
        url: `${url}#step-3`,
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

function WebPageJsonLd({
  title,
  url,
  description,
}: {
  title: string;
  url: string;
  description: string;
}) {
  const json = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url,
    description,
    isPartOf: {
      "@type": "WebSite",
      name: "CleanCut AI by Xevora",
      url: "https://xevora.org/cleancut",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

function getRelatedUseCases(currentSlug: string, limit = 3) {
  return useCases.filter((u) => u.slug !== currentSlug).slice(0, limit);
}

export default async function UseCasePage({ params }: Props) {
  const { slug } = await params;
  const uc = getUseCaseBySlug(slug);

  if (!uc) {
    return (
      <main className="cc-bg">
        <div className="cc-container py-10">
          <section className="card p-6">
            <h1 className="text-xl font-bold text-slate-900">Use case not found</h1>
            <p className="mt-2 text-sm text-slate-600">
              This page doesn’t exist. Please use the Use Cases index.
            </p>
            <Link
              href="/use-cases"
              className="mt-4 inline-block text-blue-700 hover:underline"
            >
              Back to Use Cases
            </Link>
          </section>
        </div>
      </main>
    );
  }

  const canonical = `https://xevora.org/cleancut/use-cases/${uc.slug}`;
  const related = getRelatedUseCases(uc.slug, 3);

  return (
    <main className="cc-bg">
      <div className="cc-container py-10">
        {/* ✅ Structured data */}
        <FaqJsonLd faq={uc.faq} url={canonical} />
        <BreadcrumbJsonLd url={canonical} name={uc.h1} />
        <HowToJsonLd title={uc.h1} url={canonical} />
        <WebPageJsonLd title={uc.title} url={canonical} description={uc.description} />

        {/* HERO */}
        <section className="card p-8 md:p-10">
          <p className="text-xs font-semibold text-slate-600">Use case</p>
          <h1 className="mt-2 text-[1.75rem] font-extrabold tracking-tight text-slate-900 md:text-[2.25rem]">
            {uc.h1}
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-slate-600">{uc.intro}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/app"
              className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Remove a background now →
            </Link>
            <Link
              href="/pricing"
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:border-slate-300"
            >
              See pricing &amp; limits
            </Link>
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Tip: For tricky edges (hair/fur, transparent objects), use{" "}
            <span className="font-semibold text-slate-900">Quality</span> mode if your plan supports it.
          </p>
        </section>

        {/* BENEFITS */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-slate-900">Why this workflow works</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            Here are the key benefits of using CleanCut AI for this use case.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {uc.bullets.map((b) => (
              <div key={b} className="card p-5">
                <h3 className="text-sm font-semibold text-slate-900">✓ Benefit</h3>
                <p className="mt-2 text-sm text-slate-700">{b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW-TO STEPS */}
        <section className="mt-8 card p-8">
          <h2 className="text-lg font-semibold text-slate-900">How to do it (3 steps)</h2>

          <ol className="mt-5 grid list-decimal gap-4 pl-6 text-sm text-slate-700 md:grid-cols-3">
            <li id="step-1">
              <span className="font-semibold text-slate-900">Upload your image</span>
              <div className="mt-1 text-sm text-slate-700">
                Upload PNG/JPG/WEBP. For multiple images, drag &amp; drop to batch process (plan-based).
              </div>
            </li>
            <li id="step-2">
              <span className="font-semibold text-slate-900">Remove the background</span>
              <div className="mt-1 text-sm text-slate-700">
                Choose <span className="font-semibold text-slate-900">Fast</span> for speed or{" "}
                <span className="font-semibold text-slate-900">Quality</span> for tougher edges.
              </div>
            </li>
            <li id="step-3">
              <span className="font-semibold text-slate-900">Download transparent PNG</span>
              <div className="mt-1 text-sm text-slate-700">
                Download your cutout and place it on white, brand colors, or designs.
              </div>
            </li>
          </ol>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/app"
              className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Open the app →
            </Link>
            <Link
              href="/use-cases"
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:border-slate-300"
            >
              Browse all use cases
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-8 card p-8">
          <h2 className="text-lg font-semibold text-slate-900">
            Want cleaner edges and bigger batches?
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            Upgrade when you need more monthly processing and Quality mode for complex images.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/pricing"
              className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Compare plans →
            </Link>
            <Link
              href="/contact"
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:border-slate-300"
            >
              Contact support
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-8 card p-8">
          <h2 className="text-lg font-semibold text-slate-900">FAQ</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {uc.faq.map((f) => (
              <div key={f.q} className="rounded-2xl border border-slate-200 bg-white p-4">
                <h3 className="text-sm font-semibold text-slate-900">{f.q}</h3>
                <p className="mt-2 text-sm text-slate-700">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* RELATED */}
        <section className="mt-8 card p-6">
          <h2 className="text-lg font-semibold text-slate-900">Related use cases</h2>
          <p className="mt-2 text-sm text-slate-600">
            Explore similar workflows for common tasks.
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/use-cases/${r.slug}`}
                className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-300"
              >
                <div className="text-sm font-semibold text-slate-900">{r.h1}</div>
                <p className="mt-1 text-sm text-slate-600">{r.description}</p>
                <div className="mt-3 text-sm font-semibold text-blue-700">
                  Read workflow →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* BACK LINK */}
        <section className="mt-8">
          <Link href="/" className="text-sm font-semibold text-blue-700 hover:underline">
            ← Back to CleanCut AI
          </Link>
        </section>
      </div>
    </main>
  );
}
