import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingSupport } from "@/components/ui/FloatingSupport";
import { ExitIntentPopup } from "@/components/ui/ExitIntentPopup";

const BASE_URL = "https://trinisystem.vercel.app";

export const metadata: Metadata = {
  title: {
    // Default title for HOMEPAGE only — 50 chars, fits Bing/Google SERP
    default: "Printer Repair & PC Support USA | Trini System LLC",
    // Template appends suffix to child pages — keep child titles ≤ 45 chars
    template: "%s | Trini System",
  },
  description:
    "Printer offline? PC slow? GPS not updating? Real technicians fix HP, Canon, Epson & Brother printers remotely in minutes. Free diagnosis. Call 347-953-1531.",
  keywords: [
    "printer repair USA", "HP printer offline fix", "Canon printer not printing",
    "Epson printer error", "Brother printer setup", "free computer cleaner",
    "make computer faster", "Windows 11 slow", "virus removal", "tech support USA",
    "HP DeskJet 4155e setup", "HP DeskJet 2755e setup", "Garmin GPS update",
    "TriniCleaner", "Trini System LLC", "printer repair Corona NY",
    "tech support Queens NY", "remote printer repair",
  ],
  authors: [{ name: "Trini System LLC" }],
  creator: "Trini System LLC",
  publisher: "Trini System LLC",
  metadataBase: new URL(BASE_URL),
  alternates: {
    // Layout canonical is HOMEPAGE only — every child page MUST override this
    // by setting its own `alternates.canonical` in its own metadata export.
    canonical: BASE_URL,
    languages: {
      "en-US": BASE_URL,
      "es-US": `${BASE_URL}/reparacion-impresoras`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "Trini System LLC — Printer Repair & PC Support USA",
    description: "Expert printer repair & free PC optimizer. HP, Canon, Epson, Brother. All 50 US states. Call 347-953-1531.",
    siteName: "Trini System LLC",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Trini System LLC — Printer Repair & PC Support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trini System LLC — Printer Repair & PC Support",
    description: "Free TriniCleaner + expert printer repair. All 50 states.",
    creator: "@trinisystemllc",
    site: "@trinisystemllc",
    images: [`${BASE_URL}/og-image.png`],
  },
  other: {
    "fb:page_id": "Trinisystem",
    "og:see_also": "https://www.facebook.com/Trinisystem/",
    // LLM SEO — helps Bing Copilot, ChatGPT, Perplexity, Google AI Overview
    "application-name": "Trini System LLC Tech Support",
    "category": "Printer Repair, PC Support, GPS Update, Tech Support",
    "coverage": "Nationwide USA",
    "rating": "4.9 stars — 47 Google reviews",
    "reply-to": "trinisystemllc@gmail.com",
    // Bing-specific
    "geo.region": "US-NY",
    "geo.placename": "Corona, Queens, New York",
    "geo.position": "40.7459;-73.8618",
    "ICBM": "40.7459, -73.8618",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large" as any,
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  verification: {
    other: {
      "msvalidate.01": ["FB3B439D2D61A515B724444ADBA619BD"],
    },
  },
};

/* ══════════════════════════════════════════════════════
   JSON-LD SCHEMAS — Multiple schemas for rich results
   1. LocalBusiness (Google Business connection + NAP)
   2. WebSite (sitelinks search box)
   3. Organization (Bing entity recognition)
══════════════════════════════════════════════════════ */

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE_URL}/#business`,
  "name": "Trini System LLC",
  "alternateName": ["Trini System", "TriniSystem", "Trini System LLC Tech Support"],
  "description": "Expert remote printer repair & PC support for HP, Canon, Epson, Brother. Free TriniCleaner download. Serving all 50 states from Corona, Queens, NY.",
  "url": BASE_URL,
  "telephone": "+13479531531",
  "email": "trinisystemllc@gmail.com",
  "foundingDate": "2016",
  "priceRange": "$$",
  "currenciesAccepted": "USD",
  "paymentAccepted": "Cash, Credit Card, PayPal, Zelle",
  "image": `${BASE_URL}/og-image.png`,
  "logo": {
    "@type": "ImageObject",
    "url": `${BASE_URL}/logo.png`,
    "width": 512,
    "height": 512,
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "52-09 99th St Apt 8S",
    "addressLocality": "Corona",
    "addressRegion": "NY",
    "postalCode": "11368",
    "addressCountry": "US",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.7459,
    "longitude": -73.8618,
  },
  "areaServed": [
    { "@type": "Country", "name": "United States" },
    { "@type": "AdministrativeArea", "name": "New York" },
    { "@type": "City", "name": "Corona" },
    { "@type": "City", "name": "Queens" },
  ],
  "serviceArea": {
    "@type": "GeoShape",
    "description": "All 50 US states — remote support available nationwide",
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "00:00",
      "closes": "23:59",
    },
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Tech Support Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "HP Printer Repair & Setup", "@id": `${BASE_URL}/hp-printer-repair` } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Canon Printer Repair", "@id": `${BASE_URL}/canon-printer-repair` } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Epson Printer Repair", "@id": `${BASE_URL}/epson-printer-repair` } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Printer Support & Diagnosis", "@id": `${BASE_URL}/printer-support` } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "GPS Map Update Help", "@id": `${BASE_URL}/gps-help` } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Computer Repair & Optimization", "@id": `${BASE_URL}/computer-help` } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Virus & Malware Removal", "@id": `${BASE_URL}/virus-removal` } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "TriniCleaner PC Optimizer (Free)", "@id": `${BASE_URL}/products` } },
    ],
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "47",
    "bestRating": "5",
    "worstRating": "1",
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Corey Hawkins" },
      "datePublished": "2024-08-15",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "James was incredibly patient and made everything easy. My HP DeskJet was offline for weeks and they fixed it in 20 minutes. Absolutely the best tech support experience I've ever had.",
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Leslie Park" },
      "datePublished": "2024-07-22",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "Very helpful in finding and resolving my Canon PIXMA B200 error. Quick, simple, and effective. I was ready to buy a new printer — they saved me $200!",
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Mark Starrett" },
      "datePublished": "2024-06-10",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "They went above and beyond to get my Garmin GPS updated correctly. Professional, reliable, and MUCH cheaper than Best Buy.",
    },
  ],
  "sameAs": [
    "https://share.google/1mtrJVk8Ya0PkjG76",
    "https://sites.google.com/view/trinisystemllc/Technical-Support-USA",
    "https://www.facebook.com/Trinisystem/",
    "https://www.youtube.com/@trinisystemllc",
    "https://www.tiktok.com/@trinisystemllc",
    "https://www.yelp.com/biz/trini-system-new-york",
  ],
};

