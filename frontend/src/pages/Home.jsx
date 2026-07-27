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
      className={`rounded-[3px] border pb-3 pt-3.5 text-center ${
        on
          ? "border-copper bg-panel-2"
          : "border-white/5 bg-panel/50"
      }`}
    >
      <div
        className={`relative mx-auto mb-2.5 h-[34px] w-[22px] rounded-[3px] bg-ink border ${
          on ? "border-copper" : "border-steel-dim/30"
        }`}
      >
        <div
          className={`absolute left-[3px] right-[3px] h-3.5 rounded-sm ${
            on ? "bottom-[3px] bg-copper" : "top-[3px] bg-steel-dim/30"
          }`}
        />
      </div>
      <div
        className={`font-mono text-[10px] tracking-wide ${
          on ? "text-copper-light" : "text-steel-dim/50"
        }`}
      >
        {label}
      </div>
    </div>
  );
}

export default function Home() {
  const { business: BUSINESS, areas } = useSiteData();

  return (
    <div className="min-h-screen bg-[#0d0f14]">
       <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 space-y-6 md:space-y-8">

{/* HERO CARD */}
         <section
           id="home"
           className="relative w-full rounded-xl bg-[#13161d] text-paper overflow-hidden"
         >
           {BUSINESS.heroImage && (
             <img
               src={`/uploads/business/${BUSINESS.heroImage}`}
               alt="Hero"
               className="absolute inset-0 h-full w-full object-cover opacity-20"
             />
           )}
           <div className="relative z-0 px-8 md:px-14 py-16 md:py-20">
           <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] items-center gap-6 md:gap-10 w-full">
            <div>
              <div className="mb-4 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-copper-light">
                <span className="h-[7px] w-[7px] rounded-full bg-copper-light" />
                Licensed &amp; insured electrician
              </div>

               <h1 className="font-display font-semibold leading-[1.02] tracking-tight">
                <span className="block text-base md:text-lg font-medium text-steel mb-1.5">
                    Electrical services, {BUSINESS.shortLocation}
                  </span>                  <span className="block text-3xl md:text-5xl uppercase text-paper">
                    {BUSINESS.owner.split(" ")[0]} <span className="text-copper-light">{BUSINESS.owner.split(" ").slice(1).join(" ")}</span>
                  </span>
                </h1>

                 <p className="mt-3 max-w-[460px] text-sm leading-relaxed text-steel-dim">
                   {BUSINESS.tagline}
                 </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={`tel:${BUSINESS.phone}`}
                    className="rounded-[3px] bg-copper px-5 py-2.5 md:py-3.5 text-[15px] font-semibold text-ink active:scale-[0.97] transition-all min-h-[44px] inline-flex items-center justify-center"
                  >
                    Call now / ফোন কৰক
                  </a>
                  <a
                    href="/booking"
                    className="rounded-[3px] border border-white/10 px-5 py-2.5 md:py-3.5 text-[15px] font-semibold text-paper hover:border-paper active:scale-[0.97] transition-all min-h-[44px] inline-flex items-center justify-center"
                  >
                    Book now / বুকিং কৰক
                  </a>
                </div>

                <div className="mt-6 flex flex-wrap gap-5 font-mono text-[10px] text-steel-dim">
                  {["Govt. licensed", "Fully insured", `${BUSINESS.years}+ yrs experience`].map(
                    (t) => (
                      <div key={t} className="flex items-center gap-1.5">
                        <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full border border-steel-dim text-[7px] text-steel-dim">
                          ✓
                        </span>
                        {t}
                      </div>
                    )
                  )}
                </div>
            </div>

             <div className="rounded border border-white/5 bg-panel/50 p-4 md:p-6">
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
      </section>

       <section className="relative w-full rounded-xl bg-[#13161d] text-paper overflow-hidden">
         <div className="px-8 md:px-14 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] items-start gap-8 md:gap-12">
            <div>
              <div className="mb-3 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-copper-light">
                <span className="h-[7px] w-[7px] rounded-full bg-copper-light" />
                Coverage
              </div>

               <h2 className="font-display font-semibold text-xl md:text-2xl text-paper mb-3">
                 Where we work
               </h2>

                <p className="text-sm leading-relaxed text-steel mb-5 max-w-[420px]">
                 Doorstep service across a {BUSINESS.radius} km radius from {BUSINESS.shortLocation.split(",")[0]}.
                 Emergency calls prioritized.
               </p>

                <div className="flex flex-wrap gap-2.5 mb-5">
                  {areas.map((area) => (
                    <div
                      key={area}
                      className="rounded-full border border-white/20 bg-panel px-4 py-2 text-xs font-mono text-steel"
                    >
                      {area}
                    </div>
                  ))}
                </div>

                <div className="flex gap-8 font-mono text-xs text-steel border-t border-white/10 pt-4">
                  <div>
                    <div className="text-base font-semibold text-paper mb-0.5">{BUSINESS.radius} km</div>
                    service radius
                  </div>
                  <div>
                    <div className="text-base font-semibold text-paper mb-0.5">{areas.length}+</div>
                    areas covered
                  </div>
                </div>

                <div className="mt-4">
                  <a href="/areas" className="inline-flex items-center gap-2 text-copper-light font-mono text-xs uppercase tracking-wide hover:text-copper transition-colors">
                    View all areas
                  </a>
                </div>
             </div>

             <div className="relative border border-white/10 bg-white rounded-xl overflow-hidden h-[200px] md:h-[280px] order-last md:order-none">
               <iframe
                 title="Sagar Electricals service area map"
                 src={BUSINESS.map}
                 className="absolute inset-0 w-full h-full rounded-xl"
                 style={{ border: 0 }}
                 loading="lazy"
                 allowFullScreen
                 referrerPolicy="no-referrer-when-downgrade"
               />
             </div>
          </div>
        </div>
       </section>
      </div>
    </div>
  );
}