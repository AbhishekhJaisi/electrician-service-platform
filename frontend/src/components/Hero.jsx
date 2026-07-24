import { Phone, AlertTriangle, CalendarCheck } from "lucide-react";
import { useSiteData } from "../PublicSite";
import WireDivider from "./WireDivider";

export default function Hero() {
  const { business: BUSINESS } = useSiteData();
  return (
    <section className="relative bg-[#0B0F1A] text-white overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.06]" aria-hidden="true">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0 L0 0 0 40" fill="none" stroke="#fff" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      {/* Warm glow top-left */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#1E56E3]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-5 pt-16 pb-20 md:pt-24 md:pb-28">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#FFC93C]/10 border border-[#FFC93C]/30 text-[#FFC93C] text-xs font-semibold px-3.5 py-1.5 rounded-full mb-7 tracking-wide">
          <AlertTriangle className="w-3 h-3" /> Available Now
        </div>

        <h1 className="text-4xl md:text-[3.5rem] font-bold leading-[1.08] max-w-2xl"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Electrical work done right,{" "}
          <span className="text-[#4B80F5]">the first time.</span>
        </h1>

        <p className="mt-5 text-gray-400 text-base md:text-lg max-w-lg leading-relaxed">
          {BUSINESS.tagline} From a flickering switchboard to a full rewire —{" "}
          {BUSINESS.owner} shows up on time and fixes it properly.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`tel:${BUSINESS.phone}`}
            className="flex items-center gap-2 bg-[#1E56E3] hover:bg-[#2563eb] transition-colors text-white font-semibold px-6 py-3 rounded-lg shadow-lg shadow-[#1E56E3]/20">
            <Phone className="w-4 h-4" /> Call Now
          </a>
          <a href="#booking"
            className="flex items-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-colors text-white font-semibold px-6 py-3 rounded-lg">
            <CalendarCheck className="w-4 h-4" /> Book a Service
          </a>
        </div>

        {/* Stats */}
        <div className="mt-10 flex items-center gap-6 text-xs text-gray-500"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <span>{BUSINESS.years}+ yrs experience</span>
          <span className="w-1 h-1 rounded-full bg-gray-700" />
          <span>100+ issues fixed</span>
          <span className="w-1 h-1 rounded-full bg-gray-700" />
          <span>Tricity coverage</span>
        </div>
      </div>

      <WireDivider />
    </section>
  );
}
