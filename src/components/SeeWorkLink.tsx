"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Goes to the top of the Media page. From another page it navigates there; on the Media page
 * itself (where a link to the same URL would do nothing) it scrolls back to the top.
 */
export default function SeeWorkLink({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <Link
      href="/media"
      className={className}
      onClick={(e) => {
        if (window.location.pathname === "/media") {
          e.preventDefault();
          window.scrollTo({ top: 0 });
        }
      }}
    >
      {children}
    </Link>
  );
}
