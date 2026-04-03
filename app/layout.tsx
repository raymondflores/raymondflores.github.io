import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Raymond Flores | Senior Software Engineer",
  description:
    "Senior Software Engineer with 10+ years of experience building and scaling high-traffic web and mobile applications. Expert in React, TypeScript, and modern frontend architecture.",
  keywords: [
    "Software Engineer",
    "React",
    "TypeScript",
    "Frontend",
    "Full Stack",
    "Austin",
    "Texas",
  ],
  authors: [{ name: "Raymond Flores" }],
  openGraph: {
    title: "Raymond Flores | Senior Software Engineer",
    description:
      "Senior Software Engineer with 10+ years of experience building high-traffic web and mobile applications.",
    url: "https://raymondflores.github.io",
    siteName: "Raymond Flores",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@raymondf22",
    creator: "@raymondf22",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
