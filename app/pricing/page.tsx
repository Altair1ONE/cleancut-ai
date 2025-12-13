// app/pricing/page.tsx
import { PricingTable } from "../../components/PricingTable";

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <section className="card p-5">
        <h1 className="text-2xl font-bold text-white">Pricing</h1>
        <p className="mt-3 text-sm text-slate-300">
          CleanCut AI is designed to be up to <strong>5–10x cheaper</strong>{" "}
          per image than tools like Remove.bg, Adobe, Canva, or ClipDrop, while
          keeping HD quality and no watermark.
        </p>
      </section>

      <section className="mt-6">
        <PricingTable />
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="card p-4 text-xs text-slate-300">
          <h2 className="text-sm font-semibold text-white">
            How we stay cheaper
          </h2>
          <ul className="mt-2 space-y-1">
            <li>• We use open-source models hosted on free infrastructure.</li>
            <li>• We keep it simple: background removal only.</li>
            <li>• We don&apos;t watermark images, even on the free tier.</li>
            <li>• You pay based on realistic monthly usage, not “per pixel”.</li>
          </ul>
        </div>
        <div className="card p-4 text-xs text-slate-300">
          <h2 className="text-sm font-semibold text-white">
            Example comparison
          </h2>
          <ul className="mt-2 space-y-1">
            <li>• Remove.bg: often ~$0.10–0.23 per image on small plans.</li>
            <li>• ClipDrop / Canva: bundled into expensive subscriptions.</li>
            <li>
              • CleanCut AI Pro Monthly: 1000 credits for $4.99 → as low as
              ~$0.005 per image.
            </li>
            <li>
              • Lifetime: after a few months of use, you usually pay less than
              1–2 months of competitors.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
