import Reveal from "../Reveal";
import { ArrowUpRight } from "../icons";
import ProposalForm from "../ProposalForm";
import SeeWorkLink from "../SeeWorkLink";
import { socialLinks, team } from "@/data/team";

export default function Contact() {
  const { email, phone } = team.contact;
  const external = socialLinks();

  return (
    <section className="section" id="contact" style={{ paddingTop: "3rem" }}>
      <div className="container">
        <Reveal>
          <div className="cta cta-grid">
            <div>
              <p className="kicker">Work with us</p>
              <h2>
                Have something to <span className="mark">build</span>?
              </h2>
              <p>
                Tell us about your idea — a website, an app, a brand or a video — with the form, or reach us directly.
                We&apos;ll help you take it from sketch to launch.
              </p>
              <div className="hero-actions">
                {email && (
                  <a href={`mailto:${email}`} className="btn btn-sky">
                    {email} <ArrowUpRight />
                  </a>
                )}
                {phone && (
                  <a href={`tel:${phone.replace(/\s+/g, "")}`} className="btn btn-line">
                    {phone}
                  </a>
                )}
                {external.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-line">
                    {l.label} <ArrowUpRight />
                  </a>
                ))}
                <SeeWorkLink className={email || phone || external.length ? "btn btn-line" : "btn btn-sky"}>
                  See our work <ArrowUpRight />
                </SeeWorkLink>
              </div>
            </div>
            <ProposalForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
