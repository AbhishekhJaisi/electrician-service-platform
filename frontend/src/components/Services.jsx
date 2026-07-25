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
    <section id="services" className="bg-paper text-ink font-body">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-12 md:py-[72px]">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-copper-light">
          What we do
        </span>
        <h2 className="font-display font-semibold leading-tight mt-2 text-3xl text-ink">
          Services
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mt-8">
          {services.map((svc) => {
            const Icon = typeof svc.icon === "string" ? (Icons[svc.icon] ?? Icons.Zap) : (svc.icon ?? Icons.Zap);
            const price = typeof svc.price === "number" ? `₹${svc.price}` : svc.price;

            return (
              <div key={svc.id ?? svc.name}
                className="border border-white/10 bg-panel-2 p-4 flex flex-col">
                <div className="w-9 h-9 rounded-[3px] bg-panel flex items-center justify-center mb-3 shrink-0">
                  <Icon className="w-4 h-5 text-copper-light" />
                </div>

                <h3 className="font-display font-semibold text-paper text-base leading-tight">{svc.name}</h3>
                {svc.nameAs && (
                  <p className="text-copper-light text-xs font-semibold mt-0.5">{svc.nameAs}</p>
                )}
                <p className="text-steel-dim text-xs mt-2 leading-relaxed">{svc.desc}</p>

                <button
                  onClick={() => handleBook(svc.name)}
                  className="mt-3 w-full bg-copper hover:bg-copper-light text-ink text-xs font-bold py-2.5 rounded-[3px] transition-colors"
                >
                  Book Now
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
