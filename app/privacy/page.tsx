import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for CleanCut AI by Xevora. Learn what data we collect, how image processing works, and how we protect your information.",
  alternates: { canonical: "https://xevora.org/cleancut/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>

      <p className="mt-4 text-slate-300">
        This Privacy Policy explains how CleanCut AI by Xevora collects, uses, and protects
        information when you use our background removal service.
      </p>

      <section className="mt-8 space-y-4 text-slate-300">
        <h2 className="text-xl font-semibold text-white">1. Information we collect</h2>
        <p>
          We may collect basic account information (such as your email address) and usage
          information to operate the service. If you upload images, those images are used
          to provide the background removal output.
        </p>

        <h2 className="text-xl font-semibold text-white">2. Image processing</h2>
        <p>
          Uploaded images are processed only to generate your results. We do not sell your
          uploaded images. We aim to keep processing private and secure.
        </p>

        <h2 className="text-xl font-semibold text-white">3. Cookies & analytics</h2>
        <p>
          We may use cookies and analytics (for example, to understand traffic and improve performance).
          Analytics does not exist to personally identify you—it's used to improve the product.
        </p>

        <h2 className="text-xl font-semibold text-white">4. Third-party services</h2>
        <p>
          We may rely on third-party providers for infrastructure, authentication, and payments.
          These providers process data under their own privacy policies.
        </p>

        <h2 className="text-xl font-semibold text-white">5. Data security</h2>
        <p>
          We take reasonable measures to protect your data. However, no system is 100% secure.
          Please use the service responsibly and avoid uploading content you are not authorized to share.
        </p>

        <h2 className="text-xl font-semibold text-white">6. Changes</h2>
        <p>
          We may update this Privacy Policy occasionally. Continued use of the service means
          acceptance of the updated policy.
        </p>
      </section>
    </main>
  );
}
