import Link from "next/link";
import type { Metadata } from "next";
import { useCases } from "../../lib/use-cases";

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "Explore high-intent use cases for CleanCut AI: Shopify product photos, Amazon listings, YouTube thumbnails, Canva designs, logos, headshots, and more.",
  alternates: { canonical: "https://xevora.org/cleancut/use-cases" },
};

function JsonLd() {
  const breadcrumbs = {
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
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
    />
  );
}

export default function UseCasesIndex() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd />

      <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 md:p-12">
        <h1 className="text-3xl font-bold text-white md:text-5xl">
          Background removal for real workflows
        </h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          CleanCut AI is built for people who need clean cutouts that look professional:
          e-commerce listings, thumbnails, marketing, logos, and team headshots.
          Pick a use case below and follow the best workflow.
        </p>

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
            See pricing
          </Link>
        </div>

        <div className="mt-6 grid gap-3 text-sm text-slate-300 sm:grid-cols-2 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
            ✔ Transparent PNG export
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
            ✔ Batch processing (plan-based)
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
            ✔ Clean edges (Fast / Quality modes)
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        {useCases.map((uc) => (
          <article
            key={uc.slug}
            className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6"
          >
            <h2 className="text-xl font-semibold text-white">
              <Link href={`/use-cases/${uc.slug}`} className="hover:underline">
                {uc.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-slate-300">{uc.description}</p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`/use-cases/${uc.slug}`}
                className="inline-flex rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-900"
              >
                Read workflow →
              </Link>
              <Link
                href="/app"
                className="inline-flex rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500"
              >
                Try it on your image
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
