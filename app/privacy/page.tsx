import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for CleanCut AI by Xevora. Learn how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>

      <p className="mt-4 text-slate-300">
        Your privacy is important to us. This Privacy Policy explains how
        CleanCut AI by Xevora collects, uses, and protects your information.
      </p>

      <section className="mt-8 space-y-4 text-slate-300">
        <h2 className="text-xl font-semibold text-white">1. Information We Collect</h2>
        <p>
          We may collect basic account information such as email address, as well
          as images you upload for processing.
        </p>

        <h2 className="text-xl font-semibold text-white">2. Image Processing</h2>
        <p>
          Uploaded images are processed only to provide the background removal
          service. Images are not sold or shared with third parties.
        </p>

        <h2 className="text-xl font-semibold text-white">3. Cookies & Analytics</h2>
        <p>
          We may use cookies or analytics tools to improve performance and user
          experience. These do not personally identify you.
        </p>

        <h2 className="text-xl font-semibold text-white">4. Data Security</h2>
        <p>
          We take reasonable measures to protect your data, but no system is
          completely secure.
        </p>

        <h2 className="text-xl font-semibold text-white">5. Third-Party Services</h2>
        <p>
          We may use third-party services (such as authentication or payment
          providers). Their data handling is governed by their own policies.
        </p>

        <h2 className="text-xl font-semibold text-white">6. Changes</h2>
        <p>
          This Privacy Policy may be updated from time to time. Continued use of
          the service means acceptance of the updated policy.
        </p>
      </section>
    </main>
  );
}
