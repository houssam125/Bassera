import type { Metadata } from "next";
import { socialLinks, team, techServices } from "@/data/team";

/** Spellings people may search for, alongside the site name. */
export const alternateNames = ["Baseera", "Basira", "بصيرة"];

export const siteUrl = team.url.replace(/\/+$/, "");

/**
 * Metadata for one page: title, description, canonical address, and the Open Graph / Twitter cards
 * used by Facebook, WhatsApp, LinkedIn and X. The share image comes from the segment's
 * opengraph-image file unless `image` is given.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title?: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
}): Metadata {
  const fullTitle = title ? `${title} — ${team.name}` : team.title;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: team.name,
      url: path,
      title: fullTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

/** Structured data for Google: who we are, our logo, contact and social profiles. */
export function organizationJsonLd() {
  const org = `${siteUrl}/#organization`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": org,
        name: team.name,
        alternateName: alternateNames,
        url: siteUrl,
        logo: { "@type": "ImageObject", url: `${siteUrl}/icons/icon-512.png`, width: 512, height: 512 },
        image: `${siteUrl}/icons/icon-512.png`,
        description: team.description,
        ...(team.contact.email ? { email: team.contact.email } : {}),
        sameAs: socialLinks().map((l) => l.href),
        address: { "@type": "PostalAddress", addressCountry: "DZ" },
        areaServed: { "@type": "Country", name: team.location },
        knowsAbout: [
          "Brand identity",
          "Logo design",
          "Social media design",
          "Video production",
          "Motion graphics",
          "Print design",
          ...techServices.map((s) => s.title),
        ],
        ...(team.contact.email
          ? { contactPoint: { "@type": "ContactPoint", contactType: "sales", email: team.contact.email, availableLanguage: ["Arabic", "French", "English"] } }
          : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: team.name,
        alternateName: alternateNames,
        inLanguage: "en",
        publisher: { "@id": org },
      },
    ],
  };
}
