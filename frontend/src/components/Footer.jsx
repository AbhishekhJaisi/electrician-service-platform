import { Zap } from "lucide-react";
import { useSiteData } from "../PublicSite";

const QUICK_LINKS = [
  { label: "Services",      href: "#services" },
  { label: "Previous Work", href: "#work" },
  { label: "Reviews",       href: "#reviews" },
  { label: "Booking",       href: "#booking" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy",     href: "#" },
  { label: "Terms & Conditions", href: "#" },
];

export default function Footer() {
  const { business: BUSINESS } = useSiteData();

  return (
    <footer className="bg-[#0B0F1A] text-gray-500 text-sm">
      <div className="max-w-6xl mx-auto px-5 py-12 flex flex-col md:flex-row justify-between gap-8">
        <div className="max-w-xs">
          <div className="flex items-center gap-2 text-white font-bold mb-3"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <Zap className="w-4 h-4 text-[#FFC93C]" fill="#FFC93C" />
            {BUSINESS.name}
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">{BUSINESS.tagline}</p>
        </div>
        <div className="flex gap-12 text-xs">
          <div>
            <p className="text-gray-300 font-semibold mb-3 tracking-wide uppercase text-[10px]">Quick links</p>
            <ul className="space-y-2">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-gray-300 font-semibold mb-3 tracking-wide uppercase text-[10px]">Legal</p>
            <ul className="space-y-2">
              {LEGAL_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/[0.06] text-center text-xs py-4 text-gray-600">
        © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
      </div>
    </footer>
  );
}
