import { useSiteData } from "../PublicSite";
import { WHY_US } from "../data/constants";

export default function WhyChooseUs() {
  const { business: BUSINESS } = useSiteData();
  return (
    <section className="bg-[#F8F9FC]">
      <div className="max-w-6xl mx-auto px-5 py-10">
        <span className="text-xs font-semibold tracking-widest text-[#1E56E3] uppercase"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Why us</span>
        <h2 className="text-3xl font-bold text-[#0D1117] mt-2 mb-6"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Why customers call {BUSINESS.name.split(" ")[0]} first
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {WHY_US.map(({ icon: Icon, label, sub }) => (
            <div key={label}
              className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex items-start gap-3 hover:shadow-md transition-shadow">
              <div className="w-9 h-9 rounded-lg bg-[#0D1117] flex items-center justify-center shrink-0">
                <Icon className="w-4 h-5 text-[#FFC93C]" />
              </div>
              <div>
                <p className="font-semibold text-[#0D1117] text-sm">{label}</p>
                <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
