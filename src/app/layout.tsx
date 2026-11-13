import type { Metadata, Viewport } from "next";
import { Cairo, Poppins } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Contact from "@/components/sections/Contact";
import { team } from "@/data/team";
import { alternateNames, organizationJsonLd, pageMetadata } from "@/lib/seo";
import "./globals.css";
import "./areas.css";

// Brand fonts, matching the Instagram posts and the brand board: Poppins for Latin text,
// Cairo for Arabic.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});
const cairo = Cairo({ variable: "--font-cairo", subsets: ["arabic"], display: "swap" });

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

export const viewport: Viewport = { themeColor: "#eef3f7" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior: smooth scrolling for in-page links only — a page change jumps straight to the top.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${cairo.variable}`}
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
