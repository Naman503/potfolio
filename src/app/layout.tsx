import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import Global3DBackgroundWrapper from "@/components/layout/Global3DBackgroundWrapper";
import FloatingResume from "@/components/ui/FloatingResume";
import PerformanceMonitor from "@/components/performance/PerformanceMonitor";
import "./globals.scss";
import "@/styles/globals.css";

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
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
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
        {/* Show loading screen background immediately before React hydrates */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Show loading screen background immediately - same as LoadingScreen component */
            body:not(.react-loaded)::before {
              content: '';
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
              z-index: 99999;
              pointer-events: none;
            }
            /* Remove when React component loads */
            body.react-loaded::before {
              display: none;
            }
          `
        }} />
      </head>
      <body className={inter.variable} suppressHydrationWarning>
        <PerformanceMonitor />
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
