// Site-wide content for the team and the Technology area.
// (Media projects live in media.ts.) Edit these files and the site updates.
// Empty contact strings are treated as "not set" and the matching button is hidden.

export const team = {
  name: "Bassera",
  location: "Algeria",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  title: "Bassera — media and technology, under one roof",
  description:
    "A creative and technical team that designs brands, produces social media, print and video, and builds websites, business systems and mobile apps — from first sketch to launch.",
  contact: {
    email: "baseera.ag@gmail.com",
    phone: "",
    instagram: "https://www.instagram.com/baseera.agency/",
    facebook: "https://www.facebook.com/profile.php?id=61590574076844",
    github: "",
    linkedin: "",
  } as { email: string; phone: string; instagram: string; facebook: string; github: string; linkedin: string },
} as const;

/** The social profiles that are filled in, in display order. */
export function socialLinks(): { label: string; href: string }[] {
  const { instagram, facebook, github, linkedin } = team.contact;
  return [
    { label: "Instagram", href: instagram },
    { label: "Facebook", href: facebook },
    { label: "GitHub", href: github },
    { label: "LinkedIn", href: linkedin },
  ].filter((l) => l.href);
}

export const nav = [
  { label: "Media", href: "/media" },
  { label: "Technology", href: "/tech" },
  { label: "What we do", href: "/#what-we-do" },
  { label: "Approach", href: "/#approach" },
] as const;

export const ticker = [
  "Brands",
  "Social media",
  "Print",
  "Video",
  "Motion",
  "Websites",
  "Platforms",
  "Mobile apps",
  "CRM & ERP",
  "Dashboards",
  "APIs",
] as const;

export const capabilities = [
  {
    title: "Brand & visual design",
    text: "Logos, colour systems and visual identities that make a name instantly recognisable — in Latin and Arabic.",
    tags: ["Logos", "Brand identity", "Stationery"],
  },
  {
    title: "Social media, print & video",
    text: "Campaign series, promo reels, motion graphics and print that stay on-message from phone feed to printed page.",
    tags: ["Campaigns", "Reels & motion", "Print-ready"],
  },
  {
    title: "Web, mobile & software",
    text: "Websites and web platforms, CRM and ERP systems, and mobile apps built with Flutter — with the back-end, data and dashboards behind them.",
    tags: ["Websites", "CRM & ERP", "Mobile apps"],
  },
  {
    title: "Launch & care",
    text: "CI/CD pipelines, separate staging and production environments, monitoring and follow-up fixes — so what we ship stays online, secure and up to date.",
    tags: ["CI/CD", "Staging & production", "Monitoring"],
  },
] as const;

export const steps = [
  { title: "Understand", text: "We start with the goal, the audience and the constraints — before any pixels." },
  { title: "Design", text: "Structure, look and feel are agreed on early, with real content instead of placeholders." },
  { title: "Build", text: "Everything is produced in small, reviewable pieces, so nothing arrives as a surprise." },
  { title: "Launch", text: "We ship, watch how it behaves in the real world, and keep improving it." },
] as const;

export const stack = [
  { group: "Front-end", items: ["Next.js", "React", "TypeScript"] },
  { group: "Mobile", items: ["Flutter", "Dart"] },
  { group: "Back-end & data", items: ["Node.js", "Express", "Go", "PostgreSQL", "MongoDB", "Prisma"] },
  { group: "Deployment", items: ["Docker Compose", "CI/CD pipelines", "Staging & production", "Vercel", "Render"] },
] as const;

/** What the Technology area builds — shown on the Technology page, whether or not a live product exists yet. */
export const techServices = [
  {
    title: "Websites",
    text: "Company, school and institutional websites in Arabic, French and English — fast, responsive and easy to update.",
    tags: ["Multilingual", "Responsive", "SEO-ready"],
  },
  {
    title: "Web platforms & portals",
    text: "Platforms with accounts and roles: student and teacher portals, bookings, online stores and member areas.",
    tags: ["Accounts & roles", "Portals", "Payments"],
  },
  {
    title: "CRM systems",
    text: "Every customer, lead and follow-up in one place, with a clear sales pipeline and reminders for the team.",
    tags: ["Leads", "Pipeline", "Follow-ups"],
  },
  {
    title: "ERP systems",
    text: "Run the business from one system — stock, purchases, invoices, staff and reports — shaped around how you work.",
    tags: ["Inventory", "Invoicing", "Reports"],
  },
  {
    title: "Mobile apps",
    text: "Android and iOS apps from a single Flutter codebase, connected to the same back-end as your website or system.",
    tags: ["Flutter", "Android & iOS", "One codebase"],
  },
  {
    title: "Dashboards & APIs",
    text: "Admin dashboards, data and APIs in Node.js or Go that tie your website, apps and tools together.",
    tags: ["Dashboards", "REST APIs", "Integrations"],
  },
] as const;

interface Shot {
  src: string;
  width: number;
  height: number;
}

export interface Product {
  slug: string;
  title: string;
  kind: string;
  summary: string;
  highlights: string[];
  tags: string[];
  /** Public link; leave empty when the product isn't online yet. */
  href: string;
  /** Text shown in the fake browser address bar. */
  displayUrl: string;
  /** Soft backdrop colour behind the device mockups. */
  stage: string;
  desktop: Shot;
  mobile: Shot;
}

// Screenshots are generated by `npm run capture` (see scripts/targets.json).
const desktop = (slug: string): Shot => ({ src: `/tech/${slug}-desktop.webp`, width: 1440, height: 900 });
const mobile = (slug: string): Shot => ({ src: `/tech/${slug}-mobile.webp`, width: 780, height: 1688 });

export const products: Product[] = [
  {
    slug: "alamia",
    title: "Al-Alamia School",
    kind: "School website + management platform",
    summary:
      "The public website of a private school (مدرسة العالمية) — courses and teachers in Arabic, English and French — backed by a full platform that runs the school day to day.",
    highlights: [
      "Admin dashboard for enrolment leads, courses, teachers, rooms and expenses",
      "Timetable planning, student groups and payments with printed receipts",
      "Separate student and teacher portals for homework and group follow-up",
    ],
    tags: ["React", "TypeScript", "Dashboard", "AR · EN · FR"],
    href: "https://al-alamia.net/",
    displayUrl: "al-alamia.net",
    stage: "#fbe1e1",
    desktop: desktop("alamia"),
    mobile: mobile("alamia"),
  },
  {
    slug: "mila",
    title: "Mila University",
    kind: "Institutional website",
    summary:
      "The public website of a university: faculties, events, scholarships, clubs and housing, with quick access to the platforms students use every day.",
    highlights: [
      "Faculty and department pages with consistent structure",
      "Events, news and campus life in one place",
      "Language switcher and layouts that work on any device",
    ],
    tags: ["Institutional", "Multi-language", "Responsive"],
    href: "https://university-mila-alpha.vercel.app/",
    displayUrl: "university-mila-alpha.vercel.app",
    stage: "#ffe9c4",
    desktop: desktop("mila"),
    mobile: mobile("mila"),
  },
];
