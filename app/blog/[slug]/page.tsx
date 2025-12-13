import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts } from "../../../lib/blogPosts";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `https://xevora.org/cleancut/blog/${post.slug}`,
    },
  };
}

function ArticleJsonLd({
  title,
  description,
  date,
  url,
}: {
  title: string;
  description: string;
  date: string;
  url: string;
}) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    author: [{ "@type": "Organization", name: "Xevora" }],
    publisher: { "@type": "Organization", name: "Xevora" },
    mainEntityOfPage: url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  const canonical = `https://xevora.org/cleancut/blog/${post.slug}`;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        date={post.date}
        url={canonical}
      />

      <header className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="mt-3 text-2xl font-bold text-white md:text-4xl">
          {post.title}
        </h1>

        <p className="mt-3 text-slate-300">{post.description}</p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/app"
            className="rounded-full bg-indigo-500 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-600"
          >
            Open App
          </Link>
          <Link
            href="/pricing"
            className="rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500"
          >
            Pricing
          </Link>
        </div>
      </header>

      <article className="mt-8 space-y-5 text-slate-200">
        {post.content.map((para, i) => (
          <p key={i} className="leading-relaxed text-slate-200">
            {para}
          </p>
        ))}

        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="text-lg font-semibold text-white">
            Try background removal in seconds
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Upload an image and export a clean transparent PNG instantly. No watermark.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/app"
              className="rounded-full bg-indigo-500 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-600"
            >
              Try CleanCut AI
            </Link>
            <Link
              href="/blog"
              className="rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
