import type { Metadata } from "next";
import { ArrowRight } from "@/components/icons";
import MediaCollage from "@/components/MediaCollage";
import Reveal from "@/components/Reveal";
import Videos from "@/components/sections/Videos";
import WorkBrowser from "@/components/WorkBrowser";
import { categories, mediaProjects, toCard, totalDesigns } from "@/lib/media";
import { videos } from "@/lib/videos";

export const metadata: Metadata = {
  title: "Media",
  description: "Promo reels, motion graphics and films — plus brand identities, social media campaigns and print design.",
};

export default function MediaPage() {
  return (
    <>
      <section className="page-head">
        <div className="container page-head-grid">
          <div>
            <p className="kicker">Area 01 · Media</p>
            <h1>
              <span className="mark">Video</span>, brands, social media &amp; print.
            </h1>
            <p className="page-lead">
              {videos.length} videos — promo reels, motion graphics and films — and {mediaProjects.length} design
              projects with {totalDesigns}+ designs: logos and identities, campaign series, posters, roll-ups and
              printed workbooks.
            </p>
            <a href="#designs" className="btn btn-line btn-sm page-jump">
              Jump to the designs <ArrowRight />
            </a>
          </div>
          <MediaCollage />
        </div>
      </section>

      {/* Videos are the strongest work, so they come first. */}
      <Videos style={{ paddingTop: "1.5rem" }} />

      <section className="section" id="designs" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <Reveal>
            <div className="section-head">
              <p className="kicker">Design</p>
              <h2>
                Brands, campaigns &amp; <span className="mark">print</span>.
              </h2>
              <p>
                {mediaProjects.length} projects and {totalDesigns}+ designs. Filter by category and open a project to
                see the full set.
              </p>
            </div>
          </Reveal>
          <WorkBrowser items={mediaProjects.map(toCard)} categories={categories} />
        </div>
      </section>
    </>
  );
}
