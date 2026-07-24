import { MapPin } from "lucide-react";
import { useSiteData } from "../PublicSite";

export default function ServiceAreas() {
  const { areas } = useSiteData();

  return (
    <section id="areas" className="bg-white">
      <div className="max-w-6xl mx-auto px-5 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs font-semibold tracking-widest text-[#1E56E3] uppercase"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Coverage</span>
          <h2 className="text-3xl font-bold mt-2 text-[#0D1117]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Where we work</h2>
          <p className="mt-3 text-gray-400 text-[0.95rem] leading-relaxed">
            Doorstep service across a 15 km radius. Emergency calls prioritized within the city.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {areas.map((a) => (
              <span key={a}
                className="flex items-center gap-1.5 text-sm font-medium bg-[#F8F9FC] border border-gray-100 px-3.5 py-2 rounded-full text-[#0D1117] shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-[#1E56E3]" /> {a}
              </span>
            ))}
          </div>
        </div>
        <div className="relative w-full aspect-[16/11] md:aspect-[4/3] rounded-2xl overflow-hidden border border-gray-100 shadow-lg">
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
