import { Zap } from "lucide-react";
import { useSiteData } from "../PublicSite";

const QUICK_LINKS = [
  { label: "Services",              href: "#services" },
  { label: "Work gallery",          href: "#work" },
  { label: "Reviews",               href: "#reviews" },
  { label: "Where we provide service", href: "#areas" },
  { label: "Book now",              href: "#booking" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy",     href: "#" },
  { label: "Terms & Conditions", href: "#" },
];

export default function Footer() {
  const { business: BUSINESS } = useSiteData();

  return (
    <footer className="bg-ink text-paper font-body border-t border-white/10">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-12 flex flex-col md:flex-row justify-between gap-8">
        <div className="max-w-xs">
          <div className="flex items-center gap-2 text-paper font-bold mb-3 font-display">
            <Zap className="w-4 h-4 text-copper" />
            {BUSINESS.name}
          </div>
          <p className="text-steel-dim text-xs leading-relaxed">{BUSINESS.tagline}</p>
        </div>
        <div className="flex gap-12 text-xs">
          <div>
            <p className="text-steel font-semibold mb-3 tracking-wide uppercase font-mono text-[10px]">Quick links</p>
            <ul className="space-y-2">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-steel-dim hover:text-copper-light transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-steel font-semibold mb-3 tracking-wide uppercase font-mono text-[10px]">Legal</p>
            <ul className="space-y-2">
              {LEGAL_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-steel-dim hover:text-copper-light transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 text-center text-xs py-4 text-steel-dim">
        © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
      </div>
    </footer>
  );
}
