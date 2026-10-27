import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { LocaleProvider } from "@/components/locale-provider";
import { SpecsProvider } from "@/components/specs-provider";
import { LOCALE_BOOT_SCRIPT } from "@/lib/locale";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  variable: "--font-inter",
  weight: "400 800",
  display: "swap",
});

const jetbrains = localFont({
  src: "./fonts/jetbrains-mono-latin.woff2",
  variable: "--font-jetbrains",
  weight: "400 600",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "RigCheck — Can your PC run it?",
  description:
    "Pick your CPU, GPU and RAM, then see which games you can run, at what settings and roughly what frame rate.",
  applicationName: SITE_NAME,
  openGraph: {
    title: "RigCheck — Can your PC run it?",
    description:
      "Pick your parts. Get an honest answer on which PC games you can run, at what settings and frame rate.",
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RigCheck — Can your PC run it?",
    description:
      "Pick your parts. Get an honest answer on which PC games you can run, at what settings and frame rate.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-ink-950 font-sans text-white antialiased">
        {/* Sets <html lang> from ?lang/localStorage/browser before first paint. */}
        <Script
          id="locale-boot"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: LOCALE_BOOT_SCRIPT }}
        />
        <LocaleProvider>
          <SpecsProvider>{children}</SpecsProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
