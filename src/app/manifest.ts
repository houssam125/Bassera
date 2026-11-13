import type { MetadataRoute } from "next";
import { team } from "@/data/team";

/** /manifest.webmanifest — name, colours and icons when the site is added to a phone's home screen. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: team.title,
    short_name: team.name,
    description: team.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f4f1e8",
    theme_color: "#f4f1e8",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
