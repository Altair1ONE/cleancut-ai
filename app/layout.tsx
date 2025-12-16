import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import WelcomeBar from "../components/WelcomeBar";
import Footer from "../components/Footer";
import { AuthProvider } from "../components/AuthProvider";
import Script from "next/script";

const SITE_URL = "https://xevora.org";
const BASE_PATH = "/cleancut";
const OG_DEFAULT = `${SITE_URL}${BASE_PATH}/og-default.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: `${SITE_URL}${BASE_PATH}`,
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
    url: `${SITE_URL}${BASE_PATH}`,
    title: "CleanCut AI – Remove Image Background Online",
    description:
      "Create clean, transparent PNGs in seconds. AI-powered background remover with no watermark. Built by Xevora.",
    siteName: "CleanCut AI",
    images: [
      {
        url: OG_DEFAULT,
        width: 1200,
        height: 630,
        alt: "CleanCut AI – Remove Image Background Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CleanCut AI – Remove Image Background Online",
    description: "Fast AI background removal. Transparent PNGs, HD quality, no watermark.",
    images: [OG_DEFAULT],
  },
};

function GlobalJsonLd() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Xevora",
    url: SITE_URL,
    // Optional: add if you have a logo file
    // logo: `${SITE_URL}${BASE_PATH}/logo.png`,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CleanCut AI by Xevora",
    url: `${SITE_URL}${BASE_PATH}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <GlobalJsonLd />

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
