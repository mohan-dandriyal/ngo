import type { Metadata } from "next";
import "./globals.css";

import { Suspense } from "react";
import Header from "@/app/components/layouts/Header";
import Footer from "@/app/components/layouts/Footer";
import Loading from "./components/ui/Loading";
import siteData from "@/app/data/site.json";

export const metadata: Metadata = {
  title: {
    default: `${siteData.brand.name} — ${siteData.brand.tagline}`,
    template: `%s | ${siteData.brand.name}`,
  },
  description: siteData.brand.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#faf8f5] text-[#0f291e]">
        <Suspense fallback={<Loading />}>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
