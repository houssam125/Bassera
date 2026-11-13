import Reveal from "../Reveal";
import { capabilities } from "@/data/team";

export default function WhatWeDo() {
  return (
    <section className="section" id="what-we-do">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <p className="kicker">What we do</p>
            <h2>
              One team that covers the <span className="mark">whole journey</span>.
            </h2>
            <p>
              We work together across every stage of a project — so ideas don&apos;t get lost between design, code and
              launch.
            </p>
          </div>
        </Reveal>

        <div className="bento">
          <Reveal className="statement">
            <p className="kicker">Why it works</p>
            <h3>Design, code and launch — under one roof.</h3>
            <p>Fewer hand-offs, clearer decisions and a result that feels like one product, not many parts.</p>
          </Reveal>

          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 90}>
              <article className="cap" style={{ height: "100%" }}>
                <span className="cap-num">0{i + 1}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <ul>
                  {c.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
