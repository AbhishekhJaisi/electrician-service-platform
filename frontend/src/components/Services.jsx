import { useSiteData } from "../PublicSite";
import * as Icons from "lucide-react";

export default function Services() {
  const { services } = useSiteData();

  const handleBook = (serviceName) => {
    window.location.hash = "";
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("preselectService", { detail: serviceName }));
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    }, 10);
  };

  return (
    <section id="services" className="bg-white">
      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="mb-10">
          <span className="text-xs font-semibold tracking-widest text-[#1E56E3] uppercase"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}>What we do</span>
          <h2 className="text-3xl font-bold mt-2 text-[#0D1117]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Services &amp; starting prices</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc) => {
            const Icon = typeof svc.icon === "string" ? (Icons[svc.icon] ?? Icons.Zap) : (svc.icon ?? Icons.Zap);
            const price = typeof svc.price === "number" ? `₹${svc.price}` : svc.price;

            return (
              <div key={svc.id ?? svc.name}
                className="border border-gray-100 rounded-2xl p-5 flex flex-col shadow-sm hover:shadow-md hover:border-[#1E56E3]/20 transition-all duration-200 bg-white">
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-[#0D1117] flex items-center justify-center mb-4 shrink-0">
                  <Icon className="w-5 h-5 text-[#FFC93C]" />
                </div>

                {/* Name + desc */}
                <h3 className="font-semibold text-[#0D1117]">{svc.name}</h3>
                <p className="text-sm text-gray-400 mt-1.5 leading-relaxed flex-1">{svc.desc}</p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleBook(svc.name)}
                    className="ml-auto flex items-center gap-1 text-xs font-semibold text-[#1E56E3] hover:gap-1.5 hover:underline transition-all"
                  >
                    Book <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
