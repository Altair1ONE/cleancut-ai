import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import TrialPopup from "../components/TrialPopup";
import WelcomeBar from "../components/WelcomeBar";
import Footer from "../components/Footer";
import { AuthProvider } from "../components/AuthProvider";
import Script from "next/script";

const SITE_URL = "https://xevora.org";
const BASE_PATH = "/cleancut";
const OG_DEFAULT = `${SITE_URL}${BASE_PATH}/og-default.png`;

export const metadata: Metadata = {
  metadataBase: new URL("https://xevora.org"),
  alternates: {
    canonical: "https://xevora.org/cleancut",
    types: {
      "application/rss+xml": "https://xevora.org/cleancut/feed.xml",
    },
  },

  title: {
    default: "Make Background Transparent (Free PNG, No Watermark) | CleanCut AI",
    template: "%s | CleanCut AI by Xevora",
  },

  description:
    "Make any image background transparent in seconds with CleanCut AI by Xevora. Export clean transparent PNGs (no watermark), remove backgrounds in batch, and get crisp edges for e-commerce, creators, and marketing.",

  icons: {
    icon: "/cleancut/favicon.ico",
    apple: "/cleancut/apple-touch-icon.png",
  },
  manifest: "/cleancut/manifest.webmanifest",

  keywords: [
    "transparent background",
    "make background transparent",
    "transparent png",
    "png transparent background",
    "remove background to transparent",
    "free transparent png",
    "background remover no watermark",
    "AI background remover",
    "remove background from image",
    "remove image background online",
    "product photo background removal",
    "remove background for ecommerce",
  ],

  authors: [{ name: "Xevora" }],
  creator: "Xevora",
  publisher: "Xevora",

  robots: { index: true, follow: true },

  openGraph: {
    type: "website",
    url: `${SITE_URL}${BASE_PATH}`,
    title: "Make Background Transparent (PNG, No Watermark) – CleanCut AI",
    description:
      "Turn photos into clean transparent PNGs in seconds. No watermark, batch processing, and crisp edges—CleanCut AI by Xevora.",
    siteName: "CleanCut AI",
    images: [
      {
        url: OG_DEFAULT,
        width: 1200,
        height: 630,
        alt: "CleanCut AI – Make background transparent (PNG)",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Make Background Transparent – CleanCut AI",
    description:
      "Remove backgrounds and export transparent PNGs in seconds. No watermark, batch processing, clean edges.",
    images: [OG_DEFAULT],
  },
};

function GlobalJsonLd() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Xevora",
    url: SITE_URL,
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

      {/* Premium light foundation */}
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {/* Subtle background accents (non-cheesy, designer feel) */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -left-32 -top-40 h-[420px] w-[420px] rounded-full bg-indigo-200/50 blur-3xl" />
          <div className="absolute -right-32 -top-40 h-[420px] w-[420px] rounded-full bg-fuchsia-200/40 blur-3xl" />
          <div className="absolute bottom-[-220px] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-sky-200/30 blur-3xl" />
        </div>

        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <WelcomeBar />
            <TrialPopup />

            {/* Keeps footer pinned nicely */}
            <div className="flex-1">{children}</div>

            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
