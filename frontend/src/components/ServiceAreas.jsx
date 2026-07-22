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
        <div className="relative w-full aspect-[16/11] md:aspect-[4/3] rounded-3xl overflow-hidden ring-1 ring-inset ring-gray-200/70 shadow-sm bg-gray-50">
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-sm border border-gray-200 px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            <span className="text-sm font-medium text-gray-900">Margherita, Assam</span>
          </div>

          <iframe
            title="Margherita, Assam"
            src="https://www.google.com/maps?q=Your+Business+Name,+Margherita,+Assam,+India&z=14&output=embed"
            className="w-full h-full"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Bottom fade so the Google attribution bar blends instead of looking bolted-on */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
