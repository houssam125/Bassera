// Builds the site's icons and share images from the logo and the real content:
//
//   src/app/favicon.ico, icon.png, apple-icon.png   browser tab, Google results, iPhone home screen
//   public/icons/icon-192.png, icon-512.png, icon-maskable-512.png   web app manifest
//   src/app/opengraph-image.jpg (+ media/, tech/)   the card shown when a page is shared (Facebook, WhatsApp…)
//   public/og/<project>.jpg                          share card for each media project page
//
//   npm run brand          (needs Google Chrome, like `npm run capture`, and internet for the fonts)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import sharp from "sharp";
import { projectMeta } from "../src/data/media.ts";
import { products, team } from "../src/data/team.ts";
import { videoMeta } from "../src/data/videos.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const at = (...p) => path.join(root, ...p);
const chrome = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const media = JSON.parse(fs.readFileSync(at("src/data/media.generated.json"), "utf8"));

// ───────────────────────── Icons ─────────────────────────

// The logo file has a lot of off-white margin; crop to the mark and clean the background to pure white.
const MARK = { left: 133, top: 123, width: 370, height: 404 };
const mark = await sharp(at("public/logo.jpg")).extract(MARK).linear(1.02, 4).png().toBuffer();

/** The mark centred on a white square; `fill` = share of the side the mark's height takes. */
async function iconPng(size, { fill = 0.78, radius = 0 } = {}) {
  const h = Math.round(size * fill);
  const glyph = await sharp(mark).resize({ height: h }).toBuffer();
  const { width: w } = await sharp(glyph).metadata();
  let img = sharp({ create: { width: size, height: size, channels: 4, background: "#ffffff" } }).composite([
    { input: glyph, left: Math.round((size - w) / 2), top: Math.round((size - h) / 2) },
  ]);
  if (radius) {
    const r = Math.round(size * radius);
    const mask = Buffer.from(`<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" ry="${r}"/></svg>`);
    img = sharp(await img.png().toBuffer()).composite([{ input: mask, blend: "dest-in" }]);
  }
  // A palette PNG keeps the icons small (the mark only has a few colours).
  return img.png({ palette: true, quality: 90, compressionLevel: 9 }).toBuffer();
}

/** A .ico file holding PNG images (supported by every current browser). */
function ico(pngs) {
  const header = Buffer.alloc(6 + 16 * pngs.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = header.length;
  pngs.forEach(({ size, data }, i) => {
    const e = 6 + 16 * i;
    header.writeUInt8(size >= 256 ? 0 : size, e);
    header.writeUInt8(size >= 256 ? 0 : size, e + 1);
    header.writeUInt16LE(1, e + 4); // colour planes
    header.writeUInt16LE(32, e + 6); // bits per pixel
    header.writeUInt32LE(data.length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...pngs.map((p) => p.data)]);
}

const favicons = await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await iconPng(size, { fill: 0.86, radius: 0.2 }) })));
fs.writeFileSync(at("src/app/favicon.ico"), ico(favicons));
fs.writeFileSync(at("src/app/icon.png"), await iconPng(512, { fill: 0.74, radius: 0.2 }));
fs.writeFileSync(at("src/app/apple-icon.png"), await iconPng(180, { fill: 0.66 }));
fs.mkdirSync(at("public/icons"), { recursive: true });
fs.writeFileSync(at("public/icons/icon-192.png"), await iconPng(192, { fill: 0.7 }));
fs.writeFileSync(at("public/icons/icon-512.png"), await iconPng(512, { fill: 0.7 }));
fs.writeFileSync(at("public/icons/icon-maskable-512.png"), await iconPng(512, { fill: 0.52 }));
console.log("icons     favicon.ico (16/32/48), icon.png, apple-icon.png, public/icons/*");

// ───────────────────────── Share images ─────────────────────────

