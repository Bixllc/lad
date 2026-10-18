import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { contact, links, locations, site } from "@/content";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const title = `${site.name} — ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_JM",
    siteName: site.name,
    title,
    description: site.description,
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description: site.description, images: ["/og.png"] },
};

export const viewport: Viewport = { themeColor: "#F6F7F4" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  "@id": `${site.url}/#business`,
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  image: `${site.url}/og.png`,
  logo: `${site.url}/img/lad-logo-on-light-480.webp`,
  telephone: `+${contact.whatsappNumber}`,
  address: { "@type": "PostalAddress", addressCountry: "JM" },
  areaServed: locations.map((l) => ({ "@type": "City", name: `${l.city}, ${l.parish}` })),
  sameAs: [links.instagramProfile],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "reservations",
    telephone: `+${contact.whatsappNumber}`,
    url: links.whatsapp(),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[100] rounded-btn bg-ink px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
