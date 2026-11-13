import Reveal from "../Reveal";
import VideoTile from "../VideoTile";
import { films, reels, videos } from "@/lib/videos";

/** The Media area's video showcase: vertical reels first, then landscape films. */
export default function Videos({ style }: { style?: React.CSSProperties }) {
  return (
    <section className="section" id="video" style={style}>
      <div className="container">
        <Reveal>
          <div className="section-head">
            <p className="kicker">Video &amp; motion</p>
            <h2>
              Reels, motion graphics &amp; <span className="mark">films</span>.
            </h2>
            <p>
              {videos.length} videos — promo reels for local businesses and schools, animated explainers, and cinematic
              films. Press play to watch with sound.
            </p>
          </div>
        </Reveal>

        <h3 className="vid-group">
          Reels &amp; motion <small>{reels.length}</small>
        </h3>
        <div className="vid-grid vid-grid-reels">
          {reels.map((v) => (
            <VideoTile key={v.slug} video={v} />
          ))}
        </div>

        <h3 className="vid-group">
          Films <small>{films.length}</small>
        </h3>
        <div className="vid-grid vid-grid-films">
          {films.map((v) => (
            <VideoTile key={v.slug} video={v} />
          ))}
        </div>
      </div>
    </section>
  );
}
