import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import TrialPopup from "../components/TrialPopup";
import WelcomeBar from "../components/WelcomeBar";
import Footer from "../components/Footer";
import Script from "next/script";
import { Inter, Sora } from "next/font/google";
import ProvidersGate from "../components/ProvidersGate";

const SITE_URL = "https://xevora.org";
const BASE_PATH = "/cleancut";
const OG_DEFAULT = `${SITE_URL}${BASE_PATH}/og-default.png`;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xevora.org"),
  alternates: {
    canonical: "https://xevora.org/cleancut",
    types: { "application/rss+xml": "https://xevora.org/cleancut/feed.xml" },
  },
  title: {
    default: "Make Background Transparent (Free PNG, No Watermark) | CleanCut AI",
    template: "%s | CleanCut AI by Xevora",
  },
  description:
    "Make any image background transparent in seconds with CleanCut AI by Xevora. Export clean transparent PNGs (no watermark), remove backgrounds in batch, and get crisp edges for e-commerce, creators, and marketing.",
  icons: { icon: "/cleancut/favicon.ico", apple: "/cleancut/apple-touch-icon.png" },
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
      { url: OG_DEFAULT, width: 1200, height: 630, alt: "CleanCut AI – Make background transparent (PNG)" },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <head>
        <GlobalJsonLd />

        {/* Preconnect helps LCP on mobile (PageSpeed suggests this) */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://apis.google.com" />
        <link rel="preconnect" href="https://xevora-4b29c.firebaseapp.com" />

        {/* GA: load later to reduce main-thread cost on initial render */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-ZP7P4QLKL6" strategy="lazyOnload" />
        <Script id="ga4-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZP7P4QLKL6', { anonymize_ip: true });
          `}
        </Script>
      </head>

      <body className="cc-body">
        {/* ✅ Keeps your layout structure identical, but prevents Firebase Auth from loading on marketing pages */}
        <ProvidersGate>
          <Navbar />
          <WelcomeBar />
          <TrialPopup />
          {children}
          <Footer />
        </ProvidersGate>
      </body>
    </html>
  );
}
