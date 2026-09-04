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

const siteUrl = "https://raymondflores.github.io";

// JSON-LD Person schema — mirrors the content hardcoded in the section
// components (hero, experience, skills, education, contact). Keep in sync
// when those change.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Raymond Flores",
  url: siteUrl,
  image: `${siteUrl}/raymond.jpg`,
  jobTitle: "Senior Software Engineer",
  email: "mailto:raymondfflores@gmail.com",
  description:
    "Full-stack engineer with 10+ years in TypeScript, React, and Node — designing APIs, choosing rendering strategies, and shipping the interfaces on top.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Austin",
    addressRegion: "TX",
    addressCountry: "US",
  },
  worksFor: {
    "@type": "Organization",
    name: "Caesars Sportsbook",
    url: "https://www.caesars.com/sportsbook-and-casino",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Texas — Rio Grande Valley",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Edinburg",
      addressRegion: "TX",
      addressCountry: "US",
    },
  },
  sameAs: [
    "https://github.com/raymondflores",
    "https://www.linkedin.com/in/raymondf22/",
  ],
  knowsAbout: [
    "TypeScript",
    "JavaScript",
    "React",
    "React Native",
    "Next.js",
    "Astro",
    "Vue",
    "Node.js",
    "GraphQL",
    "PostgreSQL",
    "Stripe",
    "AWS",
    "Google Cloud Platform",
    "Web performance optimization",
    "Software architecture",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    url: siteUrl,
    siteName: "Raymond Flores",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Raymond Flores — Senior Full-Stack Engineer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raymond Flores | Senior Software Engineer",
    description:
      "Full-stack engineer with 10+ years in TypeScript, React, and Node — designing APIs, choosing rendering strategies, and shipping the interfaces on top.",
    images: ["/opengraph-image.png"],
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
      <body className="font-sans antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
