import Link from "next/link";
import { BLOG_POSTS } from "../lib/blogPosts";
import { useCases } from "../lib/use-cases";

export default function Footer() {
  const latestPosts = [...BLOG_POSTS]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);

  const popularUseCases = useCases.slice(0, 6);

  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="cc-container py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white shadow-sm">
                CC
              </div>
              <div>
                <div className="text-[15px] font-extrabold tracking-tight text-slate-900">
                  CleanCut <span className="text-blue-600">AI</span>
                </div>
                <div className="text-xs text-slate-500">by Xevora</div>
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-600">
              Remove backgrounds in seconds and download clean transparent PNGs—watermark-free.
              Built for product photos, creators, and marketing.
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                Watermark-free exports
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                Transparent PNG
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                Batch supported
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/app"
                className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                Try Free
              </Link>
              <Link
                href="/pricing"
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-300"
              >
                View Pricing
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <div className="text-sm font-semibold text-slate-900">Product</div>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <Link className="hover:text-slate-900" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-slate-900" href="/app">
                  Background Remover
                </Link>
              </li>
              <li>
                <Link className="hover:text-slate-900" href="/pricing">
                  Pricing & Plans
                </Link>
              </li>
              <li>
                <Link className="hover:text-slate-900" href="/blog">
                  Guides & Blog
                </Link>
              </li>
              <li>
                <Link className="hover:text-slate-900" href="/contact">
                  Support / Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular use cases */}
          <div>
            <div className="text-sm font-semibold text-slate-900">Use cases</div>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {popularUseCases.map((u) => (
                <li key={u.slug}>
                  <Link className="hover:text-slate-900" href={`/use-cases/${u.slug}`}>
                    {u.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Latest blog posts */}
          <div>
            <div className="text-sm font-semibold text-slate-900">Latest guides</div>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {latestPosts.map((p) => (
                <li key={p.slug}>
                  <Link className="hover:text-slate-900" href={`/blog/${p.slug}`}>
                    {p.title}
                  </Link>
                  <div className="text-xs text-slate-400">{p.date}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-7 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Xevora. All rights reserved.</div>

          <div className="flex flex-wrap gap-4">
            <Link className="hover:text-slate-700" href="/terms">
              Terms
            </Link>
            <Link className="hover:text-slate-700" href="/privacy">
              Privacy
            </Link>
            <Link className="hover:text-slate-700" href="/refund">
              Refunds
            </Link>
            <Link className="hover:text-slate-700" href="/contact">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
