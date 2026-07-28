import { useSiteData } from "../PublicSite";
import { ShieldCheck, Clock, Wrench, BadgeCheck, Home as HomeIcon, AlertTriangle } from "lucide-react";

const BADGES = ["Govt. Licensed", "Fully Insured", "Certified Electrician"];

export default function About() {
  const { business: BUSINESS } = useSiteData();

  const WHY_US = [
    { icon: ShieldCheck,    label: "Licensed & Insured",      labelAs: "অনুজ্ঞাপ্ৰাপ্ত আৰু বীমাকৃত", sub: "Every job covered, every time" },
    { icon: Clock,          label: "Same-Day Response",        labelAs: "একেদিনাই সঁহাৰি",              sub: "Most calls answered within the hour" },
    { icon: Wrench,         label: "Own Equipment",            labelAs: "নিজা সঁজুলি",                   sub: "No waiting on borrowed tools" },
    { icon: BadgeCheck,     label: `${BUSINESS.years}+ Years Experience`, labelAs: `${BUSINESS.years}+ বছৰৰ অভিজ্ঞতা`, sub: "Homes, offices, emergencies" },
    { icon: HomeIcon,       label: "Doorstep Service",         labelAs: "দুৱাৰ মুখৰ সেৱা",              sub: "We come to you, city-wide" },
    { icon: AlertTriangle,  label: "Emergency Repairs",        labelAs: "জৰুৰীকালীন মেৰামতি",           sub: "Short circuits, outages, sparking" },
  ];

  return (
    <section className="w-full bg-white text-soft-black font-body">
      <div className="mx-auto max-w-[1180px] px-5 md:px-10 py-10 md:py-16">
        <span className="font-mono text-sm uppercase tracking-[0.14em] text-orange-500 font-semibold">
          বিষয়ে
        </span>
        <h2 className="font-display font-semibold leading-tight mt-2 text-4xl text-heading">
          About
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-start mt-8 md:mt-10">
          {/* Photo */}
          <div className="md:col-span-2 rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            {BUSINESS.ownerPhoto ? (
              <img
                src={BUSINESS.ownerPhoto}
                alt={BUSINESS.owner}
                className="w-full object-cover max-h-[280px] md:max-h-none md:min-h-[280px]"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML =
                    '<div class="w-full flex items-center justify-center min-h-[200px] bg-gray-50"><span class="font-mono text-sm" style="color:#6B6B6B">Photo unavailable</span></div>';
                }}
              />
            ) : (
              <div className="w-full flex items-center justify-center min-h-[200px] bg-gray-50">
                <span className="font-mono text-warm-muted text-sm">No photo</span>
              </div>
            )}
          </div>

          <div className="md:col-span-3">
            <p className="max-w-[520px] text-[15px] leading-relaxed text-soft-black">
              {BUSINESS.years}+ years fixing, wiring, and upgrading homes and offices across {BUSINESS.shortLocation}.
              Licensed, insured, and known for showing up when he says he will.
            </p>

            {/* Badges */}
            <div className="mt-5 flex flex-wrap gap-3">
              {BADGES.map((b) => (
                <div
                  key={b}
                  className="flex items-center gap-2 border border-gray-200 bg-white rounded-lg px-3.5 py-2 text-xs font-semibold text-soft-black
                             transition-all duration-150 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 active:scale-[0.97]"
                >
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-orange-50 border border-orange-200 text-[9px] text-orange-500 font-bold">
                    ✓
                  </span>
                  {b}
                </div>
              ))}
            </div>

            {/* Why us grid */}
            <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {WHY_US.map(({ icon: Icon, label, labelAs, sub }) => (
                <div key={label} className="card group p-4 flex items-start gap-3">
                  <div className="w-9 h-9 card-icon shrink-0">
                    <Icon className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-heading text-sm">{label}</p>
                    {labelAs && <p className="text-assamese text-xs mt-0.5">{labelAs}</p>}
                    <p className="text-warm-muted text-[13px] mt-0.5 leading-relaxed">{sub}</p>
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
