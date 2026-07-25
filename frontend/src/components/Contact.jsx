import { useState, useEffect } from "react";
import { Phone, MessageCircle, Mail, MapPin, Clock, BadgeCheck } from "lucide-react";
import { useSiteData } from "../PublicSite";
import { api } from "../lib/api";

const INITIAL_FORM = { name: "", phone: "", email: "", service: "", message: "" };

export default function Contact() {
  const { business: BUSINESS, services } = useSiteData();
  const [form, setForm]       = useState(INITIAL_FORM);
  const [customService, setCustomService] = useState("");
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState("");

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
    <section id="booking" className="bg-ink text-paper font-body">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-12 md:py-[72px] grid md:grid-cols-2 gap-10 md:gap-[60px]">
        {/* Left — contact info */}
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-copper-light">
            Booking
          </span>
          <h2 className="font-display font-semibold leading-tight mt-2 text-3xl text-paper">
            Request a booking
          </h2>
          <div className="mt-8 space-y-5 text-sm">
            {[
              { Icon: Phone,          text: BUSINESS.phone, key: "phone" },
              { Icon: MessageCircle,  text: `WhatsApp / ৱাটচঅ্যাপ: ${BUSINESS.phone}`, key: "whatsapp" },
              { Icon: Mail,           text: BUSINESS.email, key: "email" },
              { Icon: MapPin,         text: (
                  <span>
                    <span className="text-paper">No. 4 Makum Pathar, Margherita, Assam, India – 786187</span>
                    <br />
                    <span className="text-steel-dim">{BUSINESS.addressAs}</span>
                  </span>
                ), key: "address" },
              { Icon: Clock,          text: BUSINESS.hours, key: "hours" },
            ].map(({ Icon, text, key }) => (
              <div key={key} className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-copper-light shrink-0" />
                <span className="text-steel">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <form onSubmit={handleSubmit} className="border border-white/10 bg-panel-2 p-6 space-y-4">
          {sent ? (
            <div className="text-center py-10">
              <BadgeCheck className="w-10 h-10 text-copper mx-auto mb-3" />
              <p className="text-paper font-display font-semibold text-lg">Request received</p>
              <p className="text-steel-dim text-sm mt-1">We'll call you back shortly.</p>
            </div>
          ) : (
            <>
              <input required name="name" placeholder="Your name" value={form.name} onChange={handleChange}
                className="w-full border border-white/10 bg-panel rounded-[3px] px-3.5 py-2.5 text-sm text-paper outline-none focus:border-copper" />
              <input required name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange}
                className="w-full border border-white/10 bg-panel rounded-[3px] px-3.5 py-2.5 text-sm text-paper outline-none focus:border-copper" />
              <input type="email" name="email" placeholder="Email (optional)" value={form.email} onChange={handleChange}
                className="w-full border border-white/10 bg-panel rounded-[3px] px-3.5 py-2.5 text-sm text-paper outline-none focus:border-copper" />

              <select required name="service" value={form.service} onChange={handleChange}
                className="w-full border border-white/10 bg-panel rounded-[3px] px-3.5 py-2.5 text-sm text-paper outline-none focus:border-copper">
                <option value="">Service required</option>
                {services.map((s) => (
                  <option key={s.id ?? s.name} value={s.name}>{s.name}</option>
                ))}
                <option value="__other__">Other — describe below</option>
              </select>

              {isOther && (
                <input
                  required
                  placeholder="Describe the service you need"
                  value={customService}
                  onChange={(e) => setCustomService(e.target.value)}
                  className="w-full border border-copper bg-panel rounded-[3px] px-3.5 py-2.5 text-sm text-paper outline-none focus:border-copper"
                />
              )}

              <textarea name="message" placeholder="Any additional details (optional)" rows={3}
                value={form.message} onChange={handleChange}
                className="w-full border border-white/10 bg-panel rounded-[3px] px-3.5 py-2.5 text-sm text-paper outline-none focus:border-copper resize-none" />

              {error && <p className="text-red-400 text-xs">{error}</p>}
              <button type="submit"
                className="w-full bg-copper hover:bg-copper-light text-ink font-semibold py-3 rounded-[3px] text-sm transition-colors">
                Book now
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
