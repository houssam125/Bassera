import DeviceStage from "../DeviceStage";
import { ArrowUpRight } from "../icons";
import Reveal from "../Reveal";
import { products } from "@/data/team";

/** The Technology area's product showcase. */
export default function Products() {
  return (
    <section className="section" id="products" style={{ paddingTop: "2rem" }}>
      <div className="container">
        <Reveal>
          <div className="section-head">
            <p className="kicker">Live products</p>
            <h2>
              Built, launched and <span className="mark">online</span>.
            </h2>
            <p>{products.length} products we designed, built and deployed — open them and try them yourself.</p>
          </div>
        </Reveal>
        <div className="work-list">
          {products.map((p, i) => (
            <Reveal key={p.slug}>
              <article className="panel">
                <div className="panel-text">
                  <p className="kicker">
                    Product 0{i + 1} · {p.kind}
                  </p>
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>
                  <ul className="checks">
                    {p.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <div className="tags">
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  {p.href ? (
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
                      Visit live site <ArrowUpRight />
                    </a>
                  ) : (
                    <span className="status">In development</span>
                  )}
                </div>
                <DeviceStage product={p} />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
