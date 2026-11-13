export type Category = "Branding" | "Social Media" | "Print";

export interface ProjectMeta {
  slug: string;
  title: string;
  client: string;
  category: Category;
  summary: string;
  description: string;
  services: string[];
  /** Index into the project's image list used as the card/cover image. */
  cover?: number;
  /** CSS object-position for the cover crop (tall posters usually want "top"). */
  coverPosition?: string;
  featured?: boolean;
}

// Image files for each slug are listed in scripts/works.manifest.json and
// converted by `npm run assets`. Order there = order in the gallery.
export const projectMeta: ProjectMeta[] = [
  {
    slug: "masjid-al-tawba",
    title: "Masjid Al-Tawba",
    client: "Masjid Al-Tawba — Sanawa, Mila",
    category: "Branding",
    summary:
      "A calligraphic logo redesign with a full applications suite: stationery, field vest, tote bag and posters.",
    description:
      "A new calligraphic mark for Masjid Al-Tawba replaces the previous logo, shown side by side in the brand presentation. The identity is then applied across stationery, a volunteer vest, a tote bag and event announcements, in a green palette that suits the building and its surroundings.",
    services: ["Logo design", "Arabic calligraphy", "Stationery", "Merch mockups"],
    featured: true,
  },
  {
    slug: "wgh-electric",
    title: "WGH Trading & Engineering",
    client: "WGH Trading & Engineering",
    category: "Branding",
    summary:
      "Business cards, Facebook covers and technical product posts for an electrical supplies store.",
    description:
      "Collateral for an electrical supplies business: faceted business cards in blue and slate, Facebook page covers showing the store's brands, and a product-post template used for circuit breakers and LED lamps — specifications first, brand colours throughout.",
    services: ["Business cards", "Page covers", "Product posts"],
    featured: true,
  },
  {
    slug: "examed-exadent",
    title: "ExaMed & Exadent Workbooks",
    client: "ExaMed · Exadent — Edition 2025",
    category: "Print",
    summary:
      "Cover art and spiral-bound book mockups for a series of medical and dental study workbooks.",
    description:
      "The 2025 \"Cahier de contrôle\" series for medicine and dental medicine students. Each year and semester gets its own colour — purple, green, blue — over a shared layout, with cover art and a full set of spiral-bound book mockups showing the interior pages.",
    services: ["Cover design", "Editorial layout", "Print mockups"],
    cover: 9,
    featured: true,
  },
  {
    slug: "scouts-campaigns",
    title: "Scout Group Campaigns",
    client: "Scouts — Mila",
    category: "Social Media",
    summary:
      "Seasonal and event posters: a winter charity drive, swimming sessions, Eid greetings and a photo-sharing call.",
    description:
      "A run of posters for a local scout group, each built around one clear message and a strong photograph or illustration: a winter-clothing drive, weekly swimming sessions, an Eid greeting and a call for family photos.",
    services: ["Poster design", "Photo treatment", "Event graphics"],
    featured: true,
  },
  {
    slug: "sanad-foundation",
    title: "Sanad Foundation",
    client: "Sanad Foundation — Mila",
    category: "Branding",
    summary:
      "Roll-up, banner, member card and Facebook presence for a foundation caring for cancer patients.",
    description:
      "Identity applications for a foundation that supports cancer patients: a tall roll-up, a wide banner, a member ID card and Facebook page scenes, all carried by a warm burgundy-and-gold palette and a soft patterned border.",
    services: ["Roll-up & banner", "ID card", "Page scenes"],
  },
  {
    slug: "bet-ziani-concept",
    title: "B.E.T Ziani Concept",
    client: "B.E.T Ziani Concept",
    category: "Branding",
    summary:
      "A geometric, architecture-inspired mark applied to hoodies, polos and paper stationery.",
    description:
      "A circular mark that reads as a building elevation, in brown and white. Shown on the logo alone, on textured paper, and on a range of hoodies and polo shirts in white and copper.",
    services: ["Logo design", "Apparel mockups"],
  },
  {
    slug: "sy-fit",
    title: "SY FIT",
    client: "SY FIT — Fitness & Sports Center",
    category: "Social Media",
    summary:
      "Challenge announcements and promo price lists in a high-energy dark-and-lime system.",
    description:
      "Posts for a fitness and sports centre: monthly challenge announcements with an athlete cut-out, and a limited-time promotion series with separate price tables for women and men, all on one dark, lime-accented grid.",
    services: ["Campaign posts", "Price tables", "Promo series"],
  },
  {
    slug: "quran-programs",
    title: "Quran Programs & Mosque Media",
    client: "Mosque & Quran associations — Mila",
    category: "Print",
    summary:
      "A mosque logo, announcement posters and a roll-up for Quran memorisation programmes.",
    description:
      "A dimensional logo for Masjid Ali ibn Abi Talib, an announcement poster for the opening of its memorisation section, a roll-up banner for a Quran association, and a calligraphic spread for a book on Quranic orthography.",
    services: ["Logo design", "Posters", "Roll-up banner", "Calligraphy layout"],
  },
  {
    slug: "dental-clinics",
    title: "Dental Clinic Identities",
    client: "Radiance Dental Clinic · Magical Smile",
    category: "Branding",
    summary:
      "Tooth-shaped marks, a services cover and a bright patient-care poster for two dental clinics.",
    description:
      "Two clinics, two voices: Radiance Dental Clinic gets a tooth mark with a sparkle and a services cover banner, while Magical Smile gets a friendly, high-contrast poster built around a confident smile.",
    services: ["Logo design", "Cover banner", "Poster"],
  },
  {
    slug: "architecture-series",
    title: "A Window into Architecture",
    client: "Babor for Arts & Media",
    category: "Social Media",
    summary:
      "A four-part educational carousel that walks through architecture from ancient to modern.",
    description:
      "An educational series that treats each slide as a sheet from an architect's desk — caution tape, sketches, handwritten notes — covering what architecture is, how styles evolved, and who works on a building project.",
    services: ["Carousel design", "Illustration", "Layout"],
  },
  {
    slug: "education-events",
    title: "Education & Events",
    client: "Al-Alamia School · Unitech Club",
    category: "Print",
    summary:
      "A language-school roll-up and banner, plus event and Eid posters for a university tech club.",
    description:
      "Print and social pieces for education: a roll-up and wide banner for a school's language and IT courses, a lecture poster on artificial intelligence, and a playful Eid greeting for a university tech club.",
    services: ["Roll-up & banner", "Event poster", "Greeting card"],
  },
  {
    slug: "logo-collection",
    title: "Logo Collection",
    client: "Modula Dec · Barber Akram Pro",
    category: "Branding",
    summary:
      "Standalone marks for a kitchen-furniture brand and a barber studio.",
    description:
      "Two compact logo systems: Modula Dec with its app-icon variants and a three-colour palette, and a crowned, monogram-style badge for Barber Akram Pro.",
    services: ["Logo design", "Colour palette"],
  },
];
