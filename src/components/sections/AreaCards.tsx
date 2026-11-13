import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "../icons";
import LoopVideo from "../LoopVideo";
import Reveal from "../Reveal";
import { products } from "@/data/team";
import { getMediaProject, totalDesigns, mediaProjects } from "@/lib/media";
import { getVideo, videos } from "@/lib/videos";

// The Media card shows both sides of the work: a film playing above two designs framing two reels.
const film = "tunisia-parasailing";
const tiles = [
  { kind: "design", slug: "scouts-campaigns" },
  { kind: "reel", slug: "48hr-express-1" },
  { kind: "reel", slug: "safir-al-marifa" },
  { kind: "design", slug: "sy-fit" },
] as const;

function MediaTile({ kind, slug }: (typeof tiles)[number]) {
  if (kind === "reel") {
    const video = getVideo(slug);
    return video ? (
      <span className="mix-reel">
        <LoopVideo video={video} />
        <span className="mix-badge">
          <Play />
        </span>
      </span>
    ) : null;
  }
  const cover = getMediaProject(slug)?.cover;
  return cover ? (
    <Image className="mix-design" src={cover.src} alt="" width={cover.width} height={cover.height} sizes="140px" />
  ) : null;
}

export default function AreaCards() {
  const filmVideo = getVideo(film);

  return (
    <section className="section" id="areas" style={{ paddingTop: "4.5rem" }}>
      <div className="container">
        <Reveal>
          <div className="section-head">
            <p className="kicker">Two areas</p>
            <h2>
              One team, two <span className="mark">areas of work</span>.
            </h2>
            <p>Pick the area you need — or bring both together for a brand and a product that match.</p>
          </div>
        </Reveal>

        <div className="areas">
          <Reveal>
            <Link href="/media" className="area area-media">
              <p className="kicker">Area 01</p>
              <h3>Media</h3>
              <p>
                Video, brand identities, social media campaigns and print design — {videos.length} videos,{" "}
                {mediaProjects.length} projects and {totalDesigns}+ designs.
              </p>
              <div className="area-media-art" aria-hidden>
                {filmVideo && (
                  <span className="mix-film">
                    <LoopVideo video={filmVideo} />
                    <span className="mix-badge">
                      <Play />
                    </span>
                  </span>
                )}
                <div className="area-mix">
                  {tiles.map((t) => (
                    <MediaTile key={t.slug} {...t} />
                  ))}
                </div>
              </div>
              <span className="area-go">
                See the media work <ArrowUpRight />
              </span>
            </Link>
          </Reveal>

          <Reveal delay={90}>
            <Link href="/tech" className="area area-tech">
              <p className="kicker">Area 02</p>
              <h3>Technology</h3>
              <p>
                Websites, platforms, CRM &amp; ERP systems and mobile apps, built end to end — {products.length} live
                products, from design to deployment.
              </p>
              {/* Every product, as overlapping browser windows (the first one in front). */}
              <div className="area-shots" aria-hidden>
                {products.map((p) => (
                  <div key={p.slug} className="mini-browser">
                    <div className="mini-bar">
                      <i />
                      <i />
                      <i />
                      <span>{p.displayUrl}</span>
                    </div>
                    <Image src={p.desktop.src} alt="" width={p.desktop.width} height={p.desktop.height} sizes="400px" />
                  </div>
                ))}
              </div>
              <span className="area-go">
                See the products <ArrowUpRight />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
