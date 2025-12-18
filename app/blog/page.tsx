import Link from "next/link";
import type { Metadata } from "next";
import { BLOG_POSTS } from "../../lib/blogPosts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Background removal guides, transparent PNG tips, and e-commerce workflows for product photos, thumbnails, and marketing. CleanCut AI by Xevora.",
  alternates: { canonical: "https://xevora.org/cleancut/blog" },
};

function JsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "CleanCut AI Blog",
    url: "https://xevora.org/cleancut/blog",
    publisher: { "@type": "Organization", name: "Xevora" },
  };

  // ✅ Added: BreadcrumbList (keeps everything else untouched)
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
        name: "Blog",
        item: "https://xevora.org/cleancut/blog",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </>
  );
}

export default function BlogIndex() {
  const posts = [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd />

      <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
        <h1 className="text-3xl font-bold text-white md:text-4xl">
          CleanCut AI Blog
        </h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          Practical guides, use cases, and workflows for background removal —
          product photos, thumbnails, transparent PNGs, and more.
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
            View Pricing
          </Link>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        {posts.map((p) => (
          <article
            key={p.slug}
            className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6"
          >
            <div className="text-xs text-slate-400">
              {new Date(p.date).toLocaleDateString()} • {p.category}
            </div>
            <h2 className="mt-2 text-xl font-semibold text-white">
              <Link href={`/blog/${p.slug}`} className="hover:underline">
                {p.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-slate-300">{p.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {p.keywords.slice(0, 5).map((k) => (
                <span
                  key={k}
                  className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300"
                >
                  {k}
                </span>
              ))}
            </div>

            <Link
              href={`/blog/${p.slug}`}
              className="mt-5 inline-flex rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-900"
            >
              Read article →
            </Link>
          </article>
        ))}
      </section>

      {/* Internal linking footer */}
      <section className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
        <h3 className="text-lg font-semibold text-white">
          Want to remove a background right now?
        </h3>
        <p className="mt-2 text-sm text-slate-300">
          Use the app and export a transparent PNG in seconds.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/app"
            className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-600"
          >
            Open App
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500"
          >
            Contact / Refunds
          </Link>
        </div>
      </section>
    </main>
  );
}
