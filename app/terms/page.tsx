import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for CleanCut AI by Xevora. Understand your rights, responsibilities, and acceptable use when using our AI background removal service.",
  alternates: { canonical: "https://xevora.org/cleancut/terms" },
};

export default function TermsPage() {
  return (
    <main className="cc-bg">
      <div className="cc-container py-10">
        <section className="card p-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
            Terms of Service
          </h1>

          <p className="mt-4 text-sm text-slate-600">
            These Terms of Service (“Terms”) govern your use of CleanCut AI, a web-based
            background removal tool operated by Xevora (“we”, “us”, “our”). By accessing
            or using the service, you agree to these Terms.
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <h2 className="text-base font-semibold text-slate-900">1. What CleanCut AI does</h2>
              <p className="mt-2 text-sm text-slate-700">
                CleanCut AI lets you upload images and generates processed results, such as
                transparent PNG files with the background removed.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">2. Your responsibilities</h2>
              <p className="mt-2 text-sm text-slate-700">
                You agree not to upload content that is illegal, harmful, or that you do not
                have permission to use. You are responsible for the images you upload and how
                you use the outputs.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">3. Accounts, plans &amp; limits</h2>
              <p className="mt-2 text-sm text-slate-700">
                Some features require an account. Your plan may include usage limits (credits)
                and batch limits. Abuse (including excessive automation that harms service
                performance) may result in throttling or account suspension to protect the platform.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">4. Intellectual property</h2>
              <p className="mt-2 text-sm text-slate-700">
                CleanCut AI, its software, design, branding, and content are owned by Xevora.
                You may not copy, resell, or reverse engineer the service without written permission.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">5. Service availability</h2>
              <p className="mt-2 text-sm text-slate-700">
                We aim to keep CleanCut AI available and reliable, but the service is provided
                on an “as is” basis. We do not guarantee uninterrupted, error-free operation.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">6. Changes to these Terms</h2>
              <p className="mt-2 text-sm text-slate-700">
                We may update these Terms from time to time. If you continue using the service
                after changes, you accept the updated Terms.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">7. Contact</h2>
              <p className="mt-2 text-sm text-slate-700">
                For questions about these Terms, please contact us via the Support page.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
