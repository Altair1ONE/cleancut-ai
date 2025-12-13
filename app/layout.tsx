import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { AuthProvider } from "../components/AuthProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://xevora.org"),
  title: {
    default: "Free Background Remover – No Watermark | CleanCut by Xevora",
    template: "%s | CleanCut by Xevora",
  },
  description:
    "Remove background from images instantly with CleanCut by Xevora. No watermark, transparent PNG export, batch processing.",
  openGraph: {
    title: "Free Background Remover – No Watermark",
    description:
      "Remove backgrounds instantly. No watermark. Transparent PNG export.",
    url: "https://xevora.org/cleancut",
    siteName: "Xevora",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "CleanCut by Xevora",
      },
    ],
    type: "website",
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
