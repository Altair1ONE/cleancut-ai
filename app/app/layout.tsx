import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "App",
  description:
    "Upload an image and remove the background instantly. Export transparent PNG with no watermark using CleanCut AI by Xevora.",
  alternates: {
    canonical: "https://xevora.org/cleancut/app",
  },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
