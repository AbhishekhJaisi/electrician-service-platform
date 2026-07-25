import { useSiteData } from "../PublicSite";

const services = [
  { label: "Emergency", on: true },
  { label: "Residential", on: false },
  { label: "Commercial", on: false },
  { label: "Wiring", on: false },
  { label: "Inspection", on: false },
  { label: "Repairs", on: false },
];

function Breaker({ label, on }) {
  return (
    <div
      className={`rounded-[3px] border border-white/10 bg-panel-2 pb-3 pt-3.5 text-center`}
    >
      <div
        className={`relative mx-auto mb-2.5 h-[34px] w-[22px] rounded-[3px] bg-ink border ${
          on ? "border-copper" : "border-steel-dim"
        }`}
      >
        <div
          className={`absolute left-[3px] right-[3px] h-3.5 rounded-sm ${
            on ? "bottom-[3px] bg-copper" : "top-[3px] bg-steel-dim"
          }`}
        />
      </div>
      <div
        className={`font-mono text-[10px] tracking-wide ${
          on ? "text-copper-light" : "text-steel-dim"
        }`}
      >
        {label}
      </div>
    </div>
  );
}

export default function Hero() {
  const { business: BUSINESS } = useSiteData();

  return (
<section
  id="home"
  className="relative w-full h-[calc(100dvh-5rem)] bg-ink text-paper font-body overflow-hidden"
>      {/* hazard stripe — absolute so it doesn't add to layout height */}
      <div
        className="absolute inset-x-0 top-0 h-1.5 w-full z-10"
        style={{
          background:
            "repeating-linear-gradient(-45deg, #F0B429 0 14px, #101216 14px 28px)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1.5 w-full z-10"
        style={{
          background:
            "repeating-linear-gradient(-45deg, #F0B429 0 14px, #101216 14px 28px)",
        }}
      />

      {/* content centered in exactly one viewport */}
      <div className="relative z-0 flex h-full items-center">
        <div className="mx-auto w-full px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] items-center gap-4 md:gap-8 w-full">
            {/* left column */}
            <div>
              <div className="mb-4 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-copper-light">
                <span className="h-[7px] w-[7px] rounded-full bg-copper-light" />
                Licensed &amp; insured electrician
              </div>

              <h1 className="font-display font-semibold leading-[1.02] tracking-tight">
                <span className="block text-lg md:text-[22px] font-medium text-steel mb-1.5">
                  Electrical services, Margherita — Assam
                </span>
                <span className="block text-[52px] md:text-[76px] uppercase text-paper">
                  Sagar <span className="text-copper-light">Sharma</span>
                </span>
              </h1>

              <p className="mt-4 md:mt-5 max-w-[460px] text-[17px] leading-relaxed text-steel">
                Residential, commercial and emergency electrical work.
                Same-day callouts across the Margherita sub-division.
              </p>

              <div className="mt-5 md:mt-6 flex flex-wrap gap-3.5">
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="rounded-[3px] bg-copper px-5 py-2.5 md:py-3.5 text-[15px] font-semibold text-ink"
                >
                  Call / ফোন কৰক
                </a>
                <a
                  href="#booking"
                  className="rounded-[3px] border border-white/10 px-5 py-2.5 md:py-3.5 text-[15px] font-semibold text-paper"
                >
                  Book / বুকিং কৰক
                </a>
              </div>

              <div className="mt-5 md:mt-6 flex flex-wrap gap-5 font-mono text-xs text-steel">
                {["Govt. licensed", "Fully insured", "2+ yrs experience"].map(
                  (t) => (
                    <div key={t} className="flex items-center gap-2">
                      <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-copper text-[9px] text-copper-light">
                        ✓
                      </span>
                      {t}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* right column — breaker panel */}
            <div className="rounded border border-white/10 bg-panel p-4 md:p-6">
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3 font-mono text-[11px] uppercase tracking-wider text-steel-dim">
                <span>Service panel</span>
                <span className="flex items-center gap-1.5 text-copper-light">
                  <span className="h-1.5 w-1.5 rounded-full bg-copper-light" />
                  On call
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {services.map((s) => (
                  <Breaker key={s.label} {...s} />
                ))}
              </div>

              <div className="mt-4 flex justify-between border-t border-white/10 pt-3 font-mono text-xs text-steel">
                <span>Response time</span>
                <b className="font-medium text-paper">Same day</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
