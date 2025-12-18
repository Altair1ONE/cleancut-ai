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

      // Small boost for newer posts (tie-breaker)
      const score = shared + catMatch;

      return { post: p, score };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      // tie-breaker: newest first
      return a.post.date < b.post.date ? 1 : -1;
    });

  // Only show truly related; otherwise fallback to latest
  const top = scored.filter((x) => x.score > 0).slice(0, 3).map((x) => x.post);
  if (top.length >= 2) return top;

  return BLOG_POSTS
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);
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
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold text-white">Post not found</h1>
        <Link href="/blog" className="mt-4 inline-block text-indigo-300 hover:underline">
          Back to blog
        </Link>
      </main>
    );
  }

  const canonical = `https://xevora.org/cleancut${post.canonicalPath}`;
  const blocks = renderParagraphs(post.content);

  const related = getRelatedPosts(post.slug);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd post={post} />
      <BreadcrumbJsonLd url={canonical} title={post.title} />

      <div className="text-xs text-slate-400">
        {new Date(post.date).toLocaleDateString()} • {post.category} • by {post.author}
      </div>

      <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
        {post.title}
      </h1>

      <p className="mt-4 text-base text-slate-300">{post.description}</p>

      <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
        <div className="flex flex-wrap gap-2">
          {post.keywords.map((k) => (
            <span
              key={k}
              className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300"
            >
              {k}
            </span>
          ))}
        </div>
      </div>

      <article className="prose prose-invert mt-8 max-w-none">
        <div className="space-y-4">
          {blocks.map((b, idx) => {
            if (b.type === "h2")
              return (
                <h2 key={idx} className="mt-8 text-xl font-semibold text-white">
                  {b.text}
                </h2>
              );
            if (b.type === "h3")
              return (
                <h3 key={idx} className="mt-6 text-lg font-semibold text-white">
                  {b.text}
                </h3>
              );
            if (b.type === "li")
              return (
                <div key={idx} className="flex gap-2 text-slate-300">
                  <span className="text-green-400">✓</span>
                  <span>{b.text}</span>
                </div>
              );
            if (b.type === "hr")
              return <hr key={idx} className="my-6 border-slate-800" />;
            return (
              <p key={idx} className="text-slate-300 leading-7">
                {b.text
                  .split("**")
                  .map((part, i) =>
                    i % 2 === 1 ? (
                      <strong key={i} className="text-white">
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

      {/* Internal linking (existing section) */}
      <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-lg font-semibold text-white">Try it now</h2>
        <p className="mt-2 text-sm text-slate-300">
          Remove backgrounds and export transparent PNGs in seconds.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/app"
            className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-600"
          >
            Open App
          </Link>
          <Link
            href="/pricing"
            className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500"
          >
            Pricing
          </Link>
          <Link
            href="/blog"
            className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500"
          >
            More Blog Posts
          </Link>
        </div>
      </section>

      {/* ✅ Added: Related posts block */}
      {related.length > 0 && (
        <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="text-lg font-semibold text-white">Related posts</h2>
          <p className="mt-2 text-sm text-slate-300">
            Keep reading — these articles are closely related to this topic.
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 hover:border-slate-600"
              >
                <div className="text-xs text-slate-400">
                  {new Date(p.date).toLocaleDateString()} • {p.category}
                </div>
                <div className="mt-2 text-sm font-semibold text-white">
                  {p.title}
                </div>
                <p className="mt-2 text-sm text-slate-300 line-clamp-3">
                  {p.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ✅ Added: “Read next” block (strong internal links, no logic change elsewhere) */}
      <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-lg font-semibold text-white">Read next</h2>
        <p className="mt-2 text-sm text-slate-300">
          Want to apply this right now? Start removing backgrounds, or explore high-intent use cases.
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <Link
            href="/app"
            className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 hover:border-slate-600"
          >
            <div className="text-sm font-semibold text-white">Open the remover</div>
            <p className="mt-2 text-sm text-slate-300">
              Upload an image and export a transparent PNG in seconds.
            </p>
          </Link>

          <Link
            href="/use-cases/shopify-product-photos"
            className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 hover:border-slate-600"
          >
            <div className="text-sm font-semibold text-white">Shopify product photos</div>
            <p className="mt-2 text-sm text-slate-300">
              Build clean, consistent listings and catalog images.
            </p>
          </Link>

          <Link
            href="/pricing"
            className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 hover:border-slate-600"
          >
            <div className="text-sm font-semibold text-white">View pricing</div>
            <p className="mt-2 text-sm text-slate-300">
              Bigger batches and premium modes when you need them.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
