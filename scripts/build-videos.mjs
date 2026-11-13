// Builds the site's videos into public/videos/:
//   <slug>.mp4          720p web version with sound (the player on the Media page)
//   <slug>.webp         poster frame
//   <slug>-preview.mp4  small silent loop for the home page: every vertical reel, plus any film
//                       given a "preview" highlight range in the manifest
// and writes src/data/videos.generated.json (dimensions, duration, blur placeholder).
//
// VIDEO_SOURCE is the downloaded Google Drive "videos" folder (see scripts/videos.manifest.json):
//
//   VIDEO_SOURCE="C:/path/to/videos" npm run videos
//   VIDEO_SOURCE="C:/path/to/videos" ONLY=menttify npm run videos   (just one video)
//   npm run videos        (no VIDEO_SOURCE: only rebuilds the previews from the existing web MP4s)
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpeg from "ffmpeg-static";
import ffprobe from "ffprobe-static";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = process.env.VIDEO_SOURCE;
if (SOURCE && !fs.existsSync(SOURCE)) {
  console.error(`VIDEO_SOURCE not found: ${SOURCE}`);
  process.exit(1);
}
const only = process.env.ONLY?.split(",");
const MAX_EDGE = 1280; // 720p, either orientation
const PREVIEW_EDGE = 640; // 360p, either orientation
const { videos } = JSON.parse(fs.readFileSync(path.join(root, "scripts/videos.manifest.json"), "utf8"));

const outDir = path.join(root, "public/videos");
const dataFile = path.join(root, "src/data/videos.generated.json");
fs.mkdirSync(outDir, { recursive: true });
const result = fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile, "utf8")) : {};
const mb = (file) => (fs.statSync(file).size / 1024 / 1024).toFixed(1);

const probe = (file) =>
  JSON.parse(
    execFileSync(ffprobe.path, [
      "-v", "error",
      "-select_streams", "v:0",
      "-show_entries", "stream=width,height:format=duration",
      "-of", "json",
      file,
    ]).toString(),
  );

const fitScale = (file, edge) => {
  const { width, height } = probe(file).streams[0];
  return width >= height ? `scale='min(${edge},iw)':-2` : `scale=-2:'min(${edge},ih)'`;
};

for (const [slug, { file, poster = 1, preview: clip }] of Object.entries(videos)) {
  if (only && !only.includes(slug)) continue;
  const mp4 = path.join(outDir, `${slug}.mp4`);
  const preview = path.join(outDir, `${slug}-preview.mp4`);
  process.stdout.write(`${slug} … `);

  if (SOURCE) {
    const src = path.join(SOURCE, file);
    // prettier-ignore
    execFileSync(ffmpeg, [
      "-nostdin", "-v", "error", "-y", "-i", src,
      "-map", "0:v:0", "-map", "0:a:0?",
      "-vf", `${fitScale(src, MAX_EDGE)},fps=30`,
      // CRF keeps calm footage small; the cap stops fast action-cam shots from ballooning.
      "-c:v", "libx264", "-preset", "slow", "-crf", "27", "-maxrate", "1.6M", "-bufsize", "3.2M",
      "-profile:v", "high", "-pix_fmt", "yuv420p",
      "-c:a", "aac", "-b:a", "96k", "-ac", "2",
      "-movflags", "+faststart",
      mp4,
    ]);

    const out = probe(mp4);
    const frame = execFileSync(
      ffmpeg,
      ["-nostdin", "-v", "error", "-ss", String(poster), "-i", mp4, "-frames:v", "1", "-f", "image2pipe", "-c:v", "png", "-"],
      { maxBuffer: 64 * 1024 * 1024 },
    );
    await sharp(frame).webp({ quality: 78 }).toFile(path.join(outDir, `${slug}.webp`));
    const blur = await sharp(frame).resize(16, 16, { fit: "inside" }).jpeg({ quality: 40 }).toBuffer();

    result[slug] = {
      src: `/videos/${slug}.mp4`,
      poster: `/videos/${slug}.webp`,
      width: out.streams[0].width,
      height: out.streams[0].height,
      duration: Math.round(Number(out.format.duration)),
      blur: `data:image/jpeg;base64,${blur.toString("base64")}`,
    };
    process.stdout.write(`${mb(src)} MB → ${mb(mp4)} MB · `);
  } else if (!result[slug] || !fs.existsSync(mp4)) {
    console.log("skipped (no web MP4 yet — set VIDEO_SOURCE)");
    continue;
  }

  // Reels always get a preview (the whole reel). A landscape film only gets one when the manifest
  // asks for it with "preview": { "from": <second>, "for": <seconds> } — a short highlight clip.
  if (result[slug].width >= result[slug].height && !clip) {
    fs.rmSync(preview, { force: true });
    delete result[slug].preview;
    console.log("no preview (landscape)");
    continue;
  }
  const range = clip ? ["-ss", String(clip.from), "-t", String(clip.for)] : [];

  // prettier-ignore
  execFileSync(ffmpeg, [
    "-nostdin", "-v", "error", "-y", ...range, "-i", mp4,
    "-an", "-vf", `${fitScale(mp4, PREVIEW_EDGE)},fps=24`,
    "-c:v", "libx264", "-preset", "slow", "-crf", "31", "-maxrate", "700k", "-bufsize", "1400k",
    "-profile:v", "high", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    preview,
  ]);
  result[slug].preview = `/videos/${slug}-preview.mp4`;
  console.log(`preview ${mb(preview)} MB`);
}

fs.writeFileSync(dataFile, JSON.stringify(result));
