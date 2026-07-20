import { Zap } from "lucide-react";
import { useSiteData } from "../PublicSite";

const QUICK_LINKS = [
  { label: "Services",      href: "#services" },
  { label: "Previous Work", href: "#work" },
  { label: "Reviews",       href: "#reviews" },
  { label: "Contact",       href: "#contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy",     href: "#" },
  { label: "Terms & Conditions", href: "#" },
];

export default function Footer() {
  const { business: BUSINESS } = useSiteData();

  return (
    <footer className="bg-[#0B0F18] text-gray-400 text-sm">
      <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-white font-bold mb-2"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <Zap className="w-5 h-5 text-[#FFC93C]" fill="#FFC93C" />
            {BUSINESS.name}
          </div>
          <p className="text-xs max-w-xs">{BUSINESS.tagline}</p>
        </div>
        <div className="flex gap-10 text-xs">
          <div>
            <p className="text-white font-semibold mb-2">Quick links</p>
            <ul className="space-y-1.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}><a href={href} className="hover:text-white">{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold mb-2">Legal</p>
            <ul className="space-y-1.5">
              {LEGAL_LINKS.map(({ label, href }) => (
                <li key={label}><a href={href} className="hover:text-white">{label}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 text-center text-xs py-4">
        © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
      </div>
    </footer>
  );
}
