import Image from "next/image";
import Link from "next/link";
import { nav, team } from "@/data/team";
import MobileNav from "./MobileNav";

export default function Header() {
  return (
    <header className="header">
      <div className="header-pill">
        <Link href="/" className="logo" aria-label={`${team.name} — home`}>
          <Image src="/logo.jpg" alt="" width={34} height={34} className="logo-img" priority />
          {team.name}
        </Link>
        <nav className="nav" aria-label="Main">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-end">
          <a href="#contact" className="btn btn-ink btn-sm header-cta">
            Work with us
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
