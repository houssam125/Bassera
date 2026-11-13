import Image from "next/image";
import Link from "next/link";
import DeviceStage from "../DeviceStage";
import { ArrowUpRight, Play } from "../icons";
import LoopVideo from "../LoopVideo";
import { products, team } from "@/data/team";
import { getMediaProject } from "@/lib/media";
import { getVideo } from "@/lib/videos";

export default function Hero() {
  const lead = products[0];
  const art = getMediaProject("masjid-al-tawba")?.cover;
  // The phone plays one of our reels instead of the website's mobile view, and a film card joins
  // the logo card — so the hero shows design, a website, a reel and a film together.
  const reel = getVideo("48hr-express-2");
  const film = getVideo("dental-clinic-film");

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <p className="kicker">Media + Technology · {team.location}</p>
          <h1>
            Creative design and smart software, <span className="mark">under one roof</span>.
          </h1>
          <p className="hero-lead">{team.description}</p>
          <div className="hero-actions">
            <Link href="/media" className="btn btn-ink">
              Explore media <ArrowUpRight />
            </Link>
            <Link href="/tech" className="btn btn-line">
              Explore technology
            </Link>
          </div>
          <ul className="pillars" aria-label="How we work">
            <li><b>01</b>Design</li>
            <li><b>02</b>Build</li>
            <li><b>03</b>Launch</li>
          </ul>
        </div>

        <DeviceStage
          product={lead}
          priority
          phone={
            reel && (
              <Link href="/media#video" className="phone-reel" aria-label={`Watch our videos — ${reel.client}`}>
                <LoopVideo video={reel} />
                <span className="play-tag" aria-hidden>
                  <Play /> Reel
                </span>
              </Link>
            )
          }
        >
          <span className="sticker" aria-hidden>
            Media
            <br />+<br />
            Tech
          </span>
          {art && (
            <div className="float-card" aria-hidden>
              <Image src={art.src} alt="" width={art.width} height={art.height} sizes="160px" priority />
            </div>
          )}
          {film && (
            <Link href="/media#video" className="film-card" aria-label={`Watch our films — ${film.client}`}>
              <LoopVideo video={film} />
              <span className="play-tag" aria-hidden>
                <Play /> Film
              </span>
            </Link>
          )}
        </DeviceStage>
      </div>
    </section>
  );
}
