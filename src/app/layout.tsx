import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const siteTitle = "Zucarto — Satellite-Powered Carbon MRV Platform";
const siteDescription =
  "AI-driven carbon monitoring, reporting and verification using Sentinel-2 satellite imagery. Generate audit-ready carbon credit reports in 7 days.";

export const metadata: Metadata = {
  metadataBase: new URL("https://zucarto.com"),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://zucarto.com",
    siteName: "Zucarto",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://zucarto.com/og.png",
        width: 1200,
        height: 630,
        alt: "Zucarto — Satellite-Powered Carbon MRV",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["https://zucarto.com/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} scroll-smooth`}>
      <body
        className={`min-h-screen bg-[#080C0C] font-sans text-[#F3F8F8] antialiased selection:bg-[#00E5A0] selection:text-[#080C0C]`}
      >
        {children}
      </body>
    </html>
  );
}
