import Reveal from "../Reveal";
import { steps } from "@/data/team";

export default function Approach() {
  return (
    <section className="section" id="approach">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <p className="kicker">Our approach</p>
            <h2>
              A simple process, <span className="mark">no surprises</span>.
            </h2>
          </div>
        </Reveal>

        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.title} className="step">
              <Reveal delay={i * 90}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
