import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for CleanCut AI by Xevora. Learn what data we collect, how image processing works, and how we protect your information.",
  alternates: { canonical: "https://xevora.org/cleancut/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="relative mx-auto max-w-4xl px-4 py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
        <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>

        <p className="mt-4 text-slate-300">
          This Privacy Policy explains how CleanCut AI by Xevora collects, uses, and protects
          information when you use our background removal service.
        </p>

        <div className="mt-8 space-y-6 text-slate-300">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-5">
            <h2 className="text-xl font-semibold text-white">1. Information we collect</h2>
            <p className="mt-2">
              We may collect basic account information (such as your email address) and usage
              information to operate the service. If you upload images, those images are used
              to provide the background removal output.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-5">
            <h2 className="text-xl font-semibold text-white">2. Image processing</h2>
            <p className="mt-2">
              Uploaded images are processed only to generate your results. We do not sell your
              uploaded images. We aim to keep processing private and secure.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-5">
            <h2 className="text-xl font-semibold text-white">3. Cookies & analytics</h2>
            <p className="mt-2">
              We may use cookies and analytics (for example, to understand traffic and improve performance).
              Analytics does not exist to personally identify you—it's used to improve the product.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-5">
            <h2 className="text-xl font-semibold text-white">4. Third-party services</h2>
            <p className="mt-2">
              We may rely on third-party providers for infrastructure, authentication, and payments.
              These providers process data under their own privacy policies.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-5">
            <h2 className="text-xl font-semibold text-white">5. Data security</h2>
            <p className="mt-2">
              We take reasonable measures to protect your data. However, no system is 100% secure.
              Please use the service responsibly and avoid uploading content you are not authorized to share.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-5">
            <h2 className="text-xl font-semibold text-white">6. Changes</h2>
            <p className="mt-2">
              We may update this Privacy Policy occasionally. Continued use of the service means
              acceptance of the updated policy.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
