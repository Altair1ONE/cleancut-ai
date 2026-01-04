"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { BLOG_POSTS, getPostBySlug } from "../../../lib/blogPosts";

// If you already have this helper, keep using it.
// If not, no problem — we only use it if it exists.
let getBlogOgImage: undefined | ((slug: string) => string);
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  getBlogOgImage = require("../../../lib/og").getBlogOgImage;
} catch {
  // ignore
}

function JsonLd({ post }: { post: ReturnType<typeof getPostBySlug> }) {
  if (!post) return null;

  const canonical = `https://xevora.org/cleancut${post.canonicalPath}`;
  const ogImage =
    typeof getBlogOgImage === "function"
      ? getBlogOgImage(post.slug)
      : "https://xevora.org/cleancut/og-default.png";

  const json: any = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": canonical,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "Xevora" },
    mainEntityOfPage: canonical,
    url: canonical,
    image: [ogImage],
  };

  // ✅ Keep FAQ schema attached (works well for rich results)
  if (post.faq && post.faq.length) {
    json.hasPart = {
      "@type": "FAQPage",
      mainEntity: post.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

// Breadcrumb JSON-LD
function BreadcrumbJsonLd({ url, title }: { url: string; title: string }) {
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
        name: "Blog",
        item: "https://xevora.org/cleancut/blog",
      },
      { "@type": "ListItem", position: 3, name: title, item: url },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

// Very small “markdown-ish” renderer (keeps it simple + safe)
function renderParagraphs(content: string) {
  const lines = content.trim().split("\n");
  const blocks: { type: "h2" | "h3" | "p" | "li" | "hr"; text: string }[] = [];

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    if (line.startsWith("## ")) blocks.push({ type: "h2", text: line.slice(3) });
    else if (line.startsWith("### "))
      blocks.push({ type: "h3", text: line.slice(4) });
    else if (line.startsWith("- ")) blocks.push({ type: "li", text: line.slice(2) });
    else if (line === "---") blocks.push({ type: "hr", text: "" });
    else blocks.push({ type: "p", text: line });
  }

  return blocks;
}

// ✅ Slightly smarter related posts picker (same logic style, no deps)
function getRelatedPosts(currentSlug: string) {
  const current = BLOG_POSTS.find((p) => p.slug === currentSlug);
  if (!current) return [];

  const currentKw = new Set((current.keywords || []).map((k) => k.toLowerCase()));
  const currentCat = (current.category || "").toLowerCase();

  const scored = BLOG_POSTS
    .filter((p) => p.slug !== currentSlug)
    .map((p) => {
      const kw = new Set((p.keywords || []).map((k) => k.toLowerCase()));

      let shared = 0;
      currentKw.forEach((k) => {
        if (kw.has(k)) shared += 1;
      });

      // Category match gets extra weight
      const catMatch =
        currentCat && (p.category || "").toLowerCase() === currentCat ? 4 : 0;

      const score = shared + catMatch;

      return { post: p, score };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.post.date < b.post.date ? 1 : -1;
    });

  const top = scored.filter((x) => x.score > 0).slice(0, 3).map((x) => x.post);
  if (top.length >= 2) return top;

  return BLOG_POSTS
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);
}

function TransparentBackgroundCta() {
  return (
    <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-5">
      <h3 className="text-sm font-semibold text-slate-900">
        Want a transparent background right now?
      </h3>
      <p className="mt-2 text-sm text-slate-600">
        Use CleanCut AI to remove the background and export a clean transparent PNG (no watermark).
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href="/transparent-background"
          className="rounded-2xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          Make background transparent →
        </Link>

        <Link
          href="/app"
          className="rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:border-slate-300"
        >
          Open App
        </Link>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Tip: Transparent PNG preserves the cutout so you can place it on any background later.
      </p>
    </section>
  );
}

