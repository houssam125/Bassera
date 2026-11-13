import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Contact from "@/components/sections/Contact";
import { team } from "@/data/team";
import { alternateNames, organizationJsonLd, pageMetadata } from "@/lib/seo";
import "./globals.css";
import "./areas.css";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], display: "swap" });
const dm = DM_Sans({ variable: "--font-dm", subsets: ["latin"], display: "swap" });
const jb = JetBrains_Mono({ variable: "--font-jb", subsets: ["latin"], display: "swap" });

// Icons (favicon.ico, icon.png, apple-icon.png) and the share image (opengraph-image.jpg) are files in
// this folder, built from the logo and the work by `npm run brand`.
export const metadata: Metadata = {
  ...pageMetadata({ description: team.description, path: "/" }),
  metadataBase: new URL(team.url),
  title: { default: team.title, template: `%s — ${team.name}` },
  applicationName: team.name,
  creator: team.name,
  publisher: team.name,
  keywords: [
    team.name,
    ...alternateNames,
    "creative agency Algeria",
    "branding",
    "logo design",
    "social media design",
    "video production",
    "motion graphics",
    "web development",
    "mobile apps",
    "Flutter",
    "CRM",
    "ERP",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Google Search Console ownership check — set GOOGLE_SITE_VERIFICATION to the code Google gives you.
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
};

export const viewport: Viewport = { themeColor: "#f4f1e8" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior: smooth scrolling for in-page links only — a page change jumps straight to the top.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${bricolage.variable} ${dm.variable} ${jb.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()).replace(/</g, "\\u003c") }}
        />
        <Header />
        <main>{children}</main>
        <Contact />
        <Footer />
      </body>
    </html>
  );
}
