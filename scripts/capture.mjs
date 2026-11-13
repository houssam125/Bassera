// Takes a desktop and a mobile screenshot of every site in scripts/targets.json
// and writes them to public/tech/<slug>-desktop.webp / <slug>-mobile.webp.
//
//   npm run capture
//   ONLY=alamia npm run capture        (just one site)
//   CHROME_PATH="C:/path/to/chrome.exe" npm run capture
//
// Sites that fail to load are skipped and their previous screenshots are kept.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public/tech");
const only = process.env.ONLY?.split(",");
const targets = JSON.parse(fs.readFileSync(path.join(root, "scripts/targets.json"), "utf8")).filter(
  (t) => !only || only.includes(t.slug),
);
const chrome = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";

const views = {
  desktop: { viewport: { width: 1440, height: 900, deviceScaleFactor: 1 } },
  mobile: {
    viewport: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
    ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  },
};

fs.mkdirSync(outDir, { recursive: true });
const browser = await puppeteer.launch({ executablePath: chrome, headless: true });

for (const { slug, url } of targets) {
  for (const [name, view] of Object.entries(views)) {
    const label = `${slug}-${name}`;
    const page = await browser.newPage();
    try {
      await page.setViewport(view.viewport);
      if (view.ua) await page.setUserAgent(view.ua);
      await page.goto(url, { waitUntil: "networkidle2", timeout: 60_000 });
      await new Promise((r) => setTimeout(r, 2500)); // let entrance animations settle
      const png = Buffer.from(await page.screenshot({ type: "png" }));
      const info = await sharp(png).webp({ quality: 82 }).toFile(path.join(outDir, `${label}.webp`));
      console.log(`ok    ${label}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
    } catch (err) {
      console.warn(`skip  ${label}  (${err.message})`);
    } finally {
      await page.close();
    }
  }
}

await browser.close();
