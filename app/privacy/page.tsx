import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for CleanCut AI by Xevora. Learn what data we collect, how image processing works, and how we protect your information.",
  alternates: { canonical: "https://xevora.org/cleancut/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="cc-bg">
      <div className="cc-container py-10">
        <section className="card p-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm text-slate-600">
            This Privacy Policy explains how CleanCut AI by Xevora collects, uses, and protects
            information when you use our background removal service.
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                1. Information we collect
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                We may collect basic account information (such as your email address) and usage
                information to operate the service. If you upload images, those images are used
                to provide the background removal output.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                2. Image processing
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                Uploaded images are processed only to generate your results. We do not sell your
                uploaded images. We aim to keep processing private and secure.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                3. Cookies &amp; analytics
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                We may use cookies and analytics (for example, to understand traffic and improve performance).
                Analytics does not exist to personally identify you—it's used to improve the product.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                4. Third-party services
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                We may rely on third-party providers for infrastructure, authentication, and payments.
                These providers process data under their own privacy policies.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                5. Data security
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                We take reasonable measures to protect your data. However, no system is 100% secure.
                Please use the service responsibly and avoid uploading content you are not authorized to share.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                6. Changes
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                We may update this Privacy Policy occasionally. Continued use of the service means
                acceptance of the updated policy.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
