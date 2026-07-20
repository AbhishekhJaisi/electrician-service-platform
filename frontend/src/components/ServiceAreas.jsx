import { MapPin } from "lucide-react";
import { useSiteData } from "../PublicSite";

export default function ServiceAreas() {
  const { areas } = useSiteData();

  return (
    <section id="areas" className="bg-white">
      <div className="max-w-6xl mx-auto px-5 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="text-xs font-semibold tracking-wide text-[#1E56E3] uppercase"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Coverage</span>
          <h2 className="text-3xl font-bold mt-2 text-[#0F1420]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Where we work</h2>
          <p className="mt-3 text-gray-600">
            Doorstep service across a 15 km radius. Emergency calls prioritized within the city.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {areas.map((a) => (
              <span key={a}
                className="flex items-center gap-1.5 text-sm font-medium bg-[#F5F6F8] border border-gray-200 px-3.5 py-2 rounded-full text-[#0F1420]">
                <MapPin className="w-3.5 h-3.5 text-[#1E56E3]" /> {a}
              </span>
            ))}
          </div>
        </div>
        <div className="aspect-[4/3] bg-[#F5F6F8] rounded-2xl border border-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            [ Google Maps embed — coverage radius ]
          </span>
        </div>
      </div>
    </section>
  );
}
