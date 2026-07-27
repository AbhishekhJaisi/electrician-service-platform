import { useState, useEffect, useCallback } from "react";
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ink/95 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-5 py-3.5 md:px-10 md:py-4">
        <NavLink
          to="/"
          className="flex items-center gap-2.5 active:scale-95 transition-transform"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-[3px] border border-copper bg-panel-2 font-mono text-sm font-medium text-copper-light">
            SS
          </span>
          <span className="font-display text-lg font-semibold uppercase tracking-tight text-paper">
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
                `relative font-mono text-sm uppercase tracking-wide active:scale-95 transition-all py-2 min-h-[44px] flex items-center font-medium ${
                  isActive ? "text-copper-light" : "text-steel hover:text-paper"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-3 bg-copper rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <NavLink
          to="/booking"
          className="hidden rounded-[3px] bg-copper px-5 py-2.5 font-body text-sm font-semibold text-ink md:inline-block active:scale-95 transition-transform"
        >
          Request a booking
        </NavLink>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-[3px] border border-white/10 text-paper md:hidden active:scale-95 transition-transform"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <div className="space-y-1.5 transition-all">
            <span className={`block h-[1.5px] w-5 bg-paper transition-all ${open ? "rotate-45 translate-y-[4.5px]" : ""}`} />
            <span className={`block h-[1.5px] w-5 bg-paper transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block h-[1.5px] w-5 bg-paper transition-all ${open ? "-rotate-45 -translate-y-[4.5px]" : ""}`} />
          </div>
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-white/10 bg-ink/95 px-5 py-4">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.label}
                to={l.href}
                end={l.href === "/"}
                className={({ isActive }) =>
                  `font-mono text-sm uppercase tracking-wide transition-colors py-3 min-h-[44px] flex items-center font-medium ${
                    isActive ? "text-copper-light" : "text-steel active:text-copper-light"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink
              to="/booking"
              className="mt-3 rounded-[3px] bg-copper px-5 py-3 text-center font-body text-sm font-semibold text-ink active:scale-[0.98] transition-transform min-h-[44px] flex items-center justify-center"
            >
              Request
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
