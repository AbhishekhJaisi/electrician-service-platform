import { useSiteData } from "../PublicSite";
import * as Icons from "lucide-react";

export default function Services() {
  const { services } = useSiteData();

  const handleBook = (serviceName) => {
    window.location.hash = "";
    sessionStorage.setItem("preselectService", serviceName);
    window.location.href = "/booking";
  };

  return (
    <section className="w-full bg-white text-soft-black font-body">
      <div className="mx-auto max-w-[1180px] px-5 md:px-10 py-10 md:py-16">
        <span className="font-mono text-sm uppercase tracking-[0.14em] text-orange-500 font-semibold">
          সেৱা
        </span>
        <h2 className="font-display font-semibold leading-tight mt-2 text-4xl text-heading">
          Services
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8 md:mt-10">
          {services.map((svc) => {
            const Icon = typeof svc.icon === "string" ? (Icons[svc.icon] ?? Icons.Zap) : (svc.icon ?? Icons.Zap);

            return (
              <div key={svc.id ?? svc.name} className="card group p-6 flex flex-col h-full">
                <div className="w-11 h-11 card-icon mb-4 shrink-0">
                  <Icon className="w-5 h-5 text-orange-500" />
                </div>

                <h3 className="font-display font-semibold text-heading text-lg leading-tight">{svc.name}</h3>
                {svc.nameAs && (
                  <p className="text-assamese text-xs font-semibold mt-1">{svc.nameAs}</p>
                )}
                <p className="text-warm-muted text-[14px] mt-2 leading-relaxed flex-1">{svc.desc}</p>

                <div className="mt-5 pt-4 border-t border-gray-100">
                  <button onClick={() => handleBook(svc.name)} className="btn-primary w-full">
                    Book Now
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
