"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { nav, socialLinks, team } from "@/data/team";
import { ArrowUpRight } from "./icons";

/** The ☰ menu that replaces the header links on phones. */
export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);

  // Close on Escape, or on a tap outside the menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div className="mnav" ref={root}>
      <button
        type="button"
        className="mnav-toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
      >
        <span aria-hidden />
        <span aria-hidden />
      </button>

      <div id="mobile-menu" className="mnav-panel" hidden={!open}>
        <nav aria-label="Menu">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={close}>
              {item.label} <ArrowUpRight />
            </Link>
          ))}
        </nav>
        <a href="#contact" className="btn btn-lime mnav-cta" onClick={close}>
          Work with us
        </a>
        <div className="mnav-contact">
          {team.contact.email && <a href={`mailto:${team.contact.email}`}>{team.contact.email}</a>}
          {socialLinks().map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
