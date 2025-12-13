import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { AuthProvider } from "../components/AuthProvider";
import { SITE_URL, BASE_PATH } from "../lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Free Background Remover – No Watermark | CleanCut by Xevora",
    template: "%s | CleanCut by Xevora",
  },
  description:
    "Remove background from images instantly with CleanCut by Xevora. No watermark, transparent PNG export, and batch processing.",
  alternates: {
    canonical: `${BASE_PATH}/`,
  },
  openGraph: {
    title: "Free Background Remover – No Watermark",
    description:
      "Remove backgrounds instantly. No watermark. Transparent PNG export. Batch background removal.",
    url: `${SITE_URL}${BASE_PATH}`,
    siteName: "Xevora",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "CleanCut by Xevora",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Background Remover – No Watermark",
    description:
      "CleanCut by Xevora: remove background instantly with transparent PNG export.",
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
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
