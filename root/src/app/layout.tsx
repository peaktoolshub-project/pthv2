import type { Metadata, Viewport } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://peaktoolshub.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a14",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Peak Tools Hub — Free Online Calculators Worldwide",
    template: "%s | Peak Tools Hub",
  },
  description: "Peak Tools Hub: the world's most comprehensive free calculator suite. Salary, tax, loans, BMI, currency, health tools and 40+ more. Real-time data, 19 countries, no signup.",
  keywords: [
    "free online calculator", "salary calculator", "global payroll calculator",
    "income tax calculator", "bmi calculator", "currency converter",
    "loan calculator", "compound interest", "epf calculator malaysia",
  ],
  authors: [{ name: "Peak Tools Hub", url: SITE_URL }],
  creator: "Peak Tools Hub",
  publisher: "Peak Tools Hub",
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Peak Tools Hub",
    title: "Peak Tools Hub — Free Online Calculators Worldwide",
    description: "40+ free calculators: salary, tax, loans, BMI, currency and more. 19 countries supported. Real-time data.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Peak Tools Hub — Global Calculator Suite" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Peak Tools Hub — Free Online Calculators Worldwide",
    description: "40+ free calculators: salary, tax, loans, BMI, currency and more. 19 countries.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

// WebSite JSON-LD structured data
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Peak Tools Hub",
  url: SITE_URL,
  description: "Free online calculators worldwide — salary, tax, loans, health and more across 19 countries",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Peak Tools Hub",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: "The world's comprehensive free online calculator platform",
  sameAs: [],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-MY" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Google AdSense — loaded async to prevent CLS */}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive" dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`
            }} />
          </>
        )}
      </head>
      <body className={`${dmSans.variable} ${spaceGrotesk.variable} font-sans bg-surface text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
