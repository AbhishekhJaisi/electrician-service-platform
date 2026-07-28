import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Zap } from "lucide-react";
import { useSiteData } from "../PublicSite";

const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "Services", href: "/services" },
  { label: "About",    href: "/about" },
  { label: "Gallery",  href: "/work" },
  { label: "Reviews",  href: "/reviews" },
];

export default function Nav() {
  const { business: BUSINESS } = useSiteData();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 bg-ink/95 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-14 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 active:scale-95 transition-transform">
          <Zap className="w-4 h-4 text-copper" strokeWidth={2.5} />
          <span className="font-display font-semibold text-sm uppercase tracking-tight text-paper">
            {BUSINESS.name}
          </span>
        </NavLink>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.label}
              to={l.href}
              end={l.href === "/"}
              className={({ isActive }) =>
                `relative font-mono text-[11px] uppercase tracking-[0.12em] px-3 py-2 rounded-[3px] transition-all duration-150 ${
                  isActive
                    ? "text-copper-light bg-white/[0.04]"
                    : "text-steel hover:text-paper hover:bg-white/[0.04]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-copper rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <NavLink
          to="/booking"
          className="hidden md:inline-flex items-center rounded-[3px] bg-copper hover:bg-copper-dark text-ink text-[13px] font-semibold px-4 py-2 transition-all active:scale-[0.97]"
        >
          Book now
        </NavLink>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-[3px] border border-white/10 text-steel hover:text-paper hover:border-white/20 md:hidden transition-colors"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <div className="space-y-[5px]">
            <span className={`block h-[1.5px] w-4 bg-current transition-all origin-center ${open ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`block h-[1.5px] w-4 bg-current transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block h-[1.5px] w-4 bg-current transition-all origin-center ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${open ? "max-h-[360px]" : "max-h-0"}`}>
        <div className="border-t border-white/[0.06] bg-ink/98 px-4 py-3 space-y-0.5">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.label}
              to={l.href}
              end={l.href === "/"}
              className={({ isActive }) =>
                `flex items-center font-mono text-[11px] uppercase tracking-[0.12em] px-3 py-3 rounded-[3px] min-h-[44px] transition-colors ${
                  isActive ? "text-copper-light bg-white/[0.04]" : "text-steel hover:text-paper"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to="/booking"
            className="flex items-center justify-center mt-2 rounded-[3px] bg-copper hover:bg-copper-dark text-ink text-[13px] font-semibold py-3 min-h-[44px] transition-all active:scale-[0.97]"
          >
            Book now
          </NavLink>
        </div>
      </div>
    </header>
  );
}
