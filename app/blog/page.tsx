import Link from "next/link";
import type { Metadata } from "next";
import { BLOG_POSTS } from "../../lib/blogPosts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical background removal guides: transparent PNG tips, e-commerce photo workflows, thumbnails, and clean cutout best practices. CleanCut AI by Xevora.",
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
    <main className="cc-bg">
      <div className="cc-container py-10">
        <JsonLd />

        {/* HERO */}
        <section className="card p-8 md:p-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white">
                B
              </span>
              <span>Blog</span>
            </div>

            <h1 className="mt-4 text-[1.75rem] font-extrabold tracking-tight text-slate-900 md:text-[2.25rem]">
              Background removal guides &amp; workflows
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Learn how to get clean cutouts, export transparent PNGs, and speed up
              e-commerce and creator workflows—without sacrificing quality.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/app"
                className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                Open CleanCut AI
              </Link>
              <Link
                href="/pricing"
                className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:border-slate-300"
              >
                See plans
              </Link>
              <a
                href="/cleancut/feed.xml"
                className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:border-slate-300"
              >
                RSS Feed
              </a>
            </div>
          </div>
        </section>

        {/* POSTS GRID */}
        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {posts.map((p) => (
            <article key={p.slug} className="card p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs text-slate-500">
                  {new Date(p.date).toLocaleDateString()} • {p.category}
                </div>
                <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600 md:block">
                  Guide
                </div>
              </div>

              <h2 className="mt-2 text-lg font-semibold text-slate-900">
                <Link href={`/blog/${p.slug}`} className="hover:underline">
                  {p.title}
                </Link>
              </h2>

              <p className="mt-2 text-sm text-slate-600">{p.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.keywords.slice(0, 5).map((k) => (
                  <span
                    key={k}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700"
                  >
                    {k}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <Link
                  href={`/blog/${p.slug}`}
                  className="inline-flex rounded-2xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Read guide →
                </Link>

                <Link
                  href="/app"
                  className="inline-flex rounded-2xl border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-800 hover:border-slate-300"
                >
                  Try now
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* CTA */}
        <section className="mt-10 card p-8">
          <h3 className="text-lg font-semibold text-slate-900">
            Ready to remove a background right now?
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Open the app, upload your image, and download a watermark-free transparent PNG in seconds.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/app"
              className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Open App
            </Link>
            <Link
              href="/contact"
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:border-slate-300"
            >
              Contact
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
