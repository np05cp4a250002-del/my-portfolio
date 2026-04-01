import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prameshbhandari.com.np"),
  title: {
    default: "Pramesh Bhandari — Finance. Strategy. Leadership. Purpose.",
    template: "%s | Pramesh Bhandari",
  },
  description:
    "Pramesh Bhandari is a young finance professional, future entrepreneur, hospital founder, and research-oriented thinker from Nepal. Explore his vision in business, healthcare, and leadership.",
  keywords: [
    "Pramesh Bhandari",
    "Finance Professional Nepal",
    "Business Strategy",
    "Healthcare Entrepreneur",
    "आयुरक्षा Hospital",
    "Leadership",
    "Research",
  ],
  authors: [{ name: "Pramesh Bhandari" }],
  creator: "Pramesh Bhandari",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://prameshbhandari.com.np",
    siteName: "Pramesh Bhandari",
    title: "Pramesh Bhandari — Finance. Strategy. Leadership. Purpose.",
    description:
      "Young finance professional, future entrepreneur & hospital founder from Nepal.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pramesh Bhandari",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pramesh Bhandari — Finance. Strategy. Leadership. Purpose.",
    description:
      "Young finance professional, future entrepreneur & hospital founder from Nepal.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pramesh Bhandari",
  url: "https://prameshbhandari.com.np",
  jobTitle: "Finance Professional & Entrepreneur",
  nationality: "Nepali",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Koshi Province",
    addressLocality: "Jhapa",
    addressCountry: "NP",
  },
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "Itahari International College",
    },
    {
      "@type": "EducationalOrganization",
      name: "Damak Multiple Campus",
    },
  ],
  knowsAbout: [
    "Finance",
    "Business Strategy",
    "Healthcare Management",
    "Nutrition",
    "Leadership",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-offwhite text-charcoal font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
