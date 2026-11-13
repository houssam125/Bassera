export interface VideoMeta {
  slug: string;
  title: string;
  client: string;
  /** Short label shown above the title. */
  kind: "Promo reel" | "Motion graphics" | "Brand film" | "Travel film";
  summary: string;
}

// Video files for each slug are listed in scripts/videos.manifest.json and
// compressed by `npm run videos`. Order here = order on the page
// (vertical reels and landscape films are shown in separate rows).
export const videoMeta: VideoMeta[] = [
  {
    slug: "48hr-express-1",
    title: "24H & 48H delivery",
    client: "48HR Express — courier service",
    kind: "Promo reel",
    summary: "A presenter-led reel explaining the courier's 24-hour and 48-hour delivery offers, with animated callouts.",
  },
  {
    slug: "48hr-express-2",
    title: "Find the agency",
    client: "48HR Express — courier service",
    kind: "Promo reel",
    summary: "A walk from the street to the counter: storefront, parcels and contact numbers, so customers know where to drop off.",
  },
  {
    slug: "el-ameed-institute",
    title: "Become a real developer",
    client: "El Ameed Institute",
    kind: "Promo reel",
    summary: "A course promo for a programming training, mixing the instructor on camera with animated course steps.",
  },
  {
    slug: "safir-al-marifa",
    title: "Inside the school",
    client: "Safir Al-Ma'rifa school",
    kind: "Promo reel",
    summary: "A tour of a children's school — classrooms, reading corner and pupils at work — ending on the school's logo.",
  },
  {
    slug: "ecom-multi-service",
    title: "Start your business smartly",
    client: "Ecom Multi Service",
    kind: "Motion graphics",
    summary: "An Arabic motion-graphics ad for an e-commerce sourcing service: find suppliers, save time and effort.",
  },
  {
    slug: "menttify",
    title: "Regulatory affairs training",
    client: "Menttify",
    kind: "Motion graphics",
    summary: "An animated explainer in French for a five-day training in regulatory affairs for food supplements, ending on the certificate.",
  },
  {
    slug: "dental-clinic-film",
    title: "Medical center walkthrough",
    client: "Al Rafidain Medical Center",
    kind: "Brand film",
    summary:
      "A cinematic walkthrough of a medical centre — from the façade to reception, corridors and the dental, dermatology and medical departments — shot in 4K.",
  },
  {
    slug: "tunisia-diving",
    title: "Diving in Tunisia",
    client: "Travel cinematic",
    kind: "Travel film",
    summary: "From the dive centre to the sea floor: an underwater edit among schools of fish.",
  },
  {
    slug: "tunisia-parasailing",
    title: "Parasailing over the coast",
    client: "Travel cinematic",
    kind: "Travel film",
    summary: "Action-cam footage of a parasailing flight above the Tunisian coast — “enjoy the moments”.",
  },
];
