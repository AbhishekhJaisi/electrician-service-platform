import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, Clock, BadgeCheck } from "lucide-react";
import { useSiteData } from "../PublicSite";
import { api } from "../lib/api";

const INITIAL_FORM = { name: "", phone: "", email: "", service: "", message: "" };

export default function Contact() {
  const { business: BUSINESS, services } = useSiteData();
  const [form, setForm] = useState(INITIAL_FORM);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.submitEnquiry(form);
      setSent(true);
      setForm(INITIAL_FORM);
    } catch {
      setError("Something went wrong. Please call us directly.");
    }
  };

  return (
    <section id="contact" className="bg-[#0F1420] text-white">
      <div className="max-w-6xl mx-auto px-5 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <span className="text-xs font-semibold tracking-wide text-[#FFC93C] uppercase"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Get in touch</span>
          <h2 className="text-3xl font-bold mt-2 mb-8"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Request a service</h2>
          <div className="space-y-5 text-sm">
            {[
              { Icon: Phone, text: BUSINESS.phone },
              { Icon: MessageCircle, text: `WhatsApp: ${BUSINESS.phone}` },
              { Icon: Mail, text: BUSINESS.email },
              { Icon: MapPin, text: BUSINESS.address },
              { Icon: Clock, text: BUSINESS.hours },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-[#1E56E3] shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

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
              <select required name="service" value={form.service} onChange={handleChange}
                className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm text-[#0F1420] outline-none focus:border-[#1E56E3]">
                <option value="">Service required</option>
                {services.map((s) => (
                  <option key={s.id ?? s.name} value={s.name}>{s.name}</option>
                ))}
              </select>
              <textarea name="message" placeholder="Tell us what's wrong" rows={3} value={form.message} onChange={handleChange}
                className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm text-[#0F1420] outline-none focus:border-[#1E56E3] resize-none" />
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button type="submit"
                className="w-full bg-[#1E56E3] hover:bg-[#1846c2] transition-colors text-white font-semibold py-3 rounded-md text-sm">
                Send request
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
