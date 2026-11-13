"use client";

import { useState } from "react";
import type { Category } from "@/data/media";
import type { CardData } from "@/lib/media";
import ProjectCard from "./ProjectCard";

type Filter = "All" | Category;

export default function WorkBrowser({
  items,
  categories,
}: {
  items: CardData[];
  categories: Category[];
}) {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = filter === "All" ? items : items.filter((i) => i.category === filter);
  const filters: Filter[] = ["All", ...categories];
  const countFor = (f: Filter) => (f === "All" ? items.length : items.filter((i) => i.category === f).length);

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects by category">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            className="filter"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {f}
            <small>{countFor(f)}</small>
          </button>
        ))}
      </div>

      <div className="work-grid">
        {visible.map((p, i) => (
          <ProjectCard key={p.slug} project={p} priority={i < 3} />
        ))}
      </div>
    </>
  );
}
