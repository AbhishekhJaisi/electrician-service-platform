import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSiteData } from "../PublicSite";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/work" },
  { label: "Reviews", href: "/reviews" },
  // { label: "Coverage", href: "/areas" },
];

export default function Nav() {
  const { business: BUSINESS } = useSiteData();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F1A]/95 backdrop-blur-sm border-b border-white/[0.07]">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <span className="font-bold tracking-tight text-white text-sm"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {BUSINESS.name}
          </span>
        </NavLink>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.label}
              to={l.href}
              end={l.href === "/"}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors py-2 ${
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <NavLink
          to="/booking"
          className="hidden md:inline-block bg-[#1E56E3] hover:bg-[#1846c2] text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
        >
          Book a Service
        </NavLink>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <div className="space-y-1.5">
            <span className={`block h-[1.5px] w-5 bg-white transition-all ${open ? "rotate-45 translate-y-[4.5px]" : ""}`} />
            <span className={`block h-[1.5px] w-5 bg-white transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block h-[1.5px] w-5 bg-white transition-all ${open ? "-rotate-45 -translate-y-[4.5px]" : ""}`} />
          </div>
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-white/10 bg-[#0B0F1A]/95 px-5 py-4">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.label}
                to={l.href}
                end={l.href === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors py-3 min-h-[44px] flex items-center ${
                    isActive ? "text-white" : "text-gray-400"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink
              to="/booking"
              className="mt-3 bg-[#1E56E3] text-white text-sm font-semibold px-5 py-3 rounded-lg text-center min-h-[44px] flex items-center justify-center"
            >
              Book a Service
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
