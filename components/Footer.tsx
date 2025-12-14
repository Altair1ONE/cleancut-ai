import Link from "next/link";
import { blogPosts } from "../lib/blogPosts";
import { useCases } from "../lib/useCases";

export default function Footer() {
  const latestPosts = [...blogPosts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);

  const popularUseCases = useCases.slice(0, 6);

  return (
    <footer className="mt-16 border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="text-sm font-bold text-white">
              CleanCut AI <span className="text-slate-400">by</span>{" "}
              <span className="text-indigo-300">Xevora</span>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              AI background removal with transparent PNG export, batch
              processing, and simple pricing.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/app"
                className="rounded-full bg-indigo-500 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-600"
              >
                Open App
              </Link>
              <Link
                href="/pricing"
                className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 hover:border-slate-500"
              >
                Pricing
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <div className="text-sm font-semibold text-white">Product</div>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>
                <Link className="hover:text-white" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/app">
                  Background Remover App
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/pricing">
                  Pricing & Plans
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/blog">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular use cases */}
          <div>
            <div className="text-sm font-semibold text-white">Use cases</div>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {popularUseCases.map((u) => (
                <li key={u.slug}>
                  <Link
                    className="hover:text-white"
                    href={`/use-cases/${u.slug}`}
                  >
                    {u.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Latest blog posts */}
          <div>
            <div className="text-sm font-semibold text-white">Latest guides</div>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {latestPosts.map((p) => (
                <li key={p.slug}>
                  <Link className="hover:text-white" href={`/blog/${p.slug}`}>
                    {p.title}
                  </Link>
                  <div className="text-xs text-slate-500">{p.date}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
  <Link className="hover:text-slate-300" href="/terms">
    Terms
  </Link>
  <Link className="hover:text-slate-300" href="/privacy">
    Privacy
  </Link>
  <Link className="hover:text-slate-300" href="/refund">
    Refunds
  </Link>
</div>


        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} Xevora. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-4">
            <Link className="hover:text-slate-300" href="/blog">
              Learn
            </Link>
            <Link className="hover:text-slate-300" href="/pricing">
              Plans
            </Link>
            <Link className="hover:text-slate-300" href="/app">
              App
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
