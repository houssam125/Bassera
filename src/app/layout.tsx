import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Contact from "@/components/sections/Contact";
import { team } from "@/data/team";
import "./globals.css";
import "./areas.css";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], display: "swap" });
const dm = DM_Sans({ variable: "--font-dm", subsets: ["latin"], display: "swap" });
const jb = JetBrains_Mono({ variable: "--font-jb", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(team.url),
  title: { default: team.title, template: `%s — ${team.name}` },
  description: team.description,
  openGraph: {
    type: "website",
    siteName: team.name,
    title: team.title,
    description: team.description,
    images: [{ url: "/tech/alamia-desktop.webp", width: 1440, height: 900 }],
  },
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
        <Header />
        <main>{children}</main>
        <Contact />
        <Footer />
      </body>
    </html>
  );
}