// WebSite schema — enables sitelinks search box in Google
const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  "name": "Trini System LLC",
  "url": BASE_URL,
  "publisher": { "@id": `${BASE_URL}/#business` },
  "inLanguage": ["en-US", "es-US"],
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${BASE_URL}/printer-support?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// Organization schema — Bing Copilot and AI assistants use this to identify entities
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  "name": "Trini System LLC",
  "url": BASE_URL,
  "logo": `${BASE_URL}/logo.png`,
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+13479531531",
    "contactType": "customer support",
    "areaServed": "US",
    "availableLanguage": ["English", "Spanish"],
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "00:00",
      "closes": "23:59",
    },
  },
  "sameAs": localBusinessSchema.sameAs,
};

// Speakable schema — flags content for Google Assistant / Bing voice answers
// Helps with "Hey Google, find a printer repair near me" voice queries
const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE_URL}/#speakable`,
  "url": BASE_URL,
  "name": "Trini System LLC — Printer & PC Repair",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", "h2", ".speakable-summary"],
    "xpath": [
      "/html/head/title",
      "/html/head/meta[@name='description']/@content",
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
        />

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P5MQTQJ9');`,
          }}
        />
      </head>
      <body className="bg-white text-gray-900 antialiased font-sans">
        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P5MQTQJ9"
            height="0" width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingSupport />
        <ExitIntentPopup />
      </body>
    </html>
  );
}
