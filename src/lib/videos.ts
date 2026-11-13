import generated from "@/data/videos.generated.json";
import { videoMeta, type VideoMeta } from "@/data/videos";

export interface VideoFile {
  src: string;
  poster: string;
  width: number;
  height: number;
  /** Seconds. */
  duration: number;
  blur: string;
  /** Small silent loop (vertical reels only), used where a reel autoplays. */
  preview?: string;
}

export interface Video extends VideoMeta, VideoFile {
  vertical: boolean;
}

const fileMap = generated as Record<string, VideoFile>;

export const videos: Video[] = videoMeta.map((meta) => {
  const file = fileMap[meta.slug];
  if (!file) throw new Error(`No video for "${meta.slug}" — run \`npm run videos\`.`);
  return { ...meta, ...file, vertical: file.height > file.width };
});

export const reels = videos.filter((v) => v.vertical);
export const films = videos.filter((v) => !v.vertical);

export function getVideo(slug: string): Video | undefined {
  return videos.find((v) => v.slug === slug);
}
