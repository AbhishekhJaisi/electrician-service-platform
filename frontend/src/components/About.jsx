import { useSiteData } from "../PublicSite";
import ownerPhoto from "../assets/business/owner.jpeg";
import { ShieldCheck, Clock, Wrench, BadgeCheck, HomeIcon, AlertTriangle } from "lucide-react";

const BADGES = ["Govt. Licensed", "Fully Insured", "Certified Electrician"];

const WHY_US = [
  { icon: ShieldCheck, label: "Licensed & Insured", labelAs: "অনুজ্ঞাপ্ৰাপ্ত আৰু বীমাকৃত", sub: "Every job covered, every time" },
  { icon: Clock, label: "Same-Day Response", labelAs: "একেদিনাই সঁহাৰি", sub: "Most calls answered within the hour" },
  { icon: Wrench, label: "Own Equipment", labelAs: "নিজা সঁজুলি", sub: "No waiting on borrowed tools" },
  { icon: BadgeCheck, label: "1+ Years Experience", labelAs: "১+ বছৰৰ অভিজ্ঞতা", sub: "Homes, offices, emergencies" },
  { icon: HomeIcon, label: "Doorstep Service", labelAs: "দুৱাৰ মুখৰ সেৱা", sub: "We come to you, city-wide" },
  { icon: AlertTriangle, label: "Emergency Repairs", labelAs: "জৰুৰীকালীন মেৰামতি", sub: "Short circuits, outages, sparking" },
];

export default function About() {
  const { business: BUSINESS } = useSiteData();
  return (
    <section id="about" className="bg-paper text-ink font-body">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-[72px] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[60px] items-center">
        {/* Owner photo */}
        <div className="aspect-square rounded-[3px] overflow-hidden border border-white/10">
          <img src={ownerPhoto} alt={BUSINESS.owner}
            className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-copper-light">
            About the electrician
          </span>
          <h2 className="font-display font-semibold leading-[1.02] tracking-tight mt-2">
            <span className="block text-lg md:text-[22px] font-medium text-steel mb-1.5">
              Electrical services, Margherita — Assam
            </span>
            {/* <span className="block text-[52px] md:text-[76px] uppercase text-paper">
              {BUSINESS.owner.split(" ")[0]} <span className="text-copper-light">{BUSINESS.owner.split(" ")[1]}</span>
            </span> */}
          </h2>
          <p className="mt-5 max-w-[460px] text-[17px] leading-relaxed text-steel">
            {BUSINESS.years}+ years fixing, wiring, and upgrading homes and offices across the city.
            Licensed, insured, and known for showing up when he says he will.
          </p>
          <div className="mt-7 flex flex-wrap gap-5 font-mono text-xs text-steel">
            {BADGES.map((b) => (
              <div key={b} className="flex items-center gap-2">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-copper text-[9px] text-copper-light">
                  ✓
                </span>
                {b}
              </div>
            ))}
          </div>

          {/* Why Sagar */}
          <div className="mt-12">
            {/* <span className="font-mono text-xs uppercase tracking-[0.14em] text-copper-light">
              কিয় ছাগৰ
            </span>
            <h3 className="font-display font-semibold leading-tight mt-2 text-2xl text-paper">
              Why Sagar?
            </h3> */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5">
              {WHY_US.map(({ icon: Icon, label, labelAs, sub }) => (
                <div key={label}
                  className="border border-white/10 bg-panel-2 p-4 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-[3px] bg-panel flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-5 text-copper-light" />
                  </div>
                  <div>
                    <p className="font-semibold text-paper text-sm">{label}</p>
                    {labelAs && (
                      <p className="text-copper-light text-xs font-semibold mt-0.5">{labelAs}</p>
                    )}
                    <p className="text-steel-dim text-xs mt-0.5 leading-relaxed">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
