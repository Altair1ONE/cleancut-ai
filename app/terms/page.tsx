import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for CleanCut AI by Xevora. Understand your rights, responsibilities, and acceptable use when using our AI background removal service.",
  alternates: { canonical: "https://xevora.org/cleancut/terms" },
};

export default function TermsPage() {
  return (
    <main className="relative mx-auto max-w-4xl px-4 py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
        <h1 className="text-3xl font-bold text-white">Terms of Service</h1>

        <p className="mt-4 text-slate-300">
          These Terms of Service (“Terms”) govern your use of CleanCut AI, a web-based
          background removal tool operated by Xevora (“we”, “us”, “our”). By accessing
          or using the service, you agree to these Terms.
        </p>

        <div className="mt-8 space-y-6 text-slate-300">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-5">
            <h2 className="text-xl font-semibold text-white">1. What CleanCut AI does</h2>
            <p className="mt-2">
              CleanCut AI lets you upload images and generates processed results, such as
              transparent PNG files with the background removed.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-5">
            <h2 className="text-xl font-semibold text-white">2. Your responsibilities</h2>
            <p className="mt-2">
              You agree not to upload content that is illegal, harmful, or that you do not
              have permission to use. You are responsible for the images you upload and how
              you use the outputs.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-5">
            <h2 className="text-xl font-semibold text-white">3. Accounts, plans & limits</h2>
            <p className="mt-2">
              Some features require an account. Your plan may include usage limits (credits)
              and batch limits. Abuse (including excessive automation that harms service
              performance) may result in throttling or account suspension to protect the platform.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-5">
            <h2 className="text-xl font-semibold text-white">4. Intellectual property</h2>
            <p className="mt-2">
              CleanCut AI, its software, design, branding, and content are owned by Xevora.
              You may not copy, resell, or reverse engineer the service without written permission.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-5">
            <h2 className="text-xl font-semibold text-white">5. Service availability</h2>
            <p className="mt-2">
              We aim to keep CleanCut AI available and reliable, but the service is provided
              on an “as is” basis. We do not guarantee uninterrupted, error-free operation.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-5">
            <h2 className="text-xl font-semibold text-white">6. Changes to these Terms</h2>
            <p className="mt-2">
              We may update these Terms from time to time. If you continue using the service
              after changes, you accept the updated Terms.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-5">
            <h2 className="text-xl font-semibold text-white">7. Contact</h2>
            <p className="mt-2">
              For questions about these Terms, please contact us via the Support page.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
