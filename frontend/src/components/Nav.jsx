import { useState } from "react";
import { Phone, Menu, X, FileText } from "lucide-react";
import { useSiteData } from "../PublicSite";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About me", href: "#about" },
  { label: "Work gallery", href: "#work" },
  { label: "Reviews", href: "#reviews" },
  { label: "Where we provide service", href: "#areas" },
  { label: "Book now", href: "#booking" },
];

export default function Nav() {
  const { business: BUSINESS, licenses } = useSiteData();
  const [open, setOpen] = useState(false);
  const [licenseOpen, setLicenseOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4 md:px-10">
        {/* logo mark */}
        <a href="#home" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-[3px] border border-copper bg-panel-2 font-mono text-sm font-medium text-copper-light">
            SS
          </span>
          <span className="font-display text-lg font-semibold uppercase tracking-tight text-paper">
            {BUSINESS.name}
          </span>
        </a>

        {/* desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-mono text-xs uppercase tracking-wider text-steel transition-colors hover:text-copper-light"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* call button, desktop */}
        <a
          href={`tel:${BUSINESS.phone}`}
          className="hidden rounded-[3px] bg-copper px-5 py-2.5 font-body text-sm font-semibold text-ink md:inline-block"
        >
          Call now
        </a>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-[3px] border border-white/10 text-paper md:hidden"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className="block h-[1.5px] w-5 bg-paper" />
            <span className="block h-[1.5px] w-5 bg-paper" />
            <span className="block h-[1.5px] w-5 bg-paper" />
          </div>
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-ink/95 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-mono text-xs uppercase tracking-wider text-steel"
              >
                {l.label}
              </a>
            ))}
            <a
              href={`tel:${BUSINESS.phone}`}
              className="mt-2 rounded-[3px] bg-copper px-5 py-3 text-center font-body text-sm font-semibold text-ink"
            >
              Call now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
