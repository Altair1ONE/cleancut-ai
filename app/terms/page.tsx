import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for CleanCut AI by Xevora. Learn the rules, responsibilities, and usage terms of our AI background removal service.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Terms of Service</h1>

      <p className="mt-4 text-slate-300">
        Welcome to CleanCut AI, a service operated by Xevora. By accessing or
        using our website and services, you agree to these Terms of Service.
        Please read them carefully.
      </p>

      <section className="mt-8 space-y-4 text-slate-300">
        <h2 className="text-xl font-semibold text-white">1. Service Description</h2>
        <p>
          CleanCut AI provides AI-powered background removal tools that allow
          users to upload images and export processed results such as transparent
          PNG files.
        </p>

        <h2 className="text-xl font-semibold text-white">2. User Responsibilities</h2>
        <p>
          You agree not to upload illegal, harmful, or copyrighted content that
          you do not have permission to use. You are solely responsible for the
          images you upload.
        </p>

        <h2 className="text-xl font-semibold text-white">3. Accounts & Usage</h2>
        <p>
          Some features may require account registration. Usage limits apply
          based on your selected plan. Abuse or excessive automated usage may
          result in account suspension.
        </p>

        <h2 className="text-xl font-semibold text-white">4. Intellectual Property</h2>
        <p>
          CleanCut AI, its design, branding, and software are the intellectual
          property of Xevora. You may not copy or resell the service without
          permission.
        </p>

        <h2 className="text-xl font-semibold text-white">5. Disclaimer</h2>
        <p>
          The service is provided “as is” without warranties of any kind. We do
          not guarantee uninterrupted or error-free operation.
        </p>

        <h2 className="text-xl font-semibold text-white">6. Changes to Terms</h2>
        <p>
          We may update these Terms from time to time. Continued use of the
          service means you accept the updated Terms.
        </p>

        <h2 className="text-xl font-semibold text-white">7. Contact</h2>
        <p>
          If you have any questions about these Terms, please contact us through
          the website.
        </p>
      </section>
    </main>
  );
}
