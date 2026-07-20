import { useSiteData } from "../PublicSite";

const BADGES = ["Govt. Licensed", "Fully Insured", "100+ Jobs"];

export default function About() {
  const { business: BUSINESS } = useSiteData();
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-5 py-16 grid md:grid-cols-2 gap-10 items-center">
        {/* Photo placeholder */}
        <div className="aspect-square bg-[#F5F6F8] rounded-2xl border border-gray-200 flex items-center justify-center">
          <span
            className="text-gray-400 text-sm"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            [ owner photo ]
          </span>
        </div>

        {/* Content */}
        <div>
          <span
            className="text-xs font-semibold tracking-wide text-[#1E56E3] uppercase"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            About the electrician
          </span>
          <h2
            className="text-3xl font-bold mt-2 text-[#0F1420]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {BUSINESS.owner}
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            {BUSINESS.years}+ years fixing, wiring, and upgrading homes and offices across the
            city. Licensed, insured, and known for showing up when he says he will - no
            callbacks, no shortcuts.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {BADGES.map((b) => (
              <span
                key={b}
                className="text-xs font-medium bg-[#1E56E3]/10 text-[#1E56E3] px-3 py-1.5 rounded-full"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
