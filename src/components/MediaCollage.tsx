import Image from "next/image";
import { Play } from "./icons";
import LoopVideo from "./LoopVideo";
import { mediaShowcase, type MediaImage } from "@/lib/media";
import { getVideo, type Video } from "@/lib/videos";

type Tile = { label: string; kind: "post" | "logo" | "print"; image: MediaImage } | { label: string; kind: "reel" | "film"; video: Video };

function TileBody({ tile }: { tile: Tile }) {
  if ("video" in tile) {
    return (
      <>
        <LoopVideo video={tile.video} />
        <span className="mc-tag">
          <Play /> {tile.label}
        </span>
      </>
    );
  }
  const { image } = tile;
  return (
    <>
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt=""
        placeholder="blur"
        blurDataURL={image.blur}
        sizes="200px"
        priority
      />
      <span className="mc-tag">{tile.label}</span>
    </>
  );
}

/** The Media page header: one example of each kind of work — post, logo, reel, film and print. */
export default function MediaCollage() {
  const reel = getVideo("el-ameed-institute");
  const film = getVideo("tunisia-diving");
  const columns: Tile[][] = [
    [
      { label: "Post", kind: "post", image: mediaShowcase.post },
      { label: "Logo", kind: "logo", image: mediaShowcase.logo },
    ],
    reel ? [{ label: "Reel", kind: "reel", video: reel }] : [],
    [
      ...(film ? [{ label: "Film", kind: "film", video: film } as const] : []),
      { label: "Print", kind: "print", image: mediaShowcase.print },
    ],
  ];

  return (
    <div className="page-art media-collage" aria-hidden>
      {columns.map((col, i) => (
        <div key={i} className="mc-col">
          {col.map((tile) => (
            <div key={tile.kind} className={`mc-tile mc-${tile.kind}`}>
              <TileBody tile={tile} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
