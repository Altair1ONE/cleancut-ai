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

function WebPageJsonLd({ title, url, description }: { title: string; url: string; description: string }) {
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
  // simple related: exclude current and take first N
  return useCases.filter((u) => u.slug !== currentSlug).slice(0, limit);
}

export default async function UseCasePage({ params }: Props) {
  const { slug } = await params;
  const uc = getUseCaseBySlug(slug);

  if (!uc) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold text-white">Use case not found</h1>
        <p className="mt-2 text-slate-300">
          This page doesn’t exist. Please use the Use Cases index.
        </p>
        <Link
          href="/use-cases"
          className="mt-4 inline-block text-indigo-300 hover:underline"
        >
          Back to Use Cases
        </Link>
      </main>
    );
  }

  const canonical = `https://xevora.org/cleancut/use-cases/${uc.slug}`;
  const related = getRelatedUseCases(uc.slug, 3);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* ✅ Structured data */}
      <FaqJsonLd faq={uc.faq} url={canonical} />
      <BreadcrumbJsonLd url={canonical} name={uc.h1} />
      <HowToJsonLd title={uc.h1} url={canonical} />
      <WebPageJsonLd title={uc.title} url={canonical} description={uc.description} />

      {/* HERO */}
      <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 md:p-12">
        <p className="text-xs text-slate-400">Use case</p>
        <h1 className="mt-2 text-3xl font-bold text-white md:text-5xl">{uc.h1}</h1>
        <p className="mt-4 max-w-3xl text-slate-300">{uc.intro}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/app"
            className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-600"
          >
            Remove a background now →
          </Link>
          <Link
            href="/pricing"
            className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500"
          >
            See pricing & limits
          </Link>
        </div>

        <p className="mt-4 text-sm text-slate-400">
          Tip: For tricky edges (hair/fur, transparent objects), use{" "}
          <span className="font-semibold text-slate-200">Quality</span> mode if your plan supports it.
        </p>
      </section>

      {/* BENEFITS */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">Why this workflow works</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-300">
          Here are the key benefits of using CleanCut AI for this use case.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {uc.bullets.map((b) => (
            <div
              key={b}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 text-slate-300"
            >
              <h3 className="text-sm font-semibold text-white">✓ Benefit</h3>
              <p className="mt-2 text-sm">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW-TO STEPS (VISIBLE) */}
      <section className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
        <h2 className="text-xl font-semibold text-white">How to do it (3 steps)</h2>

        <ol className="mt-5 grid list-decimal gap-4 pl-6 text-slate-300 md:grid-cols-3">
          <li id="step-1">
            <span className="font-semibold text-white">Upload your image</span>
            <div className="mt-1 text-sm text-slate-300">
              Upload PNG/JPG/WEBP. For multiple images, drag &amp; drop to batch process (plan-based).
            </div>
          </li>
          <li id="step-2">
            <span className="font-semibold text-white">Remove the background</span>
            <div className="mt-1 text-sm text-slate-300">
              Choose <span className="font-semibold text-slate-200">Fast</span> for speed or{" "}
              <span className="font-semibold text-slate-200">Quality</span> for tougher edges.
            </div>
          </li>
          <li id="step-3">
            <span className="font-semibold text-white">Download transparent PNG</span>
            <div className="mt-1 text-sm text-slate-300">
              Download your cutout and place it on white, brand colors, or designs.
            </div>
          </li>
        </ol>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/app"
            className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-600"
          >
            Open the app →
          </Link>
          <Link
            href="/use-cases"
            className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500"
          >
            Browse all use cases
          </Link>
        </div>
      </section>

      {/* CTA BLOCK */}
      <section className="mt-12 rounded-3xl border border-slate-800 bg-slate-950/40 p-8">
        <h2 className="text-xl font-semibold text-white">Want cleaner edges and bigger batches?</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-300">
          Upgrade when you need more monthly processing and Quality mode for complex images.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/pricing"
            className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-600"
          >
            Compare plans →
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500"
          >
            Contact support
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
        <h2 className="text-xl font-semibold text-white">FAQ</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {uc.faq.map((f) => (
            <div
              key={f.q}
              className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4"
            >
              <h3 className="text-sm font-semibold text-white">{f.q}</h3>
              <p className="mt-2 text-sm text-slate-300">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RELATED */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">Related use cases</h2>
        <p className="mt-2 text-sm text-slate-300">
          Explore similar workflows for common tasks.
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/use-cases/${r.slug}`}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 hover:border-slate-600"
            >
              <div className="text-sm font-semibold text-white">{r.h1}</div>
              <p className="mt-1 text-sm text-slate-300">{r.description}</p>
              <div className="mt-3 text-sm font-semibold text-indigo-300">
                Read workflow →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BACK LINK */}
      <section className="mt-12 text-sm text-slate-400">
        <Link href="/" className="text-indigo-300 hover:text-indigo-200">
          ← Back to CleanCut AI
        </Link>
      </section>
    </main>
  );
}
