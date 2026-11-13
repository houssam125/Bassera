"use client";

import { useEffect, useRef } from "react";
import type { Video } from "@/lib/videos";

/**
 * A silent, looping reel used as a moving picture. It only plays while on screen, and stays on
 * its poster for visitors who prefer reduced motion.
 */
export default function LoopVideo({ video, className }: { video: Video; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.muted = true; // autoplay is only allowed without sound
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={video.preview ?? video.src}
      poster={video.poster}
      width={video.width}
      height={video.height}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      tabIndex={-1}
    />
  );
}
