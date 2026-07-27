import { MapPin, Navigation } from "lucide-react";
import { useSiteData } from "../PublicSite";

export default function ServiceAreas() {
  const { business: BUSINESS, areas } = useSiteData();

  return (
    <section className="bg-white text-soft-black font-body">
      <div className="mx-auto max-w-[1180px] px-5 md:px-10 py-8 md:py-12 grid md:grid-cols-2 gap-6 md:gap-8 items-center">
        <div>
          <span className="font-mono text-sm uppercase tracking-[0.14em] text-orange-500 font-semibold">
            Coverage
          </span>
          <h2 className="font-display font-semibold leading-tight mt-2 text-3xl text-heading">
            Where we work
          </h2>
          <p className="mt-4 text-soft-black text-[17px] leading-relaxed">
            Doorstep service across a {BUSINESS.radius} km radius. Emergency calls prioritized within the city.
          </p>

          <div className="mt-6 md:mt-8 flex flex-wrap gap-2.5">
            {areas.map((a) => (
              <span key={a} className="pill">
                <MapPin className="w-3.5 h-3.5 text-orange-400" /> {a}
              </span>
            ))}
          </div>

          <div className="mt-6 md:mt-8 flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-orange-50 border border-gray-200 flex items-center justify-center
                              transition-all duration-150 hover:bg-orange-100 hover:border-orange-300">
                <Navigation className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-warm-muted">Service radius</p>
                <p className="text-sm font-semibold text-heading">{BUSINESS.radius} km</p>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-warm-muted">Areas covered</p>
              <p className="text-sm font-semibold text-heading">{areas.length}+ locations</p>
            </div>
          </div>
        </div>

        <div className="relative w-full aspect-[16/11] md:aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 shadow-sm
                        transition-all duration-300 hover:shadow-lg hover:border-orange-200">
          <iframe
            title="Service area map"
            src={BUSINESS.map}
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
