import { useState, useEffect } from "react";
import { Phone, MessageCircle, Mail, MapPin, Clock, BadgeCheck } from "lucide-react";
import { useSiteData } from "../PublicSite";
import { api } from "../lib/api";

const INITIAL_FORM = { name: "", phone: "", email: "", service: "", message: "" };

export default function Booking() {
  const { business: BUSINESS, services } = useSiteData();
  const [form, setForm]             = useState(INITIAL_FORM);
  const [customService, setCustomService] = useState("");
  const [sent, setSent]             = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState("");

  useEffect(() => {
    const handler = (e) => { setForm((p) => ({ ...p, service: e.detail })); setCustomService(""); };
    window.addEventListener("preselectService", handler);
    const preselect = sessionStorage.getItem("preselectService");
    if (preselect) { setForm((p) => ({ ...p, service: preselect })); setCustomService(""); sessionStorage.removeItem("preselectService"); }
    return () => window.removeEventListener("preselectService", handler);
  }, []);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const isOther = form.service === "__other__";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const payload = { ...form, service: isOther ? (customService.trim() || "Other") : form.service };
    try {
      await api.submitEnquiry(payload);
      setSent(true);
      setForm(INITIAL_FORM);
      setCustomService("");
    } catch {
      setError("Something went wrong. Please call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="booking" className="bg-white text-soft-black font-body">
      <div className="mx-auto max-w-[1180px] px-5 md:px-10 py-10 md:py-16">
        <span className="font-mono text-sm uppercase tracking-[0.14em] text-orange-500 font-semibold">
          বুকিংৰ বাবে অনুৰোধ কৰক
        </span>
        <h2 className="font-display font-semibold leading-tight mt-2 text-4xl text-heading">
          Request a booking
        </h2>

        <div className="mt-8 md:mt-10">
          {sent ? (
            <div className="card p-8 text-center fade-up">
              <BadgeCheck className="w-12 h-12 text-orange-500 mx-auto mb-3" />
              <p className="text-heading font-display font-semibold text-xl">Request received</p>
              <p className="text-warm-muted text-base mt-1">We'll call you back shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input required name="name" placeholder="Your name" value={form.name} onChange={handleChange} className="form-input" />
                <input required name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} className="form-input" />
              </div>
              <input type="email" name="email" placeholder="Email (optional)" value={form.email} onChange={handleChange} className="form-input" />

              <select required name="service" value={form.service} onChange={handleChange} className="form-input">
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
                  className="form-input border-orange-200 focus:border-orange-400"
                />
              )}

              <textarea
                name="message"
                placeholder="Any additional details (optional)"
                rows={3}
                value={form.message}
                onChange={handleChange}
                className="form-input resize-none h-auto"
              />

              {error && <p className="text-red-400 text-xs">{error}</p>}
              <button type="submit" disabled={submitting} className="btn-primary w-full">
                {submitting ? "Sending…" : "Book now"}
              </button>
            </form>
          )}
        </div>

        {/* Contact info card */}
        <div className="card mt-8 md:mt-10 p-6 md:p-8">
          <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-orange-500 font-semibold mb-5">
            <span className="h-[7px] w-[7px] rounded-full bg-orange-500" />
            Owner profile
          </div>
          <div className="space-y-3">
            {[
              { Icon: Phone,         text: BUSINESS.phone,                              key: "phone" },
              { Icon: MessageCircle, text: `WhatsApp / ৱাটচঅ্যাপ: ${BUSINESS.phone}`, key: "whatsapp" },
              { Icon: Mail,          text: BUSINESS.email,                              key: "email" },
              { Icon: MapPin,        text: (
                  <span>
                    {BUSINESS.address}
                    {BUSINESS.addressAs && <><br /><span className="text-assamese">{BUSINESS.addressAs}</span></>}
                  </span>
                ), key: "address" },
              { Icon: Clock,         text: BUSINESS.hours,                              key: "hours" },
            ].map(({ Icon, text, key }) => (
              <div key={key}
                className="flex items-center gap-3 p-2.5 rounded-lg transition-colors duration-150 hover:bg-orange-50 group"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-50 border border-gray-200 flex items-center justify-center shrink-0
                                transition-all duration-150 group-hover:bg-orange-100 group-hover:border-orange-300">
                  <Icon className="w-4 h-4 text-orange-500" />
                </div>
                <span className="text-soft-black text-sm leading-relaxed">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
