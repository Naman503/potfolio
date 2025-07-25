import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import Global3DBackgroundWrapper from "@/components/layout/Global3DBackgroundWrapper";
import FloatingResume from "@/components/ui/FloatingResume";
import "./globals.scss";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Naman Pathak | Full-Stack Developer",
  description:
    "Portfolio of Naman Pathak - Full-Stack Developer with expertise in React, React Native, and Node.js",
  keywords: [
    "Naman Pathak",
    "Full-Stack Developer",
    "React",
    "React Native",
    "Node.js",
    "Portfolio",
  ],
  authors: [{ name: "Naman Pathak" }],
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  // Viewport is now exported separately below
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.variable}>
        <ThemeProvider>
          <Global3DBackgroundWrapper>
            {children}
            <FloatingResume />
          </Global3DBackgroundWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
