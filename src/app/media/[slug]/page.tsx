import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import { ArrowLeft } from "@/components/icons";
import { getAdjacent, getMediaProject, mediaProjects } from "@/lib/media";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return mediaProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getMediaProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: project.cover.src, width: project.cover.width, height: project.cover.height }],
    },
  };
}

export default async function MediaProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getMediaProject(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacent(project.slug);

  return (
    <>
      <section className="page-head">
        <div className="container">
          <Link href="/media" className="back">
            <ArrowLeft /> All media work
          </Link>
          <span className="chip" data-cat={project.category}>
            {project.category}
          </span>
          <h1 style={{ marginTop: "1rem" }}>{project.title}</h1>

          <div className="project-meta">
            <p className="page-lead">{project.description}</p>
            <dl>
              <div>
                <dt>Client</dt>
                <dd>{project.client}</dd>
              </div>
              <div>
                <dt>Services</dt>
                <dd className="tags" style={{ marginBottom: 0 }}>
                  {project.services.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </dd>
              </div>
              <div>
                <dt>Designs</dt>
                <dd>{project.images.length}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="container">
          <Gallery images={project.images} title={project.title} />

          <nav className="pager" aria-label="More projects">
            <Link href={`/media/${prev.slug}`}>
              <small>← Previous</small>
              <strong>{prev.title}</strong>
            </Link>
            <Link href={`/media/${next.slug}`}>
              <small>Next →</small>
              <strong>{next.title}</strong>
            </Link>
          </nav>
        </div>
      </section>
    </>
  );
}
