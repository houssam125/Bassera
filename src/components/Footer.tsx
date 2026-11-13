import Link from "next/link";
import { nav, socialLinks, team } from "@/data/team";

// Cache Components forbids reading the clock during prerender; caching it
// freezes the year at build time (the cache entry revalidates over time).
async function Year() {
  "use cache";
  return new Date().getFullYear();
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-row">
          <span>
            © <Year /> {team.name}. All rights reserved.
          </span>
          <nav className="footer-links" aria-label="Footer">
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="footer-links footer-social">
            {team.contact.email && <a href={`mailto:${team.contact.email}`}>{team.contact.email}</a>}
            {socialLinks().map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="wordmark" aria-hidden>
        {team.name}
      </div>
    </footer>
  );
}
