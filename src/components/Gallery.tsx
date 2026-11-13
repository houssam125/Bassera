"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MediaImage } from "@/lib/media";
import { ArrowLeft, ArrowRight, Close } from "./icons";

export default function Gallery({ images, title }: { images: MediaImage[]; title: string }) {
  const [active, setActive] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const total = images.length;

  const close = useCallback(() => {
    setActive(null);
    opener.current?.focus();
  }, []);
  const step = useCallback(
    (dir: 1 | -1) => setActive((i) => (i === null ? i : (i + dir + total) % total)),
    [total],
  );

  const isOpen = active !== null;
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close, step]);

  return (
    <>
      <div className="gallery">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            className="shot"
            aria-label={`Open ${title} design ${i + 1} of ${total}`}
            onClick={(e) => {
              opener.current = e.currentTarget;
              setActive(i);
            }}
          >
            <Image
              src={img.src}
              width={img.width}
              height={img.height}
              alt={`${title} — design ${i + 1}`}
              placeholder="blur"
              blurDataURL={img.blur}
              sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 380px"
            />
          </button>
        ))}
      </div>

      {active !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${title} gallery`}>
          <button ref={closeBtn} type="button" className="lb-btn lb-close" aria-label="Close" onClick={close}>
            <Close />
          </button>
          {total > 1 && (
            <>
              <button type="button" className="lb-btn lb-prev" aria-label="Previous design" onClick={() => step(-1)}>
                <ArrowLeft />
              </button>
              <button type="button" className="lb-btn lb-next" aria-label="Next design" onClick={() => step(1)}>
                <ArrowRight />
              </button>
            </>
          )}
          <div className="lightbox-stage" onClick={close}>
            <div className="lightbox-frame">
              <Image
                key={images[active].src}
                src={images[active].src}
                alt={`${title} — design ${active + 1}`}
                fill
                sizes="100vw"
                priority
              />
            </div>
          </div>
          <div className="lightbox-bar">
            <span>{title}</span>
            <span aria-live="polite">
              {active + 1} / {total}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
