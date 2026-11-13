import Image from "next/image";
import Link from "next/link";
import type { CardData } from "@/lib/media";
import { ArrowUpRight } from "./icons";

export default function ProjectCard({
  project,
  sizes = "(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 400px",
  priority = false,
}: {
  project: CardData;
  sizes?: string;
  priority?: boolean;
}) {
  const { cover } = project;
  return (
    <Link href={`/media/${project.slug}`} className="card">
      <Image
        className="card-img"
        src={cover.src}
        width={cover.width}
        height={cover.height}
        alt={`${project.title} — cover`}
        placeholder="blur"
        blurDataURL={cover.blur}
        sizes={sizes}
        priority={priority}
        style={project.coverPosition ? { objectPosition: project.coverPosition } : undefined}
      />
      <span className="card-arrow">
        <ArrowUpRight />
      </span>
      <div className="card-body">
        <span className="chip" data-cat={project.category}>
          {project.category}
        </span>
        <h3>{project.title}</h3>
        <div className="card-meta">
          <span>{project.client}</span>
          <span>{project.count} designs</span>
        </div>
      </div>
    </Link>
  );
}
