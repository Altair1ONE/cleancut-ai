import type { Metadata } from "next";
import ContactClient from "../../components/ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Xevora for support, refunds, or inquiries about CleanCut AI.",
  alternates: {
    canonical: "https://xevora.org/cleancut/contact",
  },
};

export default function ContactPage() {
  // ✅ change this to your real support email
  const SUPPORT_EMAIL = "support@xevora.org";

  return <ContactClient supportEmail={SUPPORT_EMAIL} />;
}