export default function ClientPost({ initialSlug }: { initialSlug?: string }) {
  const params = useParams();

  const slug =
    (typeof params?.slug === "string" ? params.slug : "") ||
    (typeof initialSlug === "string" ? initialSlug : "");

  const post =
    getPostBySlug(slug) ?? BLOG_POSTS.find((p) => p.slug === slug) ?? null;

  if (!post) {
    return (
      <main className="cc-bg">
        <div className="cc-container py-10">
          <section className="card p-6">
            <h1 className="text-xl font-bold text-slate-900">Post not found</h1>
            <Link
              href="/blog"
              className="mt-4 inline-block text-blue-700 hover:underline"
            >
              Back to blog
            </Link>
          </section>
        </div>
      </main>
    );
  }

  const canonical = `https://xevora.org/cleancut${post.canonicalPath}`;
  const blocks = renderParagraphs(post.content);
  const related = getRelatedPosts(post.slug);
  const showTransparentCta = post.slug === "transparent-png-what-it-is";

  return (
    <main className="cc-bg">
      <div className="cc-container py-10">
        <JsonLd post={post} />
        <BreadcrumbJsonLd url={canonical} title={post.title} />

        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-3xl">
            <div className="text-xs text-slate-500">
              {new Date(post.date).toLocaleDateString()} • {post.category} • by{" "}
              {post.author}
            </div>

            <h1 className="mt-2 text-[1.75rem] font-extrabold tracking-tight text-slate-900 md:text-[2.25rem]">
              {post.title}
            </h1>

            <p className="mt-3 text-sm text-slate-600">{post.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {post.keywords.map((k) => (
                <span
                  key={k}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/app"
              className="rounded-2xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Open App
            </Link>
            <Link
              href="/blog"
              className="rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:border-slate-300"
            >
              All posts
            </Link>
          </div>
        </div>

        {/* Article */}
        <section className="mt-8 card p-6 md:p-8">
          <article className="max-w-none">
            <div className="space-y-4">
              {blocks.map((b, idx) => {
                if (b.type === "h2") {
                  return (
                    <div key={idx}>
                      <h2 className="mt-8 text-lg font-semibold text-slate-900">
                        {b.text}
                      </h2>

                      {showTransparentCta && idx === 0 && (
                        <TransparentBackgroundCta />
                      )}
                    </div>
                  );
                }

                if (b.type === "h3")
                  return (
                    <h3 key={idx} className="mt-6 text-base font-semibold text-slate-900">
                      {b.text}
                    </h3>
                  );

                if (b.type === "li")
                  return (
                    <div key={idx} className="flex gap-2 text-slate-700">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600/15 text-emerald-800 border border-emerald-600/25 text-xs font-bold">
                        ✓
                      </span>
                      <span className="text-sm leading-6">{b.text}</span>
                    </div>
                  );

                if (b.type === "hr")
                  return <hr key={idx} className="my-6 border-slate-200" />;

                return (
                  <p key={idx} className="text-sm text-slate-700 leading-7">
                    {b.text
                      .split("**")
                      .map((part, i) =>
                        i % 2 === 1 ? (
                          <strong key={i} className="text-slate-900">
                            {part}
                          </strong>
                        ) : (
                          <span key={i}>{part}</span>
                        )
                      )}
                  </p>
                );
              })}
            </div>
          </article>
        </section>

        {/* Try it now */}
        <section className="mt-8 card p-6">
          <h2 className="text-lg font-semibold text-slate-900">Try it now</h2>
          <p className="mt-2 text-sm text-slate-600">
            Remove backgrounds and export transparent PNGs in seconds.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/app"
              className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Open App
            </Link>
            <Link
              href="/pricing"
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:border-slate-300"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:border-slate-300"
            >
              More Blog Posts
            </Link>
          </div>
        </section>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="mt-8 card p-6">
            <h2 className="text-lg font-semibold text-slate-900">Related posts</h2>
            <p className="mt-2 text-sm text-slate-600">
              Keep reading — these articles are closely related to this topic.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-300"
                >
                  <div className="text-xs text-slate-500">
                    {new Date(p.date).toLocaleDateString()} • {p.category}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-slate-900">
                    {p.title}
                  </div>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                    {p.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Read next */}
        <section className="mt-8 card p-6">
          <h2 className="text-lg font-semibold text-slate-900">Read next</h2>
          <p className="mt-2 text-sm text-slate-600">
            Want to apply this right now? Start removing backgrounds, or explore high-intent use cases.
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <Link
              href="/app"
              className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-300"
            >
              <div className="text-sm font-semibold text-slate-900">Open the remover</div>
              <p className="mt-2 text-sm text-slate-600">
                Upload an image and export a transparent PNG in seconds.
              </p>
            </Link>

            <Link
              href="/use-cases/shopify-product-photos"
              className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-300"
            >
              <div className="text-sm font-semibold text-slate-900">Shopify product photos</div>
              <p className="mt-2 text-sm text-slate-600">
                Build clean, consistent listings and catalog images.
              </p>
            </Link>

            <Link
              href="/pricing"
              className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-300"
            >
              <div className="text-sm font-semibold text-slate-900">View pricing</div>
              <p className="mt-2 text-sm text-slate-600">
                Bigger batches and premium modes when you need them.
              </p>
            </Link>
          </div>
        </section>

        {/* Back link */}
        <section className="mt-8">
          <Link href="/blog" className="text-sm font-semibold text-blue-700 hover:underline">
            ← Back to blog
          </Link>
        </section>
      </div>
    </main>
  );
}
