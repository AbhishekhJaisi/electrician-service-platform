import { useState } from "react";
import { Zap, Phone, Menu, X } from "lucide-react";
import { useSiteData } from "../PublicSite";

const NAV_LINKS = ["Services", "Work", "Reviews", "Areas", "Contact"];

export default function Nav() {
  const { business: BUSINESS } = useSiteData();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0F1420]/95 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-[#FFC93C]" fill="#FFC93C" />
          <span
            className="font-bold tracking-tight text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {BUSINESS.name}
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              {l}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${BUSINESS.phone}`}
            className="flex items-center gap-2 text-sm font-semibold text-white bg-[#1E56E3] hover:bg-[#1846c2] px-4 py-2 rounded-md transition-colors"
          >
            <Phone className="w-4 h-4" /> Call Now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-[#0F1420] border-t border-white/10 px-5 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="text-gray-300 text-sm"
            >
              {l}
            </a>
          ))}
          <a
            href={`tel:${BUSINESS.phone}`}
            className="flex items-center justify-center gap-2 text-sm font-semibold text-white bg-[#1E56E3] px-4 py-2.5 rounded-md"
          >
            <Phone className="w-4 h-4" /> Call Now
          </a>
        </div>
      )}
    </header>
  );
}
