import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for CleanCut AI by Xevora. Understand your rights, responsibilities, and acceptable use when using our AI background removal service.",
  alternates: { canonical: "https://xevora.org/cleancut/terms" },
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Terms of Service</h1>

      <p className="mt-4 text-slate-300">
        These Terms of Service (“Terms”) govern your use of CleanCut AI, a web-based
        background removal tool operated by Xevora (“we”, “us”, “our”). By accessing
        or using the service, you agree to these Terms.
      </p>

      <section className="mt-8 space-y-4 text-slate-300">
        <h2 className="text-xl font-semibold text-white">1. What CleanCut AI does</h2>
        <p>
          CleanCut AI lets you upload images and generates processed results, such as
          transparent PNG files with the background removed.
        </p>

        <h2 className="text-xl font-semibold text-white">2. Your responsibilities</h2>
        <p>
          You agree not to upload content that is illegal, harmful, or that you do not
          have permission to use. You are responsible for the images you upload and how
          you use the outputs.
        </p>

        <h2 className="text-xl font-semibold text-white">3. Accounts, plans & limits</h2>
        <p>
          Some features require an account. Your plan may include usage limits (credits)
          and batch limits. Abuse (including excessive automation that harms service
          performance) may result in throttling or account suspension to protect the platform.
        </p>

        <h2 className="text-xl font-semibold text-white">4. Intellectual property</h2>
        <p>
          CleanCut AI, its software, design, branding, and content are owned by Xevora.
          You may not copy, resell, or reverse engineer the service without written permission.
        </p>

        <h2 className="text-xl font-semibold text-white">5. Service availability</h2>
        <p>
          We aim to keep CleanCut AI available and reliable, but the service is provided
          on an “as is” basis. We do not guarantee uninterrupted, error-free operation.
        </p>

        <h2 className="text-xl font-semibold text-white">6. Changes to these Terms</h2>
        <p>
          We may update these Terms from time to time. If you continue using the service
          after changes, you accept the updated Terms.
        </p>

        <h2 className="text-xl font-semibold text-white">7. Contact</h2>
        <p>
          For questions about these Terms, please contact us via the Support page.
        </p>
      </section>
    </main>
  );
}
