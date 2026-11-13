# Bassera site

One Next.js project with two areas:

- **Media** (`/media`) — brand, social media and print design: 12 projects, 100+ designs, filters, project pages and a full-screen gallery — plus 9 videos (promo reels, motion graphics and films).
- **Technology** (`/tech`) — live products (websites, platforms, dashboards), the tools used, and what the team does.

The home page introduces both areas, what the team does and how it works. All content is stored locally — no database or API.

## Run it

```bash
npm install      # only needed the first time
npm run dev      # http://localhost:3000
```

Production check: `npm run build` then `npm start`.

## Where to edit

| What | File |
| --- | --- |
| Team name, contact details, capabilities, process, tools, tech products | `src/data/team.ts` |
| Media projects (titles, texts, categories, cover image) | `src/data/media.ts` |
| Videos (titles, clients, labels, order) | `src/data/videos.ts` |
| Colours and fonts | `src/app/globals.css` (tokens at the top) |
| Area cards, media pages, lightbox styles | `src/app/areas.css` |

Contact fields live in `src/data/team.ts` (`email`, `phone`, `instagram`, `facebook`, `github`, `linkedin`). Email, Instagram and Facebook are filled in; each filled field shows as a button in the "Work with us" section and a link in the footer. Empty ones stay hidden.

## "Propose a project" form

The form in the "Work with us" section emails each proposal to the team (the contact email, or `PROPOSALS_TO`), with the visitor's address as reply-to — so pressing Reply answers them directly. Sending goes through an SMTP account set in `.env.local` locally and in the hosting platform's environment variables in production; `.env.example` lists the variables and how to get a Gmail App password.

Until `SMTP_USER` and `SMTP_PASS` are set, the form still works: it opens the visitor's email app with the proposal filled in and addressed to the team.

## Media images

The design files live in `public/media/<project>/` as optimised WebP. To rebuild them from the original folder (which projects each file belongs to is listed in `scripts/works.manifest.json`):

```bash
npm run assets                          # reads C:/Users/DELL/Desktop/mehdi
MEDIA_SOURCE=D:/designs npm run assets  # or another folder
```

## Videos

The videos in `public/videos/` (720p MP4 + a WebP poster each, plus small silent loops for the autoplaying videos on the home page: every vertical reel, and a highlight clip of any film given a `preview` range in the manifest) are compressed from the originals in the Google Drive "videos" folder. Download that folder, then point the script at it — which file each video comes from, and the second used for its poster, is listed in `scripts/videos.manifest.json`:

```bash
VIDEO_SOURCE="C:/path/to/videos" npm run videos
VIDEO_SOURCE="C:/path/to/videos" ONLY=menttify npm run videos   # just one
npm run videos                                                 # no source: only rebuild the silent loops
```

The home page uses `48hr-express-2` in the hero phone, and the parasailing film plus two reels in the Media card — change the slugs in `src/components/sections/Hero.tsx` and `src/components/sections/AreaCards.tsx`.

## Technology screenshots

The product screenshots in `public/tech/` are taken from the live sites listed in `scripts/targets.json` (needs Google Chrome installed):

```bash
npm run capture
ONLY=alamia npm run capture   # just one site
```

Set `CHROME_PATH` if Chrome is not in its default location.
