import { useSiteData } from "../PublicSite";
import * as Icons from "lucide-react";

export default function Services() {
  const { business: BUSINESS, services } = useSiteData();

  return (
    <section id="services" className="bg-white">
      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-3">
          <div>
            <span className="text-xs font-semibold tracking-wide text-[#1E56E3] uppercase"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}>What we do</span>
            <h2 className="text-3xl font-bold mt-2 text-[#0F1420]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Services &amp; starting prices</h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc) => {
            const Icon = Icons[svc.icon] ?? Icons.Zap;
            const price = typeof svc.price === "number" ? `₹${svc.price}` : svc.price;
            return (
              <div key={svc.id ?? svc.name}
                className="border border-gray-200 rounded-xl p-5 hover:border-[#1E56E3]/40 hover:shadow-sm transition-all">
                <div className="w-11 h-11 rounded-lg bg-[#0F1420] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#FFC93C]" />
                </div>
                <h3 className="font-semibold text-[#0F1420]">{svc.name}</h3>
                <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{svc.desc}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    <span className="text-sm font-bold text-[#0F1420]">{price}</span>
                    <span className="text-xs text-gray-400"> · {svc.time}</span>
                  </div>
                  <a href={`https://wa.me/${BUSINESS.whatsapp}?text=Hi, I'd like to book ${encodeURIComponent(svc.name)}`}
                    className="text-xs font-semibold text-[#1E56E3] hover:underline">Book →</a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
