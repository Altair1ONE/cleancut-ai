import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import WelcomeBar from "../components/WelcomeBar";
import Footer from "../components/Footer";
import { AuthProvider } from "../components/AuthProvider";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://xevora.org"),
  title: {
    default: "CleanCut AI – Remove Image Background Online | Xevora",
    template: "%s | CleanCut AI by Xevora",
  },
  description:
    "Remove image backgrounds instantly using AI. CleanCut AI by Xevora lets you create transparent PNGs in HD with no watermark. Fast, free, and professional background removal online.",
  keywords: [
    "background remover",
    "remove background",
    "remove background from image",
    "AI background removal",
    "transparent PNG",
    "remove image background online",
    "background remover free",
    "no watermark background remover",
  ],
  authors: [{ name: "Xevora" }],
  creator: "Xevora",
  publisher: "Xevora",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://xevora.org/cleancut",
    title: "CleanCut AI – Remove Image Background Online",
    description:
      "Create clean, transparent PNGs in seconds. AI-powered background remover with no watermark. Built by Xevora.",
    siteName: "CleanCut AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "CleanCut AI – Remove Image Background Online",
    description:
      "Fast AI background removal. Transparent PNGs, HD quality, no watermark.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">
        <AuthProvider>
          <Navbar />
          <WelcomeBar />
          {children}
          <Footer />
        </AuthProvider>

        {/* Google Analytics (GA4) */}
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
