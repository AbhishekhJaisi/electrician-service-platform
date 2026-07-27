import { Phone, AlertTriangle, CalendarCheck } from "lucide-react";
import { useSiteData } from "../PublicSite";
import WireDivider from "./WireDivider";
import heroImage from "../assets/gallery/hero.jpg";

const BADGES = ["Govt. Licensed", "Fully Insured", "Certified Electrician"];

export default function Hero() {
  const { business: BUSINESS } = useSiteData();
  return (
    <section className="relative bg-[#0B0F1A] text-white h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0 L0 0 0 40" fill="none" stroke="#fff" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Blurred electrical background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-[#1E56E3]/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] bg-[#FFC93C]/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 right-1/4 w-[300px] h-[300px] bg-[#1E56E3]/15 rounded-full blur-[80px]" />
      </div>

      <div className="relative flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-5 w-full">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="order-1 md:order-none">
              <div className="relative aspect-square w-full max-w-sm rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={heroImage}
                  alt="Electrician"
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A]/70 via-[#0B0F1A]/20 to-transparent pointer-events-none" />
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 bg-[#FFC93C]/10 border border-[#FFC93C]/30 text-[#FFC93C] text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide">
                <AlertTriangle className="w-3 h-3" /> Available Now
              </div>

              <span className="text-xs font-semibold tracking-widest text-[#FFC93C] uppercase"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Licensed Electrician</span>
              <h1 className="text-3xl md:text-[3.5rem] font-bold leading-[1.08] mt-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {BUSINESS.owner}
              </h1>

              <p className="mt-3 text-gray-400 text-base md:text-lg leading-relaxed">
                {BUSINESS.years}+ years fixing, wiring, and upgrading homes and offices across the
                city. Licensed, insured, and known for showing up when he says he will.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {BADGES.map((b) => (
                  <span key={b}
                    className="text-xs font-semibold bg-[#F5F7FF] text-[#1E56E3] border border-[#1E56E3]/15 px-3 py-1 rounded-full">
                    {b}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a href={`tel:${BUSINESS.phone}`}
                  className="flex items-center gap-2 bg-[#1E56E3] hover:bg-[#2563eb] transition-colors text-white font-semibold px-5 py-2.5 rounded-lg">
                  <Phone className="w-4 h-4" /> Call Now
                </a>
                <a href="#booking"
                  className="flex items-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-colors text-white font-semibold px-5 py-2.5 rounded-lg">
                  <CalendarCheck className="w-4 h-4" /> Book a Service
                </a>
              </div>

              <div className="mt-5 flex items-center gap-5 text-xs text-gray-500"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                <span>{BUSINESS.years}+ yrs experience</span>
                <span className="w-1 h-1 rounded-full bg-gray-700" />
                <span>100+ issues fixed</span>
                <span className="w-1 h-1 rounded-full bg-gray-700" />
                <span>Tricity coverage</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WireDivider />
    </section>
  );
}
