import { useState, useEffect } from "react";
import { Phone, MessageCircle, Mail, MapPin, Clock, BadgeCheck } from "lucide-react";
import { useSiteData } from "../PublicSite";
import { api } from "../lib/api";

const INITIAL_FORM = { name: "", phone: "", email: "", service: "", message: "" };

export default function Contact() {
  const { business: BUSINESS, services } = useSiteData();
  const [form, setForm]       = useState(INITIAL_FORM);
  const [customService, setCustomService] = useState(""); // for "Other"
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState("");

  // Listen for service pre-selection from Services cards
  useEffect(() => {
    const handler = (e) => {
      setForm((p) => ({ ...p, service: e.detail }));
      setCustomService("");
    };
    window.addEventListener("preselectService", handler);
    return () => window.removeEventListener("preselectService", handler);
  }, []);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const isOther = form.service === "__other__";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Use custom text when "Other" is selected
    const payload = {
      ...form,
      service: isOther ? (customService.trim() || "Other") : form.service,
    };
    try {
      await api.submitEnquiry(payload);
      setSent(true);
      setForm(INITIAL_FORM);
      setCustomService("");
    } catch {
      setError("Something went wrong. Please call us directly.");
    }
  };

  return (
    <section id="booking" className="bg-[#0F1420] text-white">
      <div className="max-w-6xl mx-auto px-5 py-16 grid md:grid-cols-2 gap-12">
        {/* Left — contact info */}
        <div>
          <span className="text-xs font-semibold tracking-wide text-[#FFC93C] uppercase"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Book a service</span>
          <h2 className="text-3xl font-bold mt-2 mb-8"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Request a booking</h2>
          <div className="space-y-5 text-sm">
            {[
              { Icon: Phone,          text: BUSINESS.phone },
              { Icon: MessageCircle,  text: `WhatsApp: ${BUSINESS.phone}` },
              { Icon: Mail,           text: BUSINESS.email },
              { Icon: MapPin,         text: BUSINESS.address },
              { Icon: Clock,          text: BUSINESS.hours },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-[#1E56E3] shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 space-y-4">
          {sent ? (
            <div className="text-center py-10">
              <BadgeCheck className="w-10 h-10 text-[#1E56E3] mx-auto mb-3" />
              <p className="text-[#0F1420] font-semibold">Request received</p>
              <p className="text-gray-500 text-sm mt-1">We'll call you back shortly.</p>
            </div>
          ) : (
            <>
              <input required name="name" placeholder="Your name" value={form.name} onChange={handleChange}
                className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm text-[#0F1420] outline-none focus:border-[#1E56E3]" />
              <input required name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange}
                className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm text-[#0F1420] outline-none focus:border-[#1E56E3]" />
              <input type="email" name="email" placeholder="Email (optional)" value={form.email} onChange={handleChange}
                className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm text-[#0F1420] outline-none focus:border-[#1E56E3]" />

              {/* Service dropdown */}
              <select required name="service" value={form.service} onChange={handleChange}
                className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm text-[#0F1420] outline-none focus:border-[#1E56E3]">
                <option value="">Service required</option>
                {services.map((s) => (
                  <option key={s.id ?? s.name} value={s.name}>{s.name}</option>
                ))}
                <option value="__other__">Other — describe below</option>
              </select>

              {/* Custom service input — only shown when "Other" is picked */}
              {isOther && (
                <input
                  required
                  placeholder="Describe the service you need"
                  value={customService}
                  onChange={(e) => setCustomService(e.target.value)}
                  className="w-full border border-[#1E56E3] rounded-md px-3.5 py-2.5 text-sm text-[#0F1420] outline-none focus:border-[#1E56E3]"
                />
              )}

              <textarea name="message" placeholder="Any additional details (optional)" rows={3}
                value={form.message} onChange={handleChange}
                className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm text-[#0F1420] outline-none focus:border-[#1E56E3] resize-none" />

              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button type="submit"
                className="w-full bg-[#1E56E3] hover:bg-[#1846c2] transition-colors text-white font-semibold py-3 rounded-md text-sm">
                Book now
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
