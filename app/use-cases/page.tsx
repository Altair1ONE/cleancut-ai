import Link from "next/link";
import type { Metadata } from "next";
import { useCases } from "../../lib/useCases";

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "Explore popular use cases for CleanCut AI: Shopify product photos, Amazon listings, YouTube thumbnails, and more.",
  alternates: { canonical: "https://xevora.org/cleancut/use-cases" },
};

function JsonLd() {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://xevora.org/cleancut" },
      { "@type": "ListItem", position: 2, name: "Use cases", item: "https://xevora.org/cleancut/use-cases" },
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
        <h1 className="text-3xl font-bold text-white md:text-5xl">Use cases</h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          Learn how CleanCut AI helps with real workflows: product photos, listings, thumbnails, and marketing assets.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/app"
            className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-600"
          >
            Try the App
          </Link>
          <Link
            href="/pricing"
            className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500"
          >
            Pricing
          </Link>
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
            <Link
              href={`/use-cases/${uc.slug}`}
              className="mt-5 inline-flex rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-900"
            >
              Read use case →
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
