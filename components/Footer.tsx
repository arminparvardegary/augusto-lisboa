import Link from "next/link";
import MarqueeBand from "./MarqueeBand";

export default function Footer() {
  const year = new Date().getFullYear();
  const linkClass = "text-xs tracking-[0.2em] uppercase text-cream/70 hover:text-ochre transition-colors";

  return (
    <footer className="relative bg-espresso text-cream">
      <MarqueeBand
        items={[
          "Specialty Coffee",
          "Brunch",
          "Belém · Lisboa",
          "Since 2021",
          "Better Food, Better Mood",
          "@augustolisboapt",
        ]}
        tone="dark"
      />

      <div className="mx-auto max-w-[1600px] px-6 md:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <h2 className="heading-display text-5xl md:text-7xl text-balance">
              Slow mornings, <em className="script-accent text-ochre not-italic">sunlit</em> rooms,
              considered plates.
            </h2>
          </div>

          <div className="md:col-span-3">
            <h3 className="heading-display text-cream/80 text-2xl mb-6">Visit</h3>
            <p className="leading-relaxed text-cream/85">
              Rua de Belém
              <br />
              1300-085 Lisboa
              <br />
              Portugal
            </p>
            <p className="mt-6 leading-relaxed text-cream/85">
              Open daily
              <br />
              8:00 — 18:00
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="heading-display text-cream/80 text-2xl mb-6">Connect</h3>
            <ul className="space-y-3 text-cream/85">
              <li>
                <a
                  href="https://instagram.com/augustolisboapt"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-ochre transition-colors"
                >
                  @augustolisboapt
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@augustolisboa.com"
                  className="hover:text-ochre transition-colors"
                >
                  hello@augustolisboa.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+351210000000"
                  className="hover:text-ochre transition-colors"
                >
                  +351 21 000 0000
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-24 flex flex-col-reverse gap-6 border-t border-cream/15 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs tracking-[0.2em] uppercase text-cream/50">
            © {year} Augusto Lisboa · Belém, Portugal
          </p>
          <nav className="flex flex-wrap gap-6">
            {[
              { href: "/menu", label: "Menu" },
              { href: "/story", label: "Story" },
              { href: "/visit", label: "Visit" },
              { href: "/reserve", label: "Reserve" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
