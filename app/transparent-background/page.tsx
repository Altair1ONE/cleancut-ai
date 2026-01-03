import Link from "next/link";
import { SeoFaq } from "../../components/SeoFaq";

export const metadata = {
  title: "Make Background Transparent (Free PNG, No Watermark)",
  description:
    "Make any image background transparent online for free. Export clean transparent PNGs with no watermark using CleanCut AI by Xevora.",
};

export default function TransparentBackgroundPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <section className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900/40 p-8 md:p-12">
        <h1 className="text-3xl font-bold text-white md:text-5xl">
          Make Image Background Transparent (Free PNG)
        </h1>

        <p className="mt-4 max-w-3xl text-slate-300">
          CleanCut AI lets you make any image background{" "}
          <strong>transparent</strong> in seconds. Upload a photo and download a
          clean <strong>transparent PNG</strong> — no watermark, no design tools
          required.
        </p>

        <div className="mt-6">
          <Link
            href="/app"
            className="inline-flex rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-600"
          >
            Make Background Transparent
          </Link>
        </div>

        <ul className="mt-8 grid gap-3 text-sm text-slate-300 md:grid-cols-2">
          <li>✔ Export transparent PNG instantly</li>
          <li>✔ No watermark (even free)</li>
          <li>✔ Batch background removal</li>
          <li>✔ Clean edges for products & creators</li>
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold text-white">
          How to make a transparent background
        </h2>

        <ol className="mt-4 list-decimal space-y-3 pl-6 text-slate-300">
          <li>Upload your image (PNG, JPG, or WEBP).</li>
          <li>Click <strong>Process</strong> and choose Fast or Quality mode.</li>
          <li>Download your <strong>transparent PNG</strong>.</li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold text-white">
          Who is this for?
        </h2>
        <p className="mt-3 max-w-3xl text-slate-300">
          This transparent background tool is perfect for e-commerce sellers,
          designers, marketers, and creators who need clean PNG cutouts without
          watermarks.
        </p>
      </section>

      <SeoFaq />
    </main>
  );
}
