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
    "Full-stack engineer with 10+ years in TypeScript, React, and Node. I own the layer between services and the client — designing APIs, choosing rendering and architecture strategies, and shipping the interfaces on top.",
  keywords: [
    "Software Engineer",
    "Full Stack",
    "React",
    "React Native",
    "TypeScript",
    "Node.js",
    "GraphQL",
    "Astro",
    "Austin",
    "Texas",
  ],
  authors: [{ name: "Raymond Flores" }],
  openGraph: {
    title: "Raymond Flores | Senior Software Engineer",
    description:
      "Full-stack engineer with 10+ years in TypeScript, React, and Node — designing APIs, choosing rendering strategies, and shipping the interfaces on top.",
    url: "https://raymondflores.github.io",
    siteName: "Raymond Flores",
    type: "website",
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
