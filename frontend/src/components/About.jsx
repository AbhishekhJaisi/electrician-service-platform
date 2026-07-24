import { useSiteData } from "../PublicSite";
import ownerPhoto from "../assets/business/owner.jpeg";

const BADGES = ["Govt. Licensed", "Fully Insured", "100+ Jobs Done"];

export default function About() {
  const { business: BUSINESS } = useSiteData();
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-5 py-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Owner photo */}
        <div className="aspect-square rounded-2xl overflow-hidden shadow-xl shadow-gray-200">
          <img src={ownerPhoto} alt={`${BUSINESS.owner}`}
            className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div>
          <span className="text-xs font-semibold tracking-widest text-[#1E56E3] uppercase"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            About the electrician
          </span>
          <h2 className="text-3xl font-bold mt-2 text-[#0D1117]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {BUSINESS.owner}
          </h2>
          <p className="mt-4 text-gray-500 leading-relaxed text-[0.95rem]">
            {BUSINESS.years}+ years fixing, wiring, and upgrading homes and offices across the
            tricity. Licensed, insured, and known for showing up when he says he will — no
            callbacks, no shortcuts.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {BADGES.map((b) => (
              <span key={b}
                className="text-xs font-semibold bg-[#F5F7FF] text-[#1E56E3] border border-[#1E56E3]/15 px-3.5 py-1.5 rounded-full">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
