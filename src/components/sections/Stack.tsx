import Reveal from "../Reveal";
import { stack } from "@/data/team";

export default function Stack() {
  return (
    <section className="section" id="stack" style={{ paddingTop: "2rem" }}>
      <div className="container">
        <Reveal>
          <div className="section-head">
            <p className="kicker">Tools we use</p>
            <h2>
              Modern, proven <span className="mark">technology</span>.
            </h2>
            <p>
              From the interface to the database and the way it ships: web and Flutter mobile apps, containerised
              with Docker Compose, deployed through CI/CD pipelines to separate staging and production environments.
            </p>
          </div>
          <div className="stack-groups">
            {stack.map(({ group, items }) => (
              <div key={group} className="stack-group">
                <h3>{group}</h3>
                <ul className="chips">
                  {items.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
