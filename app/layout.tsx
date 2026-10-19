import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Suspense } from "react";
import Footer from '@/app/components/layouts/Footer';
import Loading from "./components/ui/Loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Lend a Helping Hand",
    template: "%s | Lend a Helping Hand",
  },
  description:
    "Support communities, empower families, and help create lasting change with Lend a Helping Hand.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={<Loading />}>
          {/* <Header /> */}
        {children}
        <Footer />
        </Suspense>
      </body>
    </html>
  );
}
