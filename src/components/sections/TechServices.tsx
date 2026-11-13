import Reveal from "../Reveal";
import { techServices } from "@/data/team";

/** The Technology page's list of what we build — services, independent of the live products below. */
export default function TechServices() {
  return (
    <section className="section" id="services" style={{ paddingTop: "1rem" }}>
      <div className="container">
        <Reveal>
          <div className="section-head">
            <p className="kicker">What we build</p>
            <h2>
              From websites to <span className="mark">business systems</span>.
            </h2>
            <p>
              Websites and platforms, CRM and ERP systems, and mobile apps — designed, built and deployed by the same
              team.
            </p>
          </div>
        </Reveal>

        <div className="services-grid">
          {techServices.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 70}>
              <article className="cap" style={{ height: "100%" }}>
                <span className="cap-num">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul>
                  {s.tags.map((t) => (
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
