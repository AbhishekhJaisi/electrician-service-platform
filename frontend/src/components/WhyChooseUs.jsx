import { useSiteData } from "../PublicSite";

import { WHY_US } from "../data/constants";

export default function WhyChooseUs() {
  const { business: BUSINESS } = useSiteData();
  return (
    <section className="bg-[#F5F6F8]">
      <div className="max-w-6xl mx-auto px-5 py-16">
        <h2
          className="text-3xl font-bold text-[#0F1420] mb-10"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Why customers call {BUSINESS.name.split(" ")[0]} first
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {WHY_US.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="bg-white rounded-xl p-5 border border-gray-200 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-[#1E56E3]/10 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-[#1E56E3]" />
              </div>
              <div>
                <p className="font-semibold text-[#0F1420] text-sm">{label}</p>
                <p className="text-gray-500 text-xs mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
