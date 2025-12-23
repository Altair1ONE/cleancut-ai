import type { Metadata } from "next";
import ContactClient from "../../components/ContactClient";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with CleanCut AI (Xevora): support, billing questions, refunds, and account assistance.",
  alternates: {
    canonical: "https://xevora.org/cleancut/contact",
  },
};

export default function ContactPage() {
  const SUPPORT_EMAIL = "support@xevora.org";
  return <ContactClient supportEmail={SUPPORT_EMAIL} />;
}
