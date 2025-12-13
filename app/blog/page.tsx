import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "../../lib/blogPosts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "SEO guides and tutorials on background removal, transparent PNG, e-commerce images, and content creation. CleanCut AI by Xevora.",
  alternates: {
    canonical: "https://xevora.org/cleancut/blog",
  },
};

export default function BlogIndexPage() {
  const posts = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 md:p-12">
        <h1 className="text-3xl font-bold text-white md:text-5xl">
          Blog — tutorials for better images
        </h1>
        <p className="mt-4 max-w-3xl text-slate-300">
          Practical guides on removing backgrounds, exporting transparent PNGs,
          and creating e-commerce ready images. Each post includes quick steps
          you can apply immediately.
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
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group rounded-3xl border border-slate-800 bg-slate-900/40 p-6 hover:border-slate-600"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{p.date}</span>
              <span>{p.readTime}</span>
            </div>
            <h2 className="mt-3 text-lg font-semibold text-white group-hover:text-indigo-300">
              {p.title}
            </h2>
            <p className="mt-2 text-sm text-slate-300">{p.description}</p>

            <div className="mt-4 text-sm font-semibold text-indigo-300">
              Read article →
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
