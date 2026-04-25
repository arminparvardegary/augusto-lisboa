import type { Metadata } from "next";
import { Fraunces, Inter, Allura } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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
    "Specialty coffee and brunch in Belém, Lisbon. Slow mornings, sunlit interiors, considered plates.",
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
  image: `${siteUrl}/icon.png`,
  url: siteUrl,
  email: "ola@augustolisboa.pt",
  servesCuisine: ["Brunch", "Coffee", "Mediterranean"],
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua de Belém",
    addressLocality: "Lisboa",
    addressRegion: "Belém",
    postalCode: "1300-085",
    addressCountry: "PT",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "15:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "09:30",
      closes: "16:00",
    },
  ],
  sameAs: ["https://instagram.com/augustolisboapt"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt"
      className={`${fraunces.variable} ${inter.variable} ${allura.variable} antialiased`}
    >
      <body className="bg-cream text-espresso min-h-screen">
        <Script
          id="ld-restaurant"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
