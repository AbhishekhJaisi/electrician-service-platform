import { useState } from "react";
import { Zap, Phone, Menu, X } from "lucide-react";
import { useSiteData } from "../PublicSite";

const NAV_LINKS = ["Services", "Work", "Reviews", "Areas", "Booking"];

export default function Nav() {
  const { business: BUSINESS } = useSiteData();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F1A]/95 backdrop-blur-sm border-b border-white/[0.07]">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#FFC93C]" fill="#FFC93C" />
          <span className="font-bold tracking-tight text-white text-sm"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {BUSINESS.name}
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-150">
              {l}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex">
          <a href={`tel:${BUSINESS.phone}`}
            className="flex items-center gap-2 text-sm font-semibold text-white bg-[#1E56E3] hover:bg-[#2563eb] px-4 py-2 rounded-lg transition-colors">
            <Phone className="w-3.5 h-3.5" /> Call Now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-[#0B0F1A] border-t border-white/[0.07] px-5 py-5 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
              className="text-gray-300 text-sm hover:text-white transition-colors">
              {l}
            </a>
          ))}
          <a href={`tel:${BUSINESS.phone}`}
            className="flex items-center justify-center gap-2 text-sm font-semibold text-white bg-[#1E56E3] px-4 py-2.5 rounded-lg mt-1">
            <Phone className="w-3.5 h-3.5" /> Call Now
          </a>
        </div>
      )}
    </header>
  );
}
