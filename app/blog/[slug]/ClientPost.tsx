"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { BLOG_POSTS, getPostBySlug } from "../../../lib/blogPosts";

function JsonLd({ post }: { post: ReturnType<typeof getPostBySlug> }) {
  if (!post) return null;

  const canonical = `https://xevora.org/cleancut${post.canonicalPath}`;

  const json: any = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "Xevora" },
    mainEntityOfPage: canonical,
    url: canonical,
  };

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

// Very small “markdown-ish” renderer (keeps it simple + safe)
function renderParagraphs(content: string) {
  const lines = content.trim().split("\n");
  const blocks: { type: "h2" | "h3" | "p" | "li" | "hr"; text: string }[] = [];

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    if (line.startsWith("## ")) blocks.push({ type: "h2", text: line.slice(3) });
    else if (line.startsWith("### ")) blocks.push({ type: "h3", text: line.slice(4) });
    else if (line.startsWith("- ")) blocks.push({ type: "li", text: line.slice(2) });
    else if (line === "---") blocks.push({ type: "hr", text: "" });
    else blocks.push({ type: "p", text: line });
  }

  return blocks;
}

export default function ClientPost({ initialSlug }: { initialSlug?: string }) {
  const params = useParams();

  // ✅ Works even if server params are missing:
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

  const blocks = renderParagraphs(post.content);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd post={post} />

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

      {/* Internal linking */}
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
    </main>
  );
}
