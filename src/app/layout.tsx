import type { Metadata, Viewport } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "TheMedia.guide — Cameroon",
  description: "A curated guide to verified media opportunities in Cameroon.",
  robots: { index: false, follow: false },
  icons: { icon: "/icon-512.png", apple: "/apple-icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-[100dvh] bg-ink font-sans text-white antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
