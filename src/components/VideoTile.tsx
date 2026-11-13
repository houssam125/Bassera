"use client";

import { useRef, useState } from "react";
import type { Video } from "@/lib/videos";
import { Play } from "./icons";

// Only one video plays at a time across the page.
let playing: HTMLVideoElement | null = null;

const clock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/** A poster with a play button; the native player (with sound and controls) takes over on click. */
export default function VideoTile({ video }: { video: Video }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    void ref.current?.play();
  };

  return (
    <figure className="vid">
      <div
        className="vid-frame"
        style={{ aspectRatio: `${video.width} / ${video.height}`, backgroundImage: `url(${video.blur})` }}
      >
        <video
          ref={ref}
          src={video.src}
          poster={video.poster}
          width={video.width}
          height={video.height}
          preload="none"
          playsInline
          controls={started}
          aria-label={`${video.title} — ${video.client}`}
          onPlay={(e) => {
            if (playing && playing !== e.currentTarget) playing.pause();
            playing = e.currentTarget;
            setStarted(true);
          }}
        />
        {!started && (
          <button type="button" className="vid-play" onClick={start} aria-label={`Play “${video.title}”`}>
            <span className="vid-btn">
              <Play />
            </span>
            <span className="vid-time">{clock(video.duration)}</span>
          </button>
        )}
      </div>
      <figcaption>
        <span className="chip" data-cat={video.kind}>
          {video.kind}
        </span>
        <strong>{video.title}</strong>
        <span className="vid-client">{video.client}</span>
        {/* Reels are too narrow for a paragraph; the wider films get their summary. */}
        {!video.vertical && <p>{video.summary}</p>}
      </figcaption>
    </figure>
  );
}
