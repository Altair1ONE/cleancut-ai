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
    <main className="cc-bg">
      <div className="cc-container py-10">
        <JsonLd />

        <section className="card p-8 md:p-10">
          <h1 className="text-[1.75rem] font-extrabold tracking-tight text-slate-900 md:text-[2.25rem]">
            Background removal for real workflows
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-600">
            CleanCut AI is built for people who need clean cutouts that look professional:
            e-commerce listings, thumbnails, marketing, logos, and team headshots.
            Pick a use case below and follow the best workflow.
          </p>

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
              See pricing
            </Link>
          </div>

          <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-700">
              ✔ Transparent PNG export
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-700">
              ✔ Batch processing (plan-based)
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-700">
              ✔ Clean edges (Fast / Quality modes)
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {useCases.map((uc) => (
            <article key={uc.slug} className="card p-6">
              <h2 className="text-lg font-semibold text-slate-900">
                <Link href={`/use-cases/${uc.slug}`} className="hover:underline">
                  {uc.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-slate-600">{uc.description}</p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/use-cases/${uc.slug}`}
                  className="inline-flex rounded-2xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Read workflow →
                </Link>
                <Link
                  href="/app"
                  className="inline-flex rounded-2xl border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-800 hover:border-slate-300"
                >
                  Try it on your image
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
