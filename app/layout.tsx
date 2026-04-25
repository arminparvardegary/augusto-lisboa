import type { Metadata } from "next";
import { Fraunces, Inter, Allura } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const siteUrl = "https://augustolisboa.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Augusto Lisboa — Better Food, Better Mood",
    template: "%s · Augusto Lisboa",
  },
  description:
    "Specialty coffee and brunch in Belém, Lisbon. Slow mornings, sunlit interiors, considered plates. Better food, better mood.",
  keywords: [
    "Augusto Lisboa",
    "Belém café",
    "specialty coffee Lisbon",
    "brunch Belém",
    "Lisbon brunch",
  ],
  openGraph: {
    title: "Augusto Lisboa — Better Food, Better Mood",
    description:
      "Specialty coffee and brunch in Belém, Lisbon. Slow mornings, sunlit interiors, considered plates.",
    url: siteUrl,
    siteName: "Augusto Lisboa",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Augusto Lisboa — Better Food, Better Mood",
    description:
      "Specialty coffee and brunch in Belém, Lisbon. Slow mornings, sunlit interiors, considered plates.",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Augusto Lisboa",
  image: `${siteUrl}/og.jpg`,
  url: siteUrl,
  telephone: "+351 21 000 0000",
  servesCuisine: ["Brunch", "Coffee", "Mediterranean"],
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua de Belém",
    addressLocality: "Lisboa",
    addressRegion: "Belém",
    postalCode: "1300-000",
    addressCountry: "PT",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  sameAs: ["https://instagram.com/augustolisboapt"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${allura.variable} antialiased`}
    >
      <body className="bg-cream text-espresso min-h-screen">
        <Script
          id="ld-restaurant"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Preloader />
        <CustomCursor />
        <SmoothScrollProvider>
          <Nav />
          <PageTransition>
            <main>{children}</main>
            <Footer />
          </PageTransition>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
