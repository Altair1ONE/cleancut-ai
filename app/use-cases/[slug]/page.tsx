import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { useCases } from "../../../lib/useCases";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return useCases.map((u) => ({ slug: u.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const uc = useCases.find((u) => u.slug === params.slug);
  if (!uc) return {};
  return {
    title: uc.title,
    description: uc.description,
    alternates: { canonical: `https://xevora.org/cleancut/use-cases/${uc.slug}` },
  };
}

function FaqJsonLd({ faq, url }: { faq: { q: string; a: string }[]; url: string }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function UseCasePage({ params }: Props) {
  const uc = useCases.find((u) => u.slug === params.slug);
  if (!uc) return notFound();

  const canonical = `https://xevora.org/cleancut/use-cases/${uc.slug}`;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <FaqJsonLd faq={uc.faq} url={canonical} />

      <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 md:p-12">
        <p className="text-xs text-slate-400">Use case</p>
        <h1 className="mt-2 text-3xl font-bold text-white md:text-5xl">
          {uc.h1}
        </h1>
        <p className="mt-4 max-w-3xl text-slate-300">{uc.intro}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/app"
            className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-600"
          >
            Try CleanCut AI
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
        {uc.bullets.map((b) => (
          <div
            key={b}
            className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 text-slate-300"
          >
            <h2 className="text-sm font-semibold text-white">✓ Benefit</h2>
            <p className="mt-2 text-sm">{b}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
        <h2 className="text-xl font-semibold text-white">FAQ</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {uc.faq.map((f) => (
            <div
              key={f.q}
              className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4"
            >
              <h3 className="text-sm font-semibold text-white">{f.q}</h3>
              <p className="mt-2 text-sm text-slate-300">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 text-sm text-slate-400">
        <Link href="/" className="text-indigo-300 hover:text-indigo-200">
          ← Back to CleanCut AI
        </Link>
      </section>
    </main>
  );
}
