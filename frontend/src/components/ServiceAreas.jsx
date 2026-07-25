import { MapPin, Navigation } from "lucide-react";
import { useSiteData } from "../PublicSite";

export default function ServiceAreas() {
  const { areas } = useSiteData();

  return (
    <section id="areas" className="bg-ink text-paper font-body">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-12 md:py-[72px] grid md:grid-cols-2 gap-10 md:gap-[60px] items-center">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-copper-light">
            Coverage
          </span>
          <h2 className="font-display font-semibold leading-tight mt-2 text-3xl text-paper">
            Where we work
          </h2>
          <p className="mt-5 text-steel text-[17px] leading-relaxed">
            Doorstep service across a 15 km radius. Emergency calls prioritized within the city.
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {areas.map((a) => (
              <span key={a}
                className="flex items-center gap-2 text-sm font-medium bg-panel-2 border border-white/10 px-4 py-2.5 rounded-[3px] text-paper">
                <MapPin className="w-3.5 h-3.5 text-copper-light" /> {a}
              </span>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-[3px] bg-panel-2 flex items-center justify-center">
                <Navigation className="w-5 h-5 text-copper-light" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-steel-dim">Service radius</p>
                <p className="text-sm font-semibold text-paper">15 km</p>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-steel-dim">Areas covered</p>
              <p className="text-sm font-semibold text-paper">{areas.length}+ locations</p>
            </div>
          </div>
        </div>

        <div className="relative w-full aspect-[16/11] md:aspect-[4/3] rounded-[3px] overflow-hidden border border-white/10">
          <iframe
            title="Service area map"
            src="https://www.google.com/maps?q=Margherita,+Assam,+India&z=13&output=embed"
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
