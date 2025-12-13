import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://cleancut.ai"),
  title: {
    default: "Free Background Remover Online – No Watermark | CleanCut AI",
    template: "%s | CleanCut AI",
  },
  description:
    "Remove background from images instantly with CleanCut AI. Free online background remover with no watermark, transparent PNG export, and batch processing.",
  keywords: [
    "background remover",
    "remove background",
    "free background remover",
    "no watermark background remover",
    "remove background png",
    "ai background removal",
    "product photo background remover",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Free Background Remover Online – No Watermark",
    description:
      "Remove background from images instantly. No watermark. Transparent PNG export. Batch background removal.",
    url: "https://cleancut.ai",
    siteName: "CleanCut AI",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "CleanCut AI Background Remover",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Background Remover Online – No Watermark",
    description:
      "Remove background from images instantly. No watermark. Transparent PNG export.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
