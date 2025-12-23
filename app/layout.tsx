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
    default: "CleanCut AI – Background Remover (No Watermark) | Xevora",
    template: "%s | CleanCut AI by Xevora",
  },

  description:
    "Remove backgrounds from images in seconds with CleanCut AI. Export transparent PNGs with no watermark, process in batch, and get clean edges for e-commerce, creators, and teams.",

  icons: {
    icon: "/cleancut/favicon.ico",
    apple: "/cleancut/apple-touch-icon.png",
  },
  manifest: "/cleancut/manifest.webmanifest",

  keywords: [
    "AI background remover",
    "remove background from image",
    "remove image background online",
    "transparent PNG",
    "background remover no watermark",
    "free background remover",
    "product photo background removal",
    "remove background for ecommerce",
    "background remover for thumbnails",
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
    title: "CleanCut AI – Remove Image Backgrounds (No Watermark)",
    description:
      "Fast AI background remover for clean transparent PNG exports. Batch processing, clean edges, and simple pricing—by Xevora.",
    siteName: "CleanCut AI",
    images: [
      {
        url: OG_DEFAULT,
        width: 1200,
        height: 630,
        alt: "CleanCut AI – AI Background Remover by Xevora",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "CleanCut AI – AI Background Remover",
    description:
      "Remove image backgrounds in seconds. Transparent PNG export, batch processing, and watermark-free results.",
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

      <body className="bg-slate-950 text-white">
        <AuthProvider>
          <Navbar />
          <WelcomeBar />
          <TrialPopup />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
