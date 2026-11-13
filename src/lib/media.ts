import generated from "@/data/media.generated.json";
import { projectMeta, type Category, type ProjectMeta } from "@/data/media";

export interface MediaImage {
  src: string;
  width: number;
  height: number;
  blur: string;
}

export interface MediaProject extends Omit<ProjectMeta, "cover"> {
  images: MediaImage[];
  cover: MediaImage;
}

const imageMap = generated as Record<string, MediaImage[]>;

export const mediaProjects: MediaProject[] = projectMeta.map((meta) => {
  const images = imageMap[meta.slug];
  if (!images?.length) {
    throw new Error(`No images for "${meta.slug}" — run \`npm run assets\`.`);
  }
  return { ...meta, images, cover: images[meta.cover ?? 0] };
});

/** The minimum a card needs — keeps client components from receiving every image. */
export type CardData = Pick<
  MediaProject,
  "slug" | "title" | "client" | "category" | "cover" | "coverPosition"
> & { count: number };

export const toCard = (p: MediaProject): CardData => ({
  slug: p.slug,
  title: p.title,
  client: p.client,
  category: p.category,
  cover: p.cover,
  coverPosition: p.coverPosition,
  count: p.images.length,
});

export const categories: Category[] = ["Branding", "Social Media", "Print"];

/** Designs for the Media page header collage — one of each kind (the reel and film come from videos). */
export const mediaShowcase = {
  post: imageMap["dental-clinics"][0], // "Healthy Smiles" social post
  logo: imageMap["bet-ziani-concept"][0],
  print: imageMap["examed-exadent"][9], // spiral-bound workbook mockup
} satisfies Record<string, MediaImage>;

export function getMediaProject(slug: string): MediaProject | undefined {
  return mediaProjects.find((p) => p.slug === slug);
}

export function getAdjacent(slug: string): { prev: MediaProject; next: MediaProject } {
  const i = mediaProjects.findIndex((p) => p.slug === slug);
  return {
    prev: mediaProjects[(i - 1 + mediaProjects.length) % mediaProjects.length],
    next: mediaProjects[(i + 1) % mediaProjects.length],
  };
}

export const totalDesigns = mediaProjects.reduce((n, p) => n + p.images.length, 0);
