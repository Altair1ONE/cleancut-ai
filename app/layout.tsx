import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import WelcomeBar from "../components/WelcomeBar";
import Footer from "../components/Footer";
import { AuthProvider } from "../components/AuthProvider";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://xevora.org"),
  alternates: {
  canonical: "https://xevora.org/cleancut",
},

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
  images: [
    {
      url: "https://xevora.org/cleancut/og-default.png",
      width: 1200,
      height: 630,
      alt: "CleanCut AI – Remove Image Background Online",
    },
  ],
},


  twitter: {
  card: "summary_large_image",
  title: "CleanCut AI – Remove Image Background Online",
  description:
    "Fast AI background removal. Transparent PNGs, HD quality, no watermark.",
  images: ["https://xevora.org/cleancut/og-default.png"],
},
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZP7P4QLKL6"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZP7P4QLKL6');

          `}
        </Script>
      </head>

      <body className="bg-slate-950 text-white">
        <AuthProvider>
          <Navbar />
          <WelcomeBar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