/** An image file as a data URI, resized for the card (keeps the HTML self-contained). */
async function img(file, width) {
  const buf = await sharp(at(file)).resize({ width, withoutEnlargement: true }).jpeg({ quality: 88 }).toBuffer();
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const cover = (slug, i = 0) => {
  const list = media[slug];
  return list[i] ?? list[0];
};

const logo = `data:image/png;base64,${(await iconPng(160, { fill: 0.74 })).toString("base64")}`;
const handle = "@" + team.contact.instagram.replace(/\/+$/, "").split("/").pop();

const page = (kicker, titleHtml, sub, art, titleSize = 60) => `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Cairo:wght@400;600&display=block" rel="stylesheet">
<style>
  :root { --paper:#eef3f7; --card:#ffffff; --ink:#002a3e; --ink2:#2b4a5c; --muted:#5e7787; --accent:#0e7c9e; --sky:#4cc0ea; }
  * { box-sizing:border-box; margin:0; padding:0; }
  body { width:1200px; height:630px; overflow:hidden; background:var(--paper); font-family:"Poppins","Cairo",sans-serif; color:var(--ink); }
  .card { position:relative; width:1200px; height:630px; display:grid; grid-template-columns:600px 1fr; gap:24px; padding:56px 56px 50px; overflow:hidden;
    background-image:radial-gradient(rgba(0,42,62,.10) 1.2px, transparent 1.3px); background-size:20px 20px; }
  .card::after { content:""; position:absolute; left:0; right:0; bottom:0; height:12px; background:var(--ink); border-top:4px solid var(--accent); }
  .text { display:flex; flex-direction:column; min-width:0; }
  .brand { display:flex; align-items:center; gap:16px; font-family:"Poppins"; font-weight:700; font-size:36px; letter-spacing:-.01em; }
  .brand img { width:64px; height:64px; border-radius:16px; border:2px solid var(--ink); }
  .kicker { margin-top:40px; display:flex; align-items:center; gap:12px; font-family:"Poppins"; font-weight:600; font-size:17px; letter-spacing:.14em; text-transform:uppercase; color:var(--muted); }
  .kicker::before { content:""; width:12px; height:12px; border-radius:50%; background:var(--accent); }
  h1 { margin-top:18px; font-family:"Poppins","Cairo"; font-weight:700; font-size:${titleSize}px; line-height:1.1; letter-spacing:-.02em; }
  mark { color:inherit; background:linear-gradient(transparent 58%, var(--sky) 58%, var(--sky) 92%, transparent 92%); padding:0 .06em; }
  .sub { margin-top:22px; font-size:24px; line-height:1.35; color:var(--ink2); }
  .foot { margin-top:auto; font-family:"Poppins"; font-weight:500; font-size:18px; color:var(--muted); }
  .art { position:relative; min-width:0; }
  .tile { position:absolute; overflow:hidden; border:2px solid var(--ink); border-radius:18px; background:var(--card); box-shadow:7px 7px 0 var(--ink); }
  .tile img { display:block; width:100%; height:100%; object-fit:cover; object-position:top; }
  .tag { position:absolute; left:10px; bottom:10px; padding:5px 10px; border-radius:999px; border:2px solid var(--ink); background:var(--card); font:700 12px/1 "Poppins"; letter-spacing:.08em; text-transform:uppercase; }
  .tag.v { background:var(--sky); }
  .browser { position:absolute; overflow:hidden; border:2px solid var(--ink); border-radius:14px; background:#fff; box-shadow:8px 8px 0 var(--ink); }
  .bar { height:30px; display:flex; align-items:center; gap:6px; padding:0 12px; background:#ebe7da; border-bottom:2px solid var(--ink); }
  .bar i { width:10px; height:10px; border-radius:50%; border:1.5px solid var(--ink); background:#fff; } .bar i:first-child { background:var(--sky); }
  .bar span { margin-left:8px; flex:1; height:18px; border-radius:5px; background:#fff; border:1px solid rgba(0,42,62,.14); font:12px/18px "Poppins"; color:var(--muted); padding:0 8px; white-space:nowrap; overflow:hidden; }
  .browser img { display:block; width:100%; aspect-ratio:1440/900; object-fit:cover; object-position:top; }
  .phone { position:absolute; padding:6px; border-radius:26px; border:2px solid var(--ink); background:var(--ink); box-shadow:7px 7px 0 var(--accent); }
  .phone img { display:block; width:100%; aspect-ratio:780/1688; object-fit:cover; border-radius:20px; }
</style></head><body><div class="card">
  <div class="text">
    <div class="brand"><img src="${logo}">${esc(team.name)}</div>
    <div class="kicker">${esc(kicker)}</div>
    <h1>${titleHtml}</h1>
    <p class="sub">${esc(sub)}</p>
    <div class="foot">${esc(handle)}  ·  ${esc(team.contact.email)}</div>
  </div>
  <div class="art">${art}</div>
</div></body></html>`;

const tile = (src, style, label, video = false) =>
  `<div class="tile" style="${style}"><img src="${src}">${label ? `<span class="tag${video ? " v" : ""}">${video ? "▶ " : ""}${label}</span>` : ""}</div>`;
const browser = (src, url, style) => `<div class="browser" style="${style}"><div class="bar"><i></i><i></i><i></i><span>${url}</span></div><img src="${src}"></div>`;

const lead = products[0];
const cards = [];

cards.push({
  out: "src/app/opengraph-image.jpg",
  alt: `${team.name} — creative design and smart software: branding, social media, video, websites and mobile apps.`,
  html: page(
    `Media + Technology · ${team.location}`,
    `Creative design and smart software, <mark>under one roof</mark>.`,
    "Branding · Social media · Video · Websites · Mobile apps · CRM & ERP",
    browser(await img("public" + lead.desktop.src, 900), lead.displayUrl, "left:10px; top:50px; width:470px; transform:rotate(-2deg)") +
      `<div class="phone" style="right:6px; top:150px; width:150px; transform:rotate(3deg)"><img src="${await img("public/videos/48hr-express-2.webp", 320)}"></div>` +
      tile(await img("public" + cover("masjid-al-tawba").src, 360), "left:-6px; top:330px; width:170px; height:170px; transform:rotate(-6deg); box-shadow:7px 7px 0 var(--sky)", "Logo") +
      tile(await img("public/videos/dental-clinic-film.webp", 500), "left:186px; top:350px; width:250px; height:141px; transform:rotate(3deg); box-shadow:7px 7px 0 var(--accent)", "Film", true),
    58,
  ),
});

const designs = Object.values(media).reduce((n, list) => n + list.length, 0);
cards.push({
  out: "src/app/media/opengraph-image.jpg",
  alt: `${team.name} media work — promo reels, motion graphics, films, logos, social media posts and print.`,
  html: page(
    "Area 01 · Media",
    `<mark>Video</mark>, brands, social media &amp; print.`,
    `${videoMeta.length} videos · ${projectMeta.length} design projects · ${designs}+ designs`,
    tile(await img("public" + cover("dental-clinics").src, 400), "left:0; top:40px; width:170px; height:170px; transform:rotate(-4deg)", "Post") +
      tile(await img("public" + cover("bet-ziani-concept").src, 400), "left:6px; top:240px; width:165px; height:165px; transform:rotate(3deg)", "Logo") +
      tile(await img("public/videos/el-ameed-institute.webp", 400), "left:192px; top:30px; width:180px; height:320px; transform:rotate(1.5deg); box-shadow:7px 7px 0 var(--accent)", "Reel", true) +
      tile(await img("public/videos/tunisia-diving.webp", 500), "left:186px; top:372px; width:250px; height:141px; transform:rotate(-2deg)", "Film", true) +
      tile(await img("public" + cover("examed-exadent", 9).src, 500), "left:10px; top:430px; width:150px; height:113px; transform:rotate(-3deg)", "Print"),
  ),
});

const [p1, p2] = products;
cards.push({
  out: "src/app/tech/opengraph-image.jpg",
  alt: `${team.name} technology — websites, web platforms, CRM and ERP systems, and Flutter mobile apps.`,
  html: page(
    "Area 02 · Technology",
    `Websites, systems &amp; <mark>mobile apps</mark>.`,
    "Websites · Web platforms · CRM & ERP · Flutter apps",
    (p2 ? browser(await img("public" + p2.desktop.src, 900), p2.displayUrl, "left:90px; top:40px; width:430px; transform:rotate(3deg)") : "") +
      browser(await img("public" + p1.desktop.src, 900), p1.displayUrl, "left:0; top:230px; width:450px; transform:rotate(-2deg)") +
      `<div class="phone" style="right:10px; top:250px; width:130px; transform:rotate(4deg)"><img src="${await img("public" + p1.mobile.src, 300)}"></div>`,
  ),
});

for (const p of projectMeta) {
  const c = cover(p.slug, p.cover ?? 0);
  const ratio = c.width / c.height;
  // Fit the cover inside a 470 × 470 box.
  const [w, h] = ratio >= 1 ? [470, Math.round(470 / ratio)] : [Math.round(470 * ratio), 470];
  cards.push({
    out: `public/og/${p.slug}.jpg`,
    html: page(
      `Media · ${p.category}`,
      esc(p.title),
      p.client,
      tile(await img("public" + c.src, 1000), `left:${Math.round((520 - w) / 2)}px; top:${Math.round((520 - h) / 2)}px; width:${w}px; height:${h}px; transform:rotate(2deg)`, ""),
      p.title.length > 22 ? 52 : 64,
    ),
  });
}

fs.mkdirSync(at("public/og"), { recursive: true });
const chromeBrowser = await puppeteer.launch({ executablePath: chrome, headless: true });
const tab = await chromeBrowser.newPage();
await tab.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
for (const card of cards) {
  await tab.setContent(card.html, { waitUntil: "load", timeout: 60_000 });
  await tab.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
  });
  const png = Buffer.from(await tab.screenshot({ type: "png" }));
  const info = await sharp(png).jpeg({ quality: 84, mozjpeg: true }).toFile(at(card.out));
  if (card.alt) fs.writeFileSync(at(card.out.replace(/\.jpg$/, ".alt.txt")), card.alt);
  console.log(`share     ${card.out}  ${(info.size / 1024).toFixed(0)} KB`);
}
await chromeBrowser.close();
