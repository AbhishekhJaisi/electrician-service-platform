import { Phone, MessageCircle, AlertTriangle } from "lucide-react";
import { useSiteData } from "../PublicSite";
import WireDivider from "./WireDivider";

export default function Hero() {
  const { business: BUSINESS } = useSiteData();
  return (
    <section className="relative bg-[#0F1420] text-white overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.08]" aria-hidden="true">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0 L0 0 0 40" fill="none" stroke="#fff" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-5 pt-16 pb-20 md:pt-24 md:pb-28">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#FFC93C]/15 border border-[#FFC93C]/40 text-[#FFC93C] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
          <AlertTriangle className="w-3.5 h-3.5" /> 24/7 Emergency Service Available
        </div>

        <h1
          className="text-4xl md:text-6xl font-bold leading-[1.05] max-w-2xl"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Electrical work done right,{" "}
          <span className="text-[#1E56E3]">the first time.</span>
        </h1>

        <p className="mt-5 text-gray-300 text-base md:text-lg max-w-xl">
          {BUSINESS.tagline} From a flickering switchboard to a full rewire -{" "}
          {BUSINESS.owner} shows up on time and fixes it properly.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`tel:${BUSINESS.phone}`}
            className="flex items-center gap-2 bg-[#1E56E3] hover:bg-[#1846c2] transition-colors text-white font-semibold px-6 py-3 rounded-md"
          >
            <Phone className="w-4 h-4" /> Call Now
          </a>
          <a
            href={`https://wa.me/${BUSINESS.whatsapp}`}
            className="flex items-center gap-2 bg-transparent border border-white/30 hover:border-white/60 transition-colors text-white font-semibold px-6 py-3 rounded-md"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp Now
          </a>
        </div>

        {/* Stats */}
        <div
          className="mt-10 flex items-center gap-6 text-sm text-gray-400"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          <span>{BUSINESS.years}+ yrs experience</span>
          <span className="w-1 h-1 rounded-full bg-gray-600" />
          <span>100+ jobs completed</span>
        </div>
      </div>

      <WireDivider />
    </section>
  );
}
